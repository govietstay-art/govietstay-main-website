@echo off
chcp 65001 >nul
title GoVietStay Cruise Deploy

echo.
echo ==============================================================
echo  GoVietStay Cruise Landing - PUSH TO GITHUB + VERCEL
echo ==============================================================
echo.
echo This deploys ONLY:
echo   app/en/cruise-port-shore-excursions/page.tsx
echo   app/ru/kruiznye-ekskursii-chan-may-tien-sa/page.tsx
echo   tsconfig.json
echo.
echo Installer folders V1/V2/V3/V4/V5 will NOT be staged.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0DEPLOY-CRUISE-TO-GITHUB-VERCEL.ps1"

echo.
echo Press any key to close...
pause >nul
