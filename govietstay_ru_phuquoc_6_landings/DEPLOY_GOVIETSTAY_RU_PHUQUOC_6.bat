@echo off
setlocal EnableExtensions EnableDelayedExpansion
title GoVietStay - Deploy 6 RU Phu Quoc Landing Pages
chcp 65001 >nul

echo.
echo ============================================================
echo   GoVietStay - Deploy 6 Russian Phu Quoc Landing Pages
echo ============================================================
echo.
echo This script will:
echo   1. Ask for your GoVietStay project folder
echo   2. Detect app\ or src\app\
echo   3. Copy the 6 landing pages + shared component
echo   4. Optionally deploy to Vercel Production
echo.
echo Routes:
echo   /ru/phu-quoc/individualnye-ekskursii
echo   /ru/phu-quoc/gde-ostanovitsya
echo   /ru/phu-quoc/pervyy-raz
echo   /ru/phu-quoc/transport
echo   /ru/phu-quoc/snorkling
echo   /ru/phu-quoc/hon-thom
echo.
pause

set "BUNDLE=%~dp0"
set "SOURCE=%BUNDLE%app\ru\phu-quoc"

if not exist "%SOURCE%\_shared\PhuQuocLanding.tsx" (
    echo.
    echo [ERROR] Source files were not found next to this .bat file.
    echo Expected:
    echo   %SOURCE%
    echo.
    pause
    exit /b 1
)

echo.
set /p "PROJECT=Paste the FULL PATH to your GoVietStay project folder: "

if "%PROJECT%"=="" (
    echo.
    echo [ERROR] No project folder entered.
    pause
    exit /b 1
)

set "PROJECT=%PROJECT:"=%"

if not exist "%PROJECT%" (
    echo.
    echo [ERROR] Folder does not exist:
    echo   %PROJECT%
    pause
    exit /b 1
)

if exist "%PROJECT%\src\app" (
    set "APPROOT=%PROJECT%\src\app"
) else if exist "%PROJECT%\app" (
    set "APPROOT=%PROJECT%\app"
) else (
    echo.
    echo [ERROR] Could not find Next.js App Router folder.
    echo Expected one of:
    echo   %PROJECT%\src\app
    echo   %PROJECT%\app
    echo.
    pause
    exit /b 1
)

set "TARGET=%APPROOT%\ru\phu-quoc"

echo.
echo Project:
echo   %PROJECT%
echo App root:
echo   %APPROOT%
echo Target:
echo   %TARGET%
echo.

if not exist "%TARGET%" mkdir "%TARGET%"

echo [1/2] Copying shared landing component...
robocopy "%SOURCE%\_shared" "%TARGET%\_shared" /E /R:1 /W:1 /NFL /NDL /NJH /NJS >nul
set "RC=%ERRORLEVEL%"
if %RC% GEQ 8 (
    echo [ERROR] Failed to copy _shared files. Robocopy code: %RC%
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
    echo     Copying %%D...
    if not exist "%TARGET%\%%D" mkdir "%TARGET%\%%D"
    robocopy "%SOURCE%\%%D" "%TARGET%\%%D" /E /R:1 /W:1 /NFL /NDL /NJH /NJS >nul
    set "RC=!ERRORLEVEL!"
    if !RC! GEQ 8 (
        echo [ERROR] Failed to copy %%D. Robocopy code: !RC!
        pause
        exit /b 1
    )
)

echo.
echo [2/2] Files copied successfully.
echo.
echo IMPORTANT:
echo   - If your sitemap is generated automatically, no manual change is needed.
echo   - If you maintain sitemap.xml manually, add the 6 new URLs.
echo   - After production deploy, submit YANDEX_REINDEX_URLS.txt in Yandex Webmaster.
echo.

choice /C YN /N /M "Deploy to Vercel Production now? [Y/N]: "
if errorlevel 2 goto NODEPLOY

where npx >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js / npx is not available on this computer.
    echo Files were copied, but Vercel deploy was NOT run.
    echo Install Node.js or deploy from your usual workflow.
    echo.
    pause
    exit /b 1
)

cd /d "%PROJECT%"

echo.
echo Running: npx vercel --prod
echo.
call npx vercel --prod
if errorlevel 1 (
    echo.
    echo [ERROR] Vercel deploy returned an error.
    echo The files are already copied into the project.
    echo Fix the Vercel error and run your normal deploy again.
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   SUCCESS - 6 RU Phu Quoc landing pages deployed
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
echo Then submit YANDEX_REINDEX_URLS.txt in Yandex Webmaster.
echo.
pause
exit /b 0

:NODEPLOY
echo.
echo Files copied. Vercel deploy skipped.
echo Deploy later using your normal GoVietStay workflow.
echo.
pause
exit /b 0
