@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - Build Check RU Phu Quoc
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
echo   BUILD TOAN BO WEBSITE
echo =========================================================
call npm run build > "%ROOT%BUILD-RU-PHU-QUOC-CLUSTER.txt" 2>&1
set "CODE=%ERRORLEVEL%"
type "%ROOT%BUILD-RU-PHU-QUOC-CLUSTER.txt"
echo.
if "%CODE%"=="0" (
  echo [OK] BUILD THANH CONG.
  echo Log: %ROOT%BUILD-RU-PHU-QUOC-CLUSTER.txt
) else (
  echo [LOI] BUILD FAIL.
  echo Gui file: %ROOT%BUILD-RU-PHU-QUOC-CLUSTER.txt
)
pause
exit /b %CODE%
