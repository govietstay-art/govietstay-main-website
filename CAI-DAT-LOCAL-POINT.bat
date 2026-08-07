@echo off
setlocal EnableExtensions
chcp 65001 >nul

title Cai dat GoVietStay Local Point
cd /d "%~dp0"

echo ==================================================
echo    CAI DAT GOVIETSTAY LOCAL POINT - RU
echo ==================================================
echo.

if not exist "package.json" (
  echo [LOI] Hay copy TOAN BO noi dung goi nay vao thu muc goc:
  echo Documents\GitHub\govietstay-main-website
  echo Sau do chay lai file nay.
  echo.
  pause
  exit /b 1
)

set "BACKUP_NAME=_backup_local_point_%RANDOM%_%RANDOM%"
set "NEED_BACKUP=0"
if exist "components\LocalPointLandingPage.tsx" set "NEED_BACKUP=1"
if exist "components\LocalPointLandingPage.css" set "NEED_BACKUP=1"
if exist "app\ru\local-point\page.tsx" set "NEED_BACKUP=1"
if exist "public\local-point\govietstay-logo.jpg" set "NEED_BACKUP=1"
if exist "public\local-point\hero-3d.png" set "NEED_BACKUP=1"

if "%NEED_BACKUP%"=="1" (
  mkdir "%BACKUP_NAME%\components" 2>nul
  mkdir "%BACKUP_NAME%\app\ru\local-point" 2>nul
  mkdir "%BACKUP_NAME%\public\local-point" 2>nul
  if exist "components\LocalPointLandingPage.tsx" copy /y "components\LocalPointLandingPage.tsx" "%BACKUP_NAME%\components\" >nul
  if exist "components\LocalPointLandingPage.css" copy /y "components\LocalPointLandingPage.css" "%BACKUP_NAME%\components\" >nul
  if exist "app\ru\local-point\page.tsx" copy /y "app\ru\local-point\page.tsx" "%BACKUP_NAME%\app\ru\local-point\" >nul
  if exist "public\local-point\govietstay-logo.jpg" copy /y "public\local-point\govietstay-logo.jpg" "%BACKUP_NAME%\public\local-point\" >nul
  if exist "public\local-point\hero-3d.png" copy /y "public\local-point\hero-3d.png" "%BACKUP_NAME%\public\local-point\" >nul
  echo Da sao luu ban Local Point cu vao: %BACKUP_NAME%
)

if not exist "components" mkdir "components"
if not exist "app\ru\local-point" mkdir "app\ru\local-point"
if not exist "public\local-point" mkdir "public\local-point"

if not exist "_local_point_payload\components\LocalPointLandingPage.tsx" goto missing_payload
if not exist "_local_point_payload\components\LocalPointLandingPage.css" goto missing_payload
if not exist "_local_point_payload\app\ru\local-point\page.tsx" goto missing_payload
if not exist "_local_point_payload\public\local-point\govietstay-logo.jpg" goto missing_payload
if not exist "_local_point_payload\public\local-point\hero-3d.png" goto missing_payload

copy /y "_local_point_payload\components\LocalPointLandingPage.tsx" "components\LocalPointLandingPage.tsx" >nul
copy /y "_local_point_payload\components\LocalPointLandingPage.css" "components\LocalPointLandingPage.css" >nul
copy /y "_local_point_payload\app\ru\local-point\page.tsx" "app\ru\local-point\page.tsx" >nul
copy /y "_local_point_payload\public\local-point\govietstay-logo.jpg" "public\local-point\govietstay-logo.jpg" >nul
copy /y "_local_point_payload\public\local-point\hero-3d.png" "public\local-point\hero-3d.png" >nul

echo.
echo ==================================================
echo    DA CAI DAT THANH CONG 5 FILE MOI
echo    KHONG XOA HOAC GHI DE CAC TRANG KHAC
echo ==================================================
echo.
echo Kiem tra tai: http://localhost:3000/ru/local-point
echo Sau khi dua len web: https://GoVietStay.com/ru/local-point
echo.
pause
exit /b 0

:missing_payload
echo.
echo [LOI] Goi cai dat bi thieu file trong _local_point_payload.
echo Hay giai nen lai day du file ZIP roi thu lai.
echo.
pause
exit /b 1
