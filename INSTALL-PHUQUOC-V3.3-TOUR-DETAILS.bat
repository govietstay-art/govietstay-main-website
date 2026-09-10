@echo off
setlocal
title GoVietStay - Phu Quoc V3.3 Tour Details

echo.
echo ============================================================
echo  GOVIETSTAY PHU QUOC V3.3 - DETAILED TOUR CONTENT
echo  EN + RU / 13 JOIN-IN TOURS
echo  BUILD ONLY - NO COMMIT / NO PUSH
echo ============================================================
echo.

set "SCRIPT=%~dp0APPLY-PHUQUOC-V3.3-TOUR-DETAILS.cjs"
if not exist "%SCRIPT%" (
  echo [ERROR] Missing %SCRIPT%
  pause
  exit /b 1
)

node "%SCRIPT%"
set "ERR=%ERRORLEVEL%"

echo.
if not "%ERR%"=="0" (
  echo [FAIL] Nothing was pushed.
  pause
  exit /b %ERR%
)

echo [SUCCESS] V3.3 build passed. Nothing pushed yet.
echo Send the final screen to ChatGPT before deploy.
echo.
pause
exit /b 0
