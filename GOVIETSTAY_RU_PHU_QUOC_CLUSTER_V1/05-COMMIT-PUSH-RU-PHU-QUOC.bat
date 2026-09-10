@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - Commit Push RU Phu Quoc Cluster
set "ROOT=%~dp0"
if not exist "%ROOT%package.json" (
  for %%I in ("%~dp0..") do if exist "%%~fI\package.json" set "ROOT=%%~fI\"
)
if not exist "%ROOT%package.json" (
  if exist "C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\package.json" set "ROOT=C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\"
)
if not exist "%ROOT%package.json" (
  echo [LOI] Khong tim thay govietstay-main-website.
  echo Dat folder bo cai nay ben trong project hoac dat file BAT vao project root.
  pause
  exit /b 1
)

cd /d "%ROOT%"

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo [LOI] Khong phai Git repo.
  pause
  exit /b 1
)
for /f "delims=" %%B in ('git branch --show-current') do set "BRANCH=%%B"
if /I not "%BRANCH%"=="main" (
  echo [LOI] Dang o branch %BRANCH%, khong phai main.
  pause
  exit /b 1
)

echo.
echo =========================================================
echo   1/4 FETCH + REBASE AUTOSTASH
echo =========================================================
git fetch origin main
if errorlevel 1 goto fail
git rebase --autostash origin/main
if errorlevel 1 (
  git rebase --abort >nul 2>&1
  echo [LOI] Rebase conflict. Da abort.
  pause
  exit /b 1
)

echo.
echo =========================================================
echo   2/4 BUILD
echo =========================================================
call npm run build
if errorlevel 1 (
  echo [LOI] Build fail. KHONG commit, KHONG push.
  pause
  exit /b 1
)

echo.
echo =========================================================
echo   3/4 STAGE CHI CLUSTER PHU QUOC
echo =========================================================
git add -- "app/ru/phu-quoc" "app/ru/phu-quoc-help/page.tsx" "components/RussianPhuQuocGuidePage.tsx" "lib/russian-phu-quoc-cluster.ts" "public/phu-quoc/ru-cluster"

git diff --cached --quiet
if not errorlevel 1 goto pushonly

git commit -m "Add Russian Phu Quoc SEO cluster for 2026-2027"
if errorlevel 1 goto fail

:pushonly
echo.
echo =========================================================
echo   4/4 PUSH MAIN
echo =========================================================
git push origin main
if errorlevel 1 goto fail

echo.
echo =========================================================
echo   [OK] PUSH THANH CONG
echo =========================================================
git log -1 --oneline
echo Hub: https://www.govietstay.com/ru/phu-quoc
echo Sitemap: https://www.govietstay.com/ru/phu-quoc/sitemap.xml
pause
exit /b 0

:fail
echo.
echo [LOI] Chua hoan tat. Gui anh man hinh cho em.
pause
exit /b 1
