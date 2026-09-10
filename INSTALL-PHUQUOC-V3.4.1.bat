@echo off
setlocal
title GoVietStay - Phu Quoc V3.4.1

echo.
echo ============================================================
echo  GOVIETSTAY PHU QUOC V3.4.1
echo  LOGO + WHATSAPP + MOBILE + RUSSIAN GUIDE NOTE
echo  BUILD ONLY - NO COMMIT / NO PUSH
echo ============================================================
echo.

set "SCRIPT=%~dp0APPLY-PHUQUOC-V3.4.1.cjs"
if not exist "%SCRIPT%" (
  echo [ERROR] Missing installer script.
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

echo [SUCCESS] V3.4.1 build passed. Nothing pushed yet.
echo Send the final screen to ChatGPT before deploy.
echo.
pause
exit /b 0
