$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " GoVietStay Cruise Landing V4 - CLEAN + FIX + BUILD" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$payload = Join-Path $scriptDir "payload"

function Test-ProjectRoot([string]$path) {
    if ([string]::IsNullOrWhiteSpace($path)) { return $false }
    return (Test-Path (Join-Path $path "app")) -and
           (Test-Path (Join-Path $path "package.json"))
}

function Find-ProjectRoot {
    $candidates = New-Object System.Collections.Generic.List[string]
    $candidates.Add((Get-Location).Path)

    $p = $scriptDir
    for ($i = 0; $i -lt 7; $i++) {
        if ($p) {
            $candidates.Add($p)
            try {
                $parent = Split-Path -Parent $p
                if ($parent -eq $p -or [string]::IsNullOrWhiteSpace($parent)) { break }
                $p = $parent
            } catch { break }
        }
    }

    $candidates.Add((Join-Path $scriptDir "govietstay-main-website"))
    $candidates.Add((Join-Path (Split-Path -Parent $scriptDir) "govietstay-main-website"))

    foreach ($c in ($candidates | Select-Object -Unique)) {
        if (Test-ProjectRoot $c) { return $c }
    }
    return $null
}

$projectRoot = Find-ProjectRoot

if (-not $projectRoot) {
    Write-Host "Chua tim thay project tu dong." -ForegroundColor Yellow
    Write-Host "Hay chon thu muc govietstay-main-website." -ForegroundColor Yellow

    try {
        $shell = New-Object -ComObject Shell.Application
        $folder = $shell.BrowseForFolder(
            0,
            "Select govietstay-main-website (folder containing app and package.json)",
            0,
            0
        )
        if ($folder -ne $null) {
            $projectRoot = $folder.Self.Path
        }
    } catch {}
}

if (-not (Test-ProjectRoot $projectRoot)) {
    Write-Host ""
    Write-Host "ERROR: Thu muc duoc chon khong phai project root." -ForegroundColor Red
    Write-Host "Can co ca app va package.json." -ForegroundColor Red
    exit 1
}

Write-Host "Project:" -ForegroundColor Green
Write-Host "  $projectRoot"
Write-Host ""

# IMPORTANT:
# Delete ONLY known installer-package directories accidentally extracted into project root.
# Do not touch app/en/... or app/ru/... actual landing routes.
$installerFolderPatterns = @(
    "GOVIETSTAY-CRUISE-LANDING-EN-RU-V1",
    "GOVIETSTAY-CRUISE-LANDING-EN-RU-V2",
    "GOVIETSTAY-CRUISE-LANDING-EN-RU-V3-ONE-CLICK",
    "GOVIETSTAY-CRUISE-LANDING-EN-RU-V4-FIX"
)

Write-Host "Cleaning leftover installer folders inside project..." -ForegroundColor Yellow

foreach ($folderName in $installerFolderPatterns) {
    $candidate = Join-Path $projectRoot $folderName

    # Never delete the current V4 folder if V4 itself is physically inside the project.
    if ((Test-Path $candidate) -and ($candidate -ne $scriptDir)) {
        Write-Host "  Removing: $folderName" -ForegroundColor DarkYellow
        Remove-Item $candidate -Recurse -Force
    }
}

# Also remove versioned Cruise installer folders with the exact safe prefix,
# but never app/, components/, lib/, public/, etc.
Get-ChildItem -Path $projectRoot -Directory -ErrorAction SilentlyContinue |
    Where-Object {
        $_.Name -like "GOVIETSTAY-CRUISE-LANDING-EN-RU-V*" -and
        $_.FullName -ne $scriptDir
    } |
    ForEach-Object {
        Write-Host "  Removing leftover package: $($_.Name)" -ForegroundColor DarkYellow
        Remove-Item $_.FullName -Recurse -Force
    }

Write-Host ""
Write-Host "Reinstalling final landing files..." -ForegroundColor Yellow

$enSource = Join-Path $payload "app\en\cruise-port-shore-excursions\page.tsx"
$ruSource = Join-Path $payload "app\ru\kruiznye-ekskursii-chan-may-tien-sa\page.tsx"

$enTarget = Join-Path $projectRoot "app\en\cruise-port-shore-excursions"
$ruTarget = Join-Path $projectRoot "app\ru\kruiznye-ekskursii-chan-may-tien-sa"

New-Item -ItemType Directory -Force -Path $enTarget | Out-Null
New-Item -ItemType Directory -Force -Path $ruTarget | Out-Null

Copy-Item $enSource (Join-Path $enTarget "page.tsx") -Force
Copy-Item $ruSource (Join-Path $ruTarget "page.tsx") -Force

# Remove obsolete old Russian route only
$oldRu = Join-Path $projectRoot "app\ru\cruise-port-shore-excursions"
if (Test-Path $oldRu) {
    Write-Host "Removing obsolete RU V1 route..." -ForegroundColor Yellow
    Remove-Item $oldRu -Recurse -Force
}

Write-Host ""
Write-Host "Correct routes are now:" -ForegroundColor Green
Write-Host "  app\en\cruise-port-shore-excursions\page.tsx"
Write-Host "  app\ru\kruiznye-ekskursii-chan-may-tien-sa\page.tsx"
Write-Host ""

Push-Location $projectRoot
try {
    Write-Host "Running npm run build..." -ForegroundColor Yellow
    & npm.cmd run build
    $buildCode = $LASTEXITCODE

    if ($buildCode -ne 0) {
        Write-Host ""
        Write-Host "BUILD STILL FAILED." -ForegroundColor Red
        Write-Host "Take a screenshot of the FIRST red Type error and send it to ChatGPT." -ForegroundColor Red
        exit $buildCode
    }

    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host " SUCCESS - BUILD OK" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Routes ready:" -ForegroundColor Cyan
    Write-Host "  /en/cruise-port-shore-excursions"
    Write-Host "  /ru/kruiznye-ekskursii-chan-may-tien-sa"
    Write-Host ""
    Write-Host "The 'multiple lockfiles' message is only a warning if build succeeds." -ForegroundColor DarkGray
}
finally {
    Pop-Location
}
