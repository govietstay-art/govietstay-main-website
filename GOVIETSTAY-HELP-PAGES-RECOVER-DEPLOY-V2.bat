@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay - RECOVER PUSH / DIRECT VERCEL DEPLOY

echo.
echo ============================================================
echo  GoVietStay - RECOVERY DEPLOY
echo  Existing local commit -> GitHub retry -> Vercel fallback
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
echo BAT is not inside the GoVietStay repository.
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
  echo [STOP] Current branch is "%BRANCH%". Expected main.
  goto fail
)

echo [1/5] Confirming the two pages exist locally...
if not exist "app\travel\vietnam-local-help\page.tsx" goto missing
if not exist "app\travel\vietnam-tet-travel-guide\page.tsx" goto missing
if not exist "components\travel-support\TravelSupportPage.tsx" goto missing
if not exist "components\travel-support\travel-support.css" goto missing
echo [OK] V1 files found.
echo.

echo [2/5] Local commit status:
git log -1 --oneline
echo.
git status --short
echo.

echo [3/5] Testing github.com:443...
powershell.exe -NoProfile -Command ^
"$r=Test-NetConnection github.com -Port 443 -WarningAction SilentlyContinue; if($r.TcpTestSucceeded){Write-Host '[OK] github.com:443 reachable' -ForegroundColor Green; exit 0}else{Write-Host '[WARN] github.com:443 not reachable right now' -ForegroundColor Yellow; exit 1}"
set "GHNET=%ERRORLEVEL%"
echo.

echo [4/5] Retrying GitHub push up to 6 times...
set "PUSH_OK=0"
for /L %%N in (1,1,6) do (
  echo.
  echo ---- GitHub push attempt %%N/6 ----
  git -c http.version=HTTP/1.1 push origin main
  if not errorlevel 1 (
    set "PUSH_OK=1"
    goto pushed
  )
  if %%N LSS 6 (
    echo GitHub is still unreachable. Waiting 15 seconds...
    timeout /t 15 /nobreak >nul
  )
)

:pushed
if "%PUSH_OK%"=="1" (
  echo.
  echo [OK] GitHub push succeeded.
  echo Vercel Git integration should now start production deployment.
  goto waitlive
)

echo.
echo ============================================================
echo  GitHub is still unreachable from this computer.
echo  Trying DIRECT VERCEL deploy from the local source instead.
echo ============================================================
echo.

if not exist ".vercel\project.json" (
  echo [STOP] .vercel\project.json was not found.
  echo Direct deploy is intentionally NOT auto-linked to avoid deploying to the wrong project.
  echo Your local commit is safe. Retry this BAT when GitHub is reachable.
  goto fail
)

echo [5/5] Vercel project link found:
type ".vercel\project.json"
echo.

where vercel >nul 2>&1
if not errorlevel 1 (
  echo Using installed Vercel CLI...
  call vercel --prod --yes
  if errorlevel 1 goto directfail
  goto directsuccess
)

echo Vercel CLI is not installed. Trying npx vercel...
call npx --yes vercel@latest --prod --yes
if errorlevel 1 goto directfail

:directsuccess
echo.
echo [OK] Direct Vercel production deploy command completed.
echo NOTE: GitHub main may still be behind until the local commit is pushed later.
goto waitlive

:waitlive
echo.
echo Waiting for production URLs to return HTTP 200...
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command ^
"$ErrorActionPreference='SilentlyContinue';" ^
"$urls=@('https://www.govietstay.com/travel/vietnam-local-help','https://www.govietstay.com/travel/vietnam-tet-travel-guide');" ^
"for($i=1;$i -le 36;$i++){" ^
" $all=$true;" ^
" foreach($u in $urls){try{$r=Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 15; if($r.StatusCode -ne 200){$all=$false}}catch{$all=$false}};" ^
" if($all){Write-Host ''; Write-Host '[LIVE] BOTH GOVIETSTAY PAGES ARE LIVE.' -ForegroundColor Green; exit 0};" ^
" Write-Host ('Waiting for production... '+$i+'/36'); Start-Sleep -Seconds 10" ^
"};" ^
"Write-Host ''; Write-Host '[INFO] Deployment may still be propagating. Check the URLs again shortly.' -ForegroundColor Yellow; exit 0"

echo.
echo Public URLs:
echo https://www.govietstay.com/travel/vietnam-local-help
echo https://www.govietstay.com/travel/vietnam-tet-travel-guide
echo.
pause
endlocal
exit /b 0

:missing
echo [STOP] One or more V1 page files are missing.
echo Run the V1 installer BAT first.
goto fail

:directfail
echo.
echo [STOP] Direct Vercel deploy also failed.
echo Your source files and local Git commit remain safe.
echo Send a screenshot of the error shown above.
goto fail

:fail
echo.
echo No files were deleted.
echo No rollback was performed.
echo.
pause
endlocal
exit /b 1
