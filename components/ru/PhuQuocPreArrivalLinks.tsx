import React from "react";

const planningLinks = [
  { href: "/ru/phu-quoc/pervyy-raz", title: "Первый раз на Фукуоке", desc: "Что решить до поездки и как не перегрузить отпуск." },
  { href: "/ru/phu-quoc/gde-ostanovitsya", title: "Где остановиться", desc: "Выберите район под ваш формат отдыха, а не только отель." },
  { href: "/ru/phu-quoc/transport", title: "Транспорт на острове", desc: "Такси, трансфер или частная машина — когда что удобнее." },
  { href: "/ru/phu-quoc/s-detmi", title: "Фукуок с детьми", desc: "Спокойный темп, парки, море и логистика для семьи." },
  { href: "/ru/phu-quoc/kuda-poehat", title: "Куда поехать", desc: "Север, центр и юг острова — что логично именно вам." },
  { href: "/ru/phu-quoc/10-dney", title: "Фукуок на 10 дней", desc: "Готовая логика поездки с запасом на море и погоду." },
];

const experienceLinks = [
  { href: "/ru/phu-quoc/3-ili-4-ostrova", title: "3 или 4 острова", desc: "Сравните формат дня до бронирования." },
  { href: "/ru/phu-quoc/snorkling", title: "Снорклинг", desc: "Когда имеет смысл ехать и чего реально ожидать." },
  { href: "/ru/phu-quoc/hon-thom", title: "Хон Тхом", desc: "Канатная дорога, юг острова и как собрать день." },
  { href: "/ru/phu-quoc/sunset-town", title: "Sunset Town", desc: "Что посмотреть и как совместить с югом Фукуока." },
  { href: "/ru/phu-quoc/individualnye-ekskursii", title: "Индивидуальные экскурсии", desc: "Когда private формат действительно экономит время." },
  { href: "/ru/tours/phu-quoc", title: "Все экскурсии и цены", desc: "Сравните актуальные программы GoVietStay на одной странице." },
];

const cardStyle: React.CSSProperties = {
  display: "block",
  padding: "16px 18px",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  background: "#fff",
  color: "#0f172a",
  textDecoration: "none",
  boxShadow: "0 1px 2px rgba(15,23,42,.04)",
};

export default function PhuQuocPreArrivalLinks() {
  const whatsapp =
    "https://wa.me/84937762607?text=" +
    encodeURIComponent(
      "Здравствуйте! Планирую поездку на Фукуок. Подскажите, пожалуйста, маршрут. Даты поездки: ... Отель/район: ..."
    );

  return (
    <section
      aria-labelledby="phu-quoc-plan-title"
      style={{
        maxWidth: 1180,
        margin: "28px auto 44px",
        padding: "0 18px",
      }}
    >
      <div
        style={{
          borderRadius: 24,
          background: "linear-gradient(135deg,#f8fafc,#eef6ff)",
          border: "1px solid #dbeafe",
          padding: "26px",
        }}
      >
        <div style={{ maxWidth: 820, marginBottom: 20 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "#2563eb",
              marginBottom: 8,
            }}
          >
            До поездки на Фукуок
          </div>
          <h2
            id="phu-quoc-plan-title"
            style={{
              margin: 0,
              fontSize: "clamp(24px,3vw,36px)",
              lineHeight: 1.15,
              color: "#0f172a",
            }}
          >
            Сначала спланируйте поездку — потом выбирайте экскурсию
          </h2>
          <p
            style={{
              margin: "12px 0 0",
              fontSize: 16,
              lineHeight: 1.7,
              color: "#475569",
            }}
          >
            Район отеля, количество дней, дети, море и погода влияют на маршрут сильнее,
            чем список достопримечательностей. Начните с полезной информации, а к бронированию
            переходите только когда понимаете, что действительно подходит вашей поездке.
          </p>
        </div>

        <h3 style={{ margin: "0 0 12px", fontSize: 19, color: "#0f172a" }}>
          1. Спланировать до прилёта
        </h3>
        <nav
          aria-label="Планирование поездки на Фукуок"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 12,
          }}
        >
          {planningLinks.map((item) => (
            <a key={item.href} href={item.href} style={cardStyle}>
              <strong style={{ display: "block", fontSize: 16, marginBottom: 6 }}>
                {item.title} →
              </strong>
              <span style={{ display: "block", color: "#64748b", lineHeight: 1.5, fontSize: 14 }}>
                {item.desc}
              </span>
            </a>
          ))}
        </nav>

        <h3 style={{ margin: "24px 0 12px", fontSize: 19, color: "#0f172a" }}>
          2. Выбрать впечатления
        </h3>
        <nav
          aria-label="Экскурсии и впечатления на Фукуоке"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 12,
          }}
        >
          {experienceLinks.map((item) => (
            <a key={item.href} href={item.href} style={cardStyle}>
              <strong style={{ display: "block", fontSize: 16, marginBottom: 6 }}>
                {item.title} →
              </strong>
              <span style={{ display: "block", color: "#64748b", lineHeight: 1.5, fontSize: 14 }}>
                {item.desc}
              </span>
            </a>
          ))}
        </nav>

        <div
          style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop: "1px solid #dbeafe",
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <strong style={{ color: "#0f172a", fontSize: 17 }}>
              Не нужно выбирать тур прямо сейчас.
            </strong>
            <div style={{ color: "#475569", marginTop: 4, lineHeight: 1.55 }}>
              Напишите даты поездки и название отеля — GoVietStay бесплатно подскажет,
              как логичнее построить маршрут на русском языке.
            </div>
          </div>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 46,
              padding: "0 18px",
              borderRadius: 999,
              background: "#0f172a",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 800,
              whiteSpace: "nowrap",
            }}
          >
            Написать GoVietStay
          </a>
        </div>
      </div>
    </section>
  );
}
