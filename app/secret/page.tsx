import Link from "next/link";
import { secretGems } from "./data";

export default function SecretExplorerHome() {
  return (
    <main className="min-h-screen bg-[#f7f1df] text-[#06251b]">
      <section className="relative overflow-hidden bg-[#06251b] px-4 py-16 text-white md:px-20 md:py-24">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-yellow-300">
            GoVietStay Secret Explorer
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-7xl">
            A secret door to hidden places in Da Nang.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
            Beyond famous attractions, GoVietStay helps travelers discover places locals love — hidden beaches, mountain villages, wildlife corners and peaceful nature escapes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <span className="rounded-full bg-white/10 px-5 py-3">🌿 10 Hidden Gems</span>
            <span className="rounded-full bg-white/10 px-5 py-3">🏅 Explorer Badges</span>
            <span className="rounded-full bg-white/10 px-5 py-3">📍 Google Maps</span>
            <span className="rounded-full bg-white/10 px-5 py-3">💚 Local Tips</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-800">
              Hidden Gems Collection 2026
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Choose your secret card
            </h2>
          </div>

          <p className="max-w-xl text-[#06251b]/65">
            Each card opens a simple exploration game with local tips, badge rewards, Google Maps and “I Discovered This Place”.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {secretGems.map((gem) => (
            <Link
              key={gem.slug}
              href={`/secret/${gem.slug}`}
              className="group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-[#06251b]/10 transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={gem.image}
                  alt={gem.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-[#06251b]">
                  #{gem.number}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-3xl font-black">{gem.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{gem.subtitle}</p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#06251b]/65">
                  <span className="rounded-full bg-[#06251b]/5 px-3 py-2">
                    {gem.category}
                  </span>
                  <span className="rounded-full bg-[#06251b]/5 px-3 py-2">
                    🏅 {gem.badge}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#06251b]/70">
                  {gem.short}
                </p>

                <div className="mt-5 font-black text-emerald-800">
                  Open secret mission →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}