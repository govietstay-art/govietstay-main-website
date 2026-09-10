@echo off
setlocal EnableExtensions EnableDelayedExpansion
title RUN THIS ONLY - GoVietStay Phu Quoc FINAL Deploy

set "REPO=%USERPROFILE%\Documents\GitHub\govietstay-main-website"
set "TARGET=components\PhuQuocJohnsCatalog.tsx"

echo.
echo ============================================================
echo   RUN THIS ONLY - PHU QUOC FINAL DEPLOY
echo   NO PATCH / NO UTF8 CHECK / NO OTHER FILES
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
echo [1/6] Repo: %CD%

for /f "delims=" %%B in ('git branch --show-current') do set "CURRENT=%%B"
if /i not "!CURRENT!"=="main" (
  echo [STOP] Current branch is !CURRENT!, expected main.
  pause
  exit /b 1
)
echo [2/6] Branch OK: main

if not exist "%TARGET%" (
  echo [STOP] Missing %TARGET%
  pause
  exit /b 1
)

echo.
echo [3/6] Production build...
if exist ".next" rmdir /s /q ".next"
call npm run build
if errorlevel 1 (
  echo.
  echo [STOP] BUILD FAILED. Nothing committed / nothing pushed.
  pause
  exit /b 1
)
echo [OK] BUILD PASS

echo.
echo [4/6] Stage ONLY Phu Quoc catalog component...
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
echo Staged file:
git diff --cached --name-status

echo.
echo [5/6] Commit...
git commit -m "fix: keep Phu Quoc supplier disclosure in legal section"
if errorlevel 1 (
  echo.
  echo [STOP] Commit failed. Nothing pushed.
  echo If Git says nothing to commit, send this screen to ChatGPT.
  pause
  exit /b 1
)

echo.
echo [6/6] Push origin main...
git push origin main
if errorlevel 1 (
  echo.
  echo [STOP] Push failed. Local commit remains safe.
  pause
  exit /b 1
)

echo.
echo ============================================================
echo   SUCCESS - PHU QUOC FINAL PUSHED
echo ============================================================
echo.
echo Only this file was pushed:
echo components/PhuQuocJohnsCatalog.tsx
echo.
echo URLs unchanged:
echo EN: https://www.govietstay.com/tours/phu-quoc
echo RU: https://www.govietstay.com/ru/tours/phu-quoc
echo.
echo Other untracked files were NOT staged or pushed.
echo.
pause
exit /b 0
