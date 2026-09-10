@echo off
chcp 65001 >nul
title GoVietStay Cruise Landing EN + RU V3

echo.
echo ========================================================
echo  GoVietStay Cruise Landing EN + RU V3 - ONE CLICK
echo ========================================================
echo.
echo This version automatically finds the project folder.
echo If it cannot find it, just select govietstay-main-website.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0INSTALL-CRUISE-LANDING.ps1"

echo.
echo Press any key to close...
pause >nul
