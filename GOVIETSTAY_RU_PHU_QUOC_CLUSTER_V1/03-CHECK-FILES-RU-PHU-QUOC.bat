@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - Check RU Phu Quoc Files
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

echo.
echo =========================================================
echo   CHECK FILE CLUSTER
echo =========================================================
set "ERR=0"
for %%F in (
  "app\ru\phu-quoc\page.tsx"
  "app\ru\phu-quoc\[slug]\page.tsx"
  "app\ru\phu-quoc\sitemap.xml\route.ts"
  "components\RussianPhuQuocGuidePage.tsx"
  "lib\russian-phu-quoc-cluster.ts"
  "public\phu-quoc\ru-cluster\hero-sunset.png"
  "public\phu-quoc\ru-cluster\hero-islands.png"
  "app\ru\phu-quoc-help\page.tsx"
) do (
  if exist "%ROOT%%%~F" (echo [OK] %%~F) else (echo [THIEU] %%~F & set "ERR=1")
)
echo.
if "%ERR%"=="0" echo [OK] DAY DU FILE CAN THIET.
if not "%ERR%"=="0" echo [LOI] CON THIEU FILE.
pause
exit /b %ERR%
