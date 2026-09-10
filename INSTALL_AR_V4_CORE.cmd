@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay Arabic V4 - 7 Landing Pages Build
cd /d "%~dp0"

set "LOG=%~dp0install-ar-v4.log"
echo GoVietStay Arabic V4 started at %date% %time% > "%LOG%"

echo.
echo =============================================================
echo   GOVIETSTAY ARABIC V4 - 7 LANDING PAGES + SEO + TOUR SALES
echo =============================================================
echo.

if not exist "package.json" (
  echo [ERROR] package.json was not found.
  echo Copy this BAT into the ROOT GoVietStay folder where package.json and app exist.
  echo [ERROR] package.json missing. >> "%LOG%"
  goto :failed
)
if not exist "app" (
  echo [ERROR] app folder was not found. This package requires Next.js App Router.
  echo [ERROR] app folder missing. >> "%LOG%"
  goto :failed
)
if not exist "payload\app\ar\page.tsx" (
  echo [ERROR] Embedded Arabic V4 payload is missing.
  echo [ERROR] payload missing. >> "%LOG%"
  goto :failed
)
if not exist "payload\app\ar\phu-quoc-tours\page.tsx" (
  echo [ERROR] Phu Quoc tour catalogue is missing from payload.
  goto :failed
)
if not exist "payload\app\ar\da-nang-hoi-an-tours\page.tsx" (
  echo [ERROR] Da Nang - Hoi An tour catalogue is missing from payload.
  goto :failed
)

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not available in PATH.
  echo Install Node.js LTS and restart Windows.
  goto :failed
)
where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm is not available in PATH.
  goto :failed
)

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd_HHmmss"') do set "STAMP=%%i"
if not defined STAMP set "STAMP=manual_backup"
set "BACKUP=_govietstay_backups\AR_V4_%STAMP%"

echo [1/5] Creating safety backup...
echo Backup: %BACKUP% >> "%LOG%"
if exist "app\ar" (
  mkdir "%BACKUP%\app" >nul 2>nul
  xcopy "app\ar" "%BACKUP%\app\ar\" /E /I /H /Y >> "%LOG%" 2>&1
)
if exist "public\ar-assets" (
  mkdir "%BACKUP%\public" >nul 2>nul
  xcopy "public\ar-assets" "%BACKUP%\public\ar-assets\" /E /I /H /Y >> "%LOG%" 2>&1
)

echo [2/5] Installing Arabic V4 pages...
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

echo [3/5] Checking required package lucide-react...
call npm list lucide-react --depth=0 >> "%LOG%" 2>&1
if errorlevel 1 (
  echo lucide-react is missing. Installing it now...
  call npm install lucide-react >> "%LOG%" 2>&1
  if errorlevel 1 (
    echo [ERROR] Could not install lucide-react.
    goto :failed
  )
)

echo [4/5] Building Next.js website...
echo npm run build >> "%LOG%"
call npm run build >> "%LOG%" 2>&1
if errorlevel 1 (
  echo.
  echo [ERROR] BUILD FAILED. Nothing was deployed.
  echo Send this file to ChatGPT: install-ar-v4.log
  goto :failed
)

echo [5/5] BUILD PASSED - Arabic V4 installed successfully.
echo [SUCCESS] Build passed at %date% %time% >> "%LOG%"
echo.
echo =============================================================
echo   ARABIC V4 READY
echo =============================================================
echo   Main hub:
echo     /ar
echo.
echo   Private planning / SEO pages:
echo     /ar/halal-travel-vietnam
echo     /ar/da-nang-hoi-an-private-tour
echo     /ar/phu-quoc-family-tour
echo     /ar/vietnam-11-day-itinerary
echo     /ar/vietnam-family-private-tour
echo.
echo   NEW direct-booking tour pages:
echo     /ar/phu-quoc-tours
echo     /ar/da-nang-hoi-an-tours
echo.
echo   Backup: %BACKUP%
echo   Log:    install-ar-v4.log
echo =============================================================
echo.

where git >nul 2>nul
if errorlevel 1 goto :done
if not exist ".git" goto :done

choice /C YN /N /M "Build PASSED. Push Arabic V4 to GitHub now? [Y/N]: "
if errorlevel 2 goto :done

echo.
echo Adding only Arabic V4 files to Git...
git add app/ar public/ar-assets >> "%LOG%" 2>&1
if errorlevel 1 (
  echo [WARNING] Git add failed. Build is still successful.
  goto :done
)

git diff --cached --quiet
if not errorlevel 1 (
  echo No new Arabic changes to commit. Trying git push anyway...
  git push >> "%LOG%" 2>&1
  goto :push_result
)

git commit -m "Upgrade Arabic hub V4 with seven landing pages" >> "%LOG%" 2>&1
if errorlevel 1 (
  echo [WARNING] Git commit did not finish. Build is still successful.
  goto :done
)

git push >> "%LOG%" 2>&1

:push_result
if errorlevel 1 (
  echo [WARNING] Git push failed. Arabic V4 is built locally and safe.
  echo Open install-ar-v4.log if you want to inspect Git output.
) else (
  echo [SUCCESS] Git push completed. Vercel can deploy from GitHub.
)

goto :done

:failed
echo.
echo =============================================================
echo   INSTALLER STOPPED SAFELY
echo =============================================================
echo The old Arabic version was backed up before overwrite when possible.
echo Log file: %LOG%
echo.
pause
exit /b 1

:done
echo.
echo DONE. The terminal will stay open so you can read the result.
echo After deployment test:
echo https://www.govietstay.com/ar

echo https://www.govietstay.com/ar/phu-quoc-tours
echo https://www.govietstay.com/ar/da-nang-hoi-an-tours
echo.
pause
exit /b 0
