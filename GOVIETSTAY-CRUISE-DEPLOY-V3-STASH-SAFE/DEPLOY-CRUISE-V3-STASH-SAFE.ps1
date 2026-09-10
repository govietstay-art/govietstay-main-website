$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host " GoVietStay Cruise Deploy V3 - STASH + SYNC + BUILD + PUSH" -ForegroundColor Cyan
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = "C:\Users\ADMIN\Documents\GitHub\govietstay-main-website"
$stashMessage = "TEMP-CRUISE-DEPLOY-V3-" + (Get-Date -Format "yyyyMMdd-HHmmss")
$stashCreated = $false
$pushSucceeded = $false

function Test-ProjectRoot([string]$path) {
    return (Test-Path (Join-Path $path ".git")) -and
           (Test-Path (Join-Path $path "app")) -and
           (Test-Path (Join-Path $path "package.json"))
}

if (-not (Test-ProjectRoot $projectRoot)) {
    Write-Host "Project not found at the default path." -ForegroundColor Yellow
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

    # Check that the cruise commit exists locally.
    $headMessage = (& git log -1 --pretty=%s).Trim()
    Write-Host "Local HEAD: $headMessage" -ForegroundColor DarkGray
    Write-Host ""

    # ---------------------------------------------------------------
    # STEP 1 - Safely stash tracked working-tree changes.
    # Default git stash does NOT include untracked installer folders.
    # ---------------------------------------------------------------
    $trackedDirty = & git status --porcelain --untracked-files=no

    if ($trackedDirty) {
        Write-Host "Tracked local changes found:" -ForegroundColor Yellow
        Write-Host $trackedDirty
        Write-Host ""
        Write-Host "Temporarily stashing them so they are NOT included in the cruise deploy..." -ForegroundColor Yellow

        & git stash push -m $stashMessage
        if ($LASTEXITCODE -ne 0) {
            Write-Host "ERROR: Could not stash local changes." -ForegroundColor Red
            exit $LASTEXITCODE
        }

        $stashCreated = $true
        Write-Host "Local changes safely stashed." -ForegroundColor Green
    }
    else {
        Write-Host "No uncommitted tracked changes. Continuing." -ForegroundColor Green
    }

    # Verify clean tracked working tree after stash.
    $stillDirty = & git status --porcelain --untracked-files=no
    if ($stillDirty) {
        Write-Host "ERROR: Tracked working tree is still not clean after stash." -ForegroundColor Red
        Write-Host $stillDirty
        exit 1
    }

    # ---------------------------------------------------------------
    # STEP 2 - Fetch and rebase on latest remote main.
    # ---------------------------------------------------------------
    Write-Host ""
    Write-Host "Fetching latest origin/main..." -ForegroundColor Yellow
    & git fetch origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "FETCH FAILED." -ForegroundColor Red
        exit $LASTEXITCODE
    }

    Write-Host "Rebasing local cruise commit on top of latest origin/main..." -ForegroundColor Yellow
    & git rebase origin/main
    $rebaseCode = $LASTEXITCODE

    if ($rebaseCode -ne 0) {
        Write-Host ""
        Write-Host "REBASE CONFLICT." -ForegroundColor Red
        $conflicts = & git diff --name-only --diff-filter=U
        if ($conflicts) {
            Write-Host "Conflicted files:" -ForegroundColor Yellow
            Write-Host $conflicts
        }

        Write-Host "Aborting rebase to restore the pre-rebase state..." -ForegroundColor Yellow
        & git rebase --abort 2>$null

        Write-Host ""
        Write-Host "Remote GitHub was NOT changed." -ForegroundColor Green
        Write-Host "The temporary stash is still safe and will be restored now." -ForegroundColor Yellow

        if ($stashCreated) {
            & git stash pop
            if ($LASTEXITCODE -ne 0) {
                Write-Host "WARNING: Could not automatically restore the stash." -ForegroundColor Red
                Write-Host "Your changes remain in Git stash; nothing was deleted." -ForegroundColor Red
            } else {
                $stashCreated = $false
            }
        }

        exit 1
    }

    Write-Host "SYNC OK." -ForegroundColor Green

    # ---------------------------------------------------------------
    # STEP 3 - Build the exact rebased code BEFORE pushing.
    # ---------------------------------------------------------------
    Write-Host ""
    Write-Host "Running production build..." -ForegroundColor Yellow
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "BUILD FAILED. Nothing has been pushed." -ForegroundColor Red
        Write-Host "Restoring your local changes..." -ForegroundColor Yellow

        if ($stashCreated) {
            & git stash pop
            if ($LASTEXITCODE -ne 0) {
                Write-Host "WARNING: Automatic stash restore had a conflict." -ForegroundColor Red
                Write-Host "Your stashed content is still recoverable with git stash list." -ForegroundColor Red
            } else {
                $stashCreated = $false
            }
        }

        exit $LASTEXITCODE
    }

    Write-Host "BUILD OK." -ForegroundColor Green

    # ---------------------------------------------------------------
    # STEP 4 - Push without force.
    # ---------------------------------------------------------------
    Write-Host ""
    Write-Host "Pushing main to GitHub..." -ForegroundColor Yellow
    & git push origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "PUSH FAILED. No force push will be used." -ForegroundColor Red
        Write-Host "Restoring your local changes..." -ForegroundColor Yellow

        if ($stashCreated) {
            & git stash pop
            if ($LASTEXITCODE -ne 0) {
                Write-Host "WARNING: Automatic stash restore had a conflict." -ForegroundColor Red
                Write-Host "Your stashed content remains recoverable." -ForegroundColor Red
            } else {
                $stashCreated = $false
            }
        }

        exit $LASTEXITCODE
    }

    $pushSucceeded = $true

    Write-Host ""
    Write-Host "GitHub push successful." -ForegroundColor Green

    # ---------------------------------------------------------------
    # STEP 5 - Restore user's unrelated local changes AFTER push.
    # This prevents HUONG-DAN.txt from entering the deployment commit.
    # ---------------------------------------------------------------
    if ($stashCreated) {
        Write-Host ""
        Write-Host "Restoring your previous local changes (for example HUONG-DAN.txt)..." -ForegroundColor Yellow

        & git stash pop
        $popCode = $LASTEXITCODE

        if ($popCode -ne 0) {
            Write-Host ""
            Write-Host "DEPLOY PUSH SUCCEEDED, but Git could not auto-restore the stash cleanly." -ForegroundColor Yellow
            Write-Host "Your changes were NOT deleted. Check 'git stash list' / working tree." -ForegroundColor Yellow
        }
        else {
            $stashCreated = $false
            Write-Host "Your local changes were restored successfully." -ForegroundColor Green
        }
    }

    Write-Host ""
    Write-Host "==================================================================" -ForegroundColor Green
    Write-Host " PUSH SUCCESSFUL - VERCEL DEPLOY SHOULD START AUTOMATICALLY" -ForegroundColor Green
    Write-Host "==================================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Cruise URLs:" -ForegroundColor Cyan
    Write-Host "  https://www.govietstay.com/en/cruise-port-shore-excursions"
    Write-Host "  https://www.govietstay.com/ru/kruiznye-ekskursii-chan-may-tien-sa"
    Write-Host ""
    Write-Host "HUONG-DAN.txt was NOT added to the cruise commit." -ForegroundColor DarkGray
    Write-Host "No force push was used." -ForegroundColor DarkGray
}
finally {
    Pop-Location
}
