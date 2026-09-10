@echo off
setlocal EnableExtensions
title GoVietStay Partner Kit V4 - Safe GitHub Deploy
cd /d "%~dp0"

set "LOG=%~dp0GVS_V4_DEPLOY_LOG.txt"
> "%LOG%" echo GoVietStay Partner Kit V4 - Safe GitHub Deploy
>>"%LOG%" echo Started: %date% %time%
>>"%LOG%" echo.

echo ==================================================
echo GoVietStay Partner Kit V4 - SAFE DEPLOY
echo ==================================================
echo This version does NOT use Vercel CLI.
echo It builds locally, commits only PartnerTools.tsx,
echo then pushes to GitHub. Vercel will auto-deploy from GitHub.
echo.
echo Log: %LOG%
echo.

if not exist "package.json" (
  echo ERROR: package.json not found.
  >>"%LOG%" echo ERROR: package.json not found. BAT is not in repository root.
  goto :FAIL
)

if not exist ".git" (
  echo ERROR: .git folder not found.
  >>"%LOG%" echo ERROR: .git folder not found. This is not a Git repository root.
  goto :FAIL
)

if not exist "components\admin-v5\PartnerTools.tsx" (
  echo ERROR: PartnerTools.tsx not found.
  >>"%LOG%" echo ERROR: components\admin-v5\PartnerTools.tsx not found.
  goto :FAIL
)

where npm.cmd >nul 2>&1
if errorlevel 1 (
  echo ERROR: npm is not available.
  >>"%LOG%" echo ERROR: npm.cmd not found in PATH.
  goto :FAIL
)

where git.exe >nul 2>&1
if errorlevel 1 (
  echo ERROR: Git is not available.
  >>"%LOG%" echo ERROR: git.exe not found in PATH.
  goto :FAIL
)

echo [1/4] Checking Git repository...
git status --short >>"%LOG%" 2>&1
git remote -v >>"%LOG%" 2>&1

echo [2/4] Building production...
echo ----- npm run build ----- >>"%LOG%"
call npm.cmd run build >>"%LOG%" 2>&1
if errorlevel 1 (
  echo.
  echo BUILD FAILED.
  echo The website was NOT deployed.
  echo I am opening the exact build log now.
  >>"%LOG%" echo BUILD FAILED.
  start "" notepad.exe "%LOG%"
  goto :FAIL
)

echo Build OK.
>>"%LOG%" echo BUILD OK.

echo [3/4] Committing only PartnerTools.tsx...
git add -- "components/admin-v5/PartnerTools.tsx" >>"%LOG%" 2>&1
git diff --cached --quiet
if not errorlevel 1 (
  echo No new V4 code change to commit.
  >>"%LOG%" echo No staged changes found.
) else (
  git commit -m "feat(partner): universal partner kit v4" >>"%LOG%" 2>&1
  if errorlevel 1 (
    echo COMMIT FAILED.
    start "" notepad.exe "%LOG%"
    goto :FAIL
  )
)

echo [4/4] Pushing main to GitHub...
git push origin main >>"%LOG%" 2>&1
if errorlevel 1 (
  echo.
  echo PUSH FAILED. Nothing new reached Vercel.
  echo Opening the exact log.
  start "" notepad.exe "%LOG%"
  goto :FAIL
)

echo.
echo ==================================================
echo SUCCESS
echo V4 was pushed to GitHub main.
echo Vercel should deploy automatically from GitHub.
echo ==================================================
>>"%LOG%" echo SUCCESS: pushed to GitHub main.
pause
exit /b 0

:FAIL
echo.
echo Do NOT run anything else yet.
echo Send me the LAST RED ERROR or a screenshot of Notepad log.
echo Log file: GVS_V4_DEPLOY_LOG.txt
pause
exit /b 1
