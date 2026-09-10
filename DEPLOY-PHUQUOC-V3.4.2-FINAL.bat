@echo off
setlocal EnableExtensions EnableDelayedExpansion
title GoVietStay - Deploy Phu Quoc V3.4.2 Logo Swap

set "REPO=%USERPROFILE%\Documents\GitHub\govietstay-main-website"

echo.
echo ============================================================
echo   GOVIETSTAY - DEPLOY PHU QUOC V3.4.2
echo   TOP LOGO ONLY + PHU QUOC LOGO
echo   ONLY stages 2 files
echo ============================================================
echo.

if not exist "%REPO%\package.json" (
  if exist "%CD%\package.json" (
    set "REPO=%CD%"
  ) else (
    echo [ERROR] Cannot find govietstay-main-website repo.
    pause
    exit /b 1
  )
)

cd /d "%REPO%"
echo [1/7] Repo: %CD%

for /f "delims=" %%B in ('git branch --show-current') do set "CURRENT=%%B"
if /i not "!CURRENT!"=="main" (
  echo [STOP] Current branch is !CURRENT!, expected main.
  pause
  exit /b 1
)
echo [2/7] Branch OK: main

if not exist "components\PhuQuocJohnsCatalog.tsx" (
  echo [STOP] Missing components\PhuQuocJohnsCatalog.tsx
  pause
  exit /b 1
)

if not exist "public\brand\govietstay-phu-quoc-logo.png" (
  echo [STOP] Missing public\brand\govietstay-phu-quoc-logo.png
  pause
  exit /b 1
)

echo.
echo [3/7] Final production build...
if exist ".next" rmdir /s /q ".next"
call npm run build
if errorlevel 1 (
  echo.
  echo [STOP] BUILD FAILED. Nothing committed / nothing pushed.
  pause
  exit /b 1
)
echo [OK] BUILD PASS.

echo.
echo [4/7] Stage ONLY V3.4.2 files...
git reset >nul 2>&1
git add -- "components/PhuQuocJohnsCatalog.tsx"
git add -- "public/brand/govietstay-phu-quoc-logo.png"

echo.
echo ===== STAGED FILES =====
git diff --cached --name-status
echo ========================
echo.

for /f %%C in ('git diff --cached --name-only ^| find /c /v ""') do set "COUNT=%%C"
if not "!COUNT!"=="2" (
  echo [STOP] Expected exactly 2 staged files, found !COUNT!.
  git diff --cached --name-status
  git reset
  pause
  exit /b 1
)

set "HASCOMP=0"
set "HASLOGO=0"
for /f "delims=" %%F in ('git diff --cached --name-only') do (
  if /i "%%F"=="components/PhuQuocJohnsCatalog.tsx" set "HASCOMP=1"
  if /i "%%F"=="public/brand/govietstay-phu-quoc-logo.png" set "HASLOGO=1"
)

if not "!HASCOMP!"=="1" (
  echo [STOP] Component file not staged.
  git reset
  pause
  exit /b 1
)

if not "!HASLOGO!"=="1" (
  echo [STOP] Logo file not staged.
  git reset
  pause
  exit /b 1
)

echo [5/7] Commit...
git commit -m "fix: use Phu Quoc brand logo in tour hero"
if errorlevel 1 (
  echo [STOP] Commit failed. Nothing pushed.
  pause
  exit /b 1
)

echo.
echo [6/7] Push origin main...
git push origin main
if errorlevel 1 (
  echo [STOP] Push failed. Local commit remains safe.
  pause
  exit /b 1
)

echo.
echo [7/7] Complete.
echo ============================================================
echo   SUCCESS - PHU QUOC V3.4.2 PUSHED
echo ============================================================
echo.
echo Live result after Vercel deploy:
echo - Only one logo at the top
echo - New GoVietStay Phu Quoc logo
echo - No second logo over hero image
echo - WhatsApp / mobile / Russian guide note unchanged
echo.
echo URLs unchanged:
echo EN: https://www.govietstay.com/tours/phu-quoc
echo RU: https://www.govietstay.com/ru/tours/phu-quoc
echo.
echo Other untracked files were NOT staged or pushed.
echo.
pause
exit /b 0
