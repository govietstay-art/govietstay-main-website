@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - Fix Push RU Phu Quoc Help

echo.
echo =========================================================
echo   GOVIETSTAY - FIX NON-FAST-FORWARD + PUSH
echo   Fetch remote -> rebase -> build -> push main
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
    echo Dat file BAT nay vao:
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

echo [OK] Project:
echo %ROOT%
echo [OK] Branch: main
echo.

REM Khong tu dong stash file tracked cua anh de tranh tron cong viec khac.
git diff --quiet
if errorlevel 1 (
    echo [DUNG LAI] Dang co file TRACKED chua commit.
    echo De an toan, script khong rebase khi con thay doi tracked.
    echo.
    git status --short
    echo.
    pause
    exit /b 2
)

git diff --cached --quiet
if errorlevel 1 (
    echo [DUNG LAI] Dang co file STAGED chua commit.
    echo.
    git status --short
    echo.
    pause
    exit /b 2
)

echo Commit local hien tai:
git log -1 --oneline
echo.

echo =========================================================
echo   1/4 FETCH REMOTE MAIN
echo =========================================================
git fetch origin main
if errorlevel 1 (
    echo.
    echo [LOI] Khong fetch duoc GitHub.
    pause
    exit /b 1
)

echo.
echo =========================================================
echo   2/4 REBASE COMMIT CUA ANH LEN REMOTE MAIN
echo =========================================================
git rebase origin/main
if errorlevel 1 (
    echo.
    echo [LOI] Rebase bi conflict.
    echo Dang huy rebase de tra project ve trang thai truoc do...
    git rebase --abort >nul 2>&1
    echo.
    echo Project da duoc phuc hoi. Gui anh chup man hinh nay cho em.
    pause
    exit /b 1
)

echo.
echo [OK] Rebase thanh cong.
echo Commit sau rebase:
git log -1 --oneline
echo.

echo =========================================================
echo   3/4 BUILD KIEM TRA SAU KHI GOP REMOTE
echo =========================================================
call npm run build
if errorlevel 1 (
    echo.
    echo [LOI] Build sau rebase khong qua.
    echo KHONG push len GitHub.
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
    echo [LOI] Push van chua thanh cong.
    echo Gui em anh phan loi phia tren.
    pause
    exit /b 1
)

echo.
echo =========================================================
echo   [OK] PUSH THANH CONG
echo =========================================================
echo.
echo Commit moi nhat tren main:
git log -1 --oneline
echo.
echo Vercel se tu deploy neu GitHub integration dang hoat dong.
echo URL:
echo https://www.govietstay.com/ru/phu-quoc-help
echo.
pause
exit /b 0
