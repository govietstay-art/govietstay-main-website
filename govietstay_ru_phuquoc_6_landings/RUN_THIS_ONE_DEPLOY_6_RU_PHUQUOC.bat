@echo off
setlocal EnableExtensions EnableDelayedExpansion
title RUN THIS ONE - GoVietStay 6 RU Phu Quoc Pages

set "HERE=%~dp0"
for %%I in ("%HERE%..") do set "PROJECT=%%~fI"

echo.
echo ============================================================
echo   RUN THIS ONE - GOVIETSTAY 6 RU PHU QUOC LANDING PAGES
echo ============================================================
echo.
echo Project:
echo   %PROJECT%
echo.

if exist "%PROJECT%\src\app" (
  set "APPROOT=%PROJECT%\src\app"
) else if exist "%PROJECT%\app" (
  set "APPROOT=%PROJECT%\app"
) else (
  echo [ERROR] Cannot find src\app or app in parent project.
  echo Expected this folder to be inside:
  echo   C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\
  echo.
  pause
  exit /b 1
)

set "SOURCE=%HERE%app\ru\phu-quoc"
set "TARGET=%APPROOT%\ru\phu-quoc"

if not exist "%SOURCE%\_shared\PhuQuocLanding.tsx" (
  echo [ERROR] Source landing files are missing from this package.
  pause
  exit /b 1
)

echo App root:
echo   %APPROOT%
echo.
echo Copying pages...
echo.

if not exist "%TARGET%" mkdir "%TARGET%"

robocopy "%SOURCE%\_shared" "%TARGET%\_shared" /E /R:1 /W:1 /NFL /NDL /NJH /NJS >nul
if !ERRORLEVEL! GEQ 8 goto COPYERROR

for %%D in (
  individualnye-ekskursii
  gde-ostanovitsya
  pervyy-raz
  transport
  snorkling
  hon-thom
) do (
  echo   [OK] %%D
  if not exist "%TARGET%\%%D" mkdir "%TARGET%\%%D"
  robocopy "%SOURCE%\%%D" "%TARGET%\%%D" /E /R:1 /W:1 /NFL /NDL /NJH /NJS >nul
  if !ERRORLEVEL! GEQ 8 goto COPYERROR
)

echo.
echo [OK] All 6 pages copied into the real GoVietStay project.
echo.

cd /d "%PROJECT%"

where npx >nul 2>&1
if errorlevel 1 (
  echo [ERROR] npx is not installed or not in PATH.
  echo Pages are copied successfully. Deploy using your normal Vercel method.
  pause
  exit /b 1
)

echo Deploying to Vercel Production...
echo.
call npx vercel --prod

if errorlevel 1 (
  echo.
  echo [ERROR] Vercel deploy failed.
  echo The 6 pages are already copied into the project.
  pause
  exit /b 1
)

echo.
echo ============================================================
echo   SUCCESS - DEPLOYMENT COMPLETE
echo ============================================================
echo.
echo Check these URLs:
echo   https://www.govietstay.com/ru/phu-quoc/individualnye-ekskursii
echo   https://www.govietstay.com/ru/phu-quoc/gde-ostanovitsya
echo   https://www.govietstay.com/ru/phu-quoc/pervyy-raz
echo   https://www.govietstay.com/ru/phu-quoc/transport
echo   https://www.govietstay.com/ru/phu-quoc/snorkling
echo   https://www.govietstay.com/ru/phu-quoc/hon-thom
echo.
echo Then submit YANDEX_REINDEX_URLS.txt in Yandex Webmaster.
echo.
pause
exit /b 0

:COPYERROR
echo.
echo [ERROR] Copy failed.
pause
exit /b 1
