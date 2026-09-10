@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - Fix RU Phu Quoc Build

echo.
echo =========================================================
echo   GOVIETSTAY - FIX RU PHU QUOC BUILD
echo   Xoa folder installer cu + build lai project
echo =========================================================
echo.

set "ROOT="

REM 1) Neu file BAT nam ngay trong project root
if exist "%~dp0package.json" if exist "%~dp0app\ru" (
    set "ROOT=%~dp0"
)

REM 2) Neu BAT nam trong 1 folder con cua project
if not defined ROOT (
    for %%I in ("%~dp0..") do (
        if exist "%%~fI\package.json" if exist "%%~fI\app\ru" (
            set "ROOT=%%~fI\"
        )
    )
)

REM 3) Fallback dung dung duong dan project hien tai cua anh
if not defined ROOT (
    if exist "C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\package.json" (
        set "ROOT=C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\"
    )
)

if not defined ROOT (
    echo [LOI] Khong tim thay project govietstay-main-website.
    echo.
    echo Cach nhanh nhat:
    echo - Copy file BAT nay vao:
    echo   C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\
    echo - Double click lai.
    echo.
    pause
    exit /b 1
)

echo [OK] Project root:
echo %ROOT%
echo.

REM Bao ve page that
if not exist "%ROOT%app\ru\phu-quoc-help\page.tsx" (
    echo [LOI] Khong tim thay page that:
    echo %ROOT%app\ru\phu-quoc-help\page.tsx
    echo.
    echo Khong xoa gi ca.
    pause
    exit /b 1
)

echo [OK] Tim thay page that:
echo %ROOT%app\ru\phu-quoc-help\page.tsx
echo.

echo Dang xoa cac folder installer cu gay loi TypeScript...
echo.

for %%D in (
    "GoVietStay_RU_PhuQuoc_Help_V1"
    "GoVietStay_RU_PhuQuoc_Help_V2"
    "GoVietStay_RU_PhuQuoc_Help_V3_CLEAN"
) do (
    if exist "%ROOT%%%~D" (
        echo [XOA] %ROOT%%%~D
        rmdir /S /Q "%ROOT%%%~D"
    ) else (
        echo [SKIP] Khong co %%~D
    )
)

echo.
echo [OK] Da don folder installer cu.
echo.
echo Dang chay npm run build...
echo =========================================================
echo.

cd /d "%ROOT%"
call npm run build > "%ROOT%BUILD-RU-PHU-QUOC-RESULT.txt" 2>&1
set "CODE=%ERRORLEVEL%"

type "%ROOT%BUILD-RU-PHU-QUOC-RESULT.txt"

echo.
echo =========================================================
if "%CODE%"=="0" (
    echo   [OK] BUILD THANH CONG
    echo =========================================================
    echo.
    echo Page san sang:
    echo https://www.govietstay.com/ru/phu-quoc-help
    echo.
    echo Log:
    echo %ROOT%BUILD-RU-PHU-QUOC-RESULT.txt
    echo.
    pause
    exit /b 0
) else (
    echo   [LOI] BUILD VAN CHUA QUA
    echo =========================================================
    echo.
    echo Gui em file nay:
    echo %ROOT%BUILD-RU-PHU-QUOC-RESULT.txt
    echo.
    echo Khong chay installer nao them.
    echo.
    pause
    exit /b %CODE%
)
