@echo off
setlocal EnableExtensions EnableDelayedExpansion
title GoVietStay - Deploy Phu Quoc V3.4.1

set "REPO=%USERPROFILE%\Documents\GitHub\govietstay-main-website"
set "TARGET=components\PhuQuocJohnsCatalog.tsx"

echo.
echo ============================================================
echo   GOVIETSTAY - DEPLOY PHU QUOC V3.4.1
echo   Logo + WhatsApp + Mobile + Russian Guide Note
echo   ONLY stages 1 file
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

if not exist "%TARGET%" (
  echo [STOP] Missing %TARGET%
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
echo [4/7] Stage ONLY:
echo       %TARGET%
git reset >nul 2>&1
git add -- "%TARGET%"

for /f %%C in ('git diff --cached --name-only ^| find /c /v ""') do set "COUNT=%%C"
if not "!COUNT!"=="1" (
  echo [STOP] Expected exactly 1 staged file, found !COUNT!.
  git diff --cached --name-status
  git reset
  pause
  exit /b 1
)

for /f "delims=" %%F in ('git diff --cached --name-only') do set "STAGED=%%F"
if /i not "!STAGED!"=="components/PhuQuocJohnsCatalog.tsx" (
  echo [STOP] Unexpected staged file: !STAGED!
  git reset
  pause
  exit /b 1
)

echo.
echo ===== STAGED FILE =====
git diff --cached --name-status
echo =======================

echo.
echo [5/7] Commit...
git commit -m "feat: improve Phu Quoc mobile branding WhatsApp and Russian guide CTA"
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
echo   SUCCESS - PHU QUOC V3.4.1 PUSHED
echo ============================================================
echo.
echo Live changes after Vercel deploy:
echo - Official GoVietStay logo in hero
echo - Floating WhatsApp bottom CTA
echo - Mobile-safe layout and spacing
echo - Join-in tours clearly use English-speaking guide
echo - Russian-speaking guide: contact GoVietStay for best available quote
echo.
echo URLs unchanged:
echo EN: https://www.govietstay.com/tours/phu-quoc
echo RU: https://www.govietstay.com/ru/tours/phu-quoc
echo.
echo Other untracked files were NOT staged or pushed.
echo.
pause
exit /b 0
