@echo off
setlocal EnableExtensions
chcp 65001 >nul
title Cai dat GoVietStay Local Point RU

echo ======================================================
echo       CAI DAT GOVIETSTAY LOCAL POINT - TIENG NGA
echo ======================================================
echo.

set "INSTALLER_DIR=%~dp0"
set "PAYLOAD=%INSTALLER_DIR%_LOCAL_POINT_FILES"
set "TARGET=%CD%"

if exist "%INSTALLER_DIR%package.json" set "TARGET=%INSTALLER_DIR%"
if not exist "%TARGET%package.json" if exist "%INSTALLER_DIR%..\package.json" set "TARGET=%INSTALLER_DIR%.."

if not exist "%TARGET%package.json" (
  echo KHONG TIM THAY package.json CUA WEBSITE.
  echo.
  echo Hay copy file CAI-DAT-LOCAL-POINT.bat va thu muc
  echo _LOCAL_POINT_FILES vao thu muc goc cua website,
  echo sau do chay lai file nay.
  echo.
  pause
  exit /b 1
)

if not exist "%PAYLOAD%\components\LocalPointLandingPage.tsx" (
  echo THIEU THU MUC _LOCAL_POINT_FILES.
  echo Hay giai nen day du file ZIP roi chay lai.
  echo.
  pause
  exit /b 1
)

for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%I"
set "BACKUP=%TARGET%\BACKUP-LOCAL-POINT-%STAMP%"

echo Website: %TARGET%
echo.
echo Dang sao luu cac file Local Point cu neu co...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$payload=[IO.Path]::GetFullPath('%PAYLOAD%'); $target=[IO.Path]::GetFullPath('%TARGET%'); $backup=[IO.Path]::GetFullPath('%BACKUP%'); Get-ChildItem -LiteralPath $payload -File -Recurse ^| ForEach-Object { $rel=$_.FullName.Substring($payload.Length).TrimStart('\'); $dest=Join-Path $target $rel; if(Test-Path -LiteralPath $dest){ $save=Join-Path $backup $rel; New-Item -ItemType Directory -Force -Path (Split-Path $save) ^| Out-Null; Copy-Item -LiteralPath $dest -Destination $save -Force } }"

echo Dang copy trang Local Point tieng Nga...
robocopy "%PAYLOAD%" "%TARGET%" /E /COPY:DAT /R:2 /W:1 /NFL /NDL /NJH /NJS >nul
if errorlevel 8 (
  echo COPY THAT BAI. KHONG CO FILE NAO BI XOA.
  echo.
  pause
  exit /b 1
)

pushd "%TARGET%"
if not exist "node_modules\lucide-react\package.json" goto install_dependencies
if not exist "node_modules\@svg-maps\vietnam\package.json" goto install_dependencies
goto dependencies_ready

:install_dependencies
echo Dang bo sung 2 thu vien can thiet...
call npm install lucide-react@^1.30.0 @svg-maps/vietnam@^2.0.0 --save
if errorlevel 1 (
  echo.
  echo DA COPY FILE NHUNG CHUA CAI DUOC THU VIEN.
  echo Khi co Internet, chay lenh:
  echo npm install lucide-react@^1.30.0 @svg-maps/vietnam@^2.0.0 --save
  popd
  pause
  exit /b 1
)

:dependencies_ready
popd

echo.
echo ======================================================
echo      DA CAI DAT THANH CONG LOCAL POINT TIENG NGA
echo ======================================================
echo.
echo Da them hoac cap nhat:
echo   components\LocalPointLandingPage.tsx
echo   components\LocalPointLandingPage.css
echo   app\ru\local-point\page.tsx
echo   public\local-point\govietstay-logo.jpg
echo   public\local-point\local-point-tropical-clean-v3.png
echo   public\local-point\local-point-mobile-clean-v3.png
echo.
echo Duong dan sau khi deploy: /ru/local-point
echo KHONG XOA FILE KHAC CUA WEBSITE.
echo File Local Point cu neu co da duoc sao luu tai:
echo %BACKUP%
echo ======================================================
echo.
pause
endlocal
