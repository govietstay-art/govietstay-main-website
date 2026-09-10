$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host " GoVietStay Cruise Deploy V4 - CLEAN WORKTREE DEPLOY" -ForegroundColor Cyan
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This version DOES NOT modify/stash/delete your current working files." -ForegroundColor Green
Write-Host "It builds from a temporary clean copy of latest GitHub main." -ForegroundColor Green
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

$tempDir = $null
try {
    Write-Host "Project found:" -ForegroundColor Green
    Write-Host "  $projectRoot"
    Write-Host ""

    # ------------------------------------------------------------
    # 1. Locate the already-created local cruise commit.
    # ------------------------------------------------------------
    $cruiseCommit = (& git log --all --grep="Add EN and RU cruise port shore excursion landing pages" -1 --format=%H).Trim()

    if ([string]::IsNullOrWhiteSpace($cruiseCommit)) {
        # fallback to the commit shown in the previous deploy attempt
        $knownCommit = "8457326"
        & git rev-parse --verify "$knownCommit^{commit}" *> $null
        if ($LASTEXITCODE -eq 0) {
            $cruiseCommit = (& git rev-parse $knownCommit).Trim()
        }
    }

    if ([string]::IsNullOrWhiteSpace($cruiseCommit)) {
        Write-Host "ERROR: Could not find the local cruise landing commit." -ForegroundColor Red
        Write-Host "Nothing was changed." -ForegroundColor Red
        exit 1
    }

    Write-Host "Cruise source commit:" -ForegroundColor Cyan
    Write-Host "  $cruiseCommit"
    Write-Host ""

    # ------------------------------------------------------------
    # 2. Fetch latest GitHub main.
    # ------------------------------------------------------------
    Write-Host "Fetching latest origin/main..." -ForegroundColor Yellow
    & git fetch origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "FETCH FAILED." -ForegroundColor Red
        exit $LASTEXITCODE
    }

    $remoteHead = (& git rev-parse origin/main).Trim()
    Write-Host "Latest origin/main:" -ForegroundColor Green
    Write-Host "  $remoteHead"
    Write-Host ""

    # ------------------------------------------------------------
    # 3. Create a completely clean temporary worktree.
    # ------------------------------------------------------------
    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $tempDir = Join-Path $env:TEMP "govietstay-cruise-deploy-$stamp"

    if (Test-Path $tempDir) {
        Remove-Item $tempDir -Recurse -Force
    }

    Write-Host "Creating clean temporary worktree..." -ForegroundColor Yellow
    & git worktree add --detach $tempDir origin/main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Could not create clean worktree." -ForegroundColor Red
        exit $LASTEXITCODE
    }

    Write-Host "Clean worktree created:" -ForegroundColor Green
    Write-Host "  $tempDir"
    Write-Host ""

    Pop-Location
    Push-Location $tempDir

    # ------------------------------------------------------------
    # 4. Apply cruise commit WITHOUT committing yet.
    #    Then restore tsconfig.json from remote main.
    #    Result: ONLY the two landing pages are deployed.
    # ------------------------------------------------------------
    Write-Host "Applying cruise landing files..." -ForegroundColor Yellow
    & git cherry-pick --no-commit $cruiseCommit

    if ($LASTEXITCODE -ne 0) {
        Write-Host "CHERRY-PICK FAILED." -ForegroundColor Red
        & git cherry-pick --abort 2>$null
        exit 1
    }

    # Remove the installer-only tsconfig modification from the deploy.
    & git restore --source=origin/main --staged --worktree -- tsconfig.json

    # Verify exactly what is staged/changed.
    Write-Host ""
    Write-Host "Files prepared for deployment:" -ForegroundColor Cyan
    & git status --short

    $allowed1 = "app/en/cruise-port-shore-excursions/page.tsx"
    $allowed2 = "app/ru/kruiznye-ekskursii-chan-may-tien-sa/page.tsx"

    $changed = @(& git diff --name-only)
    $stagedChanged = @(& git diff --cached --name-only)
    $allChanged = @($changed + $stagedChanged | Where-Object { $_ } | Select-Object -Unique)

    $unexpected = @($allChanged | Where-Object { $_ -ne $allowed1 -and $_ -ne $allowed2 })

    if ($unexpected.Count -gt 0) {
        Write-Host ""
        Write-Host "SAFETY STOP: Unexpected files would be deployed:" -ForegroundColor Red
        $unexpected | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
        exit 1
    }

    # Stage just the final page files.
    & git add -- $allowed1 $allowed2
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

    Write-Host ""
    Write-Host "Creating clean cruise-only commit..." -ForegroundColor Yellow
    & git commit -m "feat(cruise): add EN and RU shore excursion landing pages"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "COMMIT FAILED." -ForegroundColor Red
        exit $LASTEXITCODE
    }

    # ------------------------------------------------------------
    # 5. Production build in CLEAN worktree.
    # ------------------------------------------------------------
    Write-Host ""
    Write-Host "Installing dependencies if needed..." -ForegroundColor Yellow
    if (-not (Test-Path "node_modules")) {
        & npm.cmd ci
        if ($LASTEXITCODE -ne 0) {
            Write-Host "npm ci FAILED." -ForegroundColor Red
            exit $LASTEXITCODE
        }
    }

    Write-Host ""
    Write-Host "Running production build in clean worktree..." -ForegroundColor Yellow
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "BUILD FAILED. Nothing was pushed to GitHub." -ForegroundColor Red
        exit $LASTEXITCODE
    }

    Write-Host ""
    Write-Host "CLEAN BUILD OK." -ForegroundColor Green

    # ------------------------------------------------------------
    # 6. Re-check remote immediately before push.
    #    If main advanced again, rebase clean temp commit and rebuild.
    # ------------------------------------------------------------
    Write-Host ""
    Write-Host "Final remote sync check..." -ForegroundColor Yellow
    & git fetch origin main
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

    $isAncestor = $true
    & git merge-base --is-ancestor origin/main HEAD
    if ($LASTEXITCODE -ne 0) {
        $isAncestor = $false
    }

    if (-not $isAncestor) {
        Write-Host "GitHub main advanced again. Rebasing clean temp commit..." -ForegroundColor Yellow
        & git rebase origin/main
        if ($LASTEXITCODE -ne 0) {
            Write-Host "REBASE CONFLICT IN CLEAN WORKTREE." -ForegroundColor Red
            & git rebase --abort 2>$null
            exit 1
        }

        Write-Host "Rebuild after final rebase..." -ForegroundColor Yellow
        & npm.cmd run build
        if ($LASTEXITCODE -ne 0) {
            Write-Host "BUILD FAILED AFTER FINAL REBASE. Nothing pushed." -ForegroundColor Red
            exit $LASTEXITCODE
        }
    }

    # ------------------------------------------------------------
    # 7. Push HEAD -> main. Never force.
    # ------------------------------------------------------------
    Write-Host ""
    Write-Host "Pushing clean cruise commit to GitHub main..." -ForegroundColor Yellow
    & git push origin HEAD:main
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "PUSH FAILED. NO FORCE PUSH WAS USED." -ForegroundColor Red
        exit $LASTEXITCODE
    }

    Write-Host ""
    Write-Host "====================================================================" -ForegroundColor Green
    Write-Host " PUSH SUCCESSFUL - VERCEL DEPLOY SHOULD START NOW" -ForegroundColor Green
    Write-Host "====================================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Only these two new pages were deployed:" -ForegroundColor Cyan
    Write-Host "  /en/cruise-port-shore-excursions"
    Write-Host "  /ru/kruiznye-ekskursii-chan-may-tien-sa"
    Write-Host ""
    Write-Host "Your current project folder, HUONG-DAN.txt, and installer folders were not touched." -ForegroundColor Green
}
finally {
    # Return to original repo if possible.
    try {
        Pop-Location
    } catch {}

    try {
        Push-Location $projectRoot
        if ($tempDir -and (Test-Path $tempDir)) {
            Write-Host ""
            Write-Host "Cleaning temporary worktree..." -ForegroundColor DarkGray
            & git worktree remove --force $tempDir 2>$null
        }
        & git worktree prune 2>$null
        Pop-Location
    } catch {}
}
