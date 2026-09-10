@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay - Fix Backup Build + Push RU Phu Quoc

echo.
echo =========================================================
echo   GOVIETSTAY - FIX BACKUP BUILD + PUSH RU PHU QUOC
echo   Xoa backup folder bi TypeScript quet -> build -> push
echo =========================================================
echo.

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
  echo Dat file BAT nay vao:
  echo C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\
  echo.
  pause
  exit /b 1
)

echo [OK] Project:
echo %ROOT%
echo.

set "MISSING=0"
for %%F in (
  "app\ru\phu-quoc\page.tsx"
  "app\ru\phu-quoc\[slug]\page.tsx"
  "components\RussianPhuQuocGuidePage.tsx"
  "lib\russian-phu-quoc-cluster.ts"
) do (
  if exist "%ROOT%%%~F" (
    echo [OK] REAL FILE: %%~F
  ) else (
    echo [THIEU] REAL FILE: %%~F
    set "MISSING=1"
  )
)

if "!MISSING!"=="1" (
  echo.
  echo [DUNG] Cluster that chua day du. Script se KHONG xoa backup.
  pause
  exit /b 1
)

echo.
echo =========================================================
echo   1/4 XOA BACKUP FOLDER GAY LOI TYPESCRIPT
echo =========================================================
echo.

for /D %%D in ("%ROOT%_backup-ru-pq-final-*") do (
  if exist "%%~fD" (
    echo [XOA] %%~fD
    rmdir /S /Q "%%~fD"
  )
)

for /D %%D in ("%ROOT%_backup-ru-pq-v2-*") do (
  if exist "%%~fD" (
    echo [XOA] %%~fD
    rmdir /S /Q "%%~fD"
  )
)

for /D %%D in ("%ROOT%_backup-ru-phu-quoc-cluster-*") do (
  if exist "%%~fD" (
    echo [XOA] %%~fD
    rmdir /S /Q "%%~fD"
  )
)

for /D %%D in ("%ROOT%_backup-ru-phu-quoc-help-*") do (
  if exist "%%~fD" (
    echo [XOA] %%~fD
    rmdir /S /Q "%%~fD"
  )
)

echo.
echo [OK] Da don cac backup folder RU Phu Quoc trong project root.
echo.

cd /d "%ROOT%"

echo =========================================================
echo   2/4 BUILD LAI TOAN WEBSITE
echo =========================================================
call npm run build > "%ROOT%BUILD-RU-PHU-QUOC-AFTER-CLEANUP.txt" 2>&1
set "BCODE=!ERRORLEVEL!"
type "%ROOT%BUILD-RU-PHU-QUOC-AFTER-CLEANUP.txt"

if not "!BCODE!"=="0" (
  echo.
  echo [LOI] Build van fail. KHONG commit/push.
  echo Gui file:
  echo %ROOT%BUILD-RU-PHU-QUOC-AFTER-CLEANUP.txt
  echo.
  pause
  exit /b !BCODE!
)

echo.
echo =========================================================
echo   3/4 COMMIT CLUSTER
echo =========================================================

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo [LOI] Khong phai Git repo.
  pause
  exit /b 1
)

for /f "delims=" %%B in ('git branch --show-current') do set "BRANCH=%%B"
if /I not "!BRANCH!"=="main" (
  echo [LOI] Dang o branch !BRANCH!, khong phai main.
  pause
  exit /b 1
)

git fetch origin main
if errorlevel 1 goto gitfail

git rebase --autostash origin/main
if errorlevel 1 (
  git rebase --abort >nul 2>&1
  echo [LOI] Rebase conflict. Da abort.
  pause
  exit /b 1
)

call npm run build > "%ROOT%BUILD-RU-PHU-QUOC-AFTER-REBASE.txt" 2>&1
if errorlevel 1 (
  type "%ROOT%BUILD-RU-PHU-QUOC-AFTER-REBASE.txt"
  echo.
  echo [LOI] Build sau rebase fail. KHONG push.
  pause
  exit /b 1
)

git add -- "app/ru/phu-quoc" "components/RussianPhuQuocGuidePage.tsx" "lib/russian-phu-quoc-cluster.ts" "public/phu-quoc/ru-cluster"
if exist "%ROOT%app\ru\phu-quoc-help\page.tsx" git add -- "app/ru/phu-quoc-help/page.tsx"
if exist "%ROOT%components\RussianInternalLinks.tsx" git add -- "components/RussianInternalLinks.tsx"

git diff --cached --quiet
if not errorlevel 1 goto pushonly

git commit -m "Add Russian Phu Quoc SEO cluster for winter 2026-2027"
if errorlevel 1 goto gitfail

:pushonly
echo.
echo =========================================================
echo   4/4 PUSH MAIN
echo =========================================================
git push origin main
if errorlevel 1 goto gitfail

echo.
echo =========================================================
echo   [OK] BUILD + PUSH THANH CONG
echo =========================================================
echo.
git log -1 --oneline
echo.
echo Bay gio doi Vercel deploy xong roi mo:
echo https://www.govietstay.com/ru/phu-quoc
echo.
echo Luu y: warning package-lock o C:\Users\ADMIN chi la WARNING,
echo khong phai loi build.
echo.
pause
exit /b 0

:gitfail
echo.
echo [LOI] Git chua hoan tat. KHONG force push.
echo Gui anh phan loi phia tren cho em.
pause
exit /b 1
