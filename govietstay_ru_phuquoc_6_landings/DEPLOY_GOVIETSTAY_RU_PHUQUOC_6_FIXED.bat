@echo off
setlocal EnableExtensions EnableDelayedExpansion
title GoVietStay - Deploy 6 RU Phu Quoc Landings

echo.
echo ============================================================
echo   GoVietStay - Deploy 6 RU Phu Quoc Landing Pages
echo ============================================================
echo.

set "BUNDLE=%~dp0"
set "SOURCE=%BUNDLE%app\ru\phu-quoc"

if not exist "%SOURCE%\_shared\PhuQuocLanding.tsx" (
  echo [ERROR] Landing source files not found.
  echo Expected: %SOURCE%
  echo.
  pause
  exit /b 1
)

rem Auto-detect project root: parent of extracted bundle first
for %%I in ("%BUNDLE%..") do set "PARENT=%%~fI"

set "PROJECT="
if exist "%PARENT%\src\app" set "PROJECT=%PARENT%"
if exist "%PARENT%\app" set "PROJECT=%PARENT%"

rem If not found, ask manually
if not defined PROJECT (
  echo Could not auto-detect the GoVietStay project root.
  echo.
  set /p "PROJECT=Paste FULL project path: "
  set "PROJECT=!PROJECT:"=!"
)

if not exist "%PROJECT%" (
  echo.
  echo [ERROR] Project folder does not exist:
  echo %PROJECT%
  pause
  exit /b 1
)

if exist "%PROJECT%\src\app" (
  set "APPROOT=%PROJECT%\src\app"
) else if exist "%PROJECT%\app" (
  set "APPROOT=%PROJECT%\app"
) else (
  echo.
  echo [ERROR] Could not find src\app or app in:
  echo %PROJECT%
  pause
  exit /b 1
)

set "TARGET=%APPROOT%\ru\phu-quoc"

echo Project detected:
echo   %PROJECT%
echo.
echo Target:
echo   %TARGET%
echo.

if not exist "%TARGET%" mkdir "%TARGET%"

echo [1/2] Copying shared files...
robocopy "%SOURCE%\_shared" "%TARGET%\_shared" /E /R:1 /W:1 /NFL /NDL /NJH /NJS >nul
if !ERRORLEVEL! GEQ 8 (
  echo [ERROR] Could not copy shared files.
  pause
  exit /b 1
)

for %%D in (
  individualnye-ekskursii
  gde-ostanovitsya
  pervyy-raz
  transport
  snorkling
  hon-thom
) do (
  echo   - %%D
  if not exist "%TARGET%\%%D" mkdir "%TARGET%\%%D"
  robocopy "%SOURCE%\%%D" "%TARGET%\%%D" /E /R:1 /W:1 /NFL /NDL /NJH /NJS >nul
  if !ERRORLEVEL! GEQ 8 (
    echo [ERROR] Could not copy %%D
    pause
    exit /b 1
  )
)

echo.
echo [2/2] Copy complete.
echo.

choice /C YN /N /M "Deploy to Vercel Production now? [Y/N]: "
if errorlevel 2 goto DONE

where npx >nul 2>&1
if errorlevel 1 (
  echo.
  echo [ERROR] npx not found. Files were copied successfully.
  echo Deploy with your usual Vercel workflow.
  pause
  exit /b 1
)

cd /d "%PROJECT%"
echo.
echo Running Vercel Production deployment...
call npx vercel --prod

if errorlevel 1 (
  echo.
  echo [ERROR] Vercel deployment failed.
  echo Files are already copied into the project.
  pause
  exit /b 1
)

echo.
echo ============================================================
echo   SUCCESS - DEPLOYED TO VERCEL PRODUCTION
echo ============================================================
goto END

:DONE
echo.
echo Files copied successfully. Vercel deploy skipped.

:END
echo.
echo Routes:
echo https://www.govietstay.com/ru/phu-quoc/individualnye-ekskursii
echo https://www.govietstay.com/ru/phu-quoc/gde-ostanovitsya
echo https://www.govietstay.com/ru/phu-quoc/pervyy-raz
echo https://www.govietstay.com/ru/phu-quoc/transport
echo https://www.govietstay.com/ru/phu-quoc/snorkling
echo https://www.govietstay.com/ru/phu-quoc/hon-thom
echo.
echo After deploy, submit YANDEX_REINDEX_URLS.txt to Yandex Webmaster.
echo.
pause
exit /b 0
