@echo off
setlocal EnableExtensions EnableDelayedExpansion
title GoVietStay - 6 RU Phu Quoc - COPY BUILD DEPLOY

echo.
echo ============================================================
echo   GOVIETSTAY - 6 RU PHU QUOC LANDINGS
echo   COPY + BUILD + VERCEL PRODUCTION DEPLOY
echo ============================================================
echo.

set "PACK=%~dp0"
for %%I in ("%PACK%..") do set "PROJECT=%%~fI"

rem If this package is not directly inside the project, ask for the project path.
if not exist "%PROJECT%\package.json" (
  echo Project was not auto-detected.
  echo.
  set /p "PROJECT=Paste FULL path to govietstay-main-website: "
  set "PROJECT=!PROJECT:"=!"
)

if not exist "%PROJECT%\package.json" (
  echo.
  echo [ERROR] package.json not found in:
  echo   %PROJECT%
  echo.
  pause
  exit /b 1
)

if exist "%PROJECT%\src\app" (
  set "APPROOT=%PROJECT%\src\app"
) else if exist "%PROJECT%\app" (
  set "APPROOT=%PROJECT%\app"
) else (
  echo.
  echo [ERROR] Cannot find src\app or app in:
  echo   %PROJECT%
  echo.
  pause
  exit /b 1
)

set "SOURCE=%PACK%app\ru\phu-quoc"
set "TARGET=%APPROOT%\ru\phu-quoc"

if not exist "%SOURCE%\_shared\PhuQuocLanding.tsx" (
  echo.
  echo [ERROR] Package source files are missing.
  echo Expected:
  echo   %SOURCE%
  echo.
  pause
  exit /b 1
)

echo Project:
echo   %PROJECT%
echo.
echo App root:
echo   %APPROOT%
echo.
echo Target:
echo   %TARGET%
echo.

if not exist "%TARGET%" mkdir "%TARGET%"

echo [1/3] Copying 6 landing pages...

robocopy "%SOURCE%\_shared" "%TARGET%\_shared" /E /R:1 /W:1 /NFL /NDL /NJH /NJS >nul
if !ERRORLEVEL! GEQ 8 goto COPYFAIL

for %%D in (
  individualnye-ekskursii
  gde-ostanovitsya
  pervyy-raz
  transport
  snorkling
  hon-thom
) do (
  if not exist "%TARGET%\%%D" mkdir "%TARGET%\%%D"
  robocopy "%SOURCE%\%%D" "%TARGET%\%%D" /E /R:1 /W:1 /NFL /NDL /NJH /NJS >nul
  if !ERRORLEVEL! GEQ 8 goto COPYFAIL
  echo   [OK] %%D
)

echo.
echo [2/3] Running production build...
cd /d "%PROJECT%"
call npm run build
if errorlevel 1 (
  echo.
  echo [ERROR] Build failed. Vercel deploy was NOT started.
  echo The 6 pages were copied into the project.
  echo.
  pause
  exit /b 1
)

echo.
echo [3/3] Deploying to Vercel Production...
call npx vercel --prod --yes
if errorlevel 1 (
  echo.
  echo [ERROR] Vercel deploy failed.
  echo Build passed and files are already in the project.
  echo.
  pause
  exit /b 1
)

echo.
echo ============================================================
echo   SUCCESS
echo ============================================================
echo.
echo Live routes:
echo   https://www.govietstay.com/ru/phu-quoc/individualnye-ekskursii
echo   https://www.govietstay.com/ru/phu-quoc/gde-ostanovitsya
echo   https://www.govietstay.com/ru/phu-quoc/pervyy-raz
echo   https://www.govietstay.com/ru/phu-quoc/transport
echo   https://www.govietstay.com/ru/phu-quoc/snorkling
echo   https://www.govietstay.com/ru/phu-quoc/hon-thom
echo.
echo Next: submit YANDEX_REINDEX_URLS.txt in Yandex Webmaster.
echo.
pause
exit /b 0

:COPYFAIL
echo.
echo [ERROR] Copy failed.
echo.
pause
exit /b 1
