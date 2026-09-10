@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - Install RU Phu Quoc Cluster V1
echo.
echo =========================================================
echo   GOVIETSTAY - INSTALL RUSSIAN PHU QUOC CLUSTER V1
echo   14 trang moi + trang Help dang co = 15 trang
echo =========================================================
echo.
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

set "PAYLOAD=%~dp0RU-PHU-QUOC-CLUSTER-PAYLOAD.zip"
if not exist "%PAYLOAD%" (
  echo [LOI] Thieu RU-PHU-QUOC-CLUSTER-PAYLOAD.zip
  pause
  exit /b 1
)

for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%I"
set "TEMP=%TEMP%\GVS-RU-PQ-%STAMP%"
set "BACKUP=%ROOT%_backup-ru-phu-quoc-cluster-%STAMP%"

echo Project: %ROOT%
echo Backup:  %BACKUP%
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -LiteralPath '%PAYLOAD%' -DestinationPath '%TEMP%' -Force"
if errorlevel 1 goto fail

if not exist "%TEMP%\lib\russian-phu-quoc-cluster.ts" goto fail
if not exist "%TEMP%\components\RussianPhuQuocGuidePage.tsx" goto fail

echo [1/3] Backup file cu neu trung duong dan...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$src=[IO.Path]::GetFullPath('%TEMP%');$dst=[IO.Path]::GetFullPath('%ROOT%');$bak=[IO.Path]::GetFullPath('%BACKUP%');Get-ChildItem -LiteralPath $src -File -Recurse ^| ForEach-Object {$rel=$_.FullName.Substring($src.Length).TrimStart('\');$target=Join-Path $dst $rel;if(Test-Path -LiteralPath $target){$save=Join-Path $bak $rel;New-Item -ItemType Directory -Force -Path (Split-Path $save) ^| Out-Null;Copy-Item -LiteralPath $target -Destination $save -Force}}"
if errorlevel 1 goto fail

echo [2/3] Copy cluster vao project...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$ErrorActionPreference='Stop';$src=(Resolve-Path -LiteralPath '%TEMP%').Path;$dst=(Resolve-Path -LiteralPath '%ROOT%').Path;Get-ChildItem -LiteralPath $src -File -Recurse ^| ForEach-Object {$rel=$_.FullName.Substring($src.Length).TrimStart('\');$target=Join-Path $dst $rel;New-Item -ItemType Directory -Force -Path (Split-Path $target) ^| Out-Null;Copy-Item -LiteralPath $_.FullName -Destination $target -Force;Write-Host ('  OK  '+$rel)}"
if errorlevel 1 goto fail

echo [3/3] Don temp...
rmdir /s /q "%TEMP%" 2>nul

echo.
echo =========================================================
echo   [OK] DA CAI CLUSTER
echo =========================================================
echo Hub:     https://www.govietstay.com/ru/phu-quoc
echo Sitemap: https://www.govietstay.com/ru/phu-quoc/sitemap.xml
echo.
echo Tiep theo:
echo 02-PATCH-HELP-VISUAL-LOGO.bat
echo 03-CHECK-FILES-RU-PHU-QUOC.bat
echo 04-BUILD-CHECK-RU-PHU-QUOC.bat
echo.
pause
exit /b 0

:fail
echo.
echo [LOI] Cai cluster that bai. KHONG push gi.
rmdir /s /q "%TEMP%" 2>nul
pause
exit /b 1
