@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - Add RU Phu Quoc Internal Link
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

set "FILE=%ROOT%components\RussianInternalLinks.tsx"
if not exist "%FILE%" (
  echo [LOI] Khong tim thay RussianInternalLinks.tsx
  pause
  exit /b 1
)
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$p='%FILE%';$t=Get-Content -LiteralPath $p -Raw -Encoding UTF8;if($t -match '""/ru/phu-quoc""'){Write-Host '[SKIP] Link da ton tai.';exit 0};$needle='  [""Туры на Фукуоке"", ""/ru/tours/phu-quoc""],';if(-not $t.Contains($needle)){Write-Host '[LOI] Khong tim thay dong mau. Khong sua file.';exit 1};Copy-Item $p ($p+'.before-phu-quoc-cluster.bak') -Force;$insert=$needle+""`r`n""+'  [""Гид по Фукуоку"", ""/ru/phu-quoc""],';$t=$t.Replace($needle,$insert);Set-Content -LiteralPath $p -Value $t -Encoding UTF8;Write-Host '[OK] Da them internal link /ru/phu-quoc.'"
if errorlevel 1 (
  pause
  exit /b 1
)
echo.
echo [OK] Xong. Nho build lai va commit file RussianInternalLinks.tsx neu anh muon day link nay.
pause
