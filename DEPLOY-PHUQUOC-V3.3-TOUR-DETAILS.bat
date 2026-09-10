@echo off
setlocal EnableExtensions EnableDelayedExpansion
title GoVietStay - Deploy Phu Quoc V3.3 Tour Details

set "REPO=%USERPROFILE%\Documents\GitHub\govietstay-main-website"
set "BRANCH=main"

echo.
echo ============================================================
echo   GOVIETSTAY - DEPLOY PHU QUOC V3.3
echo   Detailed tour content EN + RU
echo   ONLY stages 2 Phu Quoc files
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
if /i not "!CURRENT!"=="%BRANCH%" (
  echo [STOP] Current branch is !CURRENT!, expected %BRANCH%.
  pause
  exit /b 1
)
echo [2/7] Branch OK: !CURRENT!

if not exist "components\PhuQuocJohnsCatalog.tsx" (
  echo [STOP] Missing components\PhuQuocJohnsCatalog.tsx
  pause
  exit /b 1
)

if not exist "lib\phuQuocTourDetails.ts" (
  echo [STOP] Missing lib\phuQuocTourDetails.ts
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
echo [4/7] Stage ONLY V3.3 Phu Quoc files...
git reset >nul 2>&1
git add -- "components/PhuQuocJohnsCatalog.tsx"
git add -- "lib/phuQuocTourDetails.ts"

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
set "HASDATA=0"
for /f "delims=" %%F in ('git diff --cached --name-only') do (
  if /i "%%F"=="components/PhuQuocJohnsCatalog.tsx" set "HASCOMP=1"
  if /i "%%F"=="lib/phuQuocTourDetails.ts" set "HASDATA=1"
)

if not "!HASCOMP!"=="1" (
  echo [STOP] Missing staged component file.
  git reset
  pause
  exit /b 1
)

if not "!HASDATA!"=="1" (
  echo [STOP] Missing staged detail data file.
  git reset
  pause
  exit /b 1
)

echo [5/7] Commit...
git commit -m "feat: add detailed Phu Quoc tour itineraries EN RU"
if errorlevel 1 (
  echo [STOP] Commit failed. Nothing pushed.
  pause
  exit /b 1
)

echo.
echo [6/7] Push origin %BRANCH%...
git push origin %BRANCH%
if errorlevel 1 (
  echo.
  echo [STOP] Push failed. Local commit remains safe.
  pause
  exit /b 1
)

echo.
echo [7/7] Complete.
echo ============================================================
echo   SUCCESS - PHU QUOC V3.3 PUSHED
echo ============================================================
echo.
echo Added on both EN + RU:
echo - View tour details / Подробнее
echo - Time + transport
echo - Step-by-step itinerary
echo - Included services
echo - Important notes
echo.
echo URLs unchanged:
echo EN: https://www.govietstay.com/tours/phu-quoc
echo RU: https://www.govietstay.com/ru/tours/phu-quoc
echo.
echo No duplicate tour routes were created.
echo Other untracked files were NOT staged or pushed.
echo.
pause
exit /b 0
