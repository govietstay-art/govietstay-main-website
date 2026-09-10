@echo off
setlocal
chcp 65001 >nul
title GoVietStay - Git Status RU Phu Quoc
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
echo.
echo =========================================================
echo   GIT STATUS
echo =========================================================
git status --short
echo.
echo Commit moi nhat:
git log -1 --oneline
echo.
echo So sanh origin/main va local main:
git fetch origin main >nul 2>&1
git rev-list --left-right --count origin/main...main
echo.
pause
