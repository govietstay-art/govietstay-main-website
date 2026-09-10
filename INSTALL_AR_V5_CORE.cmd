@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay Arabic V5 - 7 Landing Pages Build
cd /d "%~dp0"

set "LOG=%~dp0install-ar-v5.log"
echo GoVietStay Arabic V5 started at %date% %time% > "%LOG%"

echo.
echo =============================================================
echo   GOVIETSTAY ARABIC V5 - 7 LANDING PAGES + OFFICIAL GOVIETSTAY TOUR IMAGES
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
  echo [ERROR] Embedded Arabic V5 payload is missing.
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
set "BACKUP=_govietstay_backups\AR_V5_%STAMP%"

echo [1/6] Verifying official GoVietStay tour images...
set "MISSING_IMG=0"
for %%F in (
  "public\tour\bana.jpg"
  "public\tour\hoian.jpg"
  "public\tour\hoianmemories.jpg"
  "public\tour\hue.jpg"
  "public\tour\huebytrain.jpg"
  "public\tour\marble.jpg"
  "public\tour\coconut.jpg"
  "public\tour\cham.jpg"
  "public\tour\hoaphuthanh.jpg"
  "public\tour\haivan.jpg"
  "public\tour\food.jpg"
  "public\tour\cruise.jpg"
  "public\tour\ATV.jpg"
  "public\tour\Nui Than Tai.jpg"
  "public\tour\phuquoc\tour-01-1.jpg"
  "public\tour\phuquoc\tour-02-1.jpg"
  "public\tour\phuquoc\tour-03-1.jpg"
  "public\tour\phuquoc\tour-04-1.jpg"
  "public\tour\phuquoc\tour-05-1.jpg"
  "public\tour\phuquoc\tour-06-1.jpg"
  "public\tour\phuquoc\tour-07-1.jpg"
  "public\tour\phuquoc\tour-08-1.jpg"
  "public\tour\phuquoc\tour-09-1.jpg"
  "public\tour\phuquoc\tour-10-1.jpg"
) do (
  if not exist "%%~F" (
    echo [MISSING IMAGE] %%~F
    echo [MISSING IMAGE] %%~F >> "%LOG%"
    set "MISSING_IMG=1"
  )
)
if "%MISSING_IMG%"=="1" (
  echo.
  echo [ERROR] One or more official images used by govietstay.com are missing in this local project.
  echo Nothing will be built with wrong fallback images.
  echo Please send install-ar-v5.log to ChatGPT.
  goto :failed
)
echo [OK] Official image library found. >> "%LOG%"

echo [2/6] Creating safety backup...
echo Backup: %BACKUP% >> "%LOG%"
if exist "app\ar" (
  mkdir "%BACKUP%\app" >nul 2>nul
  xcopy "app\ar" "%BACKUP%\app\ar\" /E /I /H /Y >> "%LOG%" 2>&1
)
if exist "public\ar-assets" (
  mkdir "%BACKUP%\public" >nul 2>nul
  xcopy "public\ar-assets" "%BACKUP%\public\ar-assets\" /E /I /H /Y >> "%LOG%" 2>&1
)

echo [3/6] Installing Arabic V5 pages...
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

echo [4/6] Checking required package lucide-react...
call npm list lucide-react --depth=0 >> "%LOG%" 2>&1
if errorlevel 1 (
  echo lucide-react is missing. Installing it now...
  call npm install lucide-react >> "%LOG%" 2>&1
  if errorlevel 1 (
    echo [ERROR] Could not install lucide-react.
    goto :failed
  )
)

echo [5/6] Building Next.js website...
echo npm run build >> "%LOG%"
call npm run build >> "%LOG%" 2>&1
if errorlevel 1 (
  echo.
  echo [ERROR] BUILD FAILED. Nothing was deployed.
  echo Send this file to ChatGPT: install-ar-v5.log
  goto :failed
)

echo [6/6] BUILD PASSED - Arabic V5 installed successfully.
echo [SUCCESS] Build passed at %date% %time% >> "%LOG%"
echo.
echo =============================================================
echo   ARABIC V5 READY
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
echo   Log:    install-ar-v5.log
echo =============================================================
echo.

where git >nul 2>nul
if errorlevel 1 goto :done
if not exist ".git" goto :done

choice /C YN /N /M "Build PASSED. Push Arabic V5 to GitHub now? [Y/N]: "
if errorlevel 2 goto :done

echo.
echo Adding only Arabic V5 files to Git...
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

git commit -m "Arabic V5 use official GoVietStay tour images" >> "%LOG%" 2>&1
if errorlevel 1 (
  echo [WARNING] Git commit did not finish. Build is still successful.
  goto :done
)

git push >> "%LOG%" 2>&1

:push_result
if errorlevel 1 (
  echo [WARNING] Git push failed. Arabic V5 is built locally and safe.
  echo Open install-ar-v5.log if you want to inspect Git output.
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
