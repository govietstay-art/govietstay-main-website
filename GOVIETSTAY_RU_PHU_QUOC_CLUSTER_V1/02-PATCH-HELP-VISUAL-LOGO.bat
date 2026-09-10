@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - Patch Phu Quoc Help Visual
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

set "FILE=%ROOT%app\ru\phu-quoc-help\page.tsx"
if not exist "%FILE%" (
  echo [LOI] Khong tim thay %FILE%
  pause
  exit /b 1
)

for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%I"
copy /Y "%FILE%" "%FILE%.before-visual-%STAMP%.bak" >nul

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$p='%FILE%';$t=Get-Content -LiteralPath $p -Raw -Encoding UTF8;" ^
 "$t=$t.Replace('/tour/phuquoc/tour-01-1.jpg','/phu-quoc/ru-cluster/hero-sunset.png');" ^
 "$old='<Link href=""/ru"" className=""text-xl font-black tracking-tight"">`r`n              GoVietStay`r`n            </Link>';" ^
 "$new='<Link href=""/ru"" className=""inline-flex rounded-2xl bg-white/95 p-2 shadow-lg"">`r`n              <Image`r`n                src=""/brand/govietstay-official-logo.jpg""`r`n                alt=""GoVietStay — Trusted Local Support""`r`n                width={300}`r`n                height={110}`r`n                className=""h-12 w-auto object-contain sm:h-14""`r`n              />`r`n            </Link>';" ^
 "if($t.Contains($old)){$t=$t.Replace($old,$new)} else {$t=$t -replace '<Link href=""/ru"" className=""text-xl font-black tracking-tight"">\s*GoVietStay\s*</Link>',$new};" ^
 "Set-Content -LiteralPath $p -Value $t -Encoding UTF8;Write-Host '[OK] Da doi hero va logo official tren /ru/phu-quoc-help.'"
if errorlevel 1 (
  echo [LOI] Patch help that bai.
  pause
  exit /b 1
)
echo.
echo [OK] Xong. Hay chay build de kiem tra.
pause
