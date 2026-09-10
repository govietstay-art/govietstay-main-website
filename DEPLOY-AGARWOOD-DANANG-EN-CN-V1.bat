@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay Agarwood Da Nang - Deploy EN + CN

echo =============================================================
echo        GOVIETSTAY AGARWOOD DA NANG - DEPLOY EN + CN
echo =============================================================
echo.
echo Se tao 2 trang:
echo   EN: /travel/agarwood-da-nang
echo   CN: /cn/agarwood-da-nang
echo.
echo Logo su dung dung asset official dang co:
echo   /public/govietstay-logo.jpg
echo.

set "INSTALLER_DIR=%~dp0"
set "PAYLOAD_ZIP=%INSTALLER_DIR%AGARWOOD-DANANG-PAYLOAD.zip"
set "TARGET="

if exist "%INSTALLER_DIR%package.json" set "TARGET=%INSTALLER_DIR%"
if not defined TARGET if exist "%INSTALLER_DIR%..\package.json" set "TARGET=%INSTALLER_DIR%.."
if not defined TARGET if exist "%CD%\package.json" set "TARGET=%CD%"

if not defined TARGET (
  echo KHONG TIM THAY THU MUC GOC WEBSITE.
  echo.
  echo Hay dat 2 file nay vao thu muc website co package.json:
  echo   1. DEPLOY-AGARWOOD-DANANG-EN-CN-V1.bat
  echo   2. AGARWOOD-DANANG-PAYLOAD.zip
  echo.
  pause
  exit /b 1
)

for %%I in ("%TARGET%") do set "TARGET=%%~fI"

if not exist "%PAYLOAD_ZIP%" (
  echo THIEU FILE AGARWOOD-DANANG-PAYLOAD.zip
  echo Hay giai nen day du bo deploy roi bam lai file .bat.
  echo.
  pause
  exit /b 1
)

pushd "%TARGET%"
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo DAY KHONG PHAI THU MUC GIT CUA GOVIETSTAY.
  popd
  pause
  exit /b 1
)

set "PRESTAGED=0"
git diff --cached --quiet
if errorlevel 1 set "PRESTAGED=1"
popd

for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%I"
set "TEMP_PAYLOAD=%TEMP%\GOVIETSTAY-AGARWOOD-%STAMP%"
set "BACKUP=%TARGET%\BACKUP-AGARWOOD-DANANG-%STAMP%"

echo Website se cap nhat:
echo %TARGET%
echo.

echo [1/6] Dang mo goi landing page...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -LiteralPath '%PAYLOAD_ZIP%' -DestinationPath '%TEMP_PAYLOAD%' -Force"
if errorlevel 1 goto payload_error

findstr /c:"agarwood-danang-v1" "%TEMP_PAYLOAD%\components\agarwood\AgarwoodLanding.tsx" >nul 2>&1
if errorlevel 1 goto payload_error

echo [2/6] Dang sao luu cac file cu neu da ton tai...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$payload=[IO.Path]::GetFullPath('%TEMP_PAYLOAD%'); $target=[IO.Path]::GetFullPath('%TARGET%'); $backup=[IO.Path]::GetFullPath('%BACKUP%'); Get-ChildItem -LiteralPath $payload -File -Recurse ^| ForEach-Object { $rel=$_.FullName.Substring($payload.Length).TrimStart('\'); $dest=Join-Path $target $rel; if(Test-Path -LiteralPath $dest){ $save=Join-Path $backup $rel; New-Item -ItemType Directory -Force -Path (Split-Path $save) ^| Out-Null; Copy-Item -LiteralPath $dest -Destination $save -Force } }"
if errorlevel 1 goto copy_error

echo [3/6] Dang cai 2 trang EN + CN va hinh bang gia...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='Stop'; $payload=(Resolve-Path -LiteralPath '%TEMP_PAYLOAD%').Path; $target=(Resolve-Path -LiteralPath '%TARGET%').Path; Get-ChildItem -LiteralPath $payload -File -Recurse ^| ForEach-Object { $rel=$_.FullName.Substring($payload.Length).TrimStart('\'); $dest=Join-Path $target $rel; $folder=Split-Path -Parent $dest; New-Item -ItemType Directory -Force -Path $folder ^| Out-Null; Copy-Item -LiteralPath $_.FullName -Destination $dest -Force; Write-Host ('  OK  ' + $rel) }"
if errorlevel 1 goto copy_error
rmdir /s /q "%TEMP_PAYLOAD%" 2>nul

findstr /c:"agarwood-danang-v1" "%TARGET%\components\agarwood\AgarwoodLanding.tsx" >nul 2>&1
if errorlevel 1 (
  echo KHONG XAC NHAN DUOC MA NGUON AGARWOOD V1.
  echo Khong tiep tuc build / commit.
  pause
  exit /b 1
)

if exist "%TARGET%\public\govietstay-logo.jpg" (
  echo   OK  Dung logo official: public\govietstay-logo.jpg
) else (
  echo.
  echo CANH BAO: KHONG THAY public\govietstay-logo.jpg
  echo Trang van cai dat duoc, nhung logo se bi thieu tren website.
  echo Hay gui anh chup loi cho em neu website hien logo bi vo.
  echo.
)

pushd "%TARGET%"

echo [4/6] Dang build kiem tra TOAN BO website...
call npm run build
if errorlevel 1 goto build_error

echo [5/6] Dang stage CHI cac file Agarwood...
git add -- ^
  "components/agarwood/AgarwoodLanding.tsx" ^
  "components/agarwood/AgarwoodLanding.module.css" ^
  "app/travel/agarwood-da-nang/page.tsx" ^
  "app/cn/agarwood-da-nang/page.tsx" ^
  "public/agarwood/happy-agarwood-da-nang-price-list.png"

if "%PRESTAGED%"=="1" (
  echo.
  echo PHAT HIEN FILE DA DUOC STAGE TU TRUOC.
  echo Em da cai va build xong nhung KHONG tu dong commit de tranh tron file khac.
  echo Hay chay: git status
  echo Sau do commit thu cong neu dung.
  echo.
  popd
  pause
  exit /b 2
)

echo [6/6] Dang commit va push len main de Vercel tu deploy...
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "Add EN and CN Da Nang agarwood buyer guide"
  if errorlevel 1 goto git_error
) else (
  echo Cac file Agarwood da giong ban tren Git. Dang push commit chua day neu co...
)

git push origin main
if errorlevel 1 goto git_error

echo.
echo =============================================================
echo                 DEPLOY AGARWOOD THANH CONG
echo =============================================================
echo.
echo Trang English:
echo https://www.govietstay.com/travel/agarwood-da-nang
echo.
echo Trang Chinese:
echo https://www.govietstay.com/cn/agarwood-da-nang
echo.
echo Da dung logo official:
echo public\govietstay-logo.jpg
echo.
echo Build toan website: OK
echo Git push main: OK
echo Vercel se tu deploy commit moi.
echo.
echo Commit moi nhat:
git log -1 --oneline
echo.
echo Neu truoc do co file trung ten, backup nam tai:
echo %BACKUP%
echo =============================================================
echo.
popd
pause
endlocal
exit /b 0

:payload_error
echo.
echo GOI AGARWOOD-DANANG-PAYLOAD.zip KHONG HOP LE.
rmdir /s /q "%TEMP_PAYLOAD%" 2>nul
pause
exit /b 1

:copy_error
echo.
echo COPY THAT BAI. FILE CU (NEU CO) VAN NAM TRONG BACKUP:
echo %BACKUP%
rmdir /s /q "%TEMP_PAYLOAD%" 2>nul
pause
exit /b 1

:build_error
echo.
echo BUILD WEBSITE CON LOI - KHONG COMMIT, KHONG PUSH.
echo Chup phan loi mau do gui lai cho em.
popd
pause
exit /b 1

:git_error
echo.
echo FILE DA CAI VA BUILD THANH CONG NHUNG GIT CHUA PUSH DUOC.
echo Chup phan loi phia tren gui lai cho em.
popd
pause
exit /b 1
