@echo off
setlocal EnableExtensions
title GoVietStay V4.1 - Safe Git Sync Final
color 0F

REM ============================================================
REM This script is safe to keep inside the repo because it first
REM copies itself to TEMP and continues from there.
REM ============================================================

if /I "%~1"=="TEMP_RUN" goto TEMP_RUN

set "REPO=%~dp0"
set "TEMPSCRIPT=%TEMP%\GVS_SAFE_SYNC_%RANDOM%_%RANDOM%.bat"

copy /Y "%~f0" "%TEMPSCRIPT%" >nul
if errorlevel 1 (
  echo ERROR: Could not create temporary runner.
  pause
  exit /b 1
)

start "GoVietStay Safe Git Sync" cmd /k ""%TEMPSCRIPT%" TEMP_RUN "%REPO%""
exit /b

:TEMP_RUN
set "REPO=%~2"
cd /d "%REPO%"

echo ============================================================
echo  GOVIETSTAY V4.1 - FINAL SAFE GIT SYNC
echo ============================================================
echo.
echo Repo:
echo %CD%
echo.
echo IMPORTANT:
echo - No force push will be used.
echo - Local files are stashed before sync.
echo - This runner is executing from Windows TEMP,
echo   so git stash cannot delete the running BAT.
echo.

where git >nul 2>&1
if errorlevel 1 goto NOGIT

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 goto NOTREPO

echo [1/8] Current repository status...
git status
echo.

echo [2/8] Aborting any unfinished rebase from earlier attempts...
git rebase --abort >nul 2>&1
echo Done.
echo.

echo [3/8] Creating safety branch...
set "BACKUP=backup-v41-final-%RANDOM%-%RANDOM%"
git branch "%BACKUP%"
if errorlevel 1 (
  echo WARNING: Backup branch was not created, continuing carefully.
) else (
  echo Backup created: %BACKUP%
)
echo.

echo [4/8] Stashing all uncommitted and untracked files...
git stash push -u -m "GVS V4.1 final safety stash"
if errorlevel 1 goto STASHFAIL
echo Stash OK.
echo.

echo [5/8] Fetching latest origin/main...
git fetch origin
if errorlevel 1 goto FETCHFAIL
echo Fetch OK.
echo.

echo [6/8] Rebasing your 1 local commit on top of latest origin/main...
git rebase origin/main
if errorlevel 1 goto REBASEFAIL
echo Rebase OK.
echo.

echo [7/8] Pushing safely to GitHub main...
git push origin HEAD:main
if errorlevel 1 goto PUSHFAIL
echo Push OK.
echo.

echo [8/8] Restoring your previous local files...
git stash pop
if errorlevel 1 goto POPWARN
echo Restore OK.
echo.

echo ============================================================
echo  SUCCESS
echo  GitHub main now includes your local V4.1 commit.
echo  Vercel should receive the update automatically.
echo ============================================================
echo.
git status
goto END

:NOGIT
echo ERROR: Git was not found.
goto END

:NOTREPO
echo ERROR: This file must be placed inside:
echo C:\Users\ADMIN\Documents\GitHub\govietstay-main-website
goto END

:STASHFAIL
echo.
echo ============================================================
echo ERROR: STASH FAILED
echo Nothing was pushed.
echo ============================================================
git status
goto END

:FETCHFAIL
echo.
echo ============================================================
echo ERROR: FETCH FAILED
echo Nothing was pushed.
echo Restoring local files...
echo ============================================================
git stash pop
git status
goto END

:REBASEFAIL
echo.
echo ============================================================
echo REBASE CONFLICT DETECTED
echo NOTHING WAS FORCE-PUSHED.
echo Your local files remain protected in the stash.
echo ============================================================
echo.
git status
echo.
echo Send me a screenshot of everything above.
goto END

:PUSHFAIL
echo.
echo ============================================================
echo PUSH FAILED
echo NO FORCE PUSH WAS USED.
echo ============================================================
git status
goto END

:POPWARN
echo.
echo ============================================================
echo GOOD NEWS: PUSH SUCCEEDED.
echo GitHub/Vercel have the V4.1 commit.
echo.
echo But restoring old local uncommitted files caused a conflict.
echo Do not delete anything. Send me a screenshot.
echo ============================================================
git status
goto END

:END
echo.
echo ------------------------------------------------------------
echo This window will stay open.
echo Send me a screenshot if anything shows ERROR or CONFLICT.
echo ------------------------------------------------------------
echo.
