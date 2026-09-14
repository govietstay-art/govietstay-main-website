@echo off
setlocal EnableExtensions
title GoVietStay - Restore REAL Partner V4.1 UI
color 0F

REM ============================================================
REM Restores the exact PartnerTools V4.1 UI from known Git commit
REM c4118fb4a7879f869ffff959a208fa0ebf8a7623
REM Safely backs up current main, builds, commits and pushes.
REM Never force-pushes.
REM ============================================================

if /I "%~1"=="TEMP_RUN" goto TEMP_RUN

set "REPO=%~dp0"
set "TEMPSCRIPT=%TEMP%\GVS_REAL_V41_%RANDOM%_%RANDOM%.bat"

copy /Y "%~f0" "%TEMPSCRIPT%" >nul
if errorlevel 1 (
  echo ERROR: Could not create temporary runner.
  pause
  exit /b 1
)

start "GoVietStay REAL V4.1 UI Deploy" cmd /k ""%TEMPSCRIPT%" TEMP_RUN "%REPO%""
exit /b

:TEMP_RUN
set "REPO=%~2"
cd /d "%REPO%"

set "TARGET=c4118fb4a7879f869ffff959a208fa0ebf8a7623"
set "FILE=components/admin-v5/PartnerTools.tsx"

echo ============================================================
echo  GOVIETSTAY - RESTORE REAL PARTNER V4.1 UI
echo ============================================================
echo.
echo Target V4.1 commit:
echo %TARGET%
echo.
echo Target UI file:
echo %FILE%
echo.
echo This script will:
echo  1. Save local uncommitted files safely
echo  2. Sync latest main
echo  3. Create a backup branch
echo  4. Restore the exact V4.1 PartnerTools UI
echo  5. Run production build
echo  6. Commit and push to GitHub main
echo  7. Restore your local uncommitted files
echo.
echo NO FORCE PUSH WILL BE USED.
echo.

where git >nul 2>&1
if errorlevel 1 goto NOGIT

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 goto NOTREPO

echo [1/10] Checking target V4.1 commit exists...
git cat-file -e %TARGET%^{commit} 2>nul
if errorlevel 1 (
  echo Target commit not found locally. Fetching GitHub...
  git fetch origin
  if errorlevel 1 goto FETCHFAIL_EARLY
  git cat-file -e %TARGET%^{commit} 2>nul
  if errorlevel 1 goto TARGETFAIL
)
echo V4.1 commit found.
echo.

echo [2/10] Aborting any unfinished rebase...
git rebase --abort >nul 2>&1
echo Done.
echo.

echo [3/10] Saving ALL local uncommitted/untracked files...
git stash push -u -m "GVS safety stash before REAL V4.1 UI restore"
if errorlevel 1 goto STASHFAIL
echo Local work saved safely.
echo.

echo [4/10] Fetching and syncing latest GitHub main...
git fetch origin
if errorlevel 1 goto FETCHFAIL
git checkout main
if errorlevel 1 goto SYNCFAIL
git pull --ff-only origin main
if errorlevel 1 goto SYNCFAIL
echo Main is synced.
echo.

echo [5/10] Creating safety backup branch...
set "BACKUP=backup-before-real-v41-%RANDOM%-%RANDOM%"
git branch "%BACKUP%"
if errorlevel 1 (
  echo WARNING: Could not create backup branch.
  goto BACKUPFAIL
)
echo Backup created: %BACKUP%
echo.

echo [6/10] Restoring the exact V4.1 PartnerTools UI...
git checkout %TARGET% -- "%FILE%"
if errorlevel 1 goto RESTOREFAIL
echo.
echo Files changed by this restore:
git status --short
echo.
echo Diff summary:
git diff --stat
echo.

git diff --quiet -- "%FILE%"
if not errorlevel 1 goto NOCHANGE

echo [7/10] Running production build...
call :BUILD
if errorlevel 1 goto BUILDFAIL
echo.
echo BUILD OK.
echo.

echo [8/10] Committing REAL V4.1 UI...
git add "%FILE%"
git commit -m "restore(partner): apply real V4.1 PartnerTools UI"
if errorlevel 1 goto COMMITFAIL
echo Commit created.
echo.

echo [9/10] Pushing safely to GitHub main...
git push origin main
if errorlevel 1 goto PUSHFAIL
echo Push OK.
echo.

echo [10/10] Restoring your previous local files...
git stash pop
if errorlevel 1 goto POPWARN
echo Local files restored.
echo.

echo ============================================================
echo  SUCCESS
echo  REAL Partner V4.1 UI was restored, built and pushed.
echo  GitHub main now contains the V4.1 PartnerTools interface.
echo  Vercel should deploy this commit automatically.
echo ============================================================
echo.
git log -1 --oneline
git status
goto END

:BUILD
if exist "pnpm-lock.yaml" (
  where pnpm >nul 2>&1
  if not errorlevel 1 (
    call pnpm build
    exit /b %errorlevel%
  )
)
if exist "yarn.lock" (
  where yarn >nul 2>&1
  if not errorlevel 1 (
    call yarn build
    exit /b %errorlevel%
  )
)
if exist "package.json" (
  call npm run build
  exit /b %errorlevel%
)
echo ERROR: No supported package manager/build setup found.
exit /b 1

:NOGIT
echo ERROR: Git is not available.
goto END

:NOTREPO
echo ERROR: Put this BAT inside the GoVietStay repository folder.
goto END

:FETCHFAIL_EARLY
echo ERROR: Could not fetch GitHub to locate V4.1 commit.
goto END

:TARGETFAIL
echo ERROR: The known V4.1 commit could not be found.
echo Nothing was changed.
goto END

:STASHFAIL
echo ERROR: Could not safely stash local files.
echo Nothing was pushed.
goto END

:FETCHFAIL
echo ERROR: Fetch failed.
git stash pop
goto END

:SYNCFAIL
echo ERROR: Could not fast-forward local main to origin/main.
echo Nothing was pushed.
git stash pop
goto END

:BACKUPFAIL
echo ERROR: Safety backup branch could not be created.
echo Stopping before changing UI.
git stash pop
goto END

:RESTOREFAIL
echo ERROR: Could not restore %FILE% from V4.1 commit.
git reset --hard HEAD
git stash pop
goto END

:NOCHANGE
echo.
echo ============================================================
echo NO UI CHANGE DETECTED.
echo The current PartnerTools file already matches V4.1 exactly.
echo Nothing will be committed or pushed.
echo ============================================================
git restore --staged "%FILE%" >nul 2>&1
git restore "%FILE%" >nul 2>&1
git stash pop
goto END

:BUILDFAIL
echo.
echo ============================================================
echo BUILD FAILED - PUSH CANCELLED.
echo Current main was NOT changed on GitHub.
echo Rolling local UI file back to current main...
echo ============================================================
git reset --hard HEAD
git stash pop
goto END

:COMMITFAIL
echo ERROR: Commit failed. Nothing was pushed.
git reset --hard HEAD
git stash pop
goto END

:PUSHFAIL
echo.
echo ============================================================
echo PUSH FAILED.
echo The new commit exists locally but was NOT force-pushed.
echo DO NOT DELETE ANYTHING.
echo ============================================================
git status
goto END

:POPWARN
echo.
echo ============================================================
echo GOOD NEWS: V4.1 UI WAS PUSHED SUCCESSFULLY.
echo But restoring older local uncommitted files caused a conflict.
echo Do not delete anything. Send me a screenshot.
echo ============================================================
git status
goto END

:END
echo.
echo ------------------------------------------------------------
echo Window stays open.
echo If you see ERROR, BUILD FAILED or PUSH FAILED,
echo send me a screenshot of this window.
echo ------------------------------------------------------------
echo.
