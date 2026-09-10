@echo off
setlocal EnableExtensions EnableDelayedExpansion
title GoVietStay - Verify and Deploy Phu Quoc V3.2.1

set "REPO=%USERPROFILE%\Documents\GitHub\govietstay-main-website"
set "BRANCH=main"
set "TARGET=components\PhuQuocJohnsCatalog.tsx"

echo.
echo ============================================================
echo   GOVIETSTAY PHU QUOC V3.2.1
echo   VERIFY EXISTING PATCH -> BUILD -> PUSH
echo   Does NOT re-run the patch
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

if not exist "%TARGET%" (
  echo [STOP] Missing %TARGET%
  pause
  exit /b 1
)

for /f "delims=" %%B in ('git branch --show-current') do set "CURRENT=%%B"
if /i not "!CURRENT!"=="%BRANCH%" (
  echo [STOP] Current branch is !CURRENT!, expected %BRANCH%.
  pause
  exit /b 1
)
echo [2/8] Branch OK: !CURRENT!

echo.
echo [3/8] Verify V3.2.1 content is already present...

findstr /c:"published:\"Цена тура\"" "%TARGET%" >nul
if errorlevel 1 (
  echo [STOP] RU new price label not found. Patch may not be applied.
  pause
  exit /b 1
)

findstr /c:"published:\"Tour price\"" "%TARGET%" >nul
if errorlevel 1 (
  echo [STOP] EN new price label not found. Patch may not be applied.
  pause
  exit /b 1
)

findstr /c:"Юридическая информация и исполнение услуг" "%TARGET%" >nul
if errorlevel 1 (
  echo [STOP] RU Legal section not found.
  pause
  exit /b 1
)

findstr /c:"Legal & service information" "%TARGET%" >nul
if errorlevel 1 (
  echo [STOP] EN Legal section not found.
  pause
  exit /b 1
)

findstr /c:"GoVietStay booking · John’s Tours operation" "%TARGET%" >nul
if not errorlevel 1 (
  echo [STOP] Old supplier-facing hero text is still present.
  pause
  exit /b 1
)

findstr /c:"Supplier media ·" "%TARGET%" >nul
if not errorlevel 1 (
  echo [STOP] Old supplier-media label is still present.
  pause
  exit /b 1
)

echo [OK] V3.2.1 branding/legal changes verified.

echo.
echo [4/8] Production build...
if exist ".next" rmdir /s /q ".next"
call npm run build
if errorlevel 1 (
  echo.
  echo [STOP] BUILD FAILED. Nothing committed / pushed.
  pause
  exit /b 1
)
echo [OK] BUILD PASS.

echo.
echo [5/8] Stage ONLY the Phu Quoc catalog component...
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
echo Staged:
git diff --cached --name-status

echo.
echo [6/8] Commit...
git commit -m "fix: move Phu Quoc supplier disclosure to legal section"
if errorlevel 1 (
  echo.
  echo [INFO] Commit was not created. This can happen if this exact change is already committed.
  echo Checking whether origin/main already contains it...
  git reset >nul 2>&1
  git status --short
  pause
  exit /b 0
)

echo.
echo [7/8] Push origin %BRANCH%...
git push origin %BRANCH%
if errorlevel 1 (
  echo [STOP] Push failed. Local commit remains safe.
  pause
  exit /b 1
)

echo.
echo [8/8] Complete.
echo ============================================================
echo  DEPLOY PUSHED SUCCESSFULLY - PHU QUOC V3.2.1
echo ============================================================
echo.
echo Customer-facing:
echo   GoVietStay only in hero / tour prices / booking / deposit
echo   Supplier disclosure only in collapsed Legal section at bottom
echo.
echo URLs unchanged:
echo   EN: https://www.govietstay.com/tours/phu-quoc
echo   RU: https://www.govietstay.com/ru/tours/phu-quoc
echo.
echo Other untracked files were NOT staged.
echo.
git status --short
echo.
pause
exit /b 0
