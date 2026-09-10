@echo off
chcp 65001 >nul
title GoVietStay Cruise Landing V5

echo.
echo ==============================================================
echo  GoVietStay Cruise Landing V5 - NO DELETE / SAFE BUILD FIX
echo ==============================================================
echo.
echo V5 does NOT delete locked V1/V2/V3/V4 folders.
echo It excludes them from TypeScript and builds the real pages.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0INSTALL-CRUISE-V5.ps1"

echo.
echo Press any key to close...
pause >nul
