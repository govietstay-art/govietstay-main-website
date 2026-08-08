@echo off
setlocal EnableExtensions
chcp 65001 >nul
title Cai dat GoVietStay Local Point RU

echo ======================================================
echo       CAI DAT GOVIETSTAY LOCAL POINT - TIENG NGA
echo ======================================================
echo.

set "INSTALLER_DIR=%~dp0"
set "PAYLOAD_ZIP=%INSTALLER_DIR%LOCAL-POINT-PAYLOAD.zip"
set "TARGET=%CD%"

if exist "%INSTALLER_DIR%package.json" set "TARGET=%INSTALLER_DIR%"
if not exist "%TARGET%package.json" if exist "%INSTALLER_DIR%..\package.json" set "TARGET=%INSTALLER_DIR%.."

if not exist "%TARGET%package.json" (
  echo KHONG TIM THAY package.json CUA WEBSITE.
  echo.
  echo Hay copy toan bo thu muc bo cai vao thu muc goc cua website,
  echo noi co package.json, sau do chay lai file nay.
  echo.
  pause
  exit /b 1
)

if not exist "%PAYLOAD_ZIP%" (
  echo THIEU FILE LOCAL-POINT-PAYLOAD.zip.
  echo Hay giai nen day du bo cai roi chay lai.
  echo.
  pause
  exit /b 1
)

for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%I"
set "TEMP_PAYLOAD=%TEMP%\GOVIETSTAY-LOCAL-POINT-%STAMP%"
set "BACKUP=%TARGET%\BACKUP-LOCAL-POINT-%STAMP%"

echo Website: %TARGET%
echo.
echo Dang mo goi ma nguon an toan...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -LiteralPath '%PAYLOAD_ZIP%' -DestinationPath '%TEMP_PAYLOAD%' -Force"
if errorlevel 1 (
  echo KHONG MO DUOC LOCAL-POINT-PAYLOAD.zip.
  echo.
  pause
  exit /b 1
)

if not exist "%TEMP_PAYLOAD%\components\LocalPointLandingPage.tsx" (
  echo GOI MA NGUON KHONG HOP LE.
  rmdir /s /q "%TEMP_PAYLOAD%" 2>nul
  echo.
  pause
  exit /b 1
)

echo Dang sao luu cac file Local Point cu neu co...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$payload=[IO.Path]::GetFullPath('%TEMP_PAYLOAD%'); $target=[IO.Path]::GetFullPath('%TARGET%'); $backup=[IO.Path]::GetFullPath('%BACKUP%'); Get-ChildItem -LiteralPath $payload -File -Recurse ^| ForEach-Object { $rel=$_.FullName.Substring($payload.Length).TrimStart('\'); $dest=Join-Path $target $rel; if(Test-Path -LiteralPath $dest){ $save=Join-Path $backup $rel; New-Item -ItemType Directory -Force -Path (Split-Path $save) ^| Out-Null; Copy-Item -LiteralPath $dest -Destination $save -Force } }"

echo Dang copy trang Local Point tieng Nga...
robocopy "%TEMP_PAYLOAD%" "%TARGET%" /E /COPY:DAT /R:2 /W:1 /NFL /NDL /NJH /NJS >nul
if errorlevel 8 (
  echo COPY THAT BAI. KHONG CO FILE CU NAO BI XOA.
  rmdir /s /q "%TEMP_PAYLOAD%" 2>nul
  echo.
  pause
  exit /b 1
)

rmdir /s /q "%TEMP_PAYLOAD%" 2>nul

rem Don thu muc ma nguon tam cua bo cai cu neu no da bi copy vao Git.
if exist "%TARGET%\_LOCAL_POINT_FILES\components\LocalPointLandingPage.tsx" (
  echo Dang xoa thu muc tam _LOCAL_POINT_FILES gay loi Vercel...
  rmdir /s /q "%TARGET%\_LOCAL_POINT_FILES"
)

pushd "%TARGET%"
echo Dang ghi 2 thu vien vao package.json va package-lock.json...
call npm install lucide-react@^1.30.0 @svg-maps/vietnam@^2.0.0 --save
if errorlevel 1 (
  echo.
  echo DA COPY FILE NHUNG CHUA CAI DUOC THU VIEN.
  echo Kiem tra Internet roi chay lai file cai dat.
  popd
  pause
  exit /b 1
)
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
echo   package.json va package-lock.json
echo.
echo Da xoa thu muc tam _LOCAL_POINT_FILES cua bo cai cu neu co.
echo Duong dan sau khi deploy: /ru/local-point
echo.
echo Buoc tiep theo:
echo   git add -A
echo   git commit -m "Fix Local Point deployment"
echo   git push origin main
echo.
echo File cu neu co da duoc sao luu tai:
echo %BACKUP%
echo ======================================================
echo.
pause
endlocal
