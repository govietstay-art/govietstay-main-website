@echo off
setlocal
title GoVietStay - Phu Quoc V3.2.1 Branding Legal Fix

echo.
echo ============================================================
echo   GOVIETSTAY PHU QUOC V3.2.1
echo   BRANDING + LEGAL CLEANUP
echo   BUILD ONLY - NO COMMIT / NO PUSH
echo ============================================================
echo.

set "SCRIPT=%~dp0APPLY-PHUQUOC-V3.2.1-BRANDING-LEGAL.ps1"

if not exist "%SCRIPT%" (
  echo [ERROR] Missing:
  echo %SCRIPT%
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT%"
set "ERR=%ERRORLEVEL%"

echo.
if not "%ERR%"=="0" (
  echo [FAIL] Patch/build failed. Nothing pushed.
  pause
  exit /b %ERR%
)

echo ============================================================
echo [SUCCESS] BUILD PASSED. NOTHING PUSHED.
echo ============================================================
echo Send the final screen to ChatGPT before deploy.
echo.
pause
exit /b 0
