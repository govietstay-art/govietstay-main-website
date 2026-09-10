$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "==============================================================" -ForegroundColor Cyan
Write-Host " GoVietStay Cruise Landing - GIT PUSH + VERCEL DEPLOY" -ForegroundColor Cyan
Write-Host "==============================================================" -ForegroundColor Cyan
Write-Host ""

function Test-ProjectRoot([string]$path) {
    if ([string]::IsNullOrWhiteSpace($path)) { return $false }
    return (Test-Path (Join-Path $path ".git")) -and
           (Test-Path (Join-Path $path "app")) -and
           (Test-Path (Join-Path $path "package.json"))
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

$candidates = @(
    (Get-Location).Path,
    "C:\Users\ADMIN\Documents\GitHub\govietstay-main-website",
    (Join-Path $scriptDir "govietstay-main-website"),
    (Join-Path (Split-Path -Parent $scriptDir) "govietstay-main-website")
)

$projectRoot = $null
foreach ($c in ($candidates | Select-Object -Unique)) {
    if (Test-ProjectRoot $c) {
        $projectRoot = $c
        break
    }
}

if (-not $projectRoot) {
    Write-Host "Project not found automatically." -ForegroundColor Yellow
    Write-Host "Please select govietstay-main-website." -ForegroundColor Yellow

    try {
        $shell = New-Object -ComObject Shell.Application
        $folder = $shell.BrowseForFolder(
            0,
            "Select govietstay-main-website",
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
    Write-Host "ERROR: Could not find a valid Git project root." -ForegroundColor Red
    exit 1
}

Write-Host "Project:" -ForegroundColor Green
Write-Host "  $projectRoot"
Write-Host ""

$enFile = "app/en/cruise-port-shore-excursions/page.tsx"
$ruFile = "app/ru/kruiznye-ekskursii-chan-may-tien-sa/page.tsx"
$tsFile = "tsconfig.json"

Push-Location $projectRoot
try {
    Write-Host "Checking required files..." -ForegroundColor Yellow

    foreach ($f in @($enFile, $ruFile, $tsFile)) {
        if (-not (Test-Path $f)) {
            Write-Host "ERROR: Missing required file: $f" -ForegroundColor Red
            exit 1
        }
    }

    Write-Host ""
    Write-Host "Current branch:" -ForegroundColor Cyan
    & git branch --show-current
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

    Write-Host ""
    Write-Host "Git status BEFORE staging:" -ForegroundColor Cyan
    & git status --short

    Write-Host ""
    Write-Host "Staging ONLY cruise landing files + tsconfig..." -ForegroundColor Yellow
    & git add -- $enFile $ruFile $tsFile
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

    Write-Host ""
    Write-Host "Staged changes:" -ForegroundColor Cyan
    & git diff --cached --name-status

    $staged = & git diff --cached --name-only
    if (-not $staged) {
        Write-Host ""
        Write-Host "No staged changes found." -ForegroundColor Yellow
        Write-Host "The files may already be committed. Checking remote sync..." -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "Creating commit..." -ForegroundColor Yellow
        & git commit -m "Add EN and RU cruise port shore excursion landing pages"
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Commit failed. Check the error above." -ForegroundColor Red
            exit $LASTEXITCODE
        }
    }

    Write-Host ""
    Write-Host "Pushing current branch to origin..." -ForegroundColor Yellow
    $branch = (& git branch --show-current).Trim()
    if ([string]::IsNullOrWhiteSpace($branch)) {
        Write-Host "ERROR: Could not detect current branch." -ForegroundColor Red
        exit 1
    }

    & git push origin $branch
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "PUSH FAILED." -ForegroundColor Red
        Write-Host "Send ChatGPT a screenshot of the first red error." -ForegroundColor Red
        exit $LASTEXITCODE
    }

    Write-Host ""
    Write-Host "==============================================================" -ForegroundColor Green
    Write-Host " PUSH SUCCESSFUL" -ForegroundColor Green
    Write-Host "==============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "GitHub now has the cruise landing changes." -ForegroundColor Green
    Write-Host "Vercel should automatically start a deployment because the project is Git-connected." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Final URLs after Vercel finishes:" -ForegroundColor Cyan
    Write-Host "  https://www.govietstay.com/en/cruise-port-shore-excursions"
    Write-Host "  https://www.govietstay.com/ru/kruiznye-ekskursii-chan-may-tien-sa"
    Write-Host ""
    Write-Host "IMPORTANT: Wait for the Vercel deployment status to become Ready." -ForegroundColor Yellow
}
finally {
    Pop-Location
}
