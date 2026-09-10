@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay Agarwood Da Nang V3 - Deploy EN + CN

echo =============================================================
echo      GOVIETSTAY AGARWOOD DA NANG V3 - DEPLOY EN + CN
echo =============================================================
echo.
echo V3 sua loi Windows ROB0COPY do TARGET co dau \ o cuoi.
echo V3 copy vao thu muc hien tai "." sau khi PUSHD vao website.
echo.
echo Se tao:
echo   EN: /travel/agarwood-da-nang
echo   CN: /cn/agarwood-da-nang
echo.
echo Logo: public\govietstay-logo.jpg
echo.

set "INSTALLER_DIR=%~dp0"
set "PAYLOAD_ZIP=%INSTALLER_DIR%AGARWOOD-DANANG-PAYLOAD-V3.zip"
set "TARGET="

if exist "%INSTALLER_DIR%package.json" set "TARGET=%INSTALLER_DIR%"
if not defined TARGET if exist "%INSTALLER_DIR%..\package.json" set "TARGET=%INSTALLER_DIR%.."
if not defined TARGET if exist "%CD%\package.json" set "TARGET=%CD%"

if not defined TARGET (
  echo [STOP] Khong tim thay thu muc goc website co package.json.
  echo.
  echo Dat 2 file nay vao thu muc govietstay-main-website:
  echo   DEPLOY-AGARWOOD-DANANG-EN-CN-V3.bat
  echo   AGARWOOD-DANANG-PAYLOAD-V3.zip
  echo.
  pause
  exit /b 1
)

rem Chuan hoa TARGET bang CD de LOAI BO dau backslash o cuoi.
pushd "%TARGET%"
set "TARGET=%CD%"

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo [STOP] Day khong phai Git repository cua website.
  popd
  pause
  exit /b 1
)

set "PRESTAGED=0"
git diff --cached --quiet
if errorlevel 1 set "PRESTAGED=1"
popd

if not exist "%PAYLOAD_ZIP%" (
  echo [STOP] Thieu AGARWOOD-DANANG-PAYLOAD-V3.zip
  pause
  exit /b 1
)

for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%I"
set "TEMP_PAYLOAD=%TEMP%\GOVIETSTAY-AGARWOOD-V3-%STAMP%"
set "BACKUP=%TARGET%\BACKUP-AGARWOOD-DANANG-V3-%STAMP%"

echo Website:
echo %TARGET%
echo.

echo [1/7] Giai nen payload...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='Stop'; Expand-Archive -LiteralPath '%PAYLOAD_ZIP%' -DestinationPath '%TEMP_PAYLOAD%' -Force"
if errorlevel 1 goto payload_error

if not exist "%TEMP_PAYLOAD%\components\agarwood\AgarwoodLanding.tsx" goto payload_error
if not exist "%TEMP_PAYLOAD%\app\travel\agarwood-da-nang\page.tsx" goto payload_error
if not exist "%TEMP_PAYLOAD%\app\cn\agarwood-da-nang\page.tsx" goto payload_error
if not exist "%TEMP_PAYLOAD%\public\agarwood\happy-agarwood-da-nang-price-list.png" goto payload_error

echo [2/7] Backup file cu neu co...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='Stop';" ^
  "$src='%TEMP_PAYLOAD%'; $dst='%TARGET%'; $bak='%BACKUP%';" ^
  "Get-ChildItem -LiteralPath $src -File -Recurse | ForEach-Object {" ^
  " $rel=$_.FullName.Substring($src.Length).TrimStart([char]92);" ^
  " $old=Join-Path $dst $rel;" ^
  " if(Test-Path -LiteralPath $old) {" ^
  "   $save=Join-Path $bak $rel;" ^
  "   New-Item -ItemType Directory -Force -Path (Split-Path -Parent $save) | Out-Null;" ^
  "   Copy-Item -LiteralPath $old -Destination $save -Force" ^
  " }" ^
  "}"
if errorlevel 1 goto copy_error

echo [3/7] Copy landing page bang ROBOCOPY...
pushd "%TARGET%"
robocopy "%TEMP_PAYLOAD%" "." /E /R:2 /W:1 /NFL /NDL /NJH /NJS /NP
set "RC=%ERRORLEVEL%"
popd
if %RC% GEQ 8 goto copy_error

echo [4/7] Xac minh file da nam DUNG trong website...
if not exist "%TARGET%\components\agarwood\AgarwoodLanding.tsx" goto verify_error
if not exist "%TARGET%\components\agarwood\AgarwoodLanding.module.css" goto verify_error
if not exist "%TARGET%\app\travel\agarwood-da-nang\page.tsx" goto verify_error
if not exist "%TARGET%\app\cn\agarwood-da-nang\page.tsx" goto verify_error
if not exist "%TARGET%\public\agarwood\happy-agarwood-da-nang-price-list.png" goto verify_error

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$p='%TARGET%\components\agarwood\AgarwoodLanding.tsx'; if(-not (Select-String -LiteralPath $p -SimpleMatch 'agarwood-danang-v1' -Quiet)){ exit 9 }"
if errorlevel 1 goto verify_error

rmdir /s /q "%TEMP_PAYLOAD%" 2>nul

if exist "%TARGET%\public\govietstay-logo.jpg" (
  echo   OK  Tim thay logo official: public\govietstay-logo.jpg
) else (
  echo.
  echo [CANH BAO] Khong thay public\govietstay-logo.jpg
  echo Landing page van build, nhung logo co the bi thieu.
  echo.
)

pushd "%TARGET%"

echo [5/7] npm run build - kiem tra toan bo website...
call npm run build
if errorlevel 1 goto build_error

echo [6/7] Stage CHI file Agarwood...
git add -- ^
  "components/agarwood/AgarwoodLanding.tsx" ^
  "components/agarwood/AgarwoodLanding.module.css" ^
  "app/travel/agarwood-da-nang/page.tsx" ^
  "app/cn/agarwood-da-nang/page.tsx" ^
  "public/agarwood/happy-agarwood-da-nang-price-list.png"

if "%PRESTAGED%"=="1" (
  echo.
  echo =============================================================
  echo BUILD OK, NHUNG CO FILE DA STAGE TU TRUOC.
  echo Em dung tai day de khong tron thay doi khac vao commit.
  echo Chay: git status
  echo =============================================================
  echo.
  popd
  pause
  exit /b 2
)

echo [7/7] Commit + push main...
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "Add EN and CN Da Nang agarwood buyer guide"
  if errorlevel 1 goto git_error
) else (
  echo Khong co thay doi moi can commit.
)

git push origin main
if errorlevel 1 goto git_error

echo.
echo =============================================================
echo             DEPLOY AGARWOOD V3 THANH CONG
echo =============================================================
echo.
echo English:
echo https://www.govietstay.com/travel/agarwood-da-nang
echo.
echo Chinese:
echo https://www.govietstay.com/cn/agarwood-da-nang
echo.
echo Logo official:
echo public\govietstay-logo.jpg
echo.
echo Commit:
git log -1 --oneline
echo.
echo Backup neu co:
echo %BACKUP%
echo.
echo Vercel se tu deploy commit moi tren main.
echo =============================================================
echo.
popd
pause
endlocal
exit /b 0

:payload_error
echo.
echo [LOI] Payload V3 khong hop le hoac giai nen that bai.
rmdir /s /q "%TEMP_PAYLOAD%" 2>nul
pause
exit /b 1

:copy_error
echo.
echo [LOI] Copy that bai.
echo Backup neu co:
echo %BACKUP%
rmdir /s /q "%TEMP_PAYLOAD%" 2>nul
pause
exit /b 1

:verify_error
echo.
echo [LOI] File chua duoc copy dung vao website.
echo KHONG build, KHONG commit, KHONG push.
echo Backup neu co:
echo %BACKUP%
rmdir /s /q "%TEMP_PAYLOAD%" 2>nul
pause
exit /b 1

:build_error
echo.
echo [LOI] BUILD THAT BAI.
echo KHONG commit va KHONG push.
echo Chup phan loi mau do phia tren gui lai cho em.
popd
pause
exit /b 1

:git_error
echo.
echo [LOI] Build OK nhung Git commit/push chua thanh cong.
echo Chup phan loi phia tren gui lai cho em.
popd
pause
exit /b 1
