@echo off
setlocal EnableExtensions
chcp 65001 >nul
title Sua loi deploy GoVietStay Local Point

echo ======================================================
echo        SUA LOI VERCEL LOCAL POINT - 1 LAN BAM
echo ======================================================
echo.

set "FIX_DIR=%~dp0"
set "TARGET=%CD%"
if exist "%FIX_DIR%package.json" set "TARGET=%FIX_DIR%"
if not exist "%TARGET%package.json" if exist "%FIX_DIR%..\package.json" set "TARGET=%FIX_DIR%.."

if not exist "%TARGET%package.json" (
  echo KHONG TIM THAY package.json CUA WEBSITE.
  echo Hay dat bo cai trong thu muc goc website roi chay lai.
  echo.
  pause
  exit /b 1
)

if not exist "%TARGET%\components\LocalPointLandingPage.tsx" (
  echo CHUA CO TRANG LOCAL POINT TRONG THU MUC components.
  echo Hay bam CAI-DAT-LOCAL-POINT.bat de cai dat day du.
  echo.
  pause
  exit /b 1
)

echo Website: %TARGET%
echo.

if exist "%TARGET%\_LOCAL_POINT_FILES\components\LocalPointLandingPage.tsx" (
  echo Dang xoa dung thu muc tam _LOCAL_POINT_FILES gay loi Vercel...
  rmdir /s /q "%TARGET%\_LOCAL_POINT_FILES"
) else (
  echo Khong con thu muc tam _LOCAL_POINT_FILES.
)

pushd "%TARGET%"
echo Dang them thu vien vao package.json va package-lock.json...
call npm install lucide-react@^1.30.0 @svg-maps/vietnam@^2.0.0 --save
if errorlevel 1 (
  echo.
  echo CHUA CAI DUOC THU VIEN. Kiem tra Internet roi chay lai.
  popd
  pause
  exit /b 1
)

echo.
echo Dang kiem tra lai website...
call npm run build
if errorlevel 1 (
  echo.
  echo BUILD VAN CON LOI KHAC. Hay chup phan loi mau do gui lai.
  popd
  pause
  exit /b 1
)

echo.
echo ======================================================
echo                  DA SUA LOI XONG
echo ======================================================
echo.
echo Bay gio chay 3 lenh sau:
echo   git add -A
echo   git commit -m "Fix Local Point deployment"
echo   git push origin main
echo.
echo Sau khi push, Vercel se deploy lai tu dong.
echo ======================================================
echo.
popd
pause
endlocal
