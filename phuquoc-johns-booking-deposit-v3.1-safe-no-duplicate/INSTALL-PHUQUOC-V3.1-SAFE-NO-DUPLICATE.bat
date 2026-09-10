@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay - Phu Quoc V3.1 SAFE NO DUPLICATE

set "BASE=%~dp0"
set "SRC=%BASE%source-text"
set "ASSETS=%BASE%assets"
set "PROJECT="

for /f "delims=" %%I in ('git rev-parse --show-toplevel 2^>nul') do set "PROJECT=%%I"
if not defined PROJECT if exist "%USERPROFILE%\Documents\GitHub\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\Documents\GitHub\govietstay-main-website"
if not defined PROJECT if exist "%USERPROFILE%\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\govietstay-main-website"
if not defined PROJECT if exist "%USERPROFILE%\Desktop\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\Desktop\govietstay-main-website"

if not defined PROJECT (
  echo.
  echo [STOP] Could not find govietstay-main-website Git project.
  echo Run this BAT from your GoVietStay project or keep the project in Documents\GitHub.
  pause
  exit /b 1
)
if not exist "%PROJECT%\.git" (
  echo [STOP] Git project not found: %PROJECT%
  pause
  exit /b 1
)

if not exist "%SRC%\app\tours\phu-quoc\page.tsx.txt" (
  echo [STOP] Installer source is incomplete.
  pause
  exit /b 1
)

cls
echo ================================================================
echo  GOVIETSTAY PHU QUOC V3.1 - SAFE / NO DUPLICATE ROUTES
echo ================================================================
echo.
echo  Project: %PROJECT%
echo.
echo  THIS INSTALLER ONLY UPDATES TWO EXISTING PUBLIC PAGES:
echo    EN  https://www.govietstay.com/tours/phu-quoc
echo    RU  https://www.govietstay.com/ru/tours/phu-quoc
echo.
echo  It DOES NOT create /phu-quoc, /en/phu-quoc, /ru/phuquoc,
echo  /phu-quoc-tours or any other competing SEO route.
echo.

rem Guard: these two routes must already exist. We update in-place; never create duplicate public pages.
if not exist "%PROJECT%\app\tours\phu-quoc\page.tsx" (
  echo [STOP] Existing EN Phu Quoc route was not found.
  echo Refusing to create a new route because this installer is update-in-place only.
  pause
  exit /b 1
)
if not exist "%PROJECT%\app\ru\tours\phu-quoc\page.tsx" (
  echo [STOP] Existing RU Phu Quoc route was not found.
  echo Refusing to create a new route because this installer is update-in-place only.
  pause
  exit /b 1
)
echo [OK] Existing EN route found - will update in place.
echo [OK] Existing RU route found - will update in place.
echo.

for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%I"
set "BACKUP=%TEMP%\GVS-PHUQUOC-V31-BACKUP-!STAMP!"
mkdir "!BACKUP!\app\tours\phu-quoc" >nul 2>&1
mkdir "!BACKUP!\app\ru\tours\phu-quoc" >nul 2>&1
mkdir "!BACKUP!\app\api\phu-quoc-booking-request" >nul 2>&1
mkdir "!BACKUP!\components" >nul 2>&1
mkdir "!BACKUP!\lib" >nul 2>&1
mkdir "!BACKUP!\public\tour\phuquoc\johns" >nul 2>&1

copy /Y "%PROJECT%\app\tours\phu-quoc\page.tsx" "!BACKUP!\app\tours\phu-quoc\page.tsx" >nul
copy /Y "%PROJECT%\app\ru\tours\phu-quoc\page.tsx" "!BACKUP!\app\ru\tours\phu-quoc\page.tsx" >nul
if exist "%PROJECT%\app\api\phu-quoc-booking-request\route.ts" copy /Y "%PROJECT%\app\api\phu-quoc-booking-request\route.ts" "!BACKUP!\app\api\phu-quoc-booking-request\route.ts" >nul
if exist "%PROJECT%\components\PhuQuocJohnsCatalog.tsx" copy /Y "%PROJECT%\components\PhuQuocJohnsCatalog.tsx" "!BACKUP!\components\PhuQuocJohnsCatalog.tsx" >nul
if exist "%PROJECT%\lib\phuQuocPublishedRates.ts" copy /Y "%PROJECT%\lib\phuQuocPublishedRates.ts" "!BACKUP!\lib\phuQuocPublishedRates.ts" >nul
if exist "%PROJECT%\lib\phuQuocJohnsInternal.ts" copy /Y "%PROJECT%\lib\phuQuocJohnsInternal.ts" "!BACKUP!\lib\phuQuocJohnsInternal.ts" >nul
if exist "%PROJECT%\public\tour\phuquoc\johns\*.jpg" copy /Y "%PROJECT%\public\tour\phuquoc\johns\*.jpg" "!BACKUP!\public\tour\phuquoc\johns\" >nul

echo [1/5] Backup created outside project:
echo       !BACKUP!
echo.

rem Fix the exact error seen in V3: old installer packages contained .tsx files under site-files.
rem Next.js/TypeScript discovered those files because they were extracted inside the Git repo.
echo [2/5] Quarantining old Phu Quoc installer source folders from project root...
set "QUARCOUNT=0"
for /d %%D in ("%PROJECT%\phuquoc-johns-*") do (
  if exist "%%~fD\site-files" (
    set /a QUARCOUNT+=1
    set "QUAR=%TEMP%\GVS-PHUQUOC-OLD-PACKAGE-!STAMP!-!QUARCOUNT!"
    echo       Moving: %%~fD
    move "%%~fD" "!QUAR!" >nul 2>&1
    if errorlevel 1 (
      echo [STOP] Could not move old package out of the project:
      echo        %%~fD
      echo Close Explorer/terminal windows using that folder and run V3.1 again.
      pause
      exit /b 1
    )
    echo       To: !QUAR!
  )
)
if "!QUARCOUNT!"=="0" echo       No old site-files package found inside project root.
echo.

rem Create only non-page support folders. The two page route folders already exist by guard above.
if not exist "%PROJECT%\app\api\phu-quoc-booking-request" mkdir "%PROJECT%\app\api\phu-quoc-booking-request"
if not exist "%PROJECT%\public\tour\phuquoc\johns" mkdir "%PROJECT%\public\tour\phuquoc\johns"

rem Installer sources are .txt on purpose. They are renamed to .ts/.tsx ONLY at the real app destinations.
echo [3/5] Installing shared Phu Quoc catalog, pricing and booking flow...
copy /Y "%SRC%\app\tours\phu-quoc\page.tsx.txt" "%PROJECT%\app\tours\phu-quoc\page.tsx" >nul || goto COPY_FAIL
copy /Y "%SRC%\app\ru\tours\phu-quoc\page.tsx.txt" "%PROJECT%\app\ru\tours\phu-quoc\page.tsx" >nul || goto COPY_FAIL
copy /Y "%SRC%\components\PhuQuocJohnsCatalog.tsx.txt" "%PROJECT%\components\PhuQuocJohnsCatalog.tsx" >nul || goto COPY_FAIL
copy /Y "%SRC%\lib\phuQuocPublishedRates.ts.txt" "%PROJECT%\lib\phuQuocPublishedRates.ts" >nul || goto COPY_FAIL
copy /Y "%SRC%\lib\phuQuocJohnsInternal.ts.txt" "%PROJECT%\lib\phuQuocJohnsInternal.ts" >nul || goto COPY_FAIL
copy /Y "%SRC%\app\api\phu-quoc-booking-request\route.ts.txt" "%PROJECT%\app\api\phu-quoc-booking-request\route.ts" >nul || goto COPY_FAIL
copy /Y "%ASSETS%\public\tour\phuquoc\johns\*.jpg" "%PROJECT%\public\tour\phuquoc\johns\" >nul || goto COPY_FAIL

echo       EN import depth: ../../../components/PhuQuocJohnsCatalog

echo       RU import depth: ../../../../components/PhuQuocJohnsCatalog

echo       RU JsonLd depth: ../../../../components/JsonLd

echo.

echo [4/5] Production build check...
pushd "%PROJECT%"
call npm run build
set "BUILD_RC=!ERRORLEVEL!"
popd
if not "!BUILD_RC!"=="0" goto BUILD_FAIL

echo.
echo [5/5] Build passed. Showing ONLY Phu Quoc V3.1 target changes:
git -C "%PROJECT%" status --short -- ^
  "app/tours/phu-quoc/page.tsx" ^
  "app/ru/tours/phu-quoc/page.tsx" ^
  "components/PhuQuocJohnsCatalog.tsx" ^
  "lib/phuQuocPublishedRates.ts" ^
  "lib/phuQuocJohnsInternal.ts" ^
  "app/api/phu-quoc-booking-request/route.ts" ^
  "public/tour/phuquoc/johns"

echo.
echo ================================================================
echo  SUCCESS - V3.1 BUILD PASSED / NOTHING PUSHED
echo ================================================================
echo.
echo  Existing URL updated in place:
echo    EN: /tours/phu-quoc
echo    RU: /ru/tours/phu-quoc
echo.
echo  NO duplicate public route was created.
echo  Join-in price = John's Tours Published Rate.
echo  Supplier net + commission = internal only.
echo  Private tours = quote/contact.
echo  Booking request = Pending first; deposit link after confirmation.
echo.
echo  Backup: !BACKUP!
echo  This installer does NOT commit or push production.
echo.
pause
exit /b 0

:COPY_FAIL
echo.
echo [STOP] Could not copy one or more V3.1 files.
echo Backup: !BACKUP!
echo Nothing was pushed.
pause
exit /b 1

:BUILD_FAIL
echo.
echo ================================================================
echo  [STOP] BUILD FAILED - NOTHING PUSHED
echo ================================================================
echo.
echo  Backup: !BACKUP!
echo  The old nested site-files package has been moved outside the repo.
echo  If another TypeScript error is shown above, send that screenshot to ChatGPT.
echo.
pause
exit /b 1
