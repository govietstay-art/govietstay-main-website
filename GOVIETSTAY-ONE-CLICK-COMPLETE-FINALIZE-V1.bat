@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay - One Click Complete Finalize

echo.
echo ================================================================
echo  GOVIETSTAY - ONE CLICK COMPLETE + FINALIZE
echo ================================================================
echo.
echo  One button now does:
echo  - Booking status = COMPLETED
echo  - Payment status = PAID
echo  - Amount Received = full booking revenue
echo  - Finance Finalized = TRUE
echo  - Payroll recalculated immediately
echo  - Existing direct costs are preserved
echo.
echo  Backend RPC is already installed in Supabase.
echo.

set "PROJECT="
for /f "delims=" %%I in ('git rev-parse --show-toplevel 2^>nul') do set "PROJECT=%%I"
if not defined PROJECT if exist "%USERPROFILE%\Documents\GitHub\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\Documents\GitHub\govietstay-main-website"
if not defined PROJECT if exist "%USERPROFILE%\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\govietstay-main-website"
if not defined PROJECT if exist "%USERPROFILE%\Desktop\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\Desktop\govietstay-main-website"

if not defined PROJECT (
  echo Khong tu tim thay thu muc project.
  set /p "PROJECT=Dan duong dan thu muc govietstay-main-website roi Enter: "
)
if not exist "%PROJECT%\.git" (
  echo [STOP] Khong tim thay Git project: %PROJECT%
  pause
  exit /b 1
)

set "WORKTREE=%TEMP%\gvs_one_click_%RANDOM%_%RANDOM%"
set "GVS_WORKTREE=%WORKTREE%"

echo [1/7] Fetch origin/main...
git -C "%PROJECT%" fetch origin main
if errorlevel 1 goto FAIL

echo [2/7] Tao worktree sach...
git -C "%PROJECT%" worktree add --detach "%WORKTREE%" origin/main
if errorlevel 1 goto FAIL

echo [3/7] Patch Sales Team + Finance...
set "PATCH_B64=%TEMP%\gvs_one_click_%RANDOM%_%RANDOM%.b64"
set "PATCH_PS1=%TEMP%\gvs_one_click_%RANDOM%_%RANDOM%.ps1"
> "%PATCH_B64%" (
  echo 77u/JEVycm9yQWN0aW9uUHJlZmVyZW5jZSA9ICJTdG9wIgokcm9vdCA9ICRlbnY6R1ZTX1dPUktUUkVFCmlmICgtbm90ICRyb290KSB7IHRocm93ICJHVlNfV09SS1RSRUUgaXMgbm90IHNldC4iIH0KJHV0ZjggPSBOZXctT2JqZWN0IFN5c3RlbS5UZXh0LlVURjhFbmNvZGluZygkZmFsc2UpCgpmdW5jdGlvbiBQYXRjaC1GaWxlKFtzdHJpbmddJHBhdGgsW3NjcmlwdGJsb2NrXSRwYXRjaGVyKSB7CiAgaWYgKC1ub3QgKFRlc3QtUGF0aCAkcGF0aCkpIHsgdGhyb3cgIkNhbm5vdCBmaW5kICRwYXRoIiB9CiAgJHNjcmlwdDp0ZXh0ID0gW0lPLkZpbGVdOjpSZWFkQWxsVGV4dCgkcGF0aCwkdXRmOCkuUmVwbGFjZSgiYHJgbiIsImBuIikKICAmICRwYXRjaGVyCiAgW0lPLkZpbGVdOjpXcml0ZUFsbFRleHQoJHBhdGgsJHNjcmlwdDp0ZXh0LCR1dGY4KQp9CgpmdW5jdGlvbiBSZXBsYWNlLUV4YWN0KFtzdHJpbmddJG9sZCxbc3RyaW5nXSRuZXcsW3N0cmluZ10kbGFiZWwpIHsKICBpZiAoLW5vdCAkc2NyaXB0OnRleHQuQ29udGFpbnMoJG9sZCkpIHsgdGhyb3cgIlBhdGNoIHBvaW50IG5vdCBmb3VuZDogJGxhYmVsIiB9CiAgJHNjcmlwdDp0ZXh0ID0gJHNjcmlwdDp0ZXh0LlJlcGxhY2UoJG9sZCwkbmV3KQogIFdyaXRlLUhvc3QgIltQQVRDSF0gJGxhYmVsIiAtRm9yZWdyb3VuZENvbG9yIEN5YW4KfQoKJHN0YWZmUGF0aCA9IEpvaW4tUGF0aCAkcm9vdCAiY29tcG9uZW50c1xhZG1pbi12NVxTdGFmZlNhbGVzVGVhbS50c3giClBhdGNoLUZpbGUgJHN0YWZmUGF0aCB7CiAgaWYgKCRzY3JpcHQ6dGV4dC5Db250YWlucygiLy8gR1ZTLU9ORS1DTElDSy1GSU5BTElaRS1WMSIpKSB7CiAgICBXcml0ZS1Ib3N0ICJbT0tdIFN0YWZmU2FsZXNUZWFtIG9uZS1jbGljayBmaW5hbGl6ZSBhbHJlYWR5IGluc3RhbGxlZC4iIC1Gb3JlZ3JvdW5kQ29sb3IgR3JlZW4KICAgIHJldHVybgogIH0KCiAgUmVwbGFjZS1FeGFjdCBAJwovLyBHVlMtU1RBRkYtQVVUTy1PTkJPQVJESU5HLVYzCidAIEAnCi8vIEdWUy1TVEFGRi1BVVRPLU9OQk9BUkRJTkctVjMKLy8gR1ZTLU9ORS1DTElDSy1GSU5BTElaRS1WMQonQCAiU3RhZmZTYWxlc1RlYW0gbWFya2VyIgoKICBSZXBsYWNlLUV4YWN0IEAnCiAgYXN5bmMgZnVuY3Rpb24gY3JlYXRlU2FsZXNTdGFmZihlOmFueSl7CidAIEAnCiAgYXN5bmMgZnVuY3Rpb24gZmluYWxpemVCb29raW5nT25lQ2xpY2soYjpTYWxlc0Jvb2tpbmcpewogICAgaWYoIXdpbmRvdy5jb25maXJtKGBIb8OgbiB04bqldCAmIGNo4buRdCAke2IuYm9va2luZ19jb2RlfT9cblxuSOG7hyB0aOG7kW5nIHPhur0gdOG7sTpcbuKAoiBzdGF0dXMgPSBjb21wbGV0ZWRcbuKAoiBwYXltZW50ID0gcGFpZFxu4oCiIEFtb3VudCBSZWNlaXZlZCA9ICR7bW9uZXkoYi5yZXZlbnVlX3ZuZCl9XG7igKIgRmluYW5jZSBGaW5hbGl6ZWQgPSBPTlxu4oCiIHTDrW5oIGzhuqFpIFBheXJvbGxcblxuQ2hpIHBow60gxJHDoyBuaOG6rXAgc+G6vSDEkcaw4bujYyBnaeG7ryBuZ3V5w6puLmApKXJldHVybjsKICAgIHNldFNhdmluZyh0cnVlKTtzZXRFcnJvcigiIik7c2V0TWVzc2FnZSgiIik7CiAgICB0cnl7CiAgICAgIGNvbnN0IHtkYXRhLGVycm9yfT1hd2FpdCBzdXBhYmFzZS5ycGMoImFkbWluX2ZpbmFsaXplX2Jvb2tpbmdfb25lX2NsaWNrIix7cF9ib29raW5nX2lkOmIuYm9va2luZ19pZH0pOwogICAgICBpZihlcnJvcil0aHJvdyBlcnJvcjsKICAgICAgY29uc3Qgd2FybmluZz1kYXRhPy53YXJuaW5nPT09Ik5PX0RJUkVDVF9DT1NUIj8iIOKaoCBCb29raW5nIGNoxrBhIGPDsyBkaXJlY3QgY29zdDsgY8OzIHRo4buDIGLhu5Ugc3VuZyBjaGkgcGjDrSBzYXUgbuG6v3UgY+G6p24uIjoiIjsKICAgICAgc2V0TWVzc2FnZShg4pyTICR7ZGF0YT8uYm9va2luZ19jb2RlfHxiLmJvb2tpbmdfY29kZX0gxJHDoyBDb21wbGV0ZWQgKyBQYWlkICsgRmluYW5jZSBGaW5hbGl6ZWQuIFBheXJvbGwgxJHDoyB0w61uaCBs4bqhaS4ke3dhcm5pbmd9YCk7CiAgICAgIGF3YWl0IGxvYWQoKTsKICAgIH1jYXRjaChlOmFueSl7c2V0RXJyb3IoZT8ubWVzc2FnZXx8Iktow7RuZyBjaOG7kXQgxJHGsOG7o2MgYm9va2luZy4iKTt9CiAgICBmaW5hbGx5e3NldFNhdmluZyhmYWxzZSl9CiAgfQoKICBhc3luYyBmdW5jdGlvbiBjcmVhdGVTYWxlc1N0YWZmKGU6YW55KXsKJ0AgIlN0YWZmU2FsZXNUZWFtIGZpbmFsaXplIGZ1bmN0aW9uIgoKICBSZXBsYWNlLUV4YWN0IEAnCiAgICAgIDxkaXYgY2xhc3NOYW1l
  echo PSJndmEtc2VjdGlvbi1oZWFkIj48ZGl2PjxoMj5TdGFmZiBCb29raW5nIEVjb25vbWljczwvaDI+PGRpdiBjbGFzc05hbWU9Imd2YS1taW5pIj5Db21taXNzaW9uIHThu7EgdMOtbmggdGhlbyBUb3VyIMOXIFBheCDDlyBuZ8O0biBuZ+G7ryBIRFYgw5cgdGllciBz4buRIHRvdXIgQ29tcGxldGVkIHRyb25nIHRow6FuZy4gUHJvZml0IGNo4buJIGhp4buDbiB0aOG7iyDEkeG7gyB0aGFtIGto4bqjbyB24bqtbiBow6BuaC48L2Rpdj48L2Rpdj48L2Rpdj4KJ0AgQCcKICAgICAgPGRpdiBjbGFzc05hbWU9Imd2YS1zZWN0aW9uLWhlYWQiPjxkaXY+PGgyPlN0YWZmIEJvb2tpbmcgRWNvbm9taWNzPC9oMj48ZGl2IGNsYXNzTmFtZT0iZ3ZhLW1pbmkiPkNvbW1pc3Npb24gdOG7sSB0w61uaCB0aGVvIFRvdXIgw5cgUGF4IMOXIG5nw7RuIG5n4buvIEhEViDDlyB0aWVyIHPhu5EgdG91ciBDb21wbGV0ZWQuIETDuW5nIOKAnEhvw6BuIHThuqV0ICYgY2jhu5F04oCdIMSR4buDIENvbXBsZXRlZCArIFBhaWQgKyBGaW5hbmNlIEZpbmFsaXplZCB0cm9uZyAxIGzhuqduLjwvZGl2PjwvZGl2PjwvZGl2PgonQCAiU3RhZmYgZWNvbm9taWNzIGluc3RydWN0aW9uIgoKICBSZXBsYWNlLUV4YWN0IEAnCjx0ZD48YnV0dG9uIGNsYXNzTmFtZT0iZ3ZhLWJ0biBzZWNvbmRhcnkiIG9uQ2xpY2s9eygpPT5zZXRFZGl0Qm9va2luZyhiKX0+RWRpdDwvYnV0dG9uPjwvdGQ+CidAIEAnCjx0ZD48ZGl2IHN0eWxlPXt7ZGlzcGxheToiZmxleCIsZ2FwOjYsZmxleFdyYXA6IndyYXAifX0+PGJ1dHRvbiBjbGFzc05hbWU9Imd2YS1idG4gc2Vjb25kYXJ5IiBvbkNsaWNrPXsoKT0+c2V0RWRpdEJvb2tpbmcoYil9PkVkaXQ8L2J1dHRvbj48YnV0dG9uIGNsYXNzTmFtZT0iZ3ZhLWJ0biIgZGlzYWJsZWQ9e3NhdmluZ3x8Yi5zdGF0dXM9PT0iY2FuY2VsbGVkIn0gb25DbGljaz17KCk9PmZpbmFsaXplQm9va2luZ09uZUNsaWNrKGIpfT57Yi5zdGF0dXM9PT0iY29tcGxldGVkIiYmYi5wYXltZW50X3N0YXR1cz09PSJwYWlkIiYmbnVtKGIuYW1vdW50X3JlY2VpdmVkX3ZuZCk+PW51bShiLnJldmVudWVfdm5kKT8i4pyTIENo4buRdCBs4bqhaSI6IuKckyBIb8OgbiB04bqldCAmIGNo4buRdCJ9PC9idXR0b24+PC9kaXY+PC90ZD4KJ0AgIlN0YWZmIGJvb2tpbmcgb25lLWNsaWNrIGJ1dHRvbiIKfQoKJGZpbmFuY2VQYXRoID0gSm9pbi1QYXRoICRyb290ICJjb21wb25lbnRzXGFkbWluLXY1XEZpbmFuY2VQTC50c3giClBhdGNoLUZpbGUgJGZpbmFuY2VQYXRoIHsKICBpZiAoJHNjcmlwdDp0ZXh0LkNvbnRhaW5zKCIvLyBHVlMtRklOQU5DRS1PTkUtQ0xJQ0stRklOQUxJWkUtVjEiKSkgewogICAgV3JpdGUtSG9zdCAiW09LXSBGaW5hbmNlUEwgb25lLWNsaWNrIGZpbmFsaXplIGFscmVhZHkgaW5zdGFsbGVkLiIgLUZvcmVncm91bmRDb2xvciBHcmVlbgogICAgcmV0dXJuCiAgfQoKICBSZXBsYWNlLUV4YWN0IEAnCiJ1c2UgY2xpZW50IjsKJ0AgQCcKInVzZSBjbGllbnQiOwovLyBHVlMtRklOQU5DRS1PTkUtQ0xJQ0stRklOQUxJWkUtVjEKJ0AgIkZpbmFuY2VQTCBtYXJrZXIiCgogIFJlcGxhY2UtRXhhY3QgQCcKICBhc3luYyBmdW5jdGlvbiBhZGRFeHBlbnNlKGU6YW55KXsKJ0AgQCcKICBhc3luYyBmdW5jdGlvbiBmaW5hbGl6ZUJvb2tpbmdPbmVDbGljayhyb3c6Qm9va2luZ1Jvdyl7CiAgICBpZighd2luZG93LmNvbmZpcm0oYEhvw6BuIHThuqV0ICYgY2jhu5F0ICR7cm93LmJvb2tpbmdfY29kZXx8ImJvb2tpbmcifT9cblxuVOG7sSDEkeG7mW5nOlxu4oCiIENvbXBsZXRlZFxu4oCiIFBhaWRcbuKAoiBBbW91bnQgUmVjZWl2ZWQgPSAke21vbmV5KHJvdy5yZXZlbnVlX3ZuZCl9XG7igKIgRmluYW5jZSBGaW5hbGl6ZWRcbuKAoiBQYXlyb2xsIHJlY2FsY3VsYXRlZFxuXG5DaGkgcGjDrSBoaeG7h24gdOG6oWkgxJHGsOG7o2MgZ2nhu68gbmd1ecOqbi5gKSlyZXR1cm47CiAgICBzZXRTYXZpbmcodHJ1ZSk7c2V0RXJyb3IoIiIpO3NldE1lc3NhZ2UoIiIpOwogICAgdHJ5ewogICAgICBjb25zdCB7ZGF0YSxlcnJvcn09YXdhaXQgc3VwYWJhc2UucnBjKCJhZG1pbl9maW5hbGl6ZV9ib29raW5nX29uZV9jbGljayIse3BfYm9va2luZ19pZDpyb3cuYm9va2luZ19pZH0pOwogICAgICBpZihlcnJvcil0aHJvdyBlcnJvcjsKICAgICAgc2V0RWRpdEJvb2tpbmcobnVsbCk7CiAgICAgIGNvbnN0IHdhcm5pbmc9ZGF0YT8ud2FybmluZz09PSJOT19ESVJFQ1RfQ09TVCI/IiDimqAgQ2jGsGEgY8OzIGRpcmVj
  echo dCBjb3N0OyBhbmggY8OzIHRo4buDIGLhu5Ugc3VuZyBzYXUuIjoiIjsKICAgICAgc2V0TWVzc2FnZShg4pyTICR7ZGF0YT8uYm9va2luZ19jb2RlfHxyb3cuYm9va2luZ19jb2RlfHwiQm9va2luZyJ9IMSRw6MgY2jhu5F0IGhvw6BuIHThuqV0LiR7d2FybmluZ31gKTsKICAgICAgYXdhaXQgbG9hZCgpOwogICAgfWNhdGNoKGU6YW55KXtzZXRFcnJvcihlPy5tZXNzYWdlfHwiS2jDtG5nIGNo4buRdCDEkcaw4bujYyBib29raW5nLiIpO30KICAgIGZpbmFsbHl7c2V0U2F2aW5nKGZhbHNlKX0KICB9CgogIGFzeW5jIGZ1bmN0aW9uIGFkZEV4cGVuc2UoZTphbnkpewonQCAiRmluYW5jZSBmaW5hbGl6ZSBmdW5jdGlvbiIKCiAgUmVwbGFjZS1FeGFjdCBAJwogICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0iZ3ZhLWJ0biBzZWNvbmRhcnkiIG9uQ2xpY2s9eygpPT5zZXRFZGl0Qm9va2luZyhyb3cpfT5FZGl0IFAmYW1wO0w8L2J1dHRvbj4KJ0AgQCcKICAgICAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6ImZsZXgiLGdhcDo4LGZsZXhXcmFwOiJ3cmFwIn19PgogICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSJndmEtYnRuIHNlY29uZGFyeSIgb25DbGljaz17KCk9PnNldEVkaXRCb29raW5nKHJvdyl9PkVkaXQgUCZhbXA7TDwvYnV0dG9uPgogICAgICAgICAgICAgIHtyb3cuc3RhdHVzPT09ImNvbXBsZXRlZCImJnJvdy5maW5hbmNlX2ZpbmFsaXplZCYmcm93LmJhbGFuY2Vfdm5kPD0wCiAgICAgICAgICAgICAgICA/IDxidXR0b24gY2xhc3NOYW1lPSJndmEtYnRuIHNlY29uZGFyeSIgZGlzYWJsZWQ+4pyTIMSQw6MgY2jhu5F0PC9idXR0b24+CiAgICAgICAgICAgICAgICA6IDxidXR0b24gY2xhc3NOYW1lPSJndmEtYnRuIiBkaXNhYmxlZD17c2F2aW5nfHxTdHJpbmcocm93LnN0YXR1c3x8IiIpLnRvTG93ZXJDYXNlKCk9PT0iY2FuY2VsbGVkIn0gb25DbGljaz17KCk9PmZpbmFsaXplQm9va2luZ09uZUNsaWNrKHJvdyl9PuKckyBIb8OgbiB04bqldCAmIGNo4buRdDwvYnV0dG9uPn0KICAgICAgICAgICAgPC9kaXY+CidAICJGaW5hbmNlIGxpc3Qgb25lLWNsaWNrIGJ1dHRvbiIKCiAgUmVwbGFjZS1FeGFjdCBAJwogICAge2VkaXRCb29raW5nJiY8RmluYW5jZU1vZGFsIHJvdz17ZWRpdEJvb2tpbmd9IHNhdmluZz17c2F2aW5nfSBvbkNsb3NlPXsoKT0+c2V0RWRpdEJvb2tpbmcobnVsbCl9IG9uU3VibWl0PXtzYXZlQm9va2luZ0ZpbmFuY2V9Lz59ICAgIAonQCBAJwogICAge2VkaXRCb29raW5nJiY8RmluYW5jZU1vZGFsIHJvdz17ZWRpdEJvb2tpbmd9IHNhdmluZz17c2F2aW5nfSBvbkNsb3NlPXsoKT0+c2V0RWRpdEJvb2tpbmcobnVsbCl9IG9uU3VibWl0PXtzYXZlQm9va2luZ0ZpbmFuY2V9IG9uRmluYWxpemU9eygpPT5maW5hbGl6ZUJvb2tpbmdPbmVDbGljayhlZGl0Qm9va2luZyl9Lz59ICAgIAonQCAiRmluYW5jZSBtb2RhbCBmaW5hbGl6ZSBwcm9wIgoKICBSZXBsYWNlLUV4YWN0IEAnCmZ1bmN0aW9uIEZpbmFuY2VNb2RhbCh7cm93LHNhdmluZyxvbkNsb3NlLG9uU3VibWl0fTphbnkpewonQCBAJwpmdW5jdGlvbiBGaW5hbmNlTW9kYWwoe3JvdyxzYXZpbmcsb25DbG9zZSxvblN1Ym1pdCxvbkZpbmFsaXplfTphbnkpewonQCAiRmluYW5jZSBtb2RhbCBzaWduYXR1cmUiCgogIFJlcGxhY2UtRXhhY3QgQCcKICAgIDxkaXYgY2xhc3NOYW1lPSJndnMtbW9kYWwtYWN0aW9ucyI+PGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzTmFtZT0iZ3ZhLWJ0biBzZWNvbmRhcnkiIG9uQ2xpY2s9e29uQ2xvc2V9Pkjhu6d5PC9idXR0b24+PGJ1dHRvbiBjbGFzc05hbWU9Imd2YS1idG4iIGRpc2FibGVkPXtzYXZpbmd9PntzYXZpbmc/IsSQYW5nIGzGsHXigKYiOiJMxrB1IFAmTCJ9PC9idXR0b24+PC9kaXY+CidAIEAnCiAgICA8ZGl2IGNsYXNzTmFtZT0iZ3ZzLW1vZGFsLWFjdGlvbnMiPjxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzc05hbWU9Imd2YS1idG4gc2Vjb25kYXJ5IiBvbkNsaWNrPXtvbkNsb3NlfT5I4buneTwvYnV0dG9uPjxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzc05hbWU9Imd2YS1idG4iIGRpc2FibGVkPXtzYXZpbmd8fFN0cmluZyhyb3cuc3RhdHVzfHwiIikudG9Mb3dlckNhc2UoKT09PSJjYW5jZWxsZWQifSBvbkNsaWNrPXtvbkZpbmFsaXplfT7inJMgSG/DoG4gdOG6pXQgJiBjaOG7kXQ8L2J1dHRvbj48YnV0dG9uIGNsYXNzTmFtZT0iZ3ZhLWJ0biBzZWNvbmRhcnkiIGRpc2FibGVkPXtzYXZpbmd9PntzYXZpbmc/IsSQ
  echo YW5nIGzGsHXigKYiOiJMxrB1IFAmTCJ9PC9idXR0b24+PC9kaXY+CidAICJGaW5hbmNlIG1vZGFsIG9uZS1jbGljayBidXR0b24iCn0KCldyaXRlLUhvc3QgIltPS10gT25lLWNsaWNrIGZpbmFsaXplIFVJIHBhdGNoZWQuIiAtRm9yZWdyb3VuZENvbG9yIEdyZWVuCg==
)
certutil -f -decode "%PATCH_B64%" "%PATCH_PS1%" >nul
if errorlevel 1 goto FAIL_WORKTREE
powershell -NoProfile -ExecutionPolicy Bypass -File "%PATCH_PS1%"
set "PATCH_RC=%ERRORLEVEL%"
del /q "%PATCH_B64%" "%PATCH_PS1%" >nul 2>&1
if not "%PATCH_RC%"=="0" goto FAIL_WORKTREE

if exist "%PROJECT%\.env.local" copy /Y "%PROJECT%\.env.local" "%WORKTREE%\.env.local" >nul
if exist "%PROJECT%\node_modules" (
  echo [4/7] Dung node_modules hien tai...
  cmd /c mklink /J "%WORKTREE%\node_modules" "%PROJECT%\node_modules" >nul 2>&1
) else (
  echo [4/7] Cai dependencies...
  pushd "%WORKTREE%"
  if exist package-lock.json (call npm ci) else (call npm install)
  if errorlevel 1 (popd & goto FAIL_WORKTREE)
  popd
)

echo [5/7] Production build check...
pushd "%WORKTREE%"
call npm run build
if errorlevel 1 (
  popd
  echo [STOP] BUILD FAILED. Khong push production.
  goto FAIL_WORKTREE
)
popd

echo [6/7] Commit change...
git -C "%WORKTREE%" add -- "components/admin-v5/StaffSalesTeam.tsx" "components/admin-v5/FinancePL.tsx"
git -C "%WORKTREE%" diff --cached --quiet
if not errorlevel 1 goto CLEAN_SUCCESS
git -C "%WORKTREE%" -c user.name="GoVietStay Installer" -c user.email="govietstay@gmail.com" commit -m "feat(admin): one click complete paid finance finalize payroll" -- "components/admin-v5/StaffSalesTeam.tsx" "components/admin-v5/FinancePL.tsx"
if errorlevel 1 goto FAIL_WORKTREE

echo [7/7] Push main - Vercel auto deploy...
git -C "%WORKTREE%" push origin HEAD:main
if errorlevel 1 goto FAIL_WORKTREE

:CLEAN_SUCCESS
echo.
echo ================================================================
echo  SUCCESS - ONE CLICK FINALIZE
echo ================================================================
echo  Test:
echo  Admin - Sales Team / Payroll - Staff Booking Economics
echo  Click: Hoan tat ^& chot
echo.
echo  Also available:
echo  Admin - P^&L / Finance - Booking Economics
echo.
git -C "%PROJECT%" worktree remove --force "%WORKTREE%" >nul 2>&1
git -C "%PROJECT%" worktree prune >nul 2>&1
pause
exit /b 0

:FAIL_WORKTREE
echo.
echo [STOP] Co loi. Khong push production.
git -C "%PROJECT%" worktree remove --force "%WORKTREE%" >nul 2>&1
git -C "%PROJECT%" worktree prune >nul 2>&1
pause
exit /b 1

:FAIL
echo.
echo [STOP] Khong the chuan bi source. Khong push production.
pause
exit /b 1
