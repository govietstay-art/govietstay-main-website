@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay - Install 6 EN Phu Quoc SEO landing pages

echo.
echo ============================================================
echo   GOVIETSTAY - 6 EN PHU QUOC SEO LANDING PAGES V1
echo   INSTALL + BACKUP + BUILD CHECK ONLY
echo   NO GIT PUSH / NO VERCEL DEPLOY
echo ============================================================
echo.

set "PACK=%~dp0"
set "REPO=%USERPROFILE%\Documents\GitHub\govietstay-main-website"

if not exist "%REPO%\package.json" (
  if exist "%CD%\package.json" (
    set "REPO=%CD%"
  ) else (
    set /p REPO=Paste full path to govietstay-main-website: 
  )
)

if not exist "%REPO%\package.json" goto badrepo
if not exist "%REPO%\app\travel" goto badrepo

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$p=Get-Content -Raw '%REPO%\package.json'|ConvertFrom-Json; if($p.name -ne 'govietstay-main-website'){exit 2}"
if errorlevel 1 goto badrepo

cd /d "%REPO%"
echo [OK] Repo: %CD%
echo.

for /f "delims=" %%B in ('git branch --show-current 2^>nul') do set "BRANCH=%%B"
if defined BRANCH (
  if /I not "!BRANCH!"=="main" (
    echo [STOP] Current branch is !BRANCH!, expected main.
    echo Nothing was changed.
    pause
    exit /b 1
  )
)

set "STAMP=%DATE:/=-%_%TIME::=-%"
set "STAMP=%STAMP: =0%"
set "BACKUP=%REPO%\.govietstay-backups\en-phuquoc-6-v1-%STAMP%"

echo [1/4] Backup existing target files if present...
for %%F in (
  "components\phu-quoc-seo\PhuQuocSeoPage.tsx"
  "components\phu-quoc-seo\phu-quoc-seo.css"
  "lib\phu-quoc-seo-pages.ts"
  "app\travel\phu-quoc-private-tour\page.tsx"
  "app\travel\phu-quoc-snorkeling\page.tsx"
  "app\travel\phu-quoc-sunset-town\page.tsx"
  "app\travel\phu-quoc-rach-vem-starfish-beach\page.tsx"
  "app\travel\where-to-stay-phu-quoc\page.tsx"
  "app\travel\phu-quoc-vinwonders-vs-safari\page.tsx"
) do (
  if exist "%%~F" (
    if not exist "%BACKUP%\%%~dpF" mkdir "%BACKUP%\%%~dpF" >nul 2>&1
    copy /Y "%%~F" "%BACKUP%\%%~F" >nul
    echo   Backup: %%~F
  )
)

echo.
echo [2/4] Copy 9 approved files...
xcopy /E /I /Y "%PACK%site-files\components\phu-quoc-seo" "%REPO%\components\phu-quoc-seo" >nul
copy /Y "%PACK%site-files\lib\phu-quoc-seo-pages.ts" "%REPO%\lib\phu-quoc-seo-pages.ts" >nul
for %%S in (
  phu-quoc-private-tour
  phu-quoc-snorkeling
  phu-quoc-sunset-town
  phu-quoc-rach-vem-starfish-beach
  where-to-stay-phu-quoc
  phu-quoc-vinwonders-vs-safari
) do (
  if not exist "%REPO%\app\travel\%%S" mkdir "%REPO%\app\travel\%%S"
  copy /Y "%PACK%site-files\app\travel\%%S\page.tsx" "%REPO%\app\travel\%%S\page.tsx" >nul
  echo   Written: app\travel\%%S\page.tsx
)

echo.
echo [3/4] Safety checks...
findstr /C:"PHU QUOC PRIVATE TOUR" "lib\phu-quoc-seo-pages.ts" >nul || goto contentfail
findstr /C:"PHU QUOC SNORKELING" "lib\phu-quoc-seo-pages.ts" >nul || goto contentfail
findstr /C:"SUNSET TOWN PHU QUOC" "lib\phu-quoc-seo-pages.ts" >nul || goto contentfail
findstr /C:"RACH VEM STARFISH BEACH" "lib\phu-quoc-seo-pages.ts" >nul || goto contentfail
findstr /C:"WHERE TO STAY PHU QUOC" "lib\phu-quoc-seo-pages.ts" >nul || goto contentfail
findstr /C:"VINWONDERS VS SAFARI" "lib\phu-quoc-seo-pages.ts" >nul || goto contentfail
echo [OK] All 6 page datasets present.

echo.
echo [4/4] Running npm build - NO DEPLOY...
if exist ".next" rmdir /s /q ".next" >nul 2>&1
call npm run build
if errorlevel 1 (
  echo.
  echo [STOP] BUILD FAILED. Nothing was pushed.
  echo Backup folder: %BACKUP%
  pause
  exit /b 1
)

echo.
echo ============================================================
echo   BUILD PASSED - 6 PAGES READY LOCALLY
echo ============================================================
echo.
echo URLs:
echo https://www.govietstay.com/travel/phu-quoc-private-tour
echo https://www.govietstay.com/travel/phu-quoc-snorkeling
echo https://www.govietstay.com/travel/phu-quoc-sunset-town
echo https://www.govietstay.com/travel/phu-quoc-rach-vem-starfish-beach
echo https://www.govietstay.com/travel/where-to-stay-phu-quoc
echo https://www.govietstay.com/travel/phu-quoc-vinwonders-vs-safari
echo.
echo Backup folder:
echo %BACKUP%
echo.
echo Next: run 02-DEPLOY-PRODUCTION.bat only after this build passes.
pause
exit /b 0

:badrepo
echo [ERROR] Cannot find correct govietstay-main-website repository.
pause
exit /b 1

:contentfail
echo [ERROR] Content safety check failed. Nothing was pushed.
pause
exit /b 1
