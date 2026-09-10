@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay - CHAY FILE NAY DUY NHAT

echo.
echo ==============================================================
echo   GOVIETSTAY - RUSSIAN PHU QUOC FINAL
echo   CHI CAN CHAY FILE NAY - KHONG CHAY FILE CHECK RIENG
echo ==============================================================
echo.

set "ROOT="
if exist "%~dp0package.json" set "ROOT=%~dp0"
if not defined ROOT (
  for %%I in ("%~dp0..") do (
    if exist "%%~fI\package.json" if exist "%%~fI\app\ru" set "ROOT=%%~fI\"
  )
)
if not defined ROOT (
  if exist "C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\package.json" set "ROOT=C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\"
)

if not defined ROOT (
  echo [LOI] Khong tim thay govietstay-main-website.
  echo Dat NGUYEN folder nay ben trong govietstay-main-website.
  pause
  exit /b 1
)

set "PAYLOAD=%~dp0RU-PHU-QUOC-CLUSTER-PAYLOAD.zip"
if not exist "%PAYLOAD%" (
  echo [LOI] Thieu RU-PHU-QUOC-CLUSTER-PAYLOAD.zip
  echo KHONG tach file BAT ra khoi folder nay.
  pause
  exit /b 1
)

echo [OK] Project:
echo %ROOT%
echo.

cd /d "%ROOT%"

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo [LOI] Khong phai Git repo.
  pause
  exit /b 1
)

for /f "delims=" %%B in ('git branch --show-current') do set "BRANCH=%%B"
if /I not "%BRANCH%"=="main" (
  echo [LOI] Branch hien tai: %BRANCH%
  echo Can dung main.
  pause
  exit /b 1
)

git diff --cached --quiet
if errorlevel 1 (
  echo [DUNG] Dang co file staged tu truoc. De tranh commit nham, em khong tiep tuc.
  git status --short
  pause
  exit /b 2
)

echo ==============================================================
echo   1/8 SYNC GITHUB MAIN
echo ==============================================================
git fetch origin main
if errorlevel 1 goto gitfail

git rebase --autostash origin/main
if errorlevel 1 (
  git rebase --abort >nul 2>&1
  echo [LOI] Rebase conflict. Da abort. KHONG push.
  pause
  exit /b 1
)

echo.
echo ==============================================================
echo   2/8 INSTALL CLUSTER
echo ==============================================================
for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%I"
set "TEMP=%TEMP%\GVS-RU-PQ-FINAL-!STAMP!"
set "BACKUP=%ROOT%_backup-ru-pq-final-!STAMP!"

powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -LiteralPath '%PAYLOAD%' -DestinationPath '!TEMP!' -Force"
if errorlevel 1 goto installfail

if not exist "!TEMP!\app\ru\phu-quoc\page.tsx" goto installfail
if not exist "!TEMP!\lib\russian-phu-quoc-cluster.ts" goto installfail

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$src=[IO.Path]::GetFullPath('!TEMP!');$dst=[IO.Path]::GetFullPath('%ROOT%');$bak=[IO.Path]::GetFullPath('!BACKUP!');Get-ChildItem -LiteralPath $src -File -Recurse | ForEach-Object {$rel=$_.FullName.Substring($src.Length).TrimStart('\');$target=Join-Path $dst $rel;if(Test-Path -LiteralPath $target){$save=Join-Path $bak $rel;New-Item -ItemType Directory -Force -Path (Split-Path $save) | Out-Null;Copy-Item -LiteralPath $target -Destination $save -Force}}"
if errorlevel 1 goto installfail

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$ErrorActionPreference='Stop';$src=(Resolve-Path -LiteralPath '!TEMP!').Path;$dst=(Resolve-Path -LiteralPath '%ROOT%').Path;Get-ChildItem -LiteralPath $src -File -Recurse | ForEach-Object {$rel=$_.FullName.Substring($src.Length).TrimStart('\');$target=Join-Path $dst $rel;New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null;Copy-Item -LiteralPath $_.FullName -Destination $target -Force;Write-Host ('  OK  '+$rel)}"
if errorlevel 1 goto installfail

rmdir /s /q "!TEMP!" 2>nul

echo.
echo ==============================================================
echo   3/8 PATCH HELP VISUAL + OFFICIAL LOGO + INTERNAL LINK
echo ==============================================================
set "GVS_ROOT=%ROOT%"
powershell -NoProfile -ExecutionPolicy Bypass -EncodedCommand CgAkAEUAcgByAG8AcgBBAGMAdABpAG8AbgBQAHIAZQBmAGUAcgBlAG4AYwBlACAAPQAgACcAUwB0AG8AcAAnAAoAJAByAG8AbwB0ACAAPQAgACQAZQBuAHYAOgBHAFYAUwBfAFIATwBPAFQACgBpAGYAIAAoAFsAcwB0AHIAaQBuAGcAXQA6ADoASQBzAE4AdQBsAGwATwByAFcAaABpAHQAZQBTAHAAYQBjAGUAKAAkAHIAbwBvAHQAKQApACAAewAgAHQAaAByAG8AdwAgACcATQBpAHMAcwBpAG4AZwAgAEcAVgBTAF8AUgBPAE8AVAAnACAAfQAKAAoAJABoAGUAbABwACAAPQAgAEoAbwBpAG4ALQBQAGEAdABoACAAJAByAG8AbwB0ACAAJwBhAHAAcABcAHIAdQBcAHAAaAB1AC0AcQB1AG8AYwAtAGgAZQBsAHAAXABwAGEAZwBlAC4AdABzAHgAJwAKAGkAZgAgACgAVABlAHMAdAAtAFAAYQB0AGgAIAAtAEwAaQB0AGUAcgBhAGwAUABhAHQAaAAgACQAaABlAGwAcAApACAAewAKACAAIAAgACAAJAB0ACAAPQAgAEcAZQB0AC0AQwBvAG4AdABlAG4AdAAgAC0ATABpAHQAZQByAGEAbABQAGEAdABoACAAJABoAGUAbABwACAALQBSAGEAdwAgAC0ARQBuAGMAbwBkAGkAbgBnACAAVQBUAEYAOAAKACAAIAAgACAAJABjAGgAYQBuAGcAZQBkACAAPQAgACQAZgBhAGwAcwBlAAoAIAAgACAAIABpAGYAIAAoACQAdAAuAEMAbwBuAHQAYQBpAG4AcwAoACcALwB0AG8AdQByAC8AcABoAHUAcQB1AG8AYwAvAHQAbwB1AHIALQAwADEALQAxAC4AagBwAGcAJwApACkAIAB7AAoAIAAgACAAIAAgACAAIAAgACQAdAAgAD0AIAAkAHQALgBSAGUAcABsAGEAYwBlACgAJwAvAHQAbwB1AHIALwBwAGgAdQBxAHUAbwBjAC8AdABvAHUAcgAtADAAMQAtADEALgBqAHAAZwAnACwAJwAvAHAAaAB1AC0AcQB1AG8AYwAvAHIAdQAtAGMAbAB1AHMAdABlAHIALwBoAGUAcgBvAC0AcwB1AG4AcwBlAHQALgBwAG4AZwAnACkACgAgACAAIAAgACAAIAAgACAAJABjAGgAYQBuAGcAZQBkACAAPQAgACQAdAByAHUAZQAKACAAIAAgACAAfQAKACAAIAAgACAAaQBmACAAKAAkAHQAIAAtAG4AbwB0AG0AYQB0AGMAaAAgACcALwBiAHIAYQBuAGQALwBnAG8AdgBpAGUAdABzAHQAYQB5AC0AbwBmAGYAaQBjAGkAYQBsAC0AbABvAGcAbwBcAC4AagBwAGcAJwApACAAewAKACAAIAAgACAAIAAgACAAIAAkAHAAYQB0AHQAZQByAG4AIAA9ACAAJwA8AEwAaQBuAGsAIABoAHIAZQBmAD0AIgAvAHIAdQAiACAAYwBsAGEAcwBzAE4AYQBtAGUAPQAiAHQAZQB4AHQALQB4AGwAIABmAG8AbgB0AC0AYgBsAGEAYwBrACAAdAByAGEAYwBrAGkAbgBnAC0AdABpAGcAaAB0ACIAPgBcAHMAKgBHAG8AVgBpAGUAdABTAHQAYQB5AFwAcwAqADwALwBMAGkAbgBrAD4AJwAKACAAIAAgACAAIAAgACAAIAAkAHIAZQBwAGwAYQBjAGUAbQBlAG4AdAAgAD0AIABAACcACgA8AEwAaQBuAGsAIABoAHIAZQBmAD0AIgAvAHIAdQAiACAAYwBsAGEAcwBzAE4AYQBtAGUAPQAiAGkAbgBsAGkAbgBlAC0AZgBsAGUAeAAgAHIAbwB1AG4AZABlAGQALQAyAHgAbAAgAGIAZwAtAHcAaABpAHQAZQAvADkANQAgAHAALQAyACAAcwBoAGEAZABvAHcALQBsAGcAIgA+AAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgADwASQBtAGEAZwBlAAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIABzAHIAYwA9ACIALwBiAHIAYQBuAGQALwBnAG8AdgBpAGUAdABzAHQAYQB5AC0AbwBmAGYAaQBjAGkAYQBsAC0AbABvAGcAbwAuAGoAcABnACIACgAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAGEAbAB0AD0AIgBHAG8AVgBpAGUAdABTAHQAYQB5ACAAFCAgAFQAcgB1AHMAdABlAGQAIABMAG8AYwBhAGwAIABTAHUAcABwAG8AcgB0ACIACgAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAHcAaQBkAHQAaAA9AHsAMwAwADAAfQAKACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAaABlAGkAZwBoAHQAPQB7ADEAMQAwAH0ACgAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAGMAbABhAHMAcwBOAGEAbQBlAD0AIgBoAC0AMQAyACAAdwAtAGEAdQB0AG8AIABvAGIAagBlAGMAdAAtAGMAbwBuAHQAYQBpAG4AIABzAG0AOgBoAC0AMQA0ACIACgAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAALwA+AAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAAPAAvAEwAaQBuAGsAPgAKACcAQAAKACAAIAAgACAAIAAgACAAIAAkAG4AZQB3AFQAZQB4AHQAIAA9ACAAWwByAGUAZwBlAHgAXQA6ADoAUgBlAHAAbABhAGMAZQAoACQAdAAsACAAJABwAGEAdAB0AGUAcgBuACwAIAAkAHIAZQBwAGwAYQBjAGUAbQBlAG4AdAApAAoAIAAgACAAIAAgACAAIAAgAGkAZgAgACgAJABuAGUAdwBUAGUAeAB0ACAALQBuAGUAIAAkAHQAKQAgAHsACgAgACAAIAAgACAAIAAgACAAIAAgACAAIAAkAHQAIAA9ACAAJABuAGUAdwBUAGUAeAB0AAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJABjAGgAYQBuAGcAZQBkACAAPQAgACQAdAByAHUAZQAKACAAIAAgACAAIAAgACAAIAB9AAoAIAAgACAAIAB9AAoAIAAgACAAIABpAGYAIAAoACQAYwBoAGEAbgBnAGUAZAApACAAewAKACAAIAAgACAAIAAgACAAIABDAG8AcAB5AC0ASQB0AGUAbQAgAC0ATABpAHQAZQByAGEAbABQAGEAdABoACAAJABoAGUAbABwACAALQBEAGUAcwB0AGkAbgBhAHQAaQBvAG4AIAAoACQAaABlAGwAcAAgACsAIAAnAC4AYgBlAGYAbwByAGUALQByAHUALQBwAHEALQBmAGkAbgBhAGwALgBiAGEAawAnACkAIAAtAEYAbwByAGMAZQAKACAAIAAgACAAIAAgACAAIABTAGUAdAAtAEMAbwBuAHQAZQBuAHQAIAAtAEwAaQB0AGUAcgBhAGwAUABhAHQAaAAgACQAaABlAGwAcAAgAC0AVgBhAGwAdQBlACAAJAB0ACAALQBFAG4AYwBvAGQAaQBuAGcAIABVAFQARgA4AAoAIAAgACAAIAAgACAAIAAgAFcAcgBpAHQAZQAtAEgAbwBzAHQAIAAnAFsATwBLAF0AIABVAHAAZABhAHQAZQBkACAALwByAHUALwBwAGgAdQAtAHEAdQBvAGMALQBoAGUAbABwACAAdgBpAHMAdQBhAGwALwBsAG8AZwBvAC4AJwAKACAAIAAgACAAfQAgAGUAbABzAGUAIAB7AAoAIAAgACAAIAAgACAAIAAgAFcAcgBpAHQAZQAtAEgAbwBzAHQAIAAnAFsAUwBLAEkAUABdACAASABlAGwAcAAgAHYAaQBzAHUAYQBsAC8AbABvAGcAbwAgAGEAbAByAGUAYQBkAHkAIABPAEsALgAnAAoAIAAgACAAIAB9AAoAfQAKAAoAJABsAGkAbgBrAHMAIAA9ACAASgBvAGkAbgAtAFAAYQB0AGgAIAAkAHIAbwBvAHQAIAAnAGMAbwBtAHAAbwBuAGUAbgB0AHMAXABSAHUAcwBzAGkAYQBuAEkAbgB0AGUAcgBuAGEAbABMAGkAbgBrAHMALgB0AHMAeAAnAAoAaQBmACAAKABUAGUAcwB0AC0AUABhAHQAaAAgAC0ATABpAHQAZQByAGEAbABQAGEAdABoACAAJABsAGkAbgBrAHMAKQAgAHsACgAgACAAIAAgACQAdAAgAD0AIABHAGUAdAAtAEMAbwBuAHQAZQBuAHQAIAAtAEwAaQB0AGUAcgBhAGwAUABhAHQAaAAgACQAbABpAG4AawBzACAALQBSAGEAdwAgAC0ARQBuAGMAbwBkAGkAbgBnACAAVQBUAEYAOAAKACAAIAAgACAAaQBmACAAKAAkAHQAIAAtAG4AbwB0AG0AYQB0AGMAaAAgACcAIgAvAHIAdQAvAHAAaAB1AC0AcQB1AG8AYwAiACcAKQAgAHsACgAgACAAIAAgACAAIAAgACAAJABuAGUAZQBkAGwAZQAgAD0AIAAnACAAIABbACIAIgRDBEAESwQgAD0EMAQgACQEQwQ6BEMEPgQ6BDUEIgAsACAAIgAvAHIAdQAvAHQAbwB1AHIAcwAvAHAAaAB1AC0AcQB1AG8AYwAiAF0ALAAnAAoAIAAgACAAIAAgACAAIAAgAGkAZgAgACgAJAB0AC4AQwBvAG4AdABhAGkAbgBzACgAJABuAGUAZQBkAGwAZQApACkAIAB7AAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJABpAG4AcwBlAHIAdAAgAD0AIAAkAG4AZQBlAGQAbABlACAAKwAgACIAYAByAGAAbgAiACAAKwAgACcAIAAgAFsAIgATBDgENAQgAD8EPgQgACQEQwQ6BEMEPgQ6BEMEIgAsACAAIgAvAHIAdQAvAHAAaAB1AC0AcQB1AG8AYwAiAF0ALAAnAAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAAQwBvAHAAeQAtAEkAdABlAG0AIAAtAEwAaQB0AGUAcgBhAGwAUABhAHQAaAAgACQAbABpAG4AawBzACAALQBEAGUAcwB0AGkAbgBhAHQAaQBvAG4AIAAoACQAbABpAG4AawBzACAAKwAgACcALgBiAGUAZgBvAHIAZQAtAHIAdQAtAHAAcQAtAGYAaQBuAGEAbAAuAGIAYQBrACcAKQAgAC0ARgBvAHIAYwBlAAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJAB0ACAAPQAgACQAdAAuAFIAZQBwAGwAYQBjAGUAKAAkAG4AZQBlAGQAbABlACwAIAAkAGkAbgBzAGUAcgB0ACkACgAgACAAIAAgACAAIAAgACAAIAAgACAAIABTAGUAdAAtAEMAbwBuAHQAZQBuAHQAIAAtAEwAaQB0AGUAcgBhAGwAUABhAHQAaAAgACQAbABpAG4AawBzACAALQBWAGEAbAB1AGUAIAAkAHQAIAAtAEUAbgBjAG8AZABpAG4AZwAgAFUAVABGADgACgAgACAAIAAgACAAIAAgACAAIAAgACAAIABXAHIAaQB0AGUALQBIAG8AcwB0ACAAJwBbAE8ASwBdACAAQQBkAGQAZQBkACAAUgB1AHMAcwBpAGEAbgAgAGkAbgB0AGUAcgBuAGEAbAAgAGwAaQBuAGsALgAnAAoAIAAgACAAIAAgACAAIAAgAH0AIABlAGwAcwBlACAAewAKACAAIAAgACAAIAAgACAAIAAgACAAIAAgAFcAcgBpAHQAZQAtAEgAbwBzAHQAIAAnAFsAVwBBAFIATgBdACAASQBuAHQAZQByAG4AYQBsAC0AbABpAG4AawAgAGEAbgBjAGgAbwByACAAbgBvAHQAIABmAG8AdQBuAGQAOwAgAHMAawBpAHAAcABpAG4AZwAuACcACgAgACAAIAAgACAAIAAgACAAfQAKACAAIAAgACAAfQAgAGUAbABzAGUAIAB7AAoAIAAgACAAIAAgACAAIAAgAFcAcgBpAHQAZQAtAEgAbwBzAHQAIAAnAFsAUwBLAEkAUABdACAAUgB1AHMAcwBpAGEAbgAgAGkAbgB0AGUAcgBuAGEAbAAgAGwAaQBuAGsAIABhAGwAcgBlAGEAZAB5ACAAZQB4AGkAcwB0AHMALgAnAAoAIAAgACAAIAB9AAoAfQAKAA==
if errorlevel 1 (
  echo [LOI] Patch that bai. KHONG push.
  pause
  exit /b 1
)

echo.
echo ==============================================================
echo   4/8 VERIFY FILES
echo ==============================================================
set "MISSING=0"
for %%F in (
  "app\ru\phu-quoc\page.tsx"
  "app\ru\phu-quoc\[slug]\page.tsx"
  "app\ru\phu-quoc\sitemap.xml\route.ts"
  "components\RussianPhuQuocGuidePage.tsx"
  "lib\russian-phu-quoc-cluster.ts"
  "public\phu-quoc\ru-cluster\hero-sunset.png"
  "public\phu-quoc\ru-cluster\hero-islands.png"
) do (
  if exist "%ROOT%%%~F" (
    echo [OK] %%~F
  ) else (
    echo [THIEU] %%~F
    set "MISSING=1"
  )
)

if "!MISSING!"=="1" (
  echo [LOI] Van thieu file. KHONG build/push.
  pause
  exit /b 1
)

echo.
echo ==============================================================
echo   5/8 BUILD WEBSITE
echo ==============================================================
call npm run build > "%ROOT%BUILD-RU-PQ-FINAL.txt" 2>&1
set "BCODE=!ERRORLEVEL!"
type "%ROOT%BUILD-RU-PQ-FINAL.txt"

if not "!BCODE!"=="0" (
  echo.
  echo [LOI] BUILD FAIL. KHONG commit/push.
  echo Gui file: %ROOT%BUILD-RU-PQ-FINAL.txt
  pause
  exit /b !BCODE!
)

echo.
echo ==============================================================
echo   6/8 COMMIT CLUSTER
echo ==============================================================
git add -- "app/ru/phu-quoc" "components/RussianPhuQuocGuidePage.tsx" "lib/russian-phu-quoc-cluster.ts" "public/phu-quoc/ru-cluster"
if exist "%ROOT%app\ru\phu-quoc-help\page.tsx" git add -- "app/ru/phu-quoc-help/page.tsx"
if exist "%ROOT%components\RussianInternalLinks.tsx" git add -- "components/RussianInternalLinks.tsx"

git diff --cached --quiet
if not errorlevel 1 goto push_stage

git commit -m "Add Russian Phu Quoc SEO cluster for winter 2026-2027"
if errorlevel 1 goto gitfail

:push_stage
echo.
echo ==============================================================
echo   7/8 PUSH GITHUB MAIN
echo ==============================================================
git push origin main
if errorlevel 1 (
  echo Push bi tu choi. Thu sync lai 1 lan...
  git fetch origin main
  if errorlevel 1 goto gitfail
  git rebase origin/main
  if errorlevel 1 (
    git rebase --abort >nul 2>&1
    goto gitfail
  )
  call npm run build >nul 2>&1
  if errorlevel 1 (
    echo [LOI] Build sau rebase fail. KHONG push.
    pause
    exit /b 1
  )
  git push origin main
  if errorlevel 1 goto gitfail
)

echo.
echo ==============================================================
echo   8/8 DOI VERCEL + TU KIEM TRA LIVE
echo ==============================================================
echo.
echo Da push GitHub. Dang doi Vercel deploy...
echo Script se tu thu toi da 12 lan, moi lan cach 20 giay.
echo.

set "LIVEOK=0"
for /L %%N in (1,1,12) do (
  echo Lan kiem tra %%N/12...
  powershell -NoProfile -ExecutionPolicy Bypass -Command ^
   "$ProgressPreference='SilentlyContinue';try{$r=Invoke-WebRequest -UseBasicParsing -Uri 'https://www.govietstay.com/ru/phu-quoc' -Method Get -TimeoutSec 20;if([int]$r.StatusCode -eq 200){exit 0}else{exit 1}}catch{exit 1}"
  if not errorlevel 1 (
    set "LIVEOK=1"
    goto live_ready
  )
  timeout /t 20 /nobreak >nul
)

:live_ready
if "!LIVEOK!"=="1" (
  echo.
  echo ==============================================================
  echo   [OK] HUB DA LIVE 200
  echo ==============================================================
  echo.
  powershell -NoProfile -ExecutionPolicy Bypass -Command ^
   "$ProgressPreference='SilentlyContinue';$urls=@('https://www.govietstay.com/ru/phu-quoc','https://www.govietstay.com/ru/phu-quoc-help','https://www.govietstay.com/ru/phu-quoc/chto-posmotret','https://www.govietstay.com/ru/phu-quoc/kuda-poehat','https://www.govietstay.com/ru/phu-quoc/s-detmi','https://www.govietstay.com/ru/phu-quoc/3-ili-4-ostrova','https://www.govietstay.com/ru/phu-quoc/pogoda','https://www.govietstay.com/ru/phu-quoc/russkiy-gid','https://www.govietstay.com/ru/phu-quoc/aeroport-transfer','https://www.govietstay.com/ru/phu-quoc/7-dney','https://www.govietstay.com/ru/phu-quoc/10-dney','https://www.govietstay.com/ru/phu-quoc/sunset-town','https://www.govietstay.com/ru/phu-quoc/from-moscow','https://www.govietstay.com/ru/phu-quoc/from-almaty','https://www.govietstay.com/ru/phu-quoc/from-tashkent','https://www.govietstay.com/ru/phu-quoc/sitemap.xml');foreach($u in $urls){try{$r=Invoke-WebRequest -UseBasicParsing -Uri $u -Method Get -TimeoutSec 20;Write-Host ('[OK '+[int]$r.StatusCode+'] '+$u) -ForegroundColor Green}catch{if($_.Exception.Response){Write-Host ('[LOI '+[int]$_.Exception.Response.StatusCode+'] '+$u) -ForegroundColor Red}else{Write-Host ('[LOI] '+$u) -ForegroundColor Red}}}"
  echo.
  start "" "https://www.govietstay.com/ru/phu-quoc"
) else (
  echo.
  echo [CHO] GitHub da push, nhung production chua live sau 4 phut.
  echo Luc nay KHONG can cai lai cluster.
  echo Kiem tra Vercel deployment/source commit.
)

echo.
echo Commit local:
git log -1 --oneline
echo.
pause
exit /b 0

:installfail
echo.
echo [LOI] Giai nen/copy payload that bai.
rmdir /s /q "!TEMP!" 2>nul
echo Khong commit, khong push.
pause
exit /b 1

:gitfail
echo.
echo [LOI] Git chua hoan tat. KHONG force push.
echo Gui anh phan loi phia tren cho em.
pause
exit /b 1
