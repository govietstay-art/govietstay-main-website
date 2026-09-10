@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay - Deploy 6 EN Phu Quoc SEO landing pages

echo.
echo ============================================================
echo   GOVIETSTAY - DEPLOY 6 EN PHU QUOC SEO LANDING PAGES V1
echo   STAGES ONLY 9 TARGET FILES
echo ============================================================
echo.

set "REPO=%USERPROFILE%\Documents\GitHub\govietstay-main-website"
if not exist "%REPO%\package.json" (
  if exist "%CD%\package.json" set "REPO=%CD%"
)
if not exist "%REPO%\package.json" goto badrepo

cd /d "%REPO%"
for /f "delims=" %%B in ('git branch --show-current 2^>nul') do set "BRANCH=%%B"
if /I not "!BRANCH!"=="main" (
  echo [STOP] Current branch is !BRANCH!, expected main.
  pause
  exit /b 1
)

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
  if not exist "%%~F" (
    echo [STOP] Missing %%~F
    pause
    exit /b 1
  )
)

echo [1/5] Sync origin/main with autostash...
git pull --rebase --autostash origin main
if errorlevel 1 (
  echo [STOP] Rebase failed. Nothing pushed.
  pause
  exit /b 1
)

echo.
echo [2/5] Production build...
if exist ".next" rmdir /s /q ".next" >nul 2>&1
call npm run build
if errorlevel 1 (
  echo [STOP] BUILD FAILED. Nothing committed or pushed.
  pause
  exit /b 1
)

echo.
echo [3/5] Stage ONLY the 9 landing-page files...
git reset >nul 2>&1
git add -- "components/phu-quoc-seo/PhuQuocSeoPage.tsx"
git add -- "components/phu-quoc-seo/phu-quoc-seo.css"
git add -- "lib/phu-quoc-seo-pages.ts"
git add -- "app/travel/phu-quoc-private-tour/page.tsx"
git add -- "app/travel/phu-quoc-snorkeling/page.tsx"
git add -- "app/travel/phu-quoc-sunset-town/page.tsx"
git add -- "app/travel/phu-quoc-rach-vem-starfish-beach/page.tsx"
git add -- "app/travel/where-to-stay-phu-quoc/page.tsx"
git add -- "app/travel/phu-quoc-vinwonders-vs-safari/page.tsx"

echo.
git diff --cached --name-status
echo.

git diff --cached --quiet
if not errorlevel 1 (
  echo [INFO] No new diff to commit. Files may already be deployed.
  goto verify
)

echo [4/5] Commit...
git commit -m "feat(travel): add 6 English Phu Quoc SEO landing pages"
if errorlevel 1 (
  echo [STOP] Commit failed. Nothing pushed.
  pause
  exit /b 1
)

echo.
echo [5/5] Push main...
git push origin main
if errorlevel 1 (
  echo [STOP] Push failed. Local commit remains safe.
  pause
  exit /b 1
)

:verify
echo.
echo Waiting for Vercel production URLs...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$urls=@(" ^
  "'https://www.govietstay.com/travel/phu-quoc-private-tour'," ^
  "'https://www.govietstay.com/travel/phu-quoc-snorkeling'," ^
  "'https://www.govietstay.com/travel/phu-quoc-sunset-town'," ^
  "'https://www.govietstay.com/travel/phu-quoc-rach-vem-starfish-beach'," ^
  "'https://www.govietstay.com/travel/where-to-stay-phu-quoc'," ^
  "'https://www.govietstay.com/travel/phu-quoc-vinwonders-vs-safari'" ^
  "); for($i=1;$i -le 36;$i++){ $ok=$true; foreach($u in $urls){ try{$r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 15; if($r.StatusCode -ne 200){$ok=$false}}catch{$ok=$false} }; if($ok){Write-Host '[LIVE] All 6 pages return HTTP 200.' -ForegroundColor Green; exit 0}; Write-Host ('Waiting for Vercel... '+$i+'/36'); Start-Sleep 10 }"

echo.
echo ============================================================
echo   DEPLOY STEP COMPLETE
echo ============================================================
pause
exit /b 0

:badrepo
echo [ERROR] Cannot find govietstay-main-website.
pause
exit /b 1
