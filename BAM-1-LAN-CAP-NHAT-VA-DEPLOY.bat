@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay Local Point V21 - Cap nhat va deploy

echo =============================================================
echo     GOVIETSTAY LOCAL POINT V21 - CAP NHAT VA DEPLOY 1 LAN
echo =============================================================
echo.

set "INSTALLER_DIR=%~dp0"
set "PAYLOAD_ZIP=%INSTALLER_DIR%LOCAL-POINT-PAYLOAD.zip"
set "TARGET="

if exist "%INSTALLER_DIR%package.json" set "TARGET=%INSTALLER_DIR%"
if not defined TARGET if exist "%INSTALLER_DIR%..\package.json" set "TARGET=%INSTALLER_DIR%.."
if not defined TARGET if exist "%CD%\package.json" set "TARGET=%CD%"

if not defined TARGET (
  echo KHONG TIM THAY THU MUC GOC WEBSITE.
  echo.
  echo Hay copy 2 file BAM-1-LAN-CAP-NHAT-VA-DEPLOY.bat va
  echo LOCAL-POINT-PAYLOAD.zip vao thu muc co package.json,
  echo sau do bam lai file nay.
  echo.
  pause
  exit /b 1
)

if not exist "%PAYLOAD_ZIP%" (
  echo THIEU FILE LOCAL-POINT-PAYLOAD.zip.
  echo Hay giai nen day du bo cai V21.
  echo.
  pause
  exit /b 1
)

pushd "%TARGET%"
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo DAY KHONG PHAI THU MUC GIT CUA WEBSITE.
  popd
  pause
  exit /b 1
)

set "PRESTAGED=0"
git diff --cached --quiet
if errorlevel 1 set "PRESTAGED=1"
popd

for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%I"
set "TEMP_PAYLOAD=%TEMP%\GOVIETSTAY-LOCAL-POINT-V21-%STAMP%"
set "BACKUP=%TARGET%\BACKUP-LOCAL-POINT-V21-%STAMP%"

echo Website dung de cap nhat:
echo %TARGET%
echo.
echo [1/6] Dang mo goi Local Point V21...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -LiteralPath '%PAYLOAD_ZIP%' -DestinationPath '%TEMP_PAYLOAD%' -Force"
if errorlevel 1 goto payload_error

findstr /c:"local-point-v21" "%TEMP_PAYLOAD%\components\LocalPointLandingPage.tsx" >nul 2>&1
if errorlevel 1 goto payload_error

echo [2/6] Dang sao luu cac file Local Point hien tai...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$payload=[IO.Path]::GetFullPath('%TEMP_PAYLOAD%'); $target=[IO.Path]::GetFullPath('%TARGET%'); $backup=[IO.Path]::GetFullPath('%BACKUP%'); Get-ChildItem -LiteralPath $payload -File -Recurse ^| ForEach-Object { $rel=$_.FullName.Substring($payload.Length).TrimStart('\'); $dest=Join-Path $target $rel; if(Test-Path -LiteralPath $dest){ $save=Join-Path $backup $rel; New-Item -ItemType Directory -Force -Path (Split-Path $save) ^| Out-Null; Copy-Item -LiteralPath $dest -Destination $save -Force } }"

echo [3/6] Dang ghi DUNG giao dien moi vao thu muc that...
robocopy "%TEMP_PAYLOAD%" "%TARGET%" /E /COPY:DAT /R:2 /W:1 /NFL /NDL /NJH /NJS >nul
if errorlevel 8 goto copy_error
rmdir /s /q "%TEMP_PAYLOAD%" 2>nul

findstr /c:"local-point-v21" "%TARGET%\components\LocalPointLandingPage.tsx" >nul 2>&1
if errorlevel 1 (
  echo KHONG XAC NHAN DUOC MA NGUON V21 TAI THU MUC WEBSITE.
  echo Khong tiep tuc commit.
  pause
  exit /b 1
)

if exist "%TARGET%\_LOCAL_POINT_FILES\components\LocalPointLandingPage.tsx" (
  echo Dang xoa thu muc tam _LOCAL_POINT_FILES cua ban cu...
  rmdir /s /q "%TARGET%\_LOCAL_POINT_FILES"
)

pushd "%TARGET%"
echo [4/6] Dang ghi thu vien vao package.json va package-lock.json...
call npm install lucide-react@^1.30.0 @svg-maps/vietnam@^2.0.0 --save
if errorlevel 1 goto npm_error

echo [5/6] Dang build kiem tra toan bo website...
call npm run build
if errorlevel 1 goto build_error

echo [6/6] Dang tao commit chi cho Local Point va day len main...
git add -- "components/LocalPointLandingPage.tsx" "components/LocalPointLandingPage.css" "app/ru/local-point/page.tsx" "public/local-point/govietstay-logo.jpg" "public/local-point/local-point-tropical-clean-v3.png" "public/local-point/local-point-mobile-clean-v3.png" "package.json"
if exist "package-lock.json" git add -- "package-lock.json"
git add -A -- "_LOCAL_POINT_FILES" >nul 2>&1

if "%PRESTAGED%"=="1" (
  echo.
  echo PHAT HIEN FILE DA DUOC STAGE TU TRUOC.
  echo Em da build xong nhung khong tu dong commit de tranh tron file khac.
  echo Hay kiem tra git status roi commit thu cong.
  popd
  pause
  exit /b 2
)

git diff --cached --quiet
if errorlevel 1 (
  git commit -m "Update Local Point V21 experience"
  if errorlevel 1 goto git_error
) else (
  echo Ma V21 da co san; dang day cac commit chua push neu co...
)

git push origin main
if errorlevel 1 goto git_error

echo.
echo =============================================================
echo            DA CAP NHAT VA PUSH LOCAL POINT V21
echo =============================================================
echo.
echo Commit moi nhat tren may anh:
git log -1 --oneline
echo.
echo Vercel phai hien dung ma commit tren o muc Source.
echo Trang moi co dau hieu de nhan biet:
echo   - Bam 4 the se mo PRACTICAL GUIDE, khong con form cu.
echo   - Co bang ty gia USD, EUR, RUB.
echo   - Co combo tu Nha Trang den Da Nang.
echo   - Icon lien he la icon du lich hien dai.
echo   - Chan trang co dong LOCAL POINT V21.
echo.
echo Ban cu da duoc sao luu tai:
echo %BACKUP%
echo =============================================================
echo.
popd
pause
endlocal
exit /b 0

:payload_error
echo GOI LOCAL-POINT-PAYLOAD.zip KHONG DUNG PHIEN BAN V21.
rmdir /s /q "%TEMP_PAYLOAD%" 2>nul
pause
exit /b 1

:copy_error
echo COPY THAT BAI. FILE CU VAN CON TRONG THU MUC BACKUP.
rmdir /s /q "%TEMP_PAYLOAD%" 2>nul
pause
exit /b 1

:npm_error
echo KHONG CAI DUOC THU VIEN. KIEM TRA INTERNET ROI CHAY LAI.
popd
pause
exit /b 1

:build_error
echo BUILD VAN CON LOI. KHONG COMMIT VA KHONG PUSH.
echo Hay chup phan loi mau do gui lai cho em.
popd
pause
exit /b 1

:git_error
echo CAP NHAT DA BUILD THANH CONG NHUNG GIT CHUA PUSH DUOC.
echo Hay chup phan loi ngay phia tren gui lai cho em.
popd
pause
exit /b 1
