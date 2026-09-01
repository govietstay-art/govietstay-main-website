@echo off
setlocal
cd /d "%~dp0"
echo ====================================================================
echo   GoVietStay - Admin Operations Center V1.3
echo   ISOLATED WORKTREE - DOES NOT TOUCH CURRENT WORKING FILES
echo ====================================================================
echo.
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0INSTALL-OPERATIONS-V1-3.ps1"
set "EXITCODE=%ERRORLEVEL%"
echo.
if "%EXITCODE%"=="0" (
  echo [DONE] Production build and push completed from an isolated worktree.
  echo Open after Vercel deploy: https://www.govietstay.com/admin/operations
) else (
  echo [STOP] Nothing from a failed Operations build was pushed.
  echo Your current working files were not stashed or cleaned by V1.3.
)
echo.
pause
exit /b %EXITCODE%
