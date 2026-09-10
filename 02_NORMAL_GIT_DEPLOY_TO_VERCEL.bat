@echo off
setlocal EnableExtensions EnableDelayedExpansion
title GoVietStay - Normal Git Deploy to Vercel

set "PROJECT=C:\Users\ADMIN\Documents\GitHub\govietstay-main-website"

echo.
echo ============================================================
echo   GOVIETSTAY - NORMAL DEPLOY VIA GITHUB -> VERCEL
echo ============================================================
echo.

if not exist "%PROJECT%\.git" (
  echo [ERROR] Git repository not found:
  echo   %PROJECT%
  echo.
  pause
  exit /b 1
)

cd /d "%PROJECT%"

echo [1/5] Checking current branch...
for /f "delims=" %%B in ('git branch --show-current') do set "BRANCH=%%B"

if "%BRANCH%"=="" (
  echo [ERROR] Could not detect current Git branch.
  pause
  exit /b 1
)

echo Current branch: %BRANCH%
echo.

echo [2/5] Running production build...
call npm run build
if errorlevel 1 (
  echo.
  echo [ERROR] Build failed. Nothing was pushed.
  echo.
  pause
  exit /b 1
)

echo.
echo [3/5] Adding changes to Git...
git add -A
if errorlevel 1 (
  echo.
  echo [ERROR] git add failed.
  pause
  exit /b 1
)

git diff --cached --quiet
if not errorlevel 1 (
  echo.
  echo No new file changes to commit.
  echo Checking whether local commits still need to be pushed...
) else (
  echo.
  echo [4/5] Creating commit...
  git commit -m "Add 6 Russian Phu Quoc SEO landing pages"
  if errorlevel 1 (
    echo.
    echo [ERROR] git commit failed.
    pause
    exit /b 1
  )
)

echo.
echo [5/5] Pushing to GitHub...
echo This will trigger the normal Vercel deployment connected to GitHub.
echo.
git push origin "%BRANCH%"

if errorlevel 1 (
  echo.
  echo [ERROR] git push failed.
  echo Send a screenshot of the error above.
  pause
  exit /b 1
)

echo.
echo ============================================================
echo   SUCCESS - PUSHED TO GITHUB
echo   VERCEL WILL DEPLOY AUTOMATICALLY
echo ============================================================
echo.
echo Check Vercel Deployments in 1-3 minutes.
echo.
echo New pages:
echo   https://www.govietstay.com/ru/phu-quoc/individualnye-ekskursii
echo   https://www.govietstay.com/ru/phu-quoc/gde-ostanovitsya
echo   https://www.govietstay.com/ru/phu-quoc/pervyy-raz
echo   https://www.govietstay.com/ru/phu-quoc/transport
echo   https://www.govietstay.com/ru/phu-quoc/snorkling
echo   https://www.govietstay.com/ru/phu-quoc/hon-thom
echo.
pause
exit /b 0
