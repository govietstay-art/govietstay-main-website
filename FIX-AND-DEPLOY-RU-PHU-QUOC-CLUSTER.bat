@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - FIX + DEPLOY RU PHU QUOC CLUSTER

echo.
echo =========================================================
echo   GOVIETSTAY - FIX + DEPLOY RUSSIAN PHU QUOC CLUSTER
echo   Fix internal link -> rebase -> build -> commit -> push
echo =========================================================
echo.

set "ROOT=%~dp0"
if not exist "%ROOT%package.json" (
  for %%I in ("%~dp0..") do if exist "%%~fI\package.json" set "ROOT=%%~fI\"
)
if not exist "%ROOT%package.json" (
  if exist "C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\package.json" set "ROOT=C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\"
)

if not exist "%ROOT%package.json" (
  echo [LOI] Khong tim thay project root.
  echo Dat file BAT nay vao:
  echo C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\
  echo.
  pause
  exit /b 1
)

echo [OK] Project root:
echo %ROOT%
echo.

REM Verify cluster was installed locally
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
  if not exist "%ROOT%%%~F" (
    echo [THIEU] %%~F
    set "MISSING=1"
  )
)

if "%MISSING%"=="1" (
  echo.
  echo [DUNG] Cluster chua duoc cai day du tren may.
  echo Chay lai 01-INSTALL-RU-PHU-QUOC-CLUSTER.bat truoc.
  pause
  exit /b 1
)

echo [OK] Cluster files da co tren may.
echo.

REM Fix RussianInternalLinks safely using encoded PowerShell
set "GVS_ROOT=%ROOT%"
echo =========================================================
echo   1/5 FIX INTERNAL LINK
echo =========================================================
powershell -NoProfile -ExecutionPolicy Bypass -EncodedCommand CgAkAEUAcgByAG8AcgBBAGMAdABpAG8AbgBQAHIAZQBmAGUAcgBlAG4AYwBlACAAPQAgACcAUwB0AG8AcAAnAAoAJAByAG8AbwB0ACAAPQAgACQAZQBuAHYAOgBHAFYAUwBfAFIATwBPAFQACgBpAGYAIAAoAFsAcwB0AHIAaQBuAGcAXQA6ADoASQBzAE4AdQBsAGwATwByAFcAaABpAHQAZQBTAHAAYQBjAGUAKAAkAHIAbwBvAHQAKQApACAAewAgAHQAaAByAG8AdwAgACcATQBpAHMAcwBpAG4AZwAgAEcAVgBTAF8AUgBPAE8AVAAnACAAfQAKAAoAJABwACAAPQAgAEoAbwBpAG4ALQBQAGEAdABoACAAJAByAG8AbwB0ACAAJwBjAG8AbQBwAG8AbgBlAG4AdABzAFwAUgB1AHMAcwBpAGEAbgBJAG4AdABlAHIAbgBhAGwATABpAG4AawBzAC4AdABzAHgAJwAKAGkAZgAgACgALQBuAG8AdAAgACgAVABlAHMAdAAtAFAAYQB0AGgAIAAtAEwAaQB0AGUAcgBhAGwAUABhAHQAaAAgACQAcAApACkAIAB7ACAAdABoAHIAbwB3ACAAIgBNAGkAcwBzAGkAbgBnACAAJABwACIAIAB9AAoACgAkAHQAIAA9ACAARwBlAHQALQBDAG8AbgB0AGUAbgB0ACAALQBMAGkAdABlAHIAYQBsAFAAYQB0AGgAIAAkAHAAIAAtAFIAYQB3ACAALQBFAG4AYwBvAGQAaQBuAGcAIABVAFQARgA4AAoACgBpAGYAIAAoACQAdAAgAC0AbQBhAHQAYwBoACAAJwAiAC8AcgB1AC8AcABoAHUALQBxAHUAbwBjACIAJwApACAAewAKACAAIAAgACAAVwByAGkAdABlAC0ASABvAHMAdAAgACcAWwBTAEsASQBQAF0AIAAvAHIAdQAvAHAAaAB1AC0AcQB1AG8AYwAgAGEAbAByAGUAYQBkAHkAIABlAHgAaQBzAHQAcwAgAGkAbgAgAFIAdQBzAHMAaQBhAG4ASQBuAHQAZQByAG4AYQBsAEwAaQBuAGsAcwAuAHQAcwB4ACcACgAgACAAIAAgAGUAeABpAHQAIAAwAAoAfQAKAAoAJABuAGUAZQBkAGwAZQAgAD0AIAAnACAAIABbACIAIgRDBEAESwQgAD0EMAQgACQEQwQ6BEMEPgQ6BDUEIgAsACAAIgAvAHIAdQAvAHQAbwB1AHIAcwAvAHAAaAB1AC0AcQB1AG8AYwAiAF0ALAAnAAoAJABpAG4AcwBlAHIAdAAgAD0AIAAkAG4AZQBlAGQAbABlACAAKwAgACIAYAByAGAAbgAiACAAKwAgACcAIAAgAFsAIgATBDgENAQgAD8EPgQgACQEQwQ6BEMEPgQ6BEMEIgAsACAAIgAvAHIAdQAvAHAAaAB1AC0AcQB1AG8AYwAiAF0ALAAnAAoACgBpAGYAIAAoAC0AbgBvAHQAIAAkAHQALgBDAG8AbgB0AGEAaQBuAHMAKAAkAG4AZQBlAGQAbABlACkAKQAgAHsACgAgACAAIAAgAHQAaAByAG8AdwAgACcAQwBvAHUAbABkACAAbgBvAHQAIABmAGkAbgBkACAAdABoAGUAIABlAHgAcABlAGMAdABlAGQAIABQAGgAdQAgAFEAdQBvAGMAIAB0AG8AdQByAHMAIABsAGkAbgBlAC4AIABOAG8AIABmAGkAbABlACAAdwBhAHMAIABjAGgAYQBuAGcAZQBkAC4AJwAKAH0ACgAKACQAYgBhAGMAawB1AHAAIAA9ACAAJABwACAAKwAgACcALgBiAGUAZgBvAHIAZQAtAHIAdQAtAHAAaAB1AC0AcQB1AG8AYwAtAGwAaQBuAGsALgBiAGEAawAnAAoAQwBvAHAAeQAtAEkAdABlAG0AIAAtAEwAaQB0AGUAcgBhAGwAUABhAHQAaAAgACQAcAAgAC0ARABlAHMAdABpAG4AYQB0AGkAbwBuACAAJABiAGEAYwBrAHUAcAAgAC0ARgBvAHIAYwBlAAoAJAB0ACAAPQAgACQAdAAuAFIAZQBwAGwAYQBjAGUAKAAkAG4AZQBlAGQAbABlACwAIAAkAGkAbgBzAGUAcgB0ACkACgBTAGUAdAAtAEMAbwBuAHQAZQBuAHQAIAAtAEwAaQB0AGUAcgBhAGwAUABhAHQAaAAgACQAcAAgAC0AVgBhAGwAdQBlACAAJAB0ACAALQBFAG4AYwBvAGQAaQBuAGcAIABVAFQARgA4AAoAVwByAGkAdABlAC0ASABvAHMAdAAgACcAWwBPAEsAXQAgAEEAZABkAGUAZAAgACIAEwQ4BDQEIAA/BD4EIAAkBEMEOgRDBD4EOgRDBCIAIAAtAD4AIAAvAHIAdQAvAHAAaAB1AC0AcQB1AG8AYwAnAAoA
if errorlevel 1 (
  echo.
  echo [LOI] Khong sua duoc RussianInternalLinks.tsx.
  echo KHONG push.
  pause
  exit /b 1
)

cd /d "%ROOT%"

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo [LOI] Day khong phai Git repo.
  pause
  exit /b 1
)

for /f "delims=" %%B in ('git branch --show-current') do set "BRANCH=%%B"
if /I not "%BRANCH%"=="main" (
  echo [LOI] Dang o branch: %BRANCH%
  echo Script chi push main.
  pause
  exit /b 1
)

echo.
echo =========================================================
echo   2/5 FETCH + REBASE REMOTE MAIN
echo =========================================================
git fetch origin main
if errorlevel 1 goto gitfail

git rebase --autostash origin/main
if errorlevel 1 (
  echo.
  echo [LOI] Rebase conflict. Dang abort...
  git rebase --abort >nul 2>&1
  echo KHONG push.
  pause
  exit /b 1
)

echo.
echo =========================================================
echo   3/5 BUILD KIEM TRA TOAN WEBSITE
echo =========================================================
call npm run build > "%ROOT%BUILD-RU-PHU-QUOC-DEPLOY.txt" 2>&1
set "BCODE=%ERRORLEVEL%"
type "%ROOT%BUILD-RU-PHU-QUOC-DEPLOY.txt"

if not "%BCODE%"=="0" (
  echo.
  echo [LOI] Build fail. KHONG commit, KHONG push.
  echo Log:
  echo %ROOT%BUILD-RU-PHU-QUOC-DEPLOY.txt
  pause
  exit /b %BCODE%
)

echo.
echo =========================================================
echo   4/5 COMMIT CHI CLUSTER + INTERNAL LINK
echo =========================================================
git add -- "app/ru/phu-quoc" "components/RussianPhuQuocGuidePage.tsx" "components/RussianInternalLinks.tsx" "lib/russian-phu-quoc-cluster.ts" "public/phu-quoc/ru-cluster"

if exist "%ROOT%app\ru\phu-quoc-help\page.tsx" (
  git add -- "app/ru/phu-quoc-help/page.tsx"
)

git diff --cached --quiet
if not errorlevel 1 (
  echo [SKIP] Khong co thay doi moi de commit.
  goto pushonly
)

git commit -m "Add Russian Phu Quoc SEO cluster for winter 2026-2027"
if errorlevel 1 goto gitfail

:pushonly
echo.
echo =========================================================
echo   5/5 PUSH GITHUB MAIN
echo =========================================================
git push origin main
if errorlevel 1 goto gitfail

echo.
echo =========================================================
echo   [OK] PUSH THANH CONG
echo =========================================================
echo.
echo Commit:
git log -1 --oneline
echo.
echo Bay gio DOI Vercel deploy xong roi moi chay:
echo CHECK-LIVE-RU-PHU-QUOC-FIXED.bat
echo.
echo Hub:
echo https://www.govietstay.com/ru/phu-quoc
echo Sitemap:
echo https://www.govietstay.com/ru/phu-quoc/sitemap.xml
echo.
pause
exit /b 0

:gitfail
echo.
echo [LOI] Git chua hoan tat.
echo KHONG force push.
echo Gui anh chup phan loi phia tren cho em.
pause
exit /b 1
