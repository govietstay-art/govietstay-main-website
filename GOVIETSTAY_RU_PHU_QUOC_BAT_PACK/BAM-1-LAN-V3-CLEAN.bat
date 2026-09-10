@echo off
setlocal
chcp 65001 >nul
title GoVietStay - RU Phu Quoc Help V3 CLEAN

echo.
echo =========================================================
echo   GOVIETSTAY - RU PHU QUOC HELP V3 CLEAN
echo   Ban nay CHI them 1 page. Khong sua sitemap. Khong sua link.
echo =========================================================
echo.

REM Installer folder must sit directly inside govietstay-main-website.
for %%I in ("%~dp0..") do set "ROOT=%%~fI"

echo Project root dang kiem tra:
echo %ROOT%
echo.

if not exist "%ROOT%\package.json" (
    echo [LOI] Khong tim thay:
    echo %ROOT%\package.json
    echo.
    echo Hay dat NGUYEN THU MUC:
    echo GoVietStay_RU_PhuQuoc_Help_V3_CLEAN
    echo vao ben trong:
    echo govietstay-main-website
    echo.
    pause
    exit /b 1
)

if not exist "%ROOT%\app\ru" (
    echo [LOI] Khong tim thay:
    echo %ROOT%\app\ru
    echo.
    echo Day khong phai root project GoVietStay.
    pause
    exit /b 1
)

echo [OK] Dung project root.
echo.

set "TARGET=%ROOT%\app\ru\phu-quoc-help"
set "SOURCE=%~dp0payload\app\ru\phu-quoc-help\page.tsx"

if not exist "%SOURCE%" (
    echo [LOI] Payload bi thieu:
    echo %SOURCE%
    pause
    exit /b 1
)

if not exist "%TARGET%" mkdir "%TARGET%"

REM Backup only the page if it already exists
if exist "%TARGET%\page.tsx" (
    copy /Y "%TARGET%\page.tsx" "%TARGET%\page.tsx.backup-before-v3" >nul
    echo [OK] Da backup page cu.
)

copy /Y "%SOURCE%" "%TARGET%\page.tsx" >nul
if errorlevel 1 (
    echo [LOI] Khong copy duoc page.tsx.
    pause
    exit /b 1
)

echo [OK] Da cai:
echo %TARGET%\page.tsx
echo.
echo KHONG sua sitemap.ts
echo KHONG sua RussianInternalLinks.tsx
echo KHONG sua layout
echo KHONG sua tracking
echo.

cd /d "%ROOT%"

echo =========================================================
echo   KIEM TRA TYPE / BUILD
echo =========================================================
echo.

call npm run build > "%~dp0BUILD-RESULT.txt" 2>&1
set "BUILD_CODE=%ERRORLEVEL%"

type "%~dp0BUILD-RESULT.txt"

echo.
if "%BUILD_CODE%"=="0" (
    echo =========================================================
    echo   [OK] BUILD THANH CONG
    echo =========================================================
    echo.
    echo Trang da san sang de deploy:
    echo https://www.govietstay.com/ru/phu-quoc-help
    echo.
    echo File log:
    echo %~dp0BUILD-RESULT.txt
    pause
    exit /b 0
) else (
    echo =========================================================
    echo   [CHUA BUILD DUOC]
    echo =========================================================
    echo.
    echo KHONG chay them installer nao nua.
    echo Gui cho em file:
    echo %~dp0BUILD-RESULT.txt
    echo.
    echo Em se sua DUNG LOI trong log, khong doan nua.
    pause
    exit /b %BUILD_CODE%
)
