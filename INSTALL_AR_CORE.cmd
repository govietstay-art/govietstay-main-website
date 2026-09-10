@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay Arabic Hub Installer V3

cd /d "%~dp0"
set "LOG=%~dp0install-ar.log"
echo GoVietStay Arabic installer started at %date% %time% > "%LOG%"

echo.
echo =====================================================
echo   GOVIETSTAY ARABIC HUB INSTALLER V3
echo   The window will remain open if an error occurs.
echo =====================================================
echo.

if not exist "package.json" (
  echo [ERROR] package.json was not found.
  echo [ERROR] package.json was not found. >> "%LOG%"
  echo.
  echo Extract ALL files from this ZIP directly into the ROOT
  echo folder of your GoVietStay project, then run RUN_INSTALL.bat.
  echo The correct folder must contain package.json and app.
  goto :failed
)

if not exist "app" (
  echo [ERROR] The app folder was not found.
  echo [ERROR] The app folder was not found. >> "%LOG%"
  echo This package requires a Next.js App Router project.
  goto :failed
)

if not exist "payload\app\ar\page.tsx" (
  echo [ERROR] Installer payload is missing.
  echo [ERROR] Installer payload is missing. >> "%LOG%"
  echo Extract the complete ZIP again before running this installer.
  goto :failed
)

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not available in Windows PATH.
  echo [ERROR] Node.js is missing from PATH. >> "%LOG%"
  echo Install Node.js LTS, restart Windows, then try again.
  goto :failed
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm is not available in Windows PATH.
  echo [ERROR] npm is missing from PATH. >> "%LOG%"
  goto :failed
)

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd_HHmmss"') do set "STAMP=%%i"
if not defined STAMP set "STAMP=manual_backup"
set "BACKUP=_govietstay_backups\AR_%STAMP%"

echo [1/5] Creating a safety backup...
echo [1/5] Backup: %BACKUP% >> "%LOG%"
if exist "app\ar" (
  mkdir "%BACKUP%\app" >nul 2>nul
  xcopy "app\ar" "%BACKUP%\app\ar\" /E /I /H /Y >> "%LOG%" 2>&1
)
if exist "public\ar-assets" (
  mkdir "%BACKUP%\public" >nul 2>nul
  xcopy "public\ar-assets" "%BACKUP%\public\ar-assets\" /E /I /H /Y >> "%LOG%" 2>&1
)

echo [2/5] Copying /ar and five child landing pages...
echo [2/5] Copying files. >> "%LOG%"
if not exist "app\ar" mkdir "app\ar"
if not exist "public\ar-assets" mkdir "public\ar-assets"
xcopy "payload\app\ar" "app\ar\" /E /I /H /Y >> "%LOG%" 2>&1
if errorlevel 1 (
  echo [ERROR] Could not copy app\ar.
  goto :failed
)
xcopy "payload\public\ar-assets" "public\ar-assets\" /E /I /H /Y >> "%LOG%" 2>&1
if errorlevel 1 (
  echo [ERROR] Could not copy public\ar-assets.
  goto :failed
)

echo [3/5] Checking required package...
call npm list lucide-react --depth=0 >> "%LOG%" 2>&1
if errorlevel 1 (
  echo Installing lucide-react. This may take a moment...
  call npm install lucide-react >> "%LOG%" 2>&1
  if errorlevel 1 (
    echo [ERROR] Could not install lucide-react.
    goto :failed
  )
)

echo [4/5] Building the website...
echo [4/5] npm run build >> "%LOG%"
call npm run build >> "%LOG%" 2>&1
if errorlevel 1 (
  echo [ERROR] Website build failed. Deployment was stopped.
  echo Send install-ar.log to Codex so the exact error can be corrected.
  goto :failed
)

echo [5/5] Installation completed successfully.
echo [SUCCESS] Installation completed. >> "%LOG%"
echo.
echo Main Arabic page: /ar
echo Backup folder: %BACKUP%
echo Log file: install-ar.log
echo.
choice /C YN /N /M "Deploy to Vercel production now? [Y/N]: "
if errorlevel 2 goto :success

echo Deploying to Vercel...
echo Deploying to Vercel. >> "%LOG%"
where vercel >nul 2>nul
if errorlevel 1 (
  call npx vercel --prod >> "%LOG%" 2>&1
) else (
  call vercel --prod >> "%LOG%" 2>&1
)
if errorlevel 1 (
  echo [WARNING] Installation succeeded, but Vercel deployment did not finish.
  echo Run npx vercel --prod later, or send install-ar.log to Codex.
  goto :failed
)

:success
echo.
echo DONE. The Arabic hub is ready.
echo After deployment, open: https://www.govietstay.com/ar
echo.
pause
exit /b 0

:failed
echo.
echo The installer stopped safely.
echo Read or send this file for support:
echo %LOG%
echo.
pause
exit /b 1
