import Link from "next/link";

export default function SecretExplorerTeaser() {
  return (
    <section className="bg-[#f7f1df] px-4 py-12 text-[#06251b] md:px-20 md:py-16">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#06251b] p-6 text-white shadow-2xl shadow-[#06251b]/20 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-yellow-300">
              Secret Local Explorer
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              Beyond famous attractions, discover the places locals love.
            </h2>
            <p className="mt-5 max-w-2xl text-white/70">
              Hidden beaches, mountain villages, wildlife corners and local food — a small secret door for travelers who want to see the real Central Vietnam.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white/10 p-5 backdrop-blur">
            <div className="grid grid-cols-2 gap-3 text-sm font-bold">
              <div className="rounded-2xl bg-white/10 p-4">🌿 Hidden Gems</div>
              <div className="rounded-2xl bg-white/10 p-4">🍜 Local Food</div>
              <div className="rounded-2xl bg-white/10 p-4">🏅 Explorer Badge</div>
              <div className="rounded-2xl bg-white/10 p-4">📍 Google Maps</div>
            </div>
            <Link href="/secret" className="mt-5 block rounded-full bg-yellow-400 px-6 py-4 text-center font-black text-[#06251b]">
              Enter The Secret Map
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
