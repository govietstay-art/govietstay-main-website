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
if (-not (Test-Path $file)) { throw "Missing components\PhuQuocJohnsCatalog.tsx" }

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backup = "$file.before-v3.2-branding-$stamp.bak"
Copy-Item $file $backup -Force

$s = [IO.File]::ReadAllText($file)

function Replace-Required([string]$old, [string]$new, [string]$label) {
    if (-not $script:s.Contains($old)) {
        throw "Expected text not found for: $label"
    }
    $script:s = $script:s.Replace($old, $new)
    Write-Host "  [OK] $label" -ForegroundColor Green
}

# 1) Remove supplier branding constant from the sales-facing UI.
$s = $s.Replace('const SUPPLIER_MEDIA_SOURCE = "John’s Tours partner media library";' + "`r`n", "")
$s = $s.Replace('const SUPPLIER_MEDIA_SOURCE = "John’s Tours partner media library";' + "`n", "")

# 2) Rewrite EN/RU commercial copy: GoVietStay first, supplier-neutral.
Replace-Required `
'jointText:"Для групповых экскурсий GoVietStay использует официальную Published Rate John’s Tours без дополнительной наценки. Детский тариф, трансфер, праздничные надбавки и наличие мест подтверждаются перед оплатой."' `
'jointText:"Выберите подходящую программу и отправьте заявку через GoVietStay. Мы заранее показываем актуальную цену тура; детские тарифы, трансфер, праздничные доплаты и наличие мест подтверждаются до оплаты."' `
"RU join-in sales copy"

Replace-Required `
'published:"Официальная Published Rate"' `
'published:"Цена тура"' `
"RU price label"

Replace-Required `
'estimate:"Сумма по Published Rate"' `
'estimate:"Предварительная сумма"' `
"RU estimate label"

Replace-Required `
'estimateNote:"Расчёт по опубликованному тарифу. Детские правила, трансфер, праздники и наличие мест подтверждаются отдельно."' `
'estimateNote:"Расчёт по выбранной программе. Детские правила, трансфер, праздничные даты и наличие мест подтверждаются перед оплатой."' `
"RU estimate note"

Replace-Required `
'operator:"Фактическую экскурсию выполняет John’s Tours Phú Quốc; GoVietStay ведёт бронирование, координацию и поддержку."' `
'operator:"GoVietStay отвечает за бронирование, коммуникацию и поддержку клиента. Отдельные услуги на Фукуоке фактически предоставляются лицензированными местными операторами, включая John’s Tours Phú Quốc, в соответствии с подтверждённым бронированием."' `
"RU legal disclosure"

Replace-Required `
'jointText:"For join-in tours, GoVietStay uses John’s Tours official Published Rate with no additional markup. Child pricing, pickup, holiday surcharges and availability are reconfirmed before payment."' `
'jointText:"Choose the program that fits you and book through GoVietStay. We show the current tour price upfront; child rates, pickup, holiday surcharges and availability are confirmed before payment."' `
"EN join-in sales copy"

Replace-Required `
'published:"Official Published Rate"' `
'published:"Tour price"' `
"EN price label"

Replace-Required `
'estimate:"Published-rate total"' `
'estimate:"Estimated total"' `
"EN estimate label"

Replace-Required `
'estimateNote:"Calculated from the published tariff. Child rules, pickup, holidays and availability are still reconfirmed."' `
'estimateNote:"Calculated for the selected program. Child rules, pickup, holiday dates and availability are confirmed before payment."' `
"EN estimate note"

Replace-Required `
'operator:"The tour itself is operated by John’s Tours Phú Quốc; GoVietStay handles booking, coordination and customer support."' `
'operator:"GoVietStay is responsible for booking communication, coordination and customer support. Selected Phu Quoc services are fulfilled by licensed local operators, including John’s Tours Phú Quốc, according to the confirmed booking."' `
"EN legal disclosure"

# Remove now-unused visible supplier-media copy from i18n.
$s = $s.Replace('supplierMedia:"Фотографии: медиатека партнёра John’s Tours", mediaNote:"Изображения локально сохранены в GoVietStay; публикация — в рамках согласованных прав партнёра.", ', "")
$s = $s.Replace('supplierMedia:"Photos: John’s Tours partner media library", mediaNote:"Images are stored locally by GoVietStay and should be published within the agreed partner media-use rights.", ', "")

# 3) Hero: remove supplier identity and make it GoVietStay-led.
Replace-Required `
'alt="John''s Tours Phu Quoc speedboat"' `
'alt={language === "ru" ? "Острова Фукуока и бирюзовое море" : "Phu Quoc islands and turquoise sea"}' `
"Hero image alt"

Replace-Required `
'<p className="text-xs font-black uppercase tracking-[.16em] text-amber-300">Supplier media · {SUPPLIER_MEDIA_SOURCE}</p><p className="mt-2 text-2xl font-black">GoVietStay booking · John’s Tours operation</p>' `
'<p className="text-xs font-black uppercase tracking-[.16em] text-amber-300">{language === "ru" ? "Фукуок · местная поддержка" : "Phu Quoc · local support"}</p><p className="mt-2 text-2xl font-black">GoVietStay</p>' `
"Hero branding"

# 4) Remove supplier attribution directly below tour cards.
$s = $s.Replace('      <p className="mt-5 text-xs text-[#647a75]">{t.supplierMedia} · {t.mediaNote}</p>' + "`r`n", "")
$s = $s.Replace('      <p className="mt-5 text-xs text-[#647a75]">{t.supplierMedia} · {t.mediaNote}</p>' + "`n", "")

# 5) Remove operator identity from the booking/deposit sales card.
Replace-Required `
'<p className="mt-3 rounded-xl bg-[#edf7f2] p-3 text-sm font-black text-emerald-800">{t.methods}</p><div className="my-5 h-px bg-[#dfe9e4]"/><p className="text-sm leading-6 text-[#496b67]">{t.operator}</p>' `
'<p className="mt-3 rounded-xl bg-[#edf7f2] p-3 text-sm font-black text-emerald-800">{t.methods}</p>' `
"Remove operator from deposit card"

# 6) Put supplier/operator relationship only inside a small collapsed legal disclosure at the bottom.
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

if ($s.Contains('  </main>;')) {
    $s = $s.Replace('  </main>;', $legal + "`r`n  </main>;")
} else {
    throw "Could not find </main> insertion point."
}

# Guardrails: sales copy should no longer expose supplier relationship.
$heroStart = $s.IndexOf('<section className="relative overflow-hidden bg-[#052f2d] text-white">')
$legalStart = $s.IndexOf('<section className="border-t border-[#0b4b43]/10 bg-[#f7f1e5]">')
if ($heroStart -ge 0 -and $legalStart -gt $heroStart) {
    $salesUi = $s.Substring($heroStart, $legalStart - $heroStart)
    if ($salesUi.Contains("John’s Tours") -or $salesUi.Contains("John's Tours") -or $salesUi.Contains("Supplier media")) {
        throw "Guardrail failed: supplier name still appears in sales-facing rendered UI."
    }
}

[IO.File]::WriteAllText($file, $s, (New-Object Text.UTF8Encoding($false)))

Write-Host ""
Write-Host "[OK] Branding/legal patch applied." -ForegroundColor Green
Write-Host "Backup: $backup"
Write-Host ""
Write-Host "Running production build..." -ForegroundColor Cyan

Set-Location $repo
if (Test-Path ".next") { Remove-Item ".next" -Recurse -Force }
& npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[FAIL] Build failed. Nothing committed or pushed." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host " SUCCESS - PHU QUOC V3.2 BRANDING / LEGAL BUILD PASSED" -ForegroundColor Green
Write-Host " NOTHING COMMITTED / NOTHING PUSHED" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Expected public positioning:"
Write-Host " - Hero: GoVietStay only"
Write-Host " - Tour cards: tour price only"
Write-Host " - Booking/deposit: GoVietStay only"
Write-Host " - John's Tours: only inside collapsed Legal & service information at page bottom"
Write-Host ""
git diff -- components/PhuQuocJohnsCatalog.tsx
