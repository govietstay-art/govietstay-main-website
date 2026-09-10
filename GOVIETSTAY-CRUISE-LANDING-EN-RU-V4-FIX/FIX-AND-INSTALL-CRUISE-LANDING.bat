@echo off
chcp 65001 >nul
title GoVietStay Cruise Landing V4 FIX

echo.
echo ============================================================
echo  GoVietStay Cruise Landing V4 - CLEAN + FIX + BUILD
echo ============================================================
echo.
echo Fixes the V2 payload TypeScript error automatically.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0FIX-AND-INSTALL-CRUISE-LANDING.ps1"

echo.
echo Press any key to close...
pause >nul
