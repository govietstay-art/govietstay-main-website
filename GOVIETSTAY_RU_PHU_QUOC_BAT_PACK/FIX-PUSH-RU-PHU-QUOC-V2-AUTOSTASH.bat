@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - Fix Push RU Phu Quoc V2

echo.
echo =========================================================
echo   GOVIETSTAY - FIX PUSH RU PHU QUOC V2
echo   Bo qua file ?? - tu autostash file tracked - rebase - build - push
echo =========================================================
echo.

set "ROOT=%~dp0"
if not exist "%ROOT%package.json" (
    if exist "C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\package.json" (
        set "ROOT=C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\"
    )
)

if not exist "%ROOT%package.json" (
    echo [LOI] Khong tim thay project root.
    echo Dat file BAT vao:
    echo C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\
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
    echo Script chi xu ly branch main.
    pause
    exit /b 1
)

if not exist "%ROOT%app\ru\phu-quoc-help\page.tsx" (
    echo [LOI] Khong tim thay trang Phu Quoc Help.
    pause
    exit /b 1
)

echo [OK] Project:
echo %ROOT%
echo [OK] Branch: main
echo [OK] Page ton tai.
echo.
echo Luu y:
echo - Cac dong ?? la file UNTRACKED, script se KHONG xoa, KHONG add, KHONG commit.
echo - Neu co file tracked dang sua, git rebase --autostash se tam cat va tra lai sau.
echo.

echo =========================================================
echo   1/4 FETCH REMOTE MAIN
echo =========================================================
git fetch origin main
if errorlevel 1 (
    echo.
    echo [LOI] Fetch GitHub that bai.
    pause
    exit /b 1
)

echo.
echo =========================================================
echo   2/4 REBASE VOI AUTOSTASH
echo =========================================================
git rebase --autostash origin/main
if errorlevel 1 (
    echo.
    echo [LOI] Rebase bi conflict.
    echo Dang abort de tra repo ve trang thai an toan...
    git rebase --abort >nul 2>&1
    echo.
    echo Khong push gi len GitHub.
    echo Gui anh chup phan conflict phia tren cho em.
    pause
    exit /b 1
)

echo.
echo [OK] Rebase thanh cong.
echo Commit moi nhat:
git log -1 --oneline
echo.

echo =========================================================
echo   3/4 BUILD KIEM TRA
echo =========================================================
call npm run build
if errorlevel 1 (
    echo.
    echo [LOI] Build sau rebase khong qua.
    echo KHONG push.
    pause
    exit /b 1
)

echo.
echo =========================================================
echo   4/4 PUSH MAIN
echo =========================================================
git push origin main
if errorlevel 1 (
    echo.
    echo [LOI] Push van that bai.
    echo Gui anh chup phan loi phia tren.
    pause
    exit /b 1
)

echo.
echo =========================================================
echo   [OK] PUSH THANH CONG
echo =========================================================
echo.
echo Commit tren may:
git log -1 --oneline
echo.
echo Vercel se tu deploy neu project dang ket noi GitHub.
echo URL:
echo https://www.govietstay.com/ru/phu-quoc-help
echo.
echo Cac file ?? cu van duoc giu nguyen va KHONG bi commit.
echo.
pause
exit /b 0
