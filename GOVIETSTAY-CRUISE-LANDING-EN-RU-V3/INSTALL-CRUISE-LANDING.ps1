$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " GoVietStay Cruise Landing EN + RU V3 - ONE CLICK" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "EN: /en/cruise-port-shore-excursions"
Write-Host "RU: /ru/kruiznye-ekskursii-chan-may-tien-sa"
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

    # 1) Current working directory
    $candidates.Add((Get-Location).Path)

    # 2) Installer folder and up to 6 parent levels
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

    # 3) Common sibling folder name near installer
    $nearbyRoots = @(
        (Join-Path $scriptDir "govietstay-main-website"),
        (Join-Path (Split-Path -Parent $scriptDir) "govietstay-main-website")
    )
    foreach ($x in $nearbyRoots) { $candidates.Add($x) }

    foreach ($c in ($candidates | Select-Object -Unique)) {
        if (Test-ProjectRoot $c) { return $c }
    }

    return $null
}

$projectRoot = Find-ProjectRoot

if (-not $projectRoot) {
    Write-Host "Project was not found automatically." -ForegroundColor Yellow
    Write-Host "Please choose the folder: govietstay-main-website" -ForegroundColor Yellow
    Write-Host ""

    try {
        $shell = New-Object -ComObject Shell.Application
        $folder = $shell.BrowseForFolder(
            0,
            "Select the ROOT folder of govietstay-main-website (must contain app and package.json)",
            0,
            0
        )

        if ($folder -ne $null) {
            $projectRoot = $folder.Self.Path
        }
    } catch {
        Write-Host "Folder picker could not open." -ForegroundColor Red
    }
}

if (-not (Test-ProjectRoot $projectRoot)) {
    Write-Host ""
    Write-Host "ERROR: The selected folder is not the project root." -ForegroundColor Red
    Write-Host "Please select the folder that contains BOTH:" -ForegroundColor Red
    Write-Host "  - app" -ForegroundColor Red
    Write-Host "  - package.json" -ForegroundColor Red
    Write-Host ""
    exit 1
}

Write-Host "Project found:" -ForegroundColor Green
Write-Host "  $projectRoot"
Write-Host ""

$enSource = Join-Path $payload "app\en\cruise-port-shore-excursions\page.tsx"
$ruSource = Join-Path $payload "app\ru\kruiznye-ekskursii-chan-may-tien-sa\page.tsx"

if (-not (Test-Path $enSource) -or -not (Test-Path $ruSource)) {
    Write-Host "ERROR: Payload files are missing. Re-extract the ZIP and run again." -ForegroundColor Red
    exit 1
}

$enTarget = Join-Path $projectRoot "app\en\cruise-port-shore-excursions"
$ruTarget = Join-Path $projectRoot "app\ru\kruiznye-ekskursii-chan-may-tien-sa"

New-Item -ItemType Directory -Force -Path $enTarget | Out-Null
New-Item -ItemType Directory -Force -Path $ruTarget | Out-Null

Copy-Item $enSource (Join-Path $enTarget "page.tsx") -Force
Copy-Item $ruSource (Join-Path $ruTarget "page.tsx") -Force

# Remove old RU V1 slug if it exists
$oldRu = Join-Path $projectRoot "app\ru\cruise-port-shore-excursions"
if (Test-Path $oldRu) {
    Write-Host "Removing old RU route: /ru/cruise-port-shore-excursions" -ForegroundColor Yellow
    Remove-Item $oldRu -Recurse -Force
}

Write-Host ""
Write-Host "Files installed successfully:" -ForegroundColor Green
Write-Host "  $enTarget\page.tsx"
Write-Host "  $ruTarget\page.tsx"
Write-Host ""

Push-Location $projectRoot
try {
    Write-Host "Running npm run build..." -ForegroundColor Yellow
    & npm.cmd run build
    $buildCode = $LASTEXITCODE

    if ($buildCode -ne 0) {
        Write-Host ""
        Write-Host "BUILD FAILED." -ForegroundColor Red
        Write-Host "Landing files are already installed, but DO NOT deploy until the error above is fixed." -ForegroundColor Red
        exit $buildCode
    }

    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Green
    Write-Host " SUCCESS - BUILD OK" -ForegroundColor Green
    Write-Host "========================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Final routes:" -ForegroundColor Cyan
    Write-Host "  https://www.govietstay.com/en/cruise-port-shore-excursions"
    Write-Host "  https://www.govietstay.com/ru/kruiznye-ekskursii-chan-may-tien-sa"
    Write-Host ""
    Write-Host "Next step: commit + push to GitHub so Vercel can deploy." -ForegroundColor Cyan
}
finally {
    Pop-Location
}
