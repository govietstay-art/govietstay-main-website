$ErrorActionPreference = "Stop"

$repo = Join-Path $env:USERPROFILE "Documents\GitHub\govietstay-main-website"
if (-not (Test-Path (Join-Path $repo "package.json"))) {
    if (Test-Path (Join-Path (Get-Location) "package.json")) {
        $repo = (Get-Location).Path
    } else {
        throw "Cannot find govietstay-main-website repository."
    }
}

$file = Join-Path $repo "components\PhuQuocJohnsCatalog.tsx"
if (-not (Test-Path $file)) {
    throw "Missing components\PhuQuocJohnsCatalog.tsx"
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backup = "$file.before-v3.2.1-branding-$stamp.bak"
Copy-Item $file $backup -Force

$s = [System.IO.File]::ReadAllText($file)

function Replace-Required {
    param(
        [string]$Old,
        [string]$New,
        [string]$Label
    )
    if (-not $script:s.Contains($Old)) {
        throw "Expected text not found for: $Label"
    }
    $script:s = $script:s.Replace($Old, $New)
    Write-Host "  [OK] $Label" -ForegroundColor Green
}

# Remove unused supplier constant if present.
$s = $s.Replace("const SUPPLIER_MEDIA_SOURCE = `"John’s Tours partner media library`";`r`n", "")
$s = $s.Replace("const SUPPLIER_MEDIA_SOURCE = `"John’s Tours partner media library`";`n", "")

$old = @'
jointText:"Для групповых экскурсий GoVietStay использует официальную Published Rate John’s Tours без дополнительной наценки. Детский тариф, трансфер, праздничные надбавки и наличие мест подтверждаются перед оплатой."
'@.Trim()
$new = @'
jointText:"Выберите подходящую программу и отправьте заявку через GoVietStay. Мы заранее показываем актуальную цену тура; детские тарифы, трансфер, праздничные доплаты и наличие мест подтверждаются до оплаты."
'@.Trim()
Replace-Required $old $new "RU join-in sales copy"

$old = @'
published:"Официальная Published Rate"
'@.Trim()
$new = @'
published:"Цена тура"
'@.Trim()
Replace-Required $old $new "RU price label"

$old = @'
estimate:"Сумма по Published Rate"
'@.Trim()
$new = @'
estimate:"Предварительная сумма"
'@.Trim()
Replace-Required $old $new "RU estimate label"

$old = @'
estimateNote:"Расчёт по опубликованному тарифу. Детские правила, трансфер, праздники и наличие мест подтверждаются отдельно."
'@.Trim()
$new = @'
estimateNote:"Расчёт по выбранной программе. Детские правила, трансфер, праздничные даты и наличие мест подтверждаются перед оплатой."
'@.Trim()
Replace-Required $old $new "RU estimate note"

$old = @'
operator:"Фактическую экскурсию выполняет John’s Tours Phú Quốc; GoVietStay ведёт бронирование, координацию и поддержку."
'@.Trim()
$new = @'
operator:"GoVietStay отвечает за бронирование, коммуникацию и поддержку клиента. Отдельные услуги на Фукуоке фактически предоставляются лицензированными местными операторами, включая John’s Tours Phú Quốc, в соответствии с подтверждённым бронированием."
'@.Trim()
Replace-Required $old $new "RU legal disclosure"

$old = @'
jointText:"For join-in tours, GoVietStay uses John’s Tours official Published Rate with no additional markup. Child pricing, pickup, holiday surcharges and availability are reconfirmed before payment."
'@.Trim()
$new = @'
jointText:"Choose the program that fits you and book through GoVietStay. We show the current tour price upfront; child rates, pickup, holiday surcharges and availability are confirmed before payment."
'@.Trim()
Replace-Required $old $new "EN join-in sales copy"

$old = @'
published:"Official Published Rate"
'@.Trim()
$new = @'
published:"Tour price"
'@.Trim()
Replace-Required $old $new "EN price label"

$old = @'
estimate:"Published-rate total"
'@.Trim()
$new = @'
estimate:"Estimated total"
'@.Trim()
Replace-Required $old $new "EN estimate label"

$old = @'
estimateNote:"Calculated from the published tariff. Child rules, pickup, holidays and availability are still reconfirmed."
'@.Trim()
$new = @'
estimateNote:"Calculated for the selected program. Child rules, pickup, holiday dates and availability are confirmed before payment."
'@.Trim()
Replace-Required $old $new "EN estimate note"

$old = @'
operator:"The tour itself is operated by John’s Tours Phú Quốc; GoVietStay handles booking, coordination and customer support."
'@.Trim()
$new = @'
operator:"GoVietStay is responsible for booking communication, coordination and customer support. Selected Phu Quoc services are fulfilled by licensed local operators, including John’s Tours Phú Quốc, according to the confirmed booking."
'@.Trim()
Replace-Required $old $new "EN legal disclosure"

# Remove supplierMedia/mediaNote properties safely.
$old = @'
supplierMedia:"Фотографии: медиатека партнёра John’s Tours", mediaNote:"Изображения локально сохранены в GoVietStay; публикация — в рамках согласованных прав партнёра.", 
'@.Trim()
$s = $s.Replace($old, "")

$old = @'
supplierMedia:"Photos: John’s Tours partner media library", mediaNote:"Images are stored locally by GoVietStay and should be published within the agreed partner media-use rights.", 
'@.Trim()
$s = $s.Replace($old, "")

# Hero image alt
$old = @'
alt="John's Tours Phu Quoc speedboat"
'@.Trim()
$new = @'
alt={language === "ru" ? "Острова Фукуока и бирюзовое море" : "Phu Quoc islands and turquoise sea"}
'@.Trim()
Replace-Required $old $new "Hero image alt"

# Hero supplier overlay -> GoVietStay brand only.
$old = @'
<p className="text-xs font-black uppercase tracking-[.16em] text-amber-300">Supplier media · {SUPPLIER_MEDIA_SOURCE}</p><p className="mt-2 text-2xl font-black">GoVietStay booking · John’s Tours operation</p>
'@.Trim()
$new = @'
<p className="text-xs font-black uppercase tracking-[.16em] text-amber-300">{language === "ru" ? "Фукуок · местная поддержка" : "Phu Quoc · local support"}</p><p className="mt-2 text-2xl font-black">GoVietStay</p>
'@.Trim()
Replace-Required $old $new "Hero branding"

# Remove supplier media attribution under cards.
$old = @'
      <p className="mt-5 text-xs text-[#647a75]">{t.supplierMedia} · {t.mediaNote}</p>
'@
$s = $s.Replace($old, "")
$oldLF = $old -replace "`r`n","`n"
$s = $s.Replace($oldLF, "")

# Remove operator wording from deposit card.
$old = @'
<p className="mt-3 rounded-xl bg-[#edf7f2] p-3 text-sm font-black text-emerald-800">{t.methods}</p><div className="my-5 h-px bg-[#dfe9e4]"/><p className="text-sm leading-6 text-[#496b67]">{t.operator}</p>
'@.Trim()
$new = @'
<p className="mt-3 rounded-xl bg-[#edf7f2] p-3 text-sm font-black text-emerald-800">{t.methods}</p>
'@.Trim()
Replace-Required $old $new "Remove operator from deposit card"

# Add collapsed legal disclosure at page bottom.
$legal = @'
    <section className="border-t border-[#0b4b43]/10 bg-[#f7f1e5]">
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
        <details className="text-xs leading-5 text-[#647a75]">
          <summary className="cursor-pointer select-none font-semibold text-[#496b67]">
            {language === "ru" ? "Юридическая информация и исполнение услуг" : "Legal & service information"}
          </summary>
          <div className="mt-3 max-w-4xl space-y-2">
            <p>{t.operator}</p>
            <p>{language === "ru"
              ? "Фотографии и материалы используются GoVietStay в рамках согласованных партнёрских прав. Конкретный исполнитель и применимые условия указываются в подтверждении бронирования."
              : "Photos and media are used by GoVietStay under agreed partner-use rights. The applicable service provider and terms are identified in the confirmed booking."}</p>
          </div>
        </details>
      </div>
    </section>
'@

if (-not $s.Contains("  </main>;")) {
    throw "Could not find closing main tag."
}
$s = $s.Replace("  </main>;", $legal + "`r`n  </main>;")

# Guardrail: no supplier identity in sales-facing rendered UI before legal block.
$heroMarker = '<section className="relative overflow-hidden bg-[#052f2d] text-white">'
$legalMarker = '<section className="border-t border-[#0b4b43]/10 bg-[#f7f1e5]">'
$heroStart = $s.IndexOf($heroMarker)
$legalStart = $s.IndexOf($legalMarker)

if ($heroStart -lt 0 -or $legalStart -le $heroStart) {
    throw "Could not validate sales/legal sections."
}

$salesUi = $s.Substring($heroStart, $legalStart - $heroStart)
if ($salesUi.Contains("John’s Tours") -or $salesUi.Contains("John's Tours") -or $salesUi.Contains("Supplier media")) {
    throw "Guardrail failed: supplier name still appears in sales-facing rendered UI."
}

[System.IO.File]::WriteAllText(
    $file,
    $s,
    (New-Object System.Text.UTF8Encoding($false))
)

Write-Host ""
Write-Host "[OK] V3.2.1 branding/legal patch applied." -ForegroundColor Green
Write-Host "Backup: $backup"
Write-Host ""
Write-Host "Running npm production build..." -ForegroundColor Cyan

Set-Location $repo
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
}

& npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[FAIL] Build failed. Nothing committed / nothing pushed." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host " SUCCESS - PHU QUOC V3.2.1 BRANDING / LEGAL BUILD PASSED" -ForegroundColor Green
Write-Host " NOTHING COMMITTED / NOTHING PUSHED" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Public-facing:"
Write-Host "  Hero / tour price / booking / deposit = GoVietStay"
Write-Host "  No John's Tours supplier branding in sales-facing UI"
Write-Host "  John's Tours remains only inside collapsed bottom Legal section"
Write-Host ""
git diff -- components/PhuQuocJohnsCatalog.tsx
