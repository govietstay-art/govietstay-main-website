$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "==============================================================" -ForegroundColor Cyan
Write-Host " GoVietStay Cruise Landing V5 - NO DELETE / SAFE BUILD FIX" -ForegroundColor Cyan
Write-Host "==============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This version DOES NOT delete V1/V2/V3/V4 installer folders." -ForegroundColor Yellow
Write-Host "It tells TypeScript to ignore them instead." -ForegroundColor Yellow
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$payload = Join-Path $scriptDir "payload"

function Test-ProjectRoot([string]$path) {
    if ([string]::IsNullOrWhiteSpace($path)) { return $false }
    return (Test-Path (Join-Path $path "app")) -and
           (Test-Path (Join-Path $path "package.json")) -and
           (Test-Path (Join-Path $path "tsconfig.json"))
}

function Find-ProjectRoot {
    $candidates = New-Object System.Collections.Generic.List[string]
    $candidates.Add((Get-Location).Path)

    $p = $scriptDir
    for ($i = 0; $i -lt 8; $i++) {
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
    $parentOfInstaller = Split-Path -Parent $scriptDir
    if ($parentOfInstaller) {
        $candidates.Add((Join-Path $parentOfInstaller "govietstay-main-website"))
    }

    foreach ($c in ($candidates | Select-Object -Unique)) {
        if (Test-ProjectRoot $c) { return $c }
    }

    return $null
}

$projectRoot = Find-ProjectRoot

if (-not $projectRoot) {
    Write-Host "Project not found automatically." -ForegroundColor Yellow
    Write-Host "Please select govietstay-main-website." -ForegroundColor Yellow

    try {
        $shell = New-Object -ComObject Shell.Application
        $folder = $shell.BrowseForFolder(
            0,
            "Select govietstay-main-website (contains app, package.json, tsconfig.json)",
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
    Write-Host "ERROR: Selected folder is not the project root." -ForegroundColor Red
    Write-Host "It must contain app, package.json and tsconfig.json." -ForegroundColor Red
    exit 1
}

Write-Host "Project:" -ForegroundColor Green
Write-Host "  $projectRoot"
Write-Host ""

# ------------------------------------------------------------------
# STEP 1: Patch tsconfig.json so TypeScript ignores installer packages.
# This avoids deleting folders that Windows/Explorer/terminal may lock.
# ------------------------------------------------------------------
$tsconfigPath = Join-Path $projectRoot "tsconfig.json"
$backupPath = Join-Path $projectRoot "tsconfig.before-cruise-v5.json"

if (-not (Test-Path $backupPath)) {
    Copy-Item $tsconfigPath $backupPath -Force
    Write-Host "Backup created: tsconfig.before-cruise-v5.json" -ForegroundColor DarkGray
}

$tsText = Get-Content $tsconfigPath -Raw -Encoding UTF8
$excludePattern = "GOVIETSTAY-CRUISE-LANDING-EN-RU-V*/**/*"

if ($tsText -notmatch [regex]::Escape($excludePattern)) {
    Write-Host "Patching tsconfig.json exclude..." -ForegroundColor Yellow

    try {
        $json = $tsText | ConvertFrom-Json

        if ($null -eq $json.exclude) {
            $json | Add-Member -MemberType NoteProperty -Name exclude -Value @("node_modules", $excludePattern)
        } else {
            $existing = @($json.exclude)
            if ($existing -notcontains $excludePattern) {
                $json.exclude = @($existing + $excludePattern)
            }
        }

        $newJson = $json | ConvertTo-Json -Depth 100
        [System.IO.File]::WriteAllText($tsconfigPath, $newJson, (New-Object System.Text.UTF8Encoding($false)))
    }
    catch {
        Write-Host "JSON patch failed: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "Restoring original tsconfig..." -ForegroundColor Red
        Copy-Item $backupPath $tsconfigPath -Force
        exit 1
    }
}
else {
    Write-Host "tsconfig exclude already present." -ForegroundColor Green
}

# Confirm patch
$checkTs = Get-Content $tsconfigPath -Raw -Encoding UTF8
if ($checkTs -notmatch [regex]::Escape($excludePattern)) {
    Write-Host "ERROR: Could not add TypeScript exclusion." -ForegroundColor Red
    exit 1
}

Write-Host "TypeScript will ignore installer folders." -ForegroundColor Green
Write-Host ""

# ------------------------------------------------------------------
# STEP 2: Install the actual production landing pages.
# ------------------------------------------------------------------
$enSource = Join-Path $payload "app\en\cruise-port-shore-excursions\page.tsx"
$ruSource = Join-Path $payload "app\ru\kruiznye-ekskursii-chan-may-tien-sa\page.tsx"

if (-not (Test-Path $enSource) -or -not (Test-Path $ruSource)) {
    Write-Host "ERROR: Landing payload is missing. Re-extract V5 ZIP." -ForegroundColor Red
    exit 1
}

$enTarget = Join-Path $projectRoot "app\en\cruise-port-shore-excursions"
$ruTarget = Join-Path $projectRoot "app\ru\kruiznye-ekskursii-chan-may-tien-sa"

New-Item -ItemType Directory -Force -Path $enTarget | Out-Null
New-Item -ItemType Directory -Force -Path $ruTarget | Out-Null

Copy-Item $enSource (Join-Path $enTarget "page.tsx") -Force
Copy-Item $ruSource (Join-Path $ruTarget "page.tsx") -Force

Write-Host "Landing pages installed:" -ForegroundColor Green
Write-Host "  EN -> app\en\cruise-port-shore-excursions\page.tsx"
Write-Host "  RU -> app\ru\kruiznye-ekskursii-chan-may-tien-sa\page.tsx"
Write-Host ""

# We intentionally DO NOT delete the old installer folders.
# We also avoid deleting the old RU route here if Windows has locks.
# If old RU route exists it is a different URL and does not affect current route.
Write-Host "Old installer folders are left untouched and safely excluded." -ForegroundColor DarkGray
Write-Host ""

# ------------------------------------------------------------------
# STEP 3: Clear Next build cache if possible.
# ------------------------------------------------------------------
$nextDir = Join-Path $projectRoot ".next"
if (Test-Path $nextDir) {
    try {
        Remove-Item $nextDir -Recurse -Force -ErrorAction Stop
        Write-Host "Cleared .next build cache." -ForegroundColor DarkGray
    }
    catch {
        Write-Host "Could not fully clear .next cache; continuing." -ForegroundColor DarkYellow
    }
}

# ------------------------------------------------------------------
# STEP 4: Build
# ------------------------------------------------------------------
Push-Location $projectRoot
try {
    Write-Host ""
    Write-Host "Running npm run build..." -ForegroundColor Yellow
    & npm.cmd run build
    $buildCode = $LASTEXITCODE

    if ($buildCode -ne 0) {
        Write-Host ""
        Write-Host "==============================================================" -ForegroundColor Red
        Write-Host " BUILD FAILED" -ForegroundColor Red
        Write-Host "==============================================================" -ForegroundColor Red
        Write-Host "Send ChatGPT a screenshot starting from the FIRST red error." -ForegroundColor Red
        exit $buildCode
    }

    Write-Host ""
    Write-Host "==============================================================" -ForegroundColor Green
    Write-Host " SUCCESS - BUILD OK" -ForegroundColor Green
    Write-Host "==============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Final URLs:" -ForegroundColor Cyan
    Write-Host "  https://www.govietstay.com/en/cruise-port-shore-excursions"
    Write-Host "  https://www.govietstay.com/ru/kruiznye-ekskursii-chan-may-tien-sa"
    Write-Host ""
    Write-Host "The multiple-lockfiles message can remain as a warning." -ForegroundColor DarkGray
}
finally {
    Pop-Location
}
