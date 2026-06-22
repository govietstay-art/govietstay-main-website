"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const whatsapp =
  "https://wa.me/84937762607?text=Hi%20GoVietStay%2C%20I%20need%20local%20food%20recommendations%20near%20me.";

const img = (name: string) => `/local-food/${name}`;

function mapLink(q: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

function dirLink(lat: number, lng: number) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

function distanceKm(a: number, b: number, c: number, d: number) {
  const R = 6371;
  const dLat = ((c - a) * Math.PI) / 180;
  const dLng = ((d - b) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a * Math.PI) / 180) *
      Math.cos((c * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

const sections = [
  {
    title: "Da Nang Local Food",
    icon: "🍜",
    cover: img("mi-quang.jpg"),
    subtitle: "Mì Quảng • Bún Chả Cá • Bánh Xèo • Seafood • Chợ Cồn",
    places: [
      ["Mỳ Quảng Sứa Hồng Vân", "59 Lê Hồng Phong, Hải Châu", "⭐ Michelin Bib Gourmand", 16.06751, 108.2215],
      ["Bún Chả Cá 109", "109 Nguyễn Chí Thanh, Hải Châu", "☀️ Local breakfast", 16.07128, 108.22139],
      ["Bún Chả Cá Hờn", "113/3 Nguyễn Chí Thanh, Hải Châu", "🔥 Local favorite", 16.0715, 108.22125],
      ["Bánh Xèo Bà Dưỡng", "K280/23 Hoàng Diệu, Hải Châu", "💎 Hidden alley food", 16.06258, 108.2162],
      ["Năm Đảnh Seafood", "K139/H59/38 Trần Quang Khải, Sơn Trà", "🦐 Hidden seafood alley", 16.07089, 108.2415],
      ["Chợ Cồn", "290 Hùng Vương, Hải Châu", "🏮 Local market food", 16.06802, 108.21433],
    ],
  },
  {
    title: "Hoi An Local Food",
    icon: "🏮",
    cover: img("hoi-an-food.jpg"),
    subtitle: "Cao Lầu • Chicken Rice • White Rose • Bánh Mì",
    places: [
      ["Cao Lầu Thanh", "26 Thái Phiên, Hội An", "🏮 Hoi An classic", 15.87992, 108.32844],
      ["Cơm Gà Bà Buội", "22 Phan Châu Trinh, Hội An", "🍗 Chicken rice icon", 15.87855, 108.32884],
      ["Cơm Gà Bà Nga", "8 Phan Châu Trinh, Hội An", "🔥 Local chicken rice", 15.87845, 108.32911],
      ["White Rose Restaurant", "533 Hai Bà Trưng, Hội An", "🥟 Signature dumplings", 15.8815, 108.32785],
      ["Bánh Mì Phượng", "2B Phan Châu Trinh, Hội An", "🥖 Famous bánh mì", 15.87823, 108.32939],
      ["Madam Khanh", "115 Trần Cao Vân, Hội An", "👑 Banh Mi Queen", 15.88152, 108.32712],
    ],
  },
  {
    title: "International Food Guide",
    icon: "🌎",
    cover: img("international-food.jpg"),
    subtitle: "Italian • Steak • Burger • French • Spanish",
    places: [
      ["Limoncello", "187 Trần Phú, Hải Châu", "🇮🇹 Italian city center", 16.0662, 108.22322],
      ["Red Sky Steakhouse", "248 Trần Phú, Hải Châu", "🥩 Steakhouse", 16.06395, 108.2233],
      ["Olivia’s Prime Steakhouse", "74 Bạch Đằng, Hải Châu", "🍷 Riverside steakhouse", 16.0706, 108.22472],
      ["Cucina Luca", "An Thượng area, Ngũ Hành Sơn", "🍝 Italian comfort food", 16.0495, 108.2447],
      ["Chops Da Nang", "An Thượng area, Ngũ Hành Sơn", "🍔 Burger", 16.049, 108.2442],
      ["My Casa", "53 Morrison, Sơn Trà", "🇪🇸 Spanish / Mediterranean", 16.07453, 108.23665],
    ],
  },
];

const allPlaces = sections.flatMap((s) =>
  s.places.map(([name, address, note, lat, lng]) => ({
    name: String(name),
    address: String(address),
    note: String(note),
    lat: Number(lat),
    lng: Number(lng),
  }))
);

const journey = [
  {
    title: "☀️ Morning",
    desc: "Start with real local breakfast.",
    photo: img("mi-quang.jpg"),
    places: ["Mì Quảng 1A", "Bún Chả Cá 109", "Bún Chả Cá Hờn", "Salt Coffee"],
    search: "best local breakfast Da Nang Mi Quang Bun Cha Ca Salt Coffee",
  },
  {
    title: "🍽 Lunch",
    desc: "Central Vietnam flavors for lunch.",
    photo: img("banh-xeo.jpg"),
    places: ["Bánh Xèo Bà Dưỡng", "Bún Mắm", "Cơm Gà Hội An", "Cao Lầu Thanh"],
    search: "Banh Xeo Ba Duong Bun Mam Da Nang Com Ga Hoi An Cao Lau Thanh",
  },
  {
    title: "🌅 Sunset",
    desc: "Seafood and beach dinner time.",
    photo: img("seafood.jpg"),
    places: ["Năm Đảnh Seafood", "Mộc Quán Seafood", "My Hanh Seafood", "Lang Chai Seafood"],
    search: "Nam Danh Seafood Moc Quan My Hanh Lang Chai Da Nang",
  },
  {
    title: "🌙 Night",
    desc: "Dessert, snacks and night markets.",
    photo: img("hoi-an-food.jpg"),
    places: ["Chè Liên", "Sơn Trà Night Market", "An Thượng Night Market", "Kem Dừa Mã Lai"],
    search: "Che Lien Son Tra Night Market An Thuong Night Market Kem Dua Ma Lai Da Nang",
  },
];

const areas = [
  ["Near Han Market", "Bún Chả Cá 109\nChợ Cồn\nLimoncello", img("han-market.jpg")],
  ["Near Dragon Bridge", "Bánh Xèo Bà Dưỡng\nRed Sky Steakhouse", img("dragon-bridge-food.jpg")],
  ["Near My Khe Beach", "Năm Đảnh Seafood\nChops Da Nang\nCucina Luca", img("seafood.jpg")],
  ["Near Hoi An Old Town", "Cao Lầu Thanh\nBà Buội\nBánh Mì Phượng", img("hoi-an-food.jpg")],
];

export default function LocalFoodPage() {
  const [open, setOpen] = useState("Hoi An Local Food");
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState("idle");

  const nearby = useMemo(() => {
    if (!loc) return [];
    return allPlaces
      .map((p) => ({ ...p, distance: distanceKm(loc.lat, loc.lng, p.lat, p.lng) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }, [loc]);

  function findMe() {
    if (!navigator.geolocation) return setStatus("unsupported");
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setLoc({ lat: p.coords.latitude, lng: p.coords.longitude });
        setStatus("ready");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <main className="min-h-screen bg-[#02100b] text-white">
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-black shadow-2xl md:hidden"
      >
        💬 Ask
      </a>

      <div className="mx-auto max-w-[1180px] px-4 py-5 md:px-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img("hero-food.jpg")})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02100b] via-transparent to-black/20" />

          <div className="relative grid gap-6 p-5 md:grid-cols-[1.1fr_.9fr] md:p-10">
            <div>
              <div className="flex flex-wrap gap-2">
                <Link href="/" className="rounded-full bg-black/45 px-4 py-2 text-sm text-emerald-200 backdrop-blur">
                  ← Back to GoVietStay
                </Link>
                <span className="rounded-full border border-emerald-300/40 bg-emerald-400/15 px-4 py-2 text-sm text-emerald-200 backdrop-blur">
                  GoVietStay Local Food V2.6
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-black leading-[0.93] tracking-tight md:text-7xl">
                Eat Like A Local.
                <span className="block text-emerald-300">Travel Like A Friend.</span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-white/85 md:text-lg md:leading-8">
                Trusted food recommendations in Da Nang and Hoi An with clear addresses,
                Google Maps and WhatsApp support.
              </p>

              <div className="mt-5 flex flex-wrap gap-4 text-xs font-bold md:text-sm">
                <span>🍜 Local Favorites</span>
                <span>⭐ Michelin Selected</span>
                <span>📍 Google Maps Ready</span>
                <span>💚 80% Value First</span>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-400 px-6 py-3 text-center font-black text-black">
                  WhatsApp GoVietStay
                </a>
                <a href="#food-guide" className="rounded-full border border-white/25 bg-black/20 px-6 py-3 text-center font-bold backdrop-blur">
                  View Food Guide
                </a>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-full rounded-[1.7rem] border border-white/15 bg-black/45 p-5 shadow-2xl backdrop-blur md:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📍</span>
                    <div>
                      <h2 className="text-xl font-black">Find food near me</h2>
                      <p className="text-sm text-white/60">Location-based suggestions</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-400 px-2 py-1 text-xs font-black text-black">
                    NEW
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/72">
                  Allow location access and we’ll show the closest local food near you.
                </p>

                <button onClick={findMe} className="mt-5 w-full rounded-full bg-emerald-400 px-5 py-4 font-black text-black">
                  📍 Find Food Near Me
                </button>

                <p className="mt-3 text-center text-xs text-white/50">We respect your privacy.</p>

                {status === "loading" && <p className="mt-4 text-sm text-white/60">Finding your location...</p>}
                {status === "denied" && <p className="mt-4 text-sm text-white/60">Location blocked. Send us your hotel name on WhatsApp.</p>}

                {nearby.length > 0 && (
                  <div className="mt-5 space-y-2">
                    {nearby.slice(0, 3).map((p) => (
                      <a key={p.name} href={dirLink(p.lat, p.lng)} target="_blank" rel="noopener noreferrer" className="block rounded-2xl bg-white/10 p-3 text-sm hover:bg-white/15">
                        <b>{p.name}</b>
                        <span className="block text-white/60">{p.distance.toFixed(1)} km · {p.address}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-7">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-300">
            Local Food Journey
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-4">
            {journey.map((item, i) => (
              <div key={item.title} className="relative overflow-hidden rounded-3xl border border-white/10 p-5">
                <div className="absolute inset-0 bg-cover bg-center opacity-45" style={{ backgroundImage: `url(${item.photo})` }} />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-black">{item.title}</h3>
                    {i < journey.length - 1 && <span className="hidden text-2xl text-white/70 md:block">→</span>}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-white/75">{item.desc}</p>

                  <div className="mt-4 space-y-2">
                    {item.places.map((place) => (
                      <a
                        key={place}
                        href={mapLink(place + " Da Nang Hoi An")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-2xl bg-white/10 px-3 py-2 text-sm font-bold text-white/90 hover:bg-white/15"
                      >
                        📍 {place}
                      </a>
                    ))}
                  </div>

                  <a
                    href={mapLink(item.search)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block rounded-full bg-emerald-400 px-4 py-3 text-center text-sm font-black text-black"
                  >
                    Open Food Map
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="food-guide" className="mt-9">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-300">
            Choose By Location
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            Find the best food near popular areas.
          </h2>

          <div className="mt-5 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
            {areas.map(([title, desc, photo]) => (
              <div key={title} className="relative min-h-[170px] min-w-[230px] overflow-hidden rounded-3xl border border-white/10 p-5 md:min-w-0">
                <div className="absolute inset-0 bg-cover bg-center opacity-55" style={{ backgroundImage: `url(${photo})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                <div className="relative flex h-full flex-col justify-end">
                  <h3 className="text-lg font-black">📍 {title}</h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-white/78">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {sections.map((section) => {
              const active = open === section.title;
              return (
                <div key={section.title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] backdrop-blur">
                  <button onClick={() => setOpen(active ? "" : section.title)} className="relative flex w-full items-center justify-between overflow-hidden p-5 text-left md:p-7">
                    <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${section.cover})` }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/35" />
                    <div className="relative">
                      <div className="text-4xl">{section.icon}</div>
                      <h3 className="mt-3 text-2xl font-black">{section.title}</h3>
                      <p className="mt-2 text-sm font-bold text-emerald-200">{section.subtitle}</p>
                    </div>
                    <span className="relative text-3xl">{active ? "−" : "+"}</span>
                  </button>

                  {active && (
                    <div className="grid gap-3 border-t border-white/10 bg-emerald-950/20 p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3">
                      {section.places.map(([name, address, note, lat, lng]) => (
                        <article
                          key={String(name)}
                          className="rounded-3xl border border-white/10 bg-[#06130e] p-5 shadow-xl"
                        >
                          <p className="text-sm font-black text-emerald-300">{String(note)}</p>
                          <h4 className="mt-2 text-xl font-black">{String(name)}</h4>
                          <p className="mt-3 text-sm leading-6 text-white/68">
                            📍 {String(address)}
                          </p>

                          <div className="mt-5 grid gap-2">
                            <a
                              href={mapLink(String(name) + " " + String(address))}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full bg-white px-4 py-3 text-center text-sm font-black text-black"
                            >
                              🗺️ Maps
                            </a>
                            <a
                              href={dirLink(Number(lat), Number(lng))}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full bg-emerald-400/15 px-4 py-3 text-center text-sm font-bold text-emerald-100"
                            >
                              📍 Directions
                            </a>
                            <a
                              href={whatsapp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-emerald-300/30 px-4 py-3 text-center text-sm font-bold text-emerald-100"
                            >
                              💬 Ask Us
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-300/20 p-6 md:p-9">
            <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${img("international-food.jpg")})` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-emerald-950/70" />
            <div className="relative grid gap-6 md:grid-cols-[1fr_.8fr] md:items-center">
              <div>
                <h2 className="text-3xl font-black">Can’t decide where to eat?</h2>
                <p className="mt-3 max-w-2xl text-white/75">
                  Tell us your location, what you feel like eating and your budget.
                  GoVietStay will recommend the best local spots for you.
                </p>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full bg-emerald-400 px-8 py-4 font-black text-black">
                  WhatsApp +84 937 762 607
                </a>
              </div>

              <div className="grid gap-3 text-sm text-white/75">
                <div>📍 Near your location</div>
                <div>⭐ Local favorites</div>
                <div>🛡 Honest recommendation</div>
                <div>💬 Fast response</div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 text-center text-sm text-white/50">
          GoVietStay.com · Da Nang · Hoi An · Hue
        </footer>
      </div>
    </main>
  );
}