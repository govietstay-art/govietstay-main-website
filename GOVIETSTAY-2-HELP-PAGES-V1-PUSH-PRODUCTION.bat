@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - PUSH 2 Help Pages to Production

echo.
echo ============================================================
echo  GoVietStay - 2 HELP PAGES V1 - PRODUCTION PUSH
echo  Build -> Commit -> Push main -> Vercel auto deploy
echo ============================================================
echo.

set "ROOT=%~dp0"

:findroot
if exist "%ROOT%package.json" if exist "%ROOT%app\travel" goto rootfound
for %%I in ("%ROOT%..") do set "PARENT=%%~fI\"
if /I "%PARENT%"=="%ROOT%" goto askroot
set "ROOT=%PARENT%"
goto findroot

:askroot
echo BAT khong nam trong thu muc GoVietStay.
set /p ROOT=Paste full path to govietstay-main-website: 
if "%ROOT%"=="" goto fail
if not "%ROOT:~-1%"=="\" set "ROOT=%ROOT%\"
if not exist "%ROOT%package.json" goto fail
if not exist "%ROOT%app\travel" goto fail

:rootfound
cd /d "%ROOT%"
echo [OK] Repository:
echo %CD%
echo.

for /f "usebackq tokens=*" %%B in (`git branch --show-current 2^>nul`) do set "BRANCH=%%B"
if /I not "%BRANCH%"=="main" (
  echo [STOP] Current branch is "%BRANCH%".
  echo Please switch to main first, then run this BAT again.
  goto fail
)

echo [1/7] Checking the 4 approved V1 files...
if not exist "components\travel-support\TravelSupportPage.tsx" (
  echo [STOP] Missing components\travel-support\TravelSupportPage.tsx
  goto fail
)
if not exist "components\travel-support\travel-support.css" (
  echo [STOP] Missing components\travel-support\travel-support.css
  goto fail
)
if not exist "app\travel\vietnam-local-help\page.tsx" (
  echo [STOP] Missing app\travel\vietnam-local-help\page.tsx
  goto fail
)
if not exist "app\travel\vietnam-tet-travel-guide\page.tsx" (
  echo [STOP] Missing app\travel\vietnam-tet-travel-guide\page.tsx
  goto fail
)
echo [OK] All 4 files found.
echo.

echo [2/7] Confirming official logo...
if not exist "public\brand\govietstay-official-logo.jpg" (
  echo [STOP] Official logo missing: public\brand\govietstay-official-logo.jpg
  goto fail
)
echo [OK] Official GoVietStay logo found.
echo.

echo [3/7] Staging ONLY the 4 approved files...
git add -- "components/travel-support/TravelSupportPage.tsx"
if errorlevel 1 goto fail
git add -- "components/travel-support/travel-support.css"
if errorlevel 1 goto fail
git add -- "app/travel/vietnam-local-help/page.tsx"
if errorlevel 1 goto fail
git add -- "app/travel/vietnam-tet-travel-guide/page.tsx"
if errorlevel 1 goto fail

git diff --cached --quiet
if errorlevel 1 (
  echo [4/7] Creating production commit...
  git commit -m "feat(travel): add Vietnam local help and Tet 2027 guide"
  if errorlevel 1 goto fail
) else (
  echo [4/7] No new staged diff. The files may already be committed.
)
echo.

echo [5/7] Syncing with latest origin/main...
git pull --rebase --autostash origin main
if errorlevel 1 (
  echo.
  echo [STOP] Rebase failed. Nothing was pushed.
  echo Resolve the Git conflict first, then run this BAT again.
  goto fail
)
echo.

echo [6/7] Running final production build after sync...
call npm run build
if errorlevel 1 (
  echo.
  echo [STOP] BUILD FAILED. Nothing was pushed to Vercel.
  goto fail
)
echo.
echo [OK] BUILD PASSED.
echo.

echo [7/7] Pushing main to GitHub...
git push origin main
if errorlevel 1 (
  echo.
  echo [STOP] Git push failed. Vercel was not triggered.
  goto fail
)

echo.
echo ============================================================
echo  PUSH COMPLETE
echo  Vercel Git integration should now auto-deploy production.
echo ============================================================
echo.
echo Waiting for the two public URLs to become available...
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command ^
"$ErrorActionPreference='SilentlyContinue';" ^
"$urls=@('https://www.govietstay.com/travel/vietnam-local-help','https://www.govietstay.com/travel/vietnam-tet-travel-guide');" ^
"for($i=1;$i -le 30;$i++){" ^
"  $ok=$true;" ^
"  foreach($u in $urls){" ^
"    try{$r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 15; if($r.StatusCode -ne 200){$ok=$false}}catch{$ok=$false}" ^
"  };" ^
"  if($ok){Write-Host ''; Write-Host '[LIVE] Both pages are returning HTTP 200.' -ForegroundColor Green; exit 0};" ^
"  Write-Host ('Waiting for Vercel... attempt '+$i+'/30'); Start-Sleep -Seconds 10" ^
"};" ^
"Write-Host ''; Write-Host '[INFO] Push succeeded, but production is still building or propagating.' -ForegroundColor Yellow; exit 0"

echo.
echo Live URLs:
echo https://www.govietstay.com/travel/vietnam-local-help
echo https://www.govietstay.com/travel/vietnam-tet-travel-guide
echo.
echo IMPORTANT:
echo - Only the 4 approved V1 files were staged by this BAT.
echo - Official logo path remains /brand/govietstay-official-logo.jpg
echo - WhatsApp remains +84 937 762 607
echo - Keywords remain LOCAL HELP and TET 2027 HELP
echo.
pause
endlocal
exit /b 0

:fail
echo.
echo ============================================================
echo  STOPPED - NO NEW PRODUCTION PUSH FROM THIS STEP
echo ============================================================
echo.
pause
endlocal
exit /b 1
