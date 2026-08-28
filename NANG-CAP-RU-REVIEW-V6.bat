@echo off
setlocal
chcp 65001 >nul
title GoVietStay - Russian Trust Review V6

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0NANG-CAP-RU-REVIEW-V6.ps1"
set "EXIT_CODE=%ERRORLEVEL%"

echo.
if not "%EXIT_CODE%"=="0" echo V6 DUNG LAI DO CO LOI. Khong co deploy moi.
if "%EXIT_CODE%"=="0" echo V6 DA PUSH DUNG MA NGUON. Vercel dang tu deploy.
pause
endlocal
exit /b %EXIT_CODE%
