@echo off
setlocal
chcp 65001 >nul
title GoVietStay - Check Live RU Phu Quoc URLs
echo.
echo =========================================================
echo   CHECK HTTP STATUS - 15 TRANG + SITEMAP
echo =========================================================
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$urls=@('https://www.govietstay.com/ru/phu-quoc','https://www.govietstay.com/ru/phu-quoc-help','https://www.govietstay.com/ru/phu-quoc/chto-posmotret','https://www.govietstay.com/ru/phu-quoc/kuda-poehat','https://www.govietstay.com/ru/phu-quoc/s-detmi','https://www.govietstay.com/ru/phu-quoc/3-ili-4-ostrova','https://www.govietstay.com/ru/phu-quoc/pogoda','https://www.govietstay.com/ru/phu-quoc/russkiy-gid','https://www.govietstay.com/ru/phu-quoc/aeroport-transfer','https://www.govietstay.com/ru/phu-quoc/7-dney','https://www.govietstay.com/ru/phu-quoc/10-dney','https://www.govietstay.com/ru/phu-quoc/sunset-town','https://www.govietstay.com/ru/phu-quoc/from-moscow','https://www.govietstay.com/ru/phu-quoc/from-almaty','https://www.govietstay.com/ru/phu-quoc/from-tashkent','https://www.govietstay.com/ru/phu-quoc/sitemap.xml');foreach($u in $urls){try{$r=Invoke-WebRequest -Uri $u -Method Head -MaximumRedirection 5 -TimeoutSec 20;Write-Host ('[OK '+[int]$r.StatusCode+'] '+$u)}catch{Write-Host ('[LOI] '+$u+' -> '+$_.Exception.Message) -ForegroundColor Red}}"
echo.
pause
