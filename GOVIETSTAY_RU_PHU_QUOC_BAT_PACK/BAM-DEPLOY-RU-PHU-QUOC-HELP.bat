@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - Deploy RU Phu Quoc Help

echo.
echo =========================================================
echo   GOVIETSTAY - DEPLOY RU PHU QUOC HELP
echo   Build + commit dung 1 page + push main
echo =========================================================
echo.

set "ROOT=%~dp0"
if not exist "%ROOT%package.json" (
    if exist "C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\package.json" (
        set "ROOT=C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\"
    )
)

if not exist "%ROOT%package.json" (
    echo [LOI] Khong tim thay package.json.
    echo Hay dat file BAT nay vao thu muc:
    echo C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\
    echo.
    pause
    exit /b 1
)

if not exist "%ROOT%app\ru\phu-quoc-help\page.tsx" (
    echo [LOI] Khong tim thay page:
    echo %ROOT%app\ru\phu-quoc-help\page.tsx
    echo.
    pause
    exit /b 1
)

cd /d "%ROOT%"

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo [LOI] Day khong phai Git repo.
    pause
    exit /b 1
)

for /f "delims=" %%B in ('git branch --show-current') do set "BRANCH=%%B"
if /I not "%BRANCH%"=="main" (
    echo [LOI] Dang o branch: %BRANCH%
    echo File nay chi push branch main de tranh nham.
    echo.
    pause
    exit /b 1
)

echo [OK] Project:
echo %ROOT%
echo [OK] Branch: main
echo.

echo Kiem tra file da stage tu truoc...
git diff --cached --quiet
if errorlevel 1 (
    echo.
    echo [DUNG LAI] Dang co file khac da duoc STAGE tu truoc.
    echo De tranh commit nham, em khong tiep tuc.
    echo.
    git status --short
    echo.
    echo Hay gui anh chup man hinh nay cho em neu can.
    pause
    exit /b 2
)

echo =========================================================
echo   1/3 BUILD KIEM TRA
echo =========================================================
call npm run build
if errorlevel 1 (
    echo.
    echo [LOI] Build that bai. KHONG commit, KHONG push.
    pause
    exit /b 1
)

echo.
echo =========================================================
echo   2/3 COMMIT DUNG TRANG PHU QUOC HELP
echo =========================================================

git add -- "app/ru/phu-quoc-help/page.tsx"

git diff --cached --quiet
if not errorlevel 1 (
    echo Page khong co thay doi moi de commit.
    echo Dang thu push cac commit local chua push neu co...
    goto PUSH_ONLY
)

git commit -m "Add Russian Phu Quoc local help page"
if errorlevel 1 (
    echo.
    echo [LOI] Commit khong thanh cong.
    pause
    exit /b 1
)

:PUSH_ONLY
echo.
echo =========================================================
echo   3/3 PUSH LEN GITHUB MAIN
echo =========================================================

git push origin main
if errorlevel 1 (
    echo.
    echo [LOI] Push GitHub chua thanh cong.
    echo Trang tren may van an toan, build da qua.
    pause
    exit /b 1
)

echo.
echo =========================================================
echo   [OK] DA PUSH THANH CONG
echo =========================================================
echo.
echo Commit moi nhat:
git log -1 --oneline
echo.
echo Vercel se tu deploy tu GitHub neu project dang ket noi nhu hien tai.
echo URL:
echo https://www.govietstay.com/ru/phu-quoc-help
echo.
pause
exit /b 0
