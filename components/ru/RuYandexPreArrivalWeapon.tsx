"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

type LinkItem = {
  href: string;
  title: string;
  desc: string;
  tag?: string;
};

const beforeTrip: LinkItem[] = [
  {
    href: "/ru/phu-quoc/pervyy-raz",
    title: "Первый раз на Фукуоке",
    desc: "Что решить ещё до вылета: район, темп поездки, море, экскурсии и запасной план.",
    tag: "до поездки",
  },
  {
    href: "/ru/phu-quoc/gde-ostanovitsya",
    title: "Где остановиться на Фукуоке",
    desc: "Выберите район под ваш отдых — море, семья, вечерняя жизнь или спокойствие.",
    tag: "отель",
  },
  {
    href: "/ru/phu-quoc/transport",
    title: "Транспорт на Фукуоке",
    desc: "Трансфер, такси или частная машина: что удобнее в зависимости от маршрута.",
    tag: "логистика",
  },
  {
    href: "/ru/phu-quoc/s-detmi",
    title: "Фукуок с детьми",
    desc: "Как построить отдых без перегрузки: море, парки, острова и удобный ритм.",
    tag: "семья",
  },
  {
    href: "/ru/danang",
    title: "Дананг: с чего начать",
    desc: "Ba Na Hills, Хойан, Хюэ или море — выберите направление ещё до прилёта.",
    tag: "Центральный Вьетнам",
  },
  {
    href: "/ru/hoi-an",
    title: "Хойан за один день",
    desc: "Старый город, фонари и Кокосовый лес — как собрать логичный маршрут.",
    tag: "маршрут",
  },
];

const destinations: LinkItem[] = [
  {
    href: "/ru/phu-quoc",
    title: "Планирование Фукуока",
    desc: "Районы, погода, маршрут и полезные решения до бронирования.",
    tag: "Фукуок",
  },
  {
    href: "/ru/phu-quoc/kuda-poehat",
    title: "Куда поехать на Фукуоке",
    desc: "Север, центр или юг — что подходит именно вашему отдыху.",
    tag: "куда поехать",
  },
  {
    href: "/ru/phu-quoc/10-dney",
    title: "Фукуок на 10 дней",
    desc: "Готовая логика отдыха с морем, островами, паузами и запасом на погоду.",
    tag: "10 дней",
  },
  {
    href: "/ru/hue",
    title: "Хюэ из Дананга",
    desc: "Императорский город, история и удобный формат поездки на один день.",
    tag: "Хюэ",
  },
  {
    href: "/ru/transfer-danang",
    title: "Трансфер в Дананге",
    desc: "Аэропорт, отель и междугородние поездки с заранее понятной логистикой.",
    tag: "трансфер",
  },
  {
    href: "/ru/cruise-port-shore-excursions",
    title: "Экскурсии из круизного порта",
    desc: "Что реально успеть за стоянку лайнера из Чанмая или Тьенша.",
    tag: "круиз",
  },
];

const decision: LinkItem[] = [
  {
    href: "/ru/phu-quoc/3-ili-4-ostrova",
    title: "3 или 4 острова",
    desc: "Сравните насыщенность дня, маршрут и формат до бронирования.",
    tag: "сравнение",
  },
  {
    href: "/ru/phu-quoc/snorkling",
    title: "Снорклинг на Фукуоке",
    desc: "Когда ехать, чего ожидать и кому подходит морской день.",
    tag: "море",
  },
  {
    href: "/ru/phu-quoc/individualnye-ekskursii",
    title: "Индивидуальные экскурсии",
    desc: "Когда private формат помогает экономить время и подстроить день под себя.",
    tag: "private",
  },
  {
    href: "/ru/tours/phu-quoc",
    title: "Все экскурсии и цены на Фукуоке",
    desc: "Когда маршрут уже понятен — сравните программы и актуальные цены GoVietStay.",
    tag: "цены",
  },
  {
    href: "/ru/tours/ba-na-hills",
    title: "Ba Na Hills и Золотой мост",
    desc: "Полная программа, варианты формата и что важно знать перед поездкой.",
    tag: "Дананг",
  },
  {
    href: "/ru/local-point",
    title: "Локальная поддержка GoVietStay",
    desc: "Помощь на месте и до поездки — без необходимости сразу покупать тур.",
    tag: "поддержка",
  },
];

function Card({ item }: { item: LinkItem }) {
  return (
    <a
      href={item.href}
      style={{
        display: "block",
        textDecoration: "none",
        color: "#0f172a",
        border: "1px solid #e2e8f0",
        borderRadius: 18,
        background: "#fff",
        padding: "16px 17px",
        minHeight: 128,
        boxShadow: "0 1px 2px rgba(15,23,42,.04)",
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontSize: 11,
          lineHeight: 1,
          fontWeight: 800,
          letterSpacing: ".05em",
          textTransform: "uppercase",
          color: "#2563eb",
          background: "#eff6ff",
          padding: "6px 8px",
          borderRadius: 999,
          marginBottom: 10,
        }}
      >
        {item.tag}
      </span>
      <strong style={{ display: "block", fontSize: 17, lineHeight: 1.25, marginBottom: 7 }}>
        {item.title} →
      </strong>
      <span style={{ display: "block", color: "#64748b", fontSize: 14, lineHeight: 1.55 }}>
        {item.desc}
      </span>
    </a>
  );
}

export default function RuYandexPreArrivalWeapon() {
  const pathname = usePathname();
  const [mount, setMount] = useState<HTMLElement | null>(null);

  const whatsapp = useMemo(
    () =>
      "https://wa.me/84937762607?text=" +
      encodeURIComponent(
        "Здравствуйте! Планирую поездку во Вьетнам. Даты поездки: ... Город/отель: ... Помогите, пожалуйста, понять, какой маршрут будет удобнее."
      ),
    []
  );

  useEffect(() => {
    if (pathname !== "/ru") {
      setMount(null);
      return;
    }

    const existing = document.getElementById("gvs-ru-yandex-weapon-mount");
    if (existing) {
      setMount(existing);
      return;
    }

    const headings = Array.from(document.querySelectorAll("h2"));
    const heading = headings.find(
      (el) => (el.textContent || "").trim() === "Выберите подходящий раздел"
    );

    const anchor =
      heading?.closest("section") ||
      heading?.parentElement?.parentElement ||
      heading?.parentElement ||
      document.querySelector("main");

    const holder = document.createElement("div");
    holder.id = "gvs-ru-yandex-weapon-mount";

    if (anchor?.parentElement) {
      anchor.insertAdjacentElement("afterend", holder);
    } else {
      document.body.appendChild(holder);
    }

    setMount(holder);

    return () => {
      if (holder.parentElement) holder.remove();
    };
  }, [pathname]);

  if (pathname !== "/ru" || !mount) return null;

  return createPortal(
    <section
      aria-labelledby="gvs-yandex-prearrival-title"
      style={{
        maxWidth: 1220,
        margin: "28px auto 36px",
        padding: "0 18px",
      }}
    >
      <div
        style={{
          border: "1px solid #dbeafe",
          borderRadius: 26,
          padding: "clamp(20px,3vw,32px)",
          background: "linear-gradient(135deg,#f8fbff 0%,#eef6ff 56%,#f8fafc 100%)",
        }}
      >
        <div style={{ maxWidth: 880, marginBottom: 22 }}>
          <div
            style={{
              color: "#2563eb",
              fontWeight: 900,
              fontSize: 12,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Планируйте Вьетнам ещё до прилёта
          </div>
          <h2
            id="gvs-yandex-prearrival-title"
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "clamp(27px,4vw,42px)",
              lineHeight: 1.12,
            }}
          >
            Сначала ответьте на вопросы поездки — потом выбирайте экскурсии
          </h2>
          <p
            style={{
              color: "#475569",
              margin: "13px 0 0",
              fontSize: 16,
              lineHeight: 1.72,
            }}
          >
            Если поездка во Вьетнам ещё только планируется, начните не с покупки тура.
            Сначала выберите район, поймите транспорт, количество дней и удобный темп.
            GoVietStay собрал русскоязычные страницы, которые помогают принять эти решения
            ещё до вылета — а цены и программы можно сравнить позже.
          </p>
        </div>

        <h3 style={{ margin: "0 0 12px", color: "#0f172a", fontSize: 20 }}>
          1. До поездки
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(225px,1fr))",
            gap: 12,
          }}
        >
          {beforeTrip.map((item) => <Card key={item.href} item={item} />)}
        </div>

        <h3 style={{ margin: "26px 0 12px", color: "#0f172a", fontSize: 20 }}>
          2. Собрать маршрут
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(225px,1fr))",
            gap: 12,
          }}
        >
          {destinations.map((item) => <Card key={item.href} item={item} />)}
        </div>

        <h3 style={{ margin: "26px 0 12px", color: "#0f172a", fontSize: 20 }}>
          3. Когда уже понятно, чего вы хотите
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(225px,1fr))",
            gap: 12,
          }}
        >
          {decision.map((item) => <Card key={item.href} item={item} />)}
        </div>

        <div
          style={{
            marginTop: 26,
            paddingTop: 20,
            borderTop: "1px solid #dbeafe",
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ maxWidth: 730 }}>
            <strong style={{ display: "block", color: "#0f172a", fontSize: 18 }}>
              Не знаете, с чего начать?
            </strong>
            <span style={{ display: "block", color: "#475569", marginTop: 5, lineHeight: 1.6 }}>
              Напишите даты поездки и название отеля или город. GoVietStay подскажет,
              какой маршрут логичнее — без обязательства сразу бронировать экскурсию.
            </span>
          </div>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 48,
              padding: "0 20px",
              borderRadius: 999,
              background: "#0f172a",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 900,
              whiteSpace: "nowrap",
              marginRight: 100,
            }}
          >
            Написать GoVietStay
          </a>
        </div>
      </div>
    </section>,
    mount
  );
}
