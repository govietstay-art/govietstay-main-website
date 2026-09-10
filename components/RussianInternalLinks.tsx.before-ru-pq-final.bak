import Link from "next/link";

const links = [
  ["Главная на русском", "/ru"],
  ["Экскурсии в Дананге", "/ru/danang"],
  ["Что посмотреть в Хойане", "/ru/hoi-an"],
  ["Экскурсия в Хюэ", "/ru/hue"],
  ["Туры на Фукуоке", "/ru/tours/phu-quoc"],
  ["Ba Na Hills", "/ru/tours/ba-na-hills"],
  ["Остров Чам", "/ru/tours/cham-island"],
  ["Актуально во Вьетнаме", "/ru/aktualno"],
  ["Local Point", "/ru/local-point"],
  ["Партнёрам", "/ru/partner"],
] as const;

export default function RussianInternalLinks() {
  return (
    <aside className="border-t border-white/10 bg-[#04140f] px-4 py-7 text-white md:px-8" aria-label="Основные разделы GoVietStay на русском">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-yellow-300">
          GoVietStay на русском
        </p>
        <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/70">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-yellow-300">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
