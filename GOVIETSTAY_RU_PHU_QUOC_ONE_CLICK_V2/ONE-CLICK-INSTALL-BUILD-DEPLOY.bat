@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay - ONE CLICK RU PHU QUOC CLUSTER V2

echo.
echo ==============================================================
echo   GOVIETSTAY - ONE CLICK RUSSIAN PHU QUOC CLUSTER V2
echo   Sync Git - Install - Visual/Logo - Build - Commit - Push
echo ==============================================================
echo.

REM --------------------------------------------------------------
REM FIND PROJECT ROOT
REM --------------------------------------------------------------
set "ROOT="
if exist "%~dp0package.json" set "ROOT=%~dp0"
if not defined ROOT (
  for %%I in ("%~dp0..") do (
    if exist "%%~fI\package.json" if exist "%%~fI\app\ru" set "ROOT=%%~fI\"
  )
)
if not defined ROOT (
  if exist "C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\package.json" (
    set "ROOT=C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\"
  )
)

if not defined ROOT (
  echo [LOI] Khong tim thay govietstay-main-website.
  echo.
  echo Cach dung:
  echo 1. Giai nen NGUYEN folder GOVIETSTAY_RU_PHU_QUOC_ONE_CLICK_V2
  echo 2. Dat folder do vao trong govietstay-main-website
  echo 3. Double-click ONE-CLICK-INSTALL-BUILD-DEPLOY.bat
  echo.
  pause
  exit /b 1
)

set "PAYLOAD=%~dp0RU-PHU-QUOC-CLUSTER-PAYLOAD.zip"
if not exist "%PAYLOAD%" (
  echo [LOI] Thieu file RU-PHU-QUOC-CLUSTER-PAYLOAD.zip
  echo Khong tach rieng file BAT ra khoi folder V2.
  pause
  exit /b 1
)

echo [OK] Project:
echo %ROOT%
echo [OK] Payload:
echo %PAYLOAD%
echo.

cd /d "%ROOT%"

REM --------------------------------------------------------------
REM GIT SAFETY
REM --------------------------------------------------------------
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo [LOI] Day khong phai Git repository.
  pause
  exit /b 1
)

for /f "delims=" %%B in ('git branch --show-current') do set "BRANCH=%%B"
if /I not "%BRANCH%"=="main" (
  echo [LOI] Branch hien tai la: %BRANCH%
  echo Script chi lam viec tren main.
  pause
  exit /b 1
)

git diff --cached --quiet
if errorlevel 1 (
  echo.
  echo [DUNG LAI] Dang co file STAGED tu truoc.
  echo De tranh commit nham file khac, script khong tiep tuc.
  echo.
  git status --short
  echo.
  pause
  exit /b 2
)

echo ==============================================================
echo   1/7 SYNC REMOTE MAIN TRUOC KHI CAI
echo ==============================================================
git fetch origin main
if errorlevel 1 goto gitfail

git rebase --autostash origin/main
if errorlevel 1 (
  echo.
  echo [LOI] Rebase conflict. Dang abort...
  git rebase --abort >nul 2>&1
  echo Khong co gi duoc push.
  pause
  exit /b 1
)

echo.
echo ==============================================================
echo   2/7 BACKUP + INSTALL 14 TRANG MOI
echo ==============================================================
for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%I"
set "TEMP=%TEMP%\GVS-RU-PQ-V2-!STAMP!"
set "BACKUP=%ROOT%_backup-ru-pq-v2-!STAMP!"

powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -LiteralPath '%PAYLOAD%' -DestinationPath '!TEMP!' -Force"
if errorlevel 1 goto installfail

if not exist "!TEMP!\lib\russian-phu-quoc-cluster.ts" goto installfail
if not exist "!TEMP!\app\ru\phu-quoc\page.tsx" goto installfail

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$src=[IO.Path]::GetFullPath('!TEMP!');$dst=[IO.Path]::GetFullPath('%ROOT%');$bak=[IO.Path]::GetFullPath('!BACKUP!');Get-ChildItem -LiteralPath $src -File -Recurse | ForEach-Object {$rel=$_.FullName.Substring($src.Length).TrimStart('\');$target=Join-Path $dst $rel;if(Test-Path -LiteralPath $target){$save=Join-Path $bak $rel;New-Item -ItemType Directory -Force -Path (Split-Path $save) | Out-Null;Copy-Item -LiteralPath $target -Destination $save -Force}}"
if errorlevel 1 goto installfail

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$ErrorActionPreference='Stop';$src=(Resolve-Path -LiteralPath '!TEMP!').Path;$dst=(Resolve-Path -LiteralPath '%ROOT%').Path;Get-ChildItem -LiteralPath $src -File -Recurse | ForEach-Object {$rel=$_.FullName.Substring($src.Length).TrimStart('\');$target=Join-Path $dst $rel;New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null;Copy-Item -LiteralPath $_.FullName -Destination $target -Force;Write-Host ('  OK  '+$rel)}"
if errorlevel 1 goto installfail

rmdir /s /q "!TEMP!" 2>nul

echo.
echo ==============================================================
echo   3/7 PATCH HELP VISUAL + LOGO + INTERNAL LINK
echo ==============================================================
set "GVS_ROOT=%ROOT%"
powershell -NoProfile -ExecutionPolicy Bypass -EncodedCommand CgAkAEUAcgByAG8AcgBBAGMAdABpAG8AbgBQAHIAZQBmAGUAcgBlAG4AYwBlACAAPQAgACcAUwB0AG8AcAAnAAoAJAByAG8AbwB0ACAAPQAgACQAZQBuAHYAOgBHAFYAUwBfAFIATwBPAFQACgBpAGYAIAAoAFsAcwB0AHIAaQBuAGcAXQA6ADoASQBzAE4AdQBsAGwATwByAFcAaABpAHQAZQBTAHAAYQBjAGUAKAAkAHIAbwBvAHQAKQApACAAewAgAHQAaAByAG8AdwAgACcATQBpAHMAcwBpAG4AZwAgAEcAVgBTAF8AUgBPAE8AVAAnACAAfQAKAAoAIwAgADEAKQAgAFAAYQB0AGMAaAAgAC8AcgB1AC8AcABoAHUALQBxAHUAbwBjAC0AaABlAGwAcAAgAGgAZQByAG8AIAArACAAbwBmAGYAaQBjAGkAYQBsACAAbABvAGcAbwAuAAoAJABoAGUAbABwACAAPQAgAEoAbwBpAG4ALQBQAGEAdABoACAAJAByAG8AbwB0ACAAJwBhAHAAcABcAHIAdQBcAHAAaAB1AC0AcQB1AG8AYwAtAGgAZQBsAHAAXABwAGEAZwBlAC4AdABzAHgAJwAKAGkAZgAgACgAVABlAHMAdAAtAFAAYQB0AGgAIAAtAEwAaQB0AGUAcgBhAGwAUABhAHQAaAAgACQAaABlAGwAcAApACAAewAKACAAIAAgACAAJAB0ACAAPQAgAEcAZQB0AC0AQwBvAG4AdABlAG4AdAAgAC0ATABpAHQAZQByAGEAbABQAGEAdABoACAAJABoAGUAbABwACAALQBSAGEAdwAgAC0ARQBuAGMAbwBkAGkAbgBnACAAVQBUAEYAOAAKACAAIAAgACAAJABjAGgAYQBuAGcAZQBkACAAPQAgACQAZgBhAGwAcwBlAAoACgAgACAAIAAgAGkAZgAgACgAJAB0AC4AQwBvAG4AdABhAGkAbgBzACgAJwAvAHQAbwB1AHIALwBwAGgAdQBxAHUAbwBjAC8AdABvAHUAcgAtADAAMQAtADEALgBqAHAAZwAnACkAKQAgAHsACgAgACAAIAAgACAAIAAgACAAJAB0ACAAPQAgACQAdAAuAFIAZQBwAGwAYQBjAGUAKAAnAC8AdABvAHUAcgAvAHAAaAB1AHEAdQBvAGMALwB0AG8AdQByAC0AMAAxAC0AMQAuAGoAcABnACcALAAnAC8AcABoAHUALQBxAHUAbwBjAC8AcgB1AC0AYwBsAHUAcwB0AGUAcgAvAGgAZQByAG8ALQBzAHUAbgBzAGUAdAAuAHAAbgBnACcAKQAKACAAIAAgACAAIAAgACAAIAAkAGMAaABhAG4AZwBlAGQAIAA9ACAAJAB0AHIAdQBlAAoAIAAgACAAIAB9AAoACgAgACAAIAAgAGkAZgAgACgAJAB0ACAALQBuAG8AdABtAGEAdABjAGgAIAAnAC8AYgByAGEAbgBkAC8AZwBvAHYAaQBlAHQAcwB0AGEAeQAtAG8AZgBmAGkAYwBpAGEAbAAtAGwAbwBnAG8AXAAuAGoAcABnACcAKQAgAHsACgAgACAAIAAgACAAIAAgACAAJABwAGEAdAB0AGUAcgBuACAAPQAgACcAPABMAGkAbgBrACAAaAByAGUAZgA9ACIALwByAHUAIgAgAGMAbABhAHMAcwBOAGEAbQBlAD0AIgB0AGUAeAB0AC0AeABsACAAZgBvAG4AdAAtAGIAbABhAGMAawAgAHQAcgBhAGMAawBpAG4AZwAtAHQAaQBnAGgAdAAiAD4AXABzACoARwBvAFYAaQBlAHQAUwB0AGEAeQBcAHMAKgA8AC8ATABpAG4AawA+ACcACgAgACAAIAAgACAAIAAgACAAJAByAGUAcABsAGEAYwBlAG0AZQBuAHQAIAA9ACAAQAAnAAoAPABMAGkAbgBrACAAaAByAGUAZgA9ACIALwByAHUAIgAgAGMAbABhAHMAcwBOAGEAbQBlAD0AIgBpAG4AbABpAG4AZQAtAGYAbABlAHgAIAByAG8AdQBuAGQAZQBkAC0AMgB4AGwAIABiAGcALQB3AGgAaQB0AGUALwA5ADUAIABwAC0AMgAgAHMAaABhAGQAbwB3AC0AbABnACIAPgAKACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAA8AEkAbQBhAGcAZQAKACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAcwByAGMAPQAiAC8AYgByAGEAbgBkAC8AZwBvAHYAaQBlAHQAcwB0AGEAeQAtAG8AZgBmAGkAYwBpAGEAbAAtAGwAbwBnAG8ALgBqAHAAZwAiAAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIABhAGwAdAA9ACIARwBvAFYAaQBlAHQAUwB0AGEAeQAgABQgIABUAHIAdQBzAHQAZQBkACAATABvAGMAYQBsACAAUwB1AHAAcABvAHIAdAAiAAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAB3AGkAZAB0AGgAPQB7ADMAMAAwAH0ACgAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAGgAZQBpAGcAaAB0AD0AewAxADEAMAB9AAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIABjAGwAYQBzAHMATgBhAG0AZQA9ACIAaAAtADEAMgAgAHcALQBhAHUAdABvACAAbwBiAGoAZQBjAHQALQBjAG8AbgB0AGEAaQBuACAAcwBtADoAaAAtADEANAAiAAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAC8APgAKACAAIAAgACAAIAAgACAAIAAgACAAIAAgADwALwBMAGkAbgBrAD4ACgAnAEAACgAgACAAIAAgACAAIAAgACAAJABuAGUAdwBUAGUAeAB0ACAAPQAgAFsAcgBlAGcAZQB4AF0AOgA6AFIAZQBwAGwAYQBjAGUAKAAkAHQALAAgACQAcABhAHQAdABlAHIAbgAsACAAJAByAGUAcABsAGEAYwBlAG0AZQBuAHQAKQAKACAAIAAgACAAIAAgACAAIABpAGYAIAAoACQAbgBlAHcAVABlAHgAdAAgAC0AbgBlACAAJAB0ACkAIAB7AAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJAB0ACAAPQAgACQAbgBlAHcAVABlAHgAdAAKACAAIAAgACAAIAAgACAAIAAgACAAIAAgACQAYwBoAGEAbgBnAGUAZAAgAD0AIAAkAHQAcgB1AGUACgAgACAAIAAgACAAIAAgACAAfQAKACAAIAAgACAAfQAKAAoAIAAgACAAIABpAGYAIAAoACQAYwBoAGEAbgBnAGUAZAApACAAewAKACAAIAAgACAAIAAgACAAIABDAG8AcAB5AC0ASQB0AGUAbQAgAC0ATABpAHQAZQByAGEAbABQAGEAdABoACAAJABoAGUAbABwACAALQBEAGUAcwB0AGkAbgBhAHQAaQBvAG4AIAAoACQAaABlAGwAcAAgACsAIAAnAC4AYgBlAGYAbwByAGUALQByAHUALQBwAHEALQBjAGwAdQBzAHQAZQByAC4AYgBhAGsAJwApACAALQBGAG8AcgBjAGUACgAgACAAIAAgACAAIAAgACAAUwBlAHQALQBDAG8AbgB0AGUAbgB0ACAALQBMAGkAdABlAHIAYQBsAFAAYQB0AGgAIAAkAGgAZQBsAHAAIAAtAFYAYQBsAHUAZQAgACQAdAAgAC0ARQBuAGMAbwBkAGkAbgBnACAAVQBUAEYAOAAKACAAIAAgACAAIAAgACAAIABXAHIAaQB0AGUALQBIAG8AcwB0ACAAJwBbAE8ASwBdACAAUABhAHQAYwBoAGUAZAAgAC8AcgB1AC8AcABoAHUALQBxAHUAbwBjAC0AaABlAGwAcAAgAGgAZQByAG8AIAArACAAbwBmAGYAaQBjAGkAYQBsACAAbABvAGcAbwAuACcACgAgACAAIAAgAH0AIABlAGwAcwBlACAAewAKACAAIAAgACAAIAAgACAAIABXAHIAaQB0AGUALQBIAG8AcwB0ACAAJwBbAFMASwBJAFAAXQAgAC8AcgB1AC8AcABoAHUALQBxAHUAbwBjAC0AaABlAGwAcAAgAGEAbAByAGUAYQBkAHkAIAB1AHMAZQBzACAAdABoAGUAIABuAGUAdwAgAHYAaQBzAHUAYQBsAC8AbABvAGcAbwAgAG8AcgAgAG4AbwAgAG0AYQB0AGMAaABpAG4AZwAgAG8AbABkACAAbQBhAHIAawB1AHAALgAnAAoAIAAgACAAIAB9AAoAfQAgAGUAbABzAGUAIAB7AAoAIAAgACAAIABXAHIAaQB0AGUALQBIAG8AcwB0ACAAJwBbAFcAQQBSAE4AXQAgAC8AcgB1AC8AcABoAHUALQBxAHUAbwBjAC0AaABlAGwAcAAvAHAAYQBnAGUALgB0AHMAeAAgAG4AbwB0ACAAZgBvAHUAbgBkAC4AIABDAGwAdQBzAHQAZQByACAAYwBhAG4AIABzAHQAaQBsAGwAIABkAGUAcABsAG8AeQAuACcACgB9AAoACgAjACAAMgApACAAQQBkAGQAIABoAHUAYgAgAHQAbwAgAFIAdQBzAHMAaQBhAG4ASQBuAHQAZQByAG4AYQBsAEwAaQBuAGsAcwAuAAoAJABsAGkAbgBrAHMAIAA9ACAASgBvAGkAbgAtAFAAYQB0AGgAIAAkAHIAbwBvAHQAIAAnAGMAbwBtAHAAbwBuAGUAbgB0AHMAXABSAHUAcwBzAGkAYQBuAEkAbgB0AGUAcgBuAGEAbABMAGkAbgBrAHMALgB0AHMAeAAnAAoAaQBmACAAKABUAGUAcwB0AC0AUABhAHQAaAAgAC0ATABpAHQAZQByAGEAbABQAGEAdABoACAAJABsAGkAbgBrAHMAKQAgAHsACgAgACAAIAAgACQAdAAgAD0AIABHAGUAdAAtAEMAbwBuAHQAZQBuAHQAIAAtAEwAaQB0AGUAcgBhAGwAUABhAHQAaAAgACQAbABpAG4AawBzACAALQBSAGEAdwAgAC0ARQBuAGMAbwBkAGkAbgBnACAAVQBUAEYAOAAKAAoAIAAgACAAIABpAGYAIAAoACQAdAAgAC0AbQBhAHQAYwBoACAAJwAiAC8AcgB1AC8AcABoAHUALQBxAHUAbwBjACIAJwApACAAewAKACAAIAAgACAAIAAgACAAIABXAHIAaQB0AGUALQBIAG8AcwB0ACAAJwBbAFMASwBJAFAAXQAgAFIAdQBzAHMAaQBhAG4AIABpAG4AdABlAHIAbgBhAGwAIABsAGkAbgBrACAAYQBsAHIAZQBhAGQAeQAgAGUAeABpAHMAdABzAC4AJwAKACAAIAAgACAAfQAgAGUAbABzAGUAIAB7AAoAIAAgACAAIAAgACAAIAAgACQAbgBlAGUAZABsAGUAIAA9ACAAJwAgACAAWwAiACIEQwRABEsEIAA9BDAEIAAkBEMEOgRDBD4EOgQ1BCIALAAgACIALwByAHUALwB0AG8AdQByAHMALwBwAGgAdQAtAHEAdQBvAGMAIgBdACwAJwAKACAAIAAgACAAIAAgACAAIAAkAGkAbgBzAGUAcgB0ACAAPQAgACQAbgBlAGUAZABsAGUAIAArACAAIgBgAHIAYABuACIAIAArACAAJwAgACAAWwAiABMEOAQ0BCAAPwQ+BCAAJARDBDoEQwQ+BDoEQwQiACwAIAAiAC8AcgB1AC8AcABoAHUALQBxAHUAbwBjACIAXQAsACcACgAKACAAIAAgACAAIAAgACAAIABpAGYAIAAoACQAdAAuAEMAbwBuAHQAYQBpAG4AcwAoACQAbgBlAGUAZABsAGUAKQApACAAewAKACAAIAAgACAAIAAgACAAIAAgACAAIAAgAEMAbwBwAHkALQBJAHQAZQBtACAALQBMAGkAdABlAHIAYQBsAFAAYQB0AGgAIAAkAGwAaQBuAGsAcwAgAC0ARABlAHMAdABpAG4AYQB0AGkAbwBuACAAKAAkAGwAaQBuAGsAcwAgACsAIAAnAC4AYgBlAGYAbwByAGUALQByAHUALQBwAHEALQBjAGwAdQBzAHQAZQByAC4AYgBhAGsAJwApACAALQBGAG8AcgBjAGUACgAgACAAIAAgACAAIAAgACAAIAAgACAAIAAkAHQAIAA9ACAAJAB0AC4AUgBlAHAAbABhAGMAZQAoACQAbgBlAGUAZABsAGUALAAgACQAaQBuAHMAZQByAHQAKQAKACAAIAAgACAAIAAgACAAIAAgACAAIAAgAFMAZQB0AC0AQwBvAG4AdABlAG4AdAAgAC0ATABpAHQAZQByAGEAbABQAGEAdABoACAAJABsAGkAbgBrAHMAIAAtAFYAYQBsAHUAZQAgACQAdAAgAC0ARQBuAGMAbwBkAGkAbgBnACAAVQBUAEYAOAAKACAAIAAgACAAIAAgACAAIAAgACAAIAAgAFcAcgBpAHQAZQAtAEgAbwBzAHQAIAAnAFsATwBLAF0AIABBAGQAZABlAGQAIAAiABMEOAQ0BCAAPwQ+BCAAJARDBDoEQwQ+BDoEQwQiACAAdABvACAAUgB1AHMAcwBpAGEAbgBJAG4AdABlAHIAbgBhAGwATABpAG4AawBzAC4AJwAKACAAIAAgACAAIAAgACAAIAB9ACAAZQBsAHMAZQAgAHsACgAgACAAIAAgACAAIAAgACAAIAAgACAAIABXAHIAaQB0AGUALQBIAG8AcwB0ACAAJwBbAFcAQQBSAE4AXQAgAEUAeABwAGUAYwB0AGUAZAAgAFAAaAB1ACAAUQB1AG8AYwAgAHQAbwB1AHIAcwAgAGwAaQBuAGUAIABuAG8AdAAgAGYAbwB1AG4AZAA7ACAAaQBuAHQAZQByAG4AYQBsAC0AbABpAG4AawAgAHAAYQB0AGMAaAAgAHMAawBpAHAAcABlAGQALgAnAAoAIAAgACAAIAAgACAAIAAgAH0ACgAgACAAIAAgAH0ACgB9ACAAZQBsAHMAZQAgAHsACgAgACAAIAAgAFcAcgBpAHQAZQAtAEgAbwBzAHQAIAAnAFsAVwBBAFIATgBdACAAUgB1AHMAcwBpAGEAbgBJAG4AdABlAHIAbgBhAGwATABpAG4AawBzAC4AdABzAHgAIABuAG8AdAAgAGYAbwB1AG4AZAA7ACAAcwBrAGkAcABwAGUAZAAuACcACgB9AAoA
if errorlevel 1 (
  echo [LOI] Patch visual/link that bai. KHONG push.
  pause
  exit /b 1
)

echo.
echo ==============================================================
echo   4/7 VERIFY FILES
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
  echo.
  echo [LOI] Cluster van thieu file. KHONG build/push.
  pause
  exit /b 1
)

echo.
echo ==============================================================
echo   5/7 BUILD TOAN WEBSITE
echo ==============================================================
call npm run build > "%ROOT%BUILD-RU-PHU-QUOC-V2.txt" 2>&1
set "BCODE=!ERRORLEVEL!"
type "%ROOT%BUILD-RU-PHU-QUOC-V2.txt"

if not "!BCODE!"=="0" (
  echo.
  echo [LOI] BUILD FAIL. KHONG commit, KHONG push.
  echo Gui file:
  echo %ROOT%BUILD-RU-PHU-QUOC-V2.txt
  pause
  exit /b !BCODE!
)

echo.
echo ==============================================================
echo   6/7 COMMIT CHI RUSSIAN PHU QUOC CLUSTER
echo ==============================================================
git add -- "app/ru/phu-quoc" "components/RussianPhuQuocGuidePage.tsx" "lib/russian-phu-quoc-cluster.ts" "public/phu-quoc/ru-cluster"

if exist "%ROOT%app\ru\phu-quoc-help\page.tsx" git add -- "app/ru/phu-quoc-help/page.tsx"
if exist "%ROOT%components\RussianInternalLinks.tsx" git add -- "components/RussianInternalLinks.tsx"

git diff --cached --quiet
if not errorlevel 1 (
  echo [SKIP] Khong co thay doi moi de commit.
  goto PUSH_STAGE
)

git commit -m "Add Russian Phu Quoc SEO cluster for winter 2026-2027"
if errorlevel 1 goto gitfail

:PUSH_STAGE
echo.
echo ==============================================================
echo   7/7 PUSH GITHUB MAIN
echo ==============================================================
git push origin main
if errorlevel 1 (
  echo.
  echo Push lan 1 bi tu choi. Thu sync remote 1 lan nua...
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
echo   [OK] HOAN TAT - DA PUSH CLUSTER LEN GITHUB
echo ==============================================================
echo.
git log -1 --oneline
echo.
echo Backup local:
echo !BACKUP!
echo.
echo DOI Vercel deploy xong roi moi kiem tra:
echo https://www.govietstay.com/ru/phu-quoc
echo https://www.govietstay.com/ru/phu-quoc/sitemap.xml
echo.
echo Sau do chay CHECK-LIVE-AFTER-VERCEL.bat
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
