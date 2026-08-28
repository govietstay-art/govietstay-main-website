$ErrorActionPreference = "Stop"

function Run-Git([string[]]$Arguments) {
  & git @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw ("Git command failed: git " + ($Arguments -join " "))
  }
}

try {
  $installerDir = Split-Path -Parent $MyInvocation.MyCommand.Path
  $payloadZip = Join-Path $installerDir "VI-TOUR-VN-UPGRADE-V5-PAYLOAD.zip"
  $candidates = @(
    $installerDir,
    (Split-Path -Parent $installerDir),
    (Get-Location).Path
  ) | Select-Object -Unique

  $target = $candidates | Where-Object { Test-Path (Join-Path $_ "package.json") } | Select-Object -First 1
  if (-not $target) { throw "Khong tim thay thu muc website co package.json." }
  if (-not (Test-Path $payloadZip)) { throw "Khong tim thay file payload V5." }

  $target = (Resolve-Path $target).Path
  Set-Location $target
  $isGit = (& git rev-parse --is-inside-work-tree 2>$null)
  if ($LASTEXITCODE -ne 0 -or $isGit -ne "true") { throw "Thu muc website khong phai Git repository." }

  $sourceFiles = @(
    "app/vi/page.tsx",
    "app/vi/VietnamHub.module.css",
    "app/vi/_seo/VietnamPage.tsx"
  )

  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $tempRoot = Join-Path ([IO.Path]::GetTempPath()) ("GOVIETSTAY-VI-UPGRADE-V5-" + $stamp)
  $tempPayload = Join-Path $tempRoot "payload"
  $backupRoot = Join-Path $tempRoot "backups"
  New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

  Write-Host "[1/7] Giai nen goi nang cap V5..."
  Expand-Archive -LiteralPath $payloadZip -DestinationPath $tempPayload -Force

  $markerFile = Join-Path $tempPayload "app/vi/page.tsx"
  if (-not (Test-Path $markerFile)) { throw "Payload V5 thieu app/vi/page.tsx." }
  if (-not (Select-String -LiteralPath $markerFile -Pattern "GVS-VI-UPGRADE-V1" -Quiet)) { throw "Payload V5 khong dung phien ban." }
  if (-not (Select-String -LiteralPath $markerFile -Pattern "GOVIETSTAY KH" -Quiet)) { throw "Payload V5 thieu phan giao dien moi." }

  Write-Host "[2/7] Dua backup cu ra ngoai project va sao luu an toan..."
  $oldBackups = Get-ChildItem -LiteralPath $target -Directory -Filter "BACKUP-GOVIETSTAY-VI-UPGRADE-*" -ErrorAction SilentlyContinue
  foreach ($oldBackup in $oldBackups) {
    Move-Item -LiteralPath $oldBackup.FullName -Destination $backupRoot -Force
    Write-Host ("  Da dua backup cu ra ngoai: " + $oldBackup.Name)
  }

  $backup = Join-Path $backupRoot "original"
  foreach ($relative in $sourceFiles) {
    $destination = Join-Path $target $relative
    if (Test-Path $destination) {
      $savePath = Join-Path $backup $relative
      New-Item -ItemType Directory -Force -Path (Split-Path -Parent $savePath) | Out-Null
      Copy-Item -LiteralPath $destination -Destination $savePath -Force
    }
  }
  Write-Host ("  Backup moi nam ngoai project: " + $backup)

  Write-Host "[3/7] Ghi ma nguon moi vao website..."
  foreach ($relative in $sourceFiles) {
    $source = Join-Path $tempPayload $relative
    $destination = Join-Path $target $relative
    if (-not (Test-Path $source)) { throw ("Payload thieu file: " + $relative) }
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $destination) | Out-Null
    Copy-Item -LiteralPath $source -Destination $destination -Force
    Write-Host ("  OK  " + $relative)
  }

  Write-Host "[4/7] Xac nhan file dich da co noi dung moi..."
  $updatedPage = Join-Path $target "app/vi/page.tsx"
  if (-not (Select-String -LiteralPath $updatedPage -Pattern "GVS-VI-UPGRADE-V1" -Quiet)) { throw "File dich thieu marker nang cap." }
  if (-not (Select-String -LiteralPath $updatedPage -Pattern "GOVIETSTAY KH" -Quiet)) { throw "File dich thieu giao dien moi." }

  Write-Host "[5/7] Build kiem tra website..."
  & npm run build
  if ($LASTEXITCODE -ne 0) { throw "Build that bai. Khong commit va khong push." }

  Write-Host "[6/7] Stage dung file ma nguon /vi..."
  Run-Git (@("add", "-f", "--") + $sourceFiles)
  Run-Git @("add", "--", "NANG-CAP-VI-TOUR-VN-V5.bat", "NANG-CAP-VI-TOUR-VN-V5.ps1", "VI-TOUR-VN-UPGRADE-V5-PAYLOAD.zip")

  $stagedNames = (& git diff --cached --name-only)
  foreach ($relative in $sourceFiles) {
    if ($stagedNames -notcontains $relative) { throw ("Git chua stage duoc file: " + $relative) }
  }

  Write-Host "[7/7] Commit va push de Vercel tu deploy..."
  Run-Git @("commit", "-m", "Apply Vietnamese tour experience source update V5")
  Run-Git @("push", "origin", "main")

  Write-Host ""
  Write-Host "DA PUSH DUNG MA NGUON NANG CAP /VI V5." -ForegroundColor Green
  Write-Host "Vercel se tu build va deploy commit moi."
  Write-Host ("Backup nam ngoai project tai: " + $backup)
  Write-Host "Mo https://www.govietstay.com/vi sau khi Vercel bao READY."
}
catch {
  Write-Host ""
  Write-Host ("DUNG LAI: " + $_.Exception.Message) -ForegroundColor Red
  Write-Host "Khong co commit hoac push nao duoc tao sau loi nay."
  exit 1
}
