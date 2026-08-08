@echo off
chcp 65001 >nul
title GoVietStay Local Point V25

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0INSTALL-LOCAL-POINT-V25.ps1"
set "RESULT=%ERRORLEVEL%"

echo.
if "%RESULT%"=="0" (
  echo HOAN TAT. ANH CO THE DONG CUA SO NAY.
) else (
  echo CHUA HOAN TAT. HAY CHUP NGUYEN MAN HINH NAY GUI LAI.
)
echo.
pause
exit /b %RESULT%
