$ErrorActionPreference = "Stop"

function Run-Git([string[]]$Arguments) {
  & git @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw ("Git command failed: git " + ($Arguments -join " "))
  }
}

try {
  $installerDir = Split-Path -Parent $MyInvocation.MyCommand.Path
  $payloadZip = Join-Path $installerDir "RU-REVIEW-UPGRADE-V6-PAYLOAD.zip"
  $candidates = @(
    $installerDir,
    (Split-Path -Parent $installerDir),
    (Get-Location).Path
  ) | Select-Object -Unique

  $target = $candidates | Where-Object { Test-Path (Join-Path $_ "package.json") } | Select-Object -First 1
  if (-not $target) { throw "Khong tim thay thu muc website co package.json." }
  if (-not (Test-Path $payloadZip)) { throw "Khong tim thay file payload RU REVIEW V6." }

  $target = (Resolve-Path $target).Path
  Set-Location $target
  $isGit = (& git rev-parse --is-inside-work-tree 2>$null)
  if ($LASTEXITCODE -ne 0 -or $isGit -ne "true") { throw "Thu muc website khong phai Git repository." }

  $sourceFile = "app/ru/page.tsx"
  $preStaged = (& git diff --cached --name-only)
  if ($preStaged) { throw "Git dang co file duoc stage tu truoc. Hay xu ly stage truoc khi chay." }

  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $tempRoot = Join-Path ([IO.Path]::GetTempPath()) ("GOVIETSTAY-RU-REVIEW-V6-" + $stamp)
  $tempPayload = Join-Path $tempRoot "payload"
  $backupRoot = Join-Path $tempRoot "backups"
  New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

  Write-Host "[1/6] Giai nen goi review V6..."
  Expand-Archive -LiteralPath $payloadZip -DestinationPath $tempPayload -Force
  $payloadFile = Join-Path $tempPayload $sourceFile
  if (-not (Test-Path $payloadFile)) { throw "Payload V6 thieu app/ru/page.tsx." }
  if (-not (Select-String -LiteralPath $payloadFile -Pattern "GVS-RU-TRUST-V1" -Quiet)) { throw "Payload V6 thieu marker review." }
  if (-not (Select-String -LiteralPath $payloadFile -Pattern "GOOGLE_REVIEWS_URL" -Quiet)) { throw "Payload V6 thieu link Google Reviews." }

  Write-Host "[2/6] Dua backup cu ra ngoai project..."
  $oldBackups = Get-ChildItem -LiteralPath $target -Directory -Filter "BACKUP-GOVIETSTAY-VI-UPGRADE-*" -ErrorAction SilentlyContinue
  foreach ($oldBackup in $oldBackups) {
    Move-Item -LiteralPath $oldBackup.FullName -Destination $backupRoot -Force
    Write-Host ("  Da dua backup cu ra ngoai: " + $oldBackup.Name)
  }

  $destination = Join-Path $target $sourceFile
  $backupFile = Join-Path $backupRoot $sourceFile
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $backupFile) | Out-Null
  if (Test-Path $destination) { Copy-Item -LiteralPath $destination -Destination $backupFile -Force }

  Write-Host "[3/6] Ghi review that vao ngay sau hero..."
  Copy-Item -LiteralPath $payloadFile -Destination $destination -Force

  Write-Host "[4/6] Kiem tra noi dung va build website..."
  if (-not (Select-String -LiteralPath $destination -Pattern "GVS-RU-TRUST-V1" -Quiet)) { throw "File dich thieu marker review." }
  if (-not (Select-String -LiteralPath $destination -Pattern "russianTrustReviews" -Quiet)) { throw "File dich thieu khoi review." }
  & npm run build
  if ($LASTEXITCODE -ne 0) { throw "Build that bai. Khong commit va khong push." }

  Write-Host "[5/6] Stage dung file trang tieng Nga..."
  Run-Git @("add", "-f", "--", $sourceFile)
  Run-Git @("add", "--", "NANG-CAP-RU-REVIEW-V6.bat", "NANG-CAP-RU-REVIEW-V6.ps1", "RU-REVIEW-UPGRADE-V6-PAYLOAD.zip")
  $stagedNames = (& git diff --cached --name-only)
  if ($stagedNames -notcontains $sourceFile) { throw "Git chua stage duoc app/ru/page.tsx." }

  Write-Host "[6/6] Commit va push de Vercel tu deploy..."
  Run-Git @("commit", "-m", "Improve Russian trust and booking flow")
  Run-Git @("push", "origin", "main")
  Write-Host ""
  Write-Host "DA PUSH NANG CAP TRANG TIENG NGA V6." -ForegroundColor Green
  Write-Host "Review that va link Google Maps da nam ngay sau hero."
  Write-Host "Backup nam ngoai project tai: $backupRoot"
  Write-Host "Mo https://www.govietstay.com/ru sau khi Vercel bao READY."
}
catch {
  Write-Host ""
  Write-Host ("DUNG LAI: " + $_.Exception.Message) -ForegroundColor Red
  Write-Host "Khong co commit hoac push nao duoc tao sau loi nay."
  exit 1
}
