@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay Arabic Hub Installer

cd /d "%~dp0"

echo.
echo =====================================================
echo   GOVIETSTAY ARABIC HUB - SAFE INSTALLER
echo   Main page: /ar + 5 Arabic landing pages
echo =====================================================
echo.

if not exist "package.json" (
  echo [ERROR] package.json was not found.
  echo.
  echo Extract this ZIP directly into the ROOT folder of your
  echo GoVietStay Next.js project, then run this BAT file again.
  echo.
  pause
  exit /b 1
)

if not exist "app" (
  echo [ERROR] The app folder was not found.
  echo This installer requires a Next.js App Router project.
  pause
  exit /b 1
)

if not exist "payload\app\ar\page.tsx" (
  echo [ERROR] Installer payload is missing. Please extract the ZIP again.
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or not available in PATH.
  echo Install Node.js LTS, restart Windows, then run this file again.
  pause
  exit /b 1
)

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd_HHmmss"') do set "STAMP=%%i"
set "BACKUP=_govietstay_backups\AR_%STAMP%"

echo [1/5] Creating a safety backup...
if exist "app\ar" (
  mkdir "%BACKUP%\app" >nul 2>nul
  xcopy "app\ar" "%BACKUP%\app\ar\" /E /I /H /Y >nul
)
if exist "public\ar-assets" (
  mkdir "%BACKUP%\public" >nul 2>nul
  xcopy "public\ar-assets" "%BACKUP%\public\ar-assets\" /E /I /H /Y >nul
)

echo [2/5] Installing the Arabic hub and five child pages...
if not exist "app\ar" mkdir "app\ar"
if not exist "public\ar-assets" mkdir "public\ar-assets"
xcopy "payload\app\ar" "app\ar\" /E /I /H /Y >nul
if errorlevel 1 goto :copy_failed
xcopy "payload\public\ar-assets" "public\ar-assets\" /E /I /H /Y >nul
if errorlevel 1 goto :copy_failed

echo [3/5] Checking required icon package...
npm list lucide-react --depth=0 >nul 2>nul
if errorlevel 1 (
  echo Installing lucide-react...
  call npm install lucide-react
  if errorlevel 1 goto :dependency_failed
)

echo [4/5] Building the website...
call npm run build
if errorlevel 1 goto :build_failed

echo [5/5] Installation completed successfully.
echo.
echo Arabic main page: /ar
echo Five child landing pages are installed below /ar/...
echo Backup folder: %BACKUP%
echo.
choice /C YN /N /M "Deploy to Vercel production now? [Y/N]: "
if errorlevel 2 goto :done

where vercel >nul 2>nul
if errorlevel 1 (
  echo Vercel CLI is not installed. Starting with npx...
  call npx vercel --prod
) else (
  call vercel --prod
)
if errorlevel 1 (
  echo.
  echo [WARNING] The files are installed, but Vercel deployment did not finish.
  echo You can deploy again later with: npx vercel --prod
  pause
  exit /b 1
)

:done
echo.
echo Done. Open https://www.govietstay.com/ar after deployment.
pause
exit /b 0

:copy_failed
echo.
echo [ERROR] Could not copy the Arabic pages.
echo Existing files, if any, were saved in: %BACKUP%
pause
exit /b 1

:dependency_failed
echo.
echo [ERROR] Could not install lucide-react.
echo Check your internet connection and run the installer again.
pause
exit /b 1

:build_failed
echo.
echo [ERROR] The website build failed, so deployment was stopped.
echo Your previous Arabic files are preserved in: %BACKUP%
echo Send the error screenshot to me and I will correct it.
pause
exit /b 1
