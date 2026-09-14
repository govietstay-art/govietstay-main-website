@echo off
setlocal EnableExtensions
title GoVietStay - REAL V4.1 Direct Restore
color 0F

REM This script does NOT try to git-fetch the old commit.
REM It downloads the exact historical PartnerTools.tsx by commit SHA,
REM verifies the V4.1 marker, builds, then commits and pushes safely.

if /I "%~1"=="TEMP_RUN" goto TEMP_RUN

set "REPO=%~dp0"
set "TEMPSCRIPT=%TEMP%\GVS_REAL_V41_DIRECT_%RANDOM%_%RANDOM%.bat"
copy /Y "%~f0" "%TEMPSCRIPT%" >nul
if errorlevel 1 (
  echo ERROR: Could not create temporary runner.
  pause
  exit /b 1
)
start "GoVietStay REAL V4.1 Direct Restore" cmd /k ""%TEMPSCRIPT%" TEMP_RUN "%REPO%""
exit /b

:TEMP_RUN
set "REPO=%~2"
cd /d "%REPO%"

set "TARGET_SHA=c4118fb4a7879f869ffff959a208fa0ebf8a7623"
set "TARGET_FILE=components\admin-v5\PartnerTools.tsx"
set "RAW_URL=https://raw.githubusercontent.com/govietstay-art/govietstay-main-website/%TARGET_SHA%/components/admin-v5/PartnerTools.tsx"
set "TMPFILE=%TEMP%\PartnerTools_V41_%RANDOM%.tsx"

echo ============================================================
echo GOVIETSTAY - RESTORE REAL PARTNER V4.1 DIRECTLY
echo ============================================================
echo.
echo Root cause fixed:
echo We are NOT using "git fetch old commit" anymore.
echo We download the exact V4.1 file directly from GitHub history.
echo.
echo NO FORCE PUSH.
echo.

where git >nul 2>&1
if errorlevel 1 goto NOGIT

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 goto NOTREPO

echo [1/9] Save all local uncommitted work...
git rebase --abort >nul 2>&1
git stash push -u -m "GVS safety stash before direct V4.1 restore"
if errorlevel 1 goto STASHFAIL
echo OK.
echo.

echo [2/9] Sync latest main...
git fetch origin
if errorlevel 1 goto FETCHFAIL
git checkout main
if errorlevel 1 goto SYNCFAIL
git pull --ff-only origin main
if errorlevel 1 goto SYNCFAIL
echo OK.
echo.

echo [3/9] Create backup branch...
set "BACKUP=backup-before-v41-direct-%RANDOM%-%RANDOM%"
git branch "%BACKUP%"
if errorlevel 1 goto BACKUPFAIL
echo Backup: %BACKUP%
echo.

echo [4/9] Download exact historical V4.1 PartnerTools.tsx...
where curl.exe >nul 2>&1
if not errorlevel 1 (
  curl.exe -fL --retry 3 --connect-timeout 20 "%RAW_URL%" -o "%TMPFILE%"
) else (
  powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -UseBasicParsing -Uri '%RAW_URL%' -OutFile '%TMPFILE%'"
)
if errorlevel 1 goto DOWNLOADFAIL

if not exist "%TMPFILE%" goto DOWNLOADFAIL
for %%A in ("%TMPFILE%") do if %%~zA LSS 10000 goto BADFILE

findstr /C:"GOVIETSTAY UNIVERSAL PARTNER KIT V4.1" "%TMPFILE%" >nul
if errorlevel 1 goto BADFILE

echo Exact V4.1 marker verified.
echo.

echo [5/9] Replace ONLY PartnerTools.tsx...
copy /Y "%TMPFILE%" "%TARGET_FILE%" >nul
if errorlevel 1 goto COPYFAIL

echo Changed files:
git status --short
echo.
git diff -- "%TARGET_FILE%" --stat
echo.

git diff --quiet -- "%TARGET_FILE%"
if not errorlevel 1 goto NOCHANGE

echo [6/9] Run production build...
call npm run build
if errorlevel 1 goto BUILDFAIL
echo BUILD OK.
echo.

echo [7/9] Commit exact V4.1 UI...
git add "%TARGET_FILE%"
git commit -m "restore(partner): exact V4.1 PartnerTools UI"
if errorlevel 1 goto COMMITFAIL
echo Commit OK.
echo.

echo [8/9] Push safely to GitHub main...
git push origin main
if errorlevel 1 goto PUSHFAIL
echo PUSH OK.
echo.

echo [9/9] Restore your previous local uncommitted files...
git stash pop
if errorlevel 1 goto POPWARN
echo Restore OK.
echo.

echo ============================================================
echo SUCCESS
echo Exact Partner V4.1 UI restored from historical GitHub file.
echo Build passed and GitHub main was updated.
echo Vercel should deploy automatically.
echo ============================================================
git log -1 --oneline
git status
goto END

:NOGIT
echo ERROR: Git not found.
goto END

:NOTREPO
echo ERROR: Put this BAT inside the GoVietStay project folder.
goto END

:STASHFAIL
echo ERROR: Could not stash local files. Nothing changed.
goto END

:FETCHFAIL
echo ERROR: GitHub fetch failed. Nothing pushed.
git stash pop
goto END

:SYNCFAIL
echo ERROR: Could not sync main safely.
git stash pop
goto END

:BACKUPFAIL
echo ERROR: Could not create safety backup.
git stash pop
goto END

:DOWNLOADFAIL
echo.
echo ERROR: Could not download the exact V4.1 file from GitHub history.
echo Nothing was changed on main.
git stash pop
goto END

:BADFILE
echo.
echo ERROR: Downloaded file is invalid or not the real V4.1 file.
echo Nothing was changed.
del /q "%TMPFILE%" >nul 2>&1
git stash pop
goto END

:COPYFAIL
echo ERROR: Could not replace PartnerTools.tsx.
git reset --hard HEAD
git stash pop
goto END

:NOCHANGE
echo.
echo ============================================================
echo NO CHANGE:
echo Current PartnerTools.tsx already matches the exact V4.1 file.
echo Nothing needs to be pushed.
echo ============================================================
git restore "%TARGET_FILE%" >nul 2>&1
git stash pop
goto END

:BUILDFAIL
echo.
echo ============================================================
echo BUILD FAILED.
echo NOTHING was pushed.
echo Rolling PartnerTools.tsx back to current main.
echo ============================================================
git reset --hard HEAD
git stash pop
goto END

:COMMITFAIL
echo ERROR: Commit failed. Nothing pushed.
git reset --hard HEAD
git stash pop
goto END

:PUSHFAIL
echo.
echo ============================================================
echo PUSH FAILED.
echo No force push was used.
echo The new commit remains local. Do not delete anything.
echo ============================================================
git status
goto END

:POPWARN
echo.
echo ============================================================
echo GOOD NEWS: V4.1 WAS PUSHED SUCCESSFULLY.
echo Only restoring previous local files has a conflict.
echo Do not delete anything. Send me a screenshot.
echo ============================================================
git status
goto END

:END
del /q "%TMPFILE%" >nul 2>&1
echo.
echo ------------------------------------------------------------
echo This window stays open.
echo If you see ERROR or BUILD FAILED, send me this screenshot.
echo ------------------------------------------------------------
echo.
