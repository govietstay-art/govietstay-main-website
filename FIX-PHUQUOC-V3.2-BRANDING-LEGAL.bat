@echo off
setlocal
title GoVietStay - Phu Quoc V3.2 Branding Legal Fix

echo.
echo ============================================================
echo   GOVIETSTAY PHU QUOC V3.2 - BRANDING + LEGAL FIX
echo   Removes supplier branding from sales-facing UI
echo   Keeps operator disclosure only in bottom Legal section
echo   BUILD ONLY - NO COMMIT / NO PUSH
echo ============================================================
echo.

set "SCRIPT=%~dp0APPLY-PHUQUOC-V3.2-BRANDING-LEGAL.ps1"
if not exist "%SCRIPT%" (
  echo [ERROR] Missing PowerShell patch file:
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

echo [SUCCESS] Build passed. Nothing pushed yet.
echo Send this final screen to ChatGPT before deploying.
echo.
pause
exit /b 0
