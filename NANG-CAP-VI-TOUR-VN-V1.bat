@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - Nang cap trang Viet Nam V1

echo =============================================================
echo     GOVIETSTAY /VI - NANG CAP GIAO DIEN VA NOI DUNG V1
echo =============================================================
echo.

set "INSTALLER_DIR=%~dp0"
set "PAYLOAD_ZIP=%INSTALLER_DIR%VI-TOUR-VN-UPGRADE-PAYLOAD.zip"
set "TARGET="

if exist "%INSTALLER_DIR%package.json" set "TARGET=%INSTALLER_DIR%"
if not defined TARGET if exist "%INSTALLER_DIR%..\package.json" set "TARGET=%INSTALLER_DIR%.."
if not defined TARGET if exist "%CD%\package.json" set "TARGET=%CD%"

if not defined TARGET (
  echo KHONG TIM THAY THU MUC GOC WEBSITE.
  echo Hay dat file BAT va file ZIP vao thu muc co package.json,
  echo sau do bam lai file nay.
  echo.
  pause
  exit /b 1
)

for %%I in ("%TARGET%") do set "TARGET=%%~fI"

if not exist "%PAYLOAD_ZIP%" (
  echo THIEU FILE VI-TOUR-VN-UPGRADE-PAYLOAD.zip.
  echo Hay de file ZIP nam cung thu muc voi file BAT.
  echo.
  pause
  exit /b 1
)

pushd "%TARGET%"
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo THU MUC NAY KHONG PHAI GIT CUA WEBSITE.
  popd
  pause
  exit /b 1
)

rem Khong ghi de thay doi dang lam do trong cac file tieng Viet.
git diff --quiet -- "app/vi/page.tsx" "app/vi/VietnamHub.module.css" "app/vi/_seo/VietnamPage.tsx"
if errorlevel 1 (
  echo PHAT HIEN THAY DOI CHUA COMMIT TRONG FILE /VI.
  echo Hay sao luu hoac commit truoc khi chay lai de tranh mat cong viec.
  popd
  pause
  exit /b 2
)

set "PRESTAGED=0"
git diff --cached --quiet -- "app/vi/page.tsx" "app/vi/VietnamHub.module.css" "app/vi/_seo/VietnamPage.tsx"
if errorlevel 1 set "PRESTAGED=1"
popd

for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%I"
set "TEMP_PAYLOAD=%TEMP%\GOVIETSTAY-VI-UPGRADE-%STAMP%"
set "BACKUP=%TARGET%\BACKUP-GOVIETSTAY-VI-UPGRADE-%STAMP%"

echo Website se cap nhat:
echo %TARGET%
echo.
echo [1/6] Dang mo goi nang cap /vi...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -LiteralPath '%PAYLOAD_ZIP%' -DestinationPath '%TEMP_PAYLOAD%' -Force"
if errorlevel 1 goto payload_error

findstr /c:"GVS-VI-UPGRADE-V1" "%TEMP_PAYLOAD%\app\vi\page.tsx" >nul 2>&1
if errorlevel 1 goto payload_error

echo [2/6] Dang sao luu 3 file se duoc thay...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='Stop'; $payload=(Resolve-Path -LiteralPath '%TEMP_PAYLOAD%').Path; $target=(Resolve-Path -LiteralPath '%TARGET%').Path; $backup='%BACKUP%'; Get-ChildItem -LiteralPath $payload -File -Recurse ^| ForEach-Object { $rel=$_.FullName.Substring($payload.Length).TrimStart('\'); $dest=Join-Path $target $rel; if(Test-Path -LiteralPath $dest){ $save=Join-Path $backup $rel; New-Item -ItemType Directory -Force -Path (Split-Path $save) ^| Out-Null; Copy-Item -LiteralPath $dest -Destination $save -Force } }"
if errorlevel 1 goto copy_error

echo [3/6] Dang ghi giao dien va noi dung moi vao website...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='Stop'; $payload=(Resolve-Path -LiteralPath '%TEMP_PAYLOAD%').Path; $target=(Resolve-Path -LiteralPath '%TARGET%').Path; Get-ChildItem -LiteralPath $payload -File -Recurse ^| ForEach-Object { $rel=$_.FullName.Substring($payload.Length).TrimStart('\'); $dest=Join-Path $target $rel; $folder=Split-Path -Parent $dest; New-Item -ItemType Directory -Force -Path $folder ^| Out-Null; Copy-Item -LiteralPath $_.FullName -Destination $dest -Force; Write-Host ('  OK  ' + $rel) }"
if errorlevel 1 goto copy_error
rmdir /s /q "%TEMP_PAYLOAD%" 2>nul

pushd "%TARGET%"
echo [4/6] Dang build kiem tra toan bo website...
call npm run build
if errorlevel 1 goto build_error

if "%PRESTAGED%"=="1" (
  echo.
  echo BUILD THANH CONG NHUNG PHAT HIEN FILE /VI DA DUOC STAGE TU TRUOC.
  echo Khong tu dong commit de tranh tron thay doi cua anh.
  echo Backup: %BACKUP%
  popd
  pause
  exit /b 2
)

echo [5/6] Dang stage dung cac file nang cap...
git add -- "app/vi/page.tsx" "app/vi/VietnamHub.module.css" "app/vi/_seo/VietnamPage.tsx"
git add -- "NANG-CAP-VI-TOUR-VN-V1.bat" "VI-TOUR-VN-UPGRADE-PAYLOAD.zip"
if errorlevel 1 goto git_error

echo [6/6] Dang commit va push de Vercel tu deploy...
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "Upgrade Vietnamese tour experience"
  if errorlevel 1 goto git_error
) else (
  echo Khong co thay doi de commit.
)

git push origin main
if errorlevel 1 goto git_error

echo.
echo =============================================================
echo       DA NANG CAP /VI VA PUSH THANH CONG
echo =============================================================
echo.
echo Vercel se tu dong deploy tu commit moi.
echo Cac trang /ru, /ko va cac ngon ngu khac khong bi thay doi.
echo File cu da duoc sao luu tai:
echo %BACKUP%
echo.
echo Hay mo https://www.govietstay.com/vi sau khi Vercel bao Ready.
echo =============================================================
echo.
popd
pause
endlocal
exit /b 0

:payload_error
echo GOI ZIP KHONG DUNG PHIEN BAN V1 HOAC BI HONG.
rmdir /s /q "%TEMP_PAYLOAD%" 2>nul
pause
exit /b 1

:copy_error
echo COPY THAT BAI. FILE CU VAN DUOC GIU TRONG THU MUC BACKUP.
rmdir /s /q "%TEMP_PAYLOAD%" 2>nul
pause
exit /b 1

:build_error
echo BUILD CON LOI. KHONG COMMIT VA KHONG PUSH.
echo Hay chup phan loi mau do gui lai cho em.
echo Backup: %BACKUP%
popd
pause
exit /b 1

:git_error
echo DA GHI FILE VA BUILD, NHUNG GIT CHUA PUSH DUOC.
echo Kiem tra tai khoan Git, nhanh main va Internet.
echo Backup: %BACKUP%
popd
pause
exit /b 1
