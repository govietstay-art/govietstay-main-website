$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "==============================================================" -ForegroundColor Cyan
Write-Host " GoVietStay Cruise Deploy V2 - SYNC REMOTE + BUILD + PUSH" -ForegroundColor Cyan
Write-Host "==============================================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = "C:\Users\ADMIN\Documents\GitHub\govietstay-main-website"

function Test-ProjectRoot([string]$path) {
    return (Test-Path (Join-Path $path ".git")) -and
           (Test-Path (Join-Path $path "app")) -and
           (Test-Path (Join-Path $path "package.json"))
}

if (-not (Test-ProjectRoot $projectRoot)) {
    Write-Host "Project not found at default path." -ForegroundColor Yellow
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
    Write-Host "ERROR: Invalid project folder." -ForegroundColor Red
    exit 1
}

Push-Location $projectRoot
try {
    $branch = (& git branch --show-current).Trim()
    Write-Host "Project: $projectRoot" -ForegroundColor Green
    Write-Host "Branch : $branch" -ForegroundColor Green
    Write-Host ""

    if ($branch -ne "main") {
        Write-Host "ERROR: Current branch is not main. Stopping for safety." -ForegroundColor Red
        exit 1
    }

    # Make sure there are no uncommitted TRACKED changes.
    # Untracked installer folders are ignored here and will not block the rebase.
    $trackedDirty = & git status --porcelain --untracked-files=no
    if ($trackedDirty) {
        Write-Host "ERROR: There are uncommitted tracked changes:" -ForegroundColor Red
        Write-Host $trackedDirty
        Write-Host ""
        Write-Host "Stopping so nothing is overwritten." -ForegroundColor Red
        exit 1
    }

    Write-Host "Fetching latest main from GitHub..." -ForegroundColor Yellow
    & git fetch origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "FETCH FAILED." -ForegroundColor Red
        exit $LASTEXITCODE
    }

    Write-Host ""
    Write-Host "Remote main fetched successfully." -ForegroundColor Green
    Write-Host "Rebasing your local cruise commit on top of origin/main..." -ForegroundColor Yellow

    & git rebase origin/main
    $rebaseCode = $LASTEXITCODE

    if ($rebaseCode -ne 0) {
        Write-Host ""
        Write-Host "REBASE CONFLICT." -ForegroundColor Red
        Write-Host "Conflicted files:" -ForegroundColor Yellow
        $conflicts = & git diff --name-only --diff-filter=U
        if ($conflicts) {
            Write-Host $conflicts
        } else {
            Write-Host "(Git did not report a conflicted filename.)"
        }

        Write-Host ""
        Write-Host "Aborting rebase to restore your project safely..." -ForegroundColor Yellow
        & git rebase --abort 2>$null

        Write-Host ""
        Write-Host "Nothing was force-pushed and remote code was not changed." -ForegroundColor Green
        Write-Host "Send ChatGPT a screenshot of this window." -ForegroundColor Red
        exit 1
    }

    Write-Host ""
    Write-Host "SYNC OK - local cruise commit is now on top of latest GitHub main." -ForegroundColor Green
    Write-Host ""

    Write-Host "Running production build after sync..." -ForegroundColor Yellow
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "BUILD FAILED AFTER REBASE." -ForegroundColor Red
        Write-Host "Nothing has been pushed yet." -ForegroundColor Red
        Write-Host "Send ChatGPT a screenshot beginning at the first red error." -ForegroundColor Red
        exit $LASTEXITCODE
    }

    Write-Host ""
    Write-Host "BUILD OK." -ForegroundColor Green
    Write-Host "Pushing main to GitHub..." -ForegroundColor Yellow

    & git push origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "PUSH FAILED." -ForegroundColor Red
        Write-Host "Do NOT use force push." -ForegroundColor Red
        Write-Host "Send ChatGPT this screenshot." -ForegroundColor Red
        exit $LASTEXITCODE
    }

    Write-Host ""
    Write-Host "==============================================================" -ForegroundColor Green
    Write-Host " PUSH SUCCESSFUL - VERCEL SHOULD DEPLOY AUTOMATICALLY" -ForegroundColor Green
    Write-Host "==============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Final URLs after Vercel becomes Ready:" -ForegroundColor Cyan
    Write-Host "  https://www.govietstay.com/en/cruise-port-shore-excursions"
    Write-Host "  https://www.govietstay.com/ru/kruiznye-ekskursii-chan-may-tien-sa"
    Write-Host ""
    Write-Host "No force push was used." -ForegroundColor DarkGray
}
finally {
    Pop-Location
}
