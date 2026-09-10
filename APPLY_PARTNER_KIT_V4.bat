@echo off
setlocal
echo ==================================================
echo GoVietStay Universal Partner Kit V4
echo ==================================================
echo.
if not exist "components\admin-v5\PartnerTools.tsx" (
  echo ERROR: This BAT must be run from the root of govietstay-main-website.
  echo Expected: components\admin-v5\PartnerTools.tsx
  pause
  exit /b 1
)
if not exist "v4-patch\components\admin-v5\PartnerTools.tsx" (
  echo ERROR: V4 patch file is missing.
  pause
  exit /b 1
)
copy /Y "v4-patch\components\admin-v5\PartnerTools.tsx" "components\admin-v5\PartnerTools.tsx" >nul
if errorlevel 1 (
  echo ERROR: Could not replace PartnerTools.tsx
  pause
  exit /b 1
)
echo SUCCESS: PartnerTools upgraded to Universal Partner Kit V4.
echo.
echo Next: run your normal build/deploy process.
pause
