@echo off
setlocal EnableExtensions EnableDelayedExpansion
title GoVietStay - Deploy Phu Quoc V3.1 safely

set "REPO=%USERPROFILE%\Documents\GitHub\govietstay-main-website"
set "BRANCH=main"

echo.
echo ============================================================
echo   GOVIETSTAY - DEPLOY PHU QUOC V3.1
echo   EN + RU / Published Rate / Booking / Deposit
echo ============================================================
echo.

if not exist "%REPO%\package.json" (
  if exist "%CD%\package.json" (
    set "REPO=%CD%"
  ) else (
    echo [ERROR] Khong tim thay repo govietstay-main-website.
    pause
    exit /b 1
  )
)

cd /d "%REPO%"
echo [1/8] Repo: %CD%
echo.

echo [2/8] Kiem tra branch...
for /f "delims=" %%B in ('git branch --show-current') do set "CURRENT=%%B"
echo Current branch: !CURRENT!
if /i not "!CURRENT!"=="%BRANCH%" (
  echo [STOP] Dang o branch !CURRENT!, khong phai %BRANCH%.
  echo Chuyen ve main va chay lai de tranh push nham.
  pause
  exit /b 1
)

echo.
echo [3/8] Kiem tra cac file Phu Quoc bat buoc...
set "MISSING=0"
for %%F in (
  "app\tours\phu-quoc\page.tsx"
  "app\ru\tours\phu-quoc\page.tsx"
  "app\api\phu-quoc-booking-request\route.ts"
  "components\PhuQuocJohnsCatalog.tsx"
  "lib\phuQuocJohnsInternal.ts"
  "lib\phuQuocPublishedRates.ts"
) do (
  if not exist "%%~F" (
    echo [MISSING] %%~F
    set "MISSING=1"
  )
)
if "!MISSING!"=="1" (
  echo [STOP] Thieu file bat buoc. Khong deploy.
  pause
  exit /b 1
)
echo OK.

echo.
echo [4/8] Build production lan cuoi...
if exist ".next" rmdir /s /q ".next"
call npm run build
if errorlevel 1 (
  echo.
  echo [STOP] BUILD FAIL. Khong commit / khong push.
  pause
  exit /b 1
)
echo [OK] BUILD PASS.

echo.
echo [5/8] Stage CHI cac file Phu Quoc V3.1...
git reset >nul 2>&1
git add -- "app/tours/phu-quoc/page.tsx"
git add -- "app/ru/tours/phu-quoc/page.tsx"
git add -- "app/api/phu-quoc-booking-request/route.ts"
git add -- "components/PhuQuocJohnsCatalog.tsx"
git add -- "lib/phuQuocJohnsInternal.ts"
git add -- "lib/phuQuocPublishedRates.ts"
if exist "public\tour\phuquoc\johns" git add -- "public/tour/phuquoc/johns"

echo.
echo ===== STAGED FILES =====
git diff --cached --name-status
echo ========================
echo.

for /f %%C in ('git diff --cached --name-only ^| find /c /v ""') do set "COUNT=%%C"
if "!COUNT!"=="0" (
  echo [INFO] Khong co thay doi moi de commit.
  echo Co the code nay da duoc commit truoc do.
  echo.
  git status --short
  pause
  exit /b 0
)

echo [6/8] Commit...
git commit -m "feat: upgrade Phu Quoc EN RU tours booking and deposit"
if errorlevel 1 (
  echo [STOP] Commit that bai. Khong push.
  pause
  exit /b 1
)

echo.
echo [7/8] Push origin %BRANCH%...
git push origin %BRANCH%
if errorlevel 1 (
  echo.
  echo [STOP] Push that bai.
  echo Commit van nam local, khong mat du lieu.
  pause
  exit /b 1
)

echo.
echo [8/8] Hoan tat.
echo ============================================================
echo   DEPLOY PUSHED SUCCESSFULLY
echo ============================================================
echo.
echo Vercel se tu build/deploy neu repo dang ket noi nhu hien tai.
echo.
echo URL GIU NGUYEN:
echo EN: https://www.govietstay.com/tours/phu-quoc
echo RU: https://www.govietstay.com/ru/tours/phu-quoc
echo.
echo Sau khi Vercel deploy xong, refresh 2 URL tren de kiem tra.
echo.
git status --short
echo.
pause
exit /b 0
