@echo off
setlocal EnableExtensions
title GoVietStay - Vercel Login and Deploy
chcp 65001 >nul

echo.
echo ============================================================
echo   GOVIETSTAY - VERCEL LOGIN + PRODUCTION DEPLOY
echo ============================================================
echo.

set "PROJECT=C:\Users\ADMIN\Documents\GitHub\govietstay-main-website"

if not exist "%PROJECT%\package.json" (
  echo [ERROR] Project not found:
  echo   %PROJECT%
  echo.
  set /p "PROJECT=Paste FULL path to govietstay-main-website: "
  set "PROJECT=%PROJECT:"=%"
)

if not exist "%PROJECT%\package.json" (
  echo.
  echo [ERROR] package.json not found.
  pause
  exit /b 1
)

cd /d "%PROJECT%"

echo Checking Vercel login...
call npx vercel whoami >nul 2>&1

if errorlevel 1 (
  echo.
  echo Vercel is not logged in on this computer.
  echo A browser/login flow will open now.
  echo.
  call npx vercel login
  if errorlevel 1 (
    echo.
    echo [ERROR] Vercel login was not completed.
    pause
    exit /b 1
  )
)

echo.
echo Login OK.
echo Deploying GoVietStay to Vercel Production...
echo.

call npx vercel --prod --yes

if errorlevel 1 (
  echo.
  echo [ERROR] Production deploy failed.
  echo Please send me a screenshot of the error above.
  pause
  exit /b 1
)

echo.
echo ============================================================
echo   SUCCESS - PRODUCTION DEPLOY COMPLETE
echo ============================================================
echo.
echo Check:
echo   https://www.govietstay.com/ru/phu-quoc/individualnye-ekskursii
echo   https://www.govietstay.com/ru/phu-quoc/gde-ostanovitsya
echo   https://www.govietstay.com/ru/phu-quoc/pervyy-raz
echo   https://www.govietstay.com/ru/phu-quoc/transport
echo   https://www.govietstay.com/ru/phu-quoc/snorkling
echo   https://www.govietstay.com/ru/phu-quoc/hon-thom
echo.
pause
