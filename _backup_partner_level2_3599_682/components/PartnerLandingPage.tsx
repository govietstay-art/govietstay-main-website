"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./PartnerLandingPage.module.css";

const WHATSAPP_NUMBER = "84937762607";
const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic";
const TOUR_URL = "https://www.govietstay.com/ru/tours/cham-island";
const COMMISSION_PER_ADULT = 150_000;

const benefits = [
  {
    icon: "₫",
    title: "150 000 VND за каждого взрослого гостя",
    text: "Комиссия начисляется после того, как турист завершил экскурсию.",
  },
  {
    icon: "RU",
    title: "Работа полностью на русском языке",
    text: "Вы консультируете туриста, оформляете бронирование и передаёте его GoVietStay.",
  },
  {
    icon: "24/7",
    title: "Готовый продукт и поддержка",
    text: "Маршрут, цены, ответы на вопросы, фотографии, видео и форма бронирования уже подготовлены.",
  },
  {
    icon: "VN",
    title: "Можно работать из любой точки Вьетнама",
    text: "Не нужен офис, вступительный взнос или фиксированный график.",
  },
];

const steps = [
  {
    number: "01",
    title: "Зарегистрируйтесь",
    text: "Оставьте имя и контакт. Мы проверим заявку и присвоим партнёрский код.",
  },
  {
    number: "02",
    title: "Получите материалы",
    text: "Изучите тур, цены, FAQ, готовые тексты и правила консультации.",
  },
  {
    number: "03",
    title: "Проконсультируйте туриста",
    text: "Ответьте на вопросы, уточните дату, состав группы, детей, отель и дополнительные услуги.",
  },
  {
    number: "04",
    title: "Передайте бронирование",
    text: "Отправьте заполненную форму GoVietStay. Мы подтвердим места, трансфер и точную стоимость.",
  },
  {
    number: "05",
    title: "Получите комиссию",
    text: "После завершения тура комиссия выплачивается в течение 24–48 часов.",
  },
];

const reviews = [
  {
    name: "Наталья",
    quote: "Добрый вечер, всё прошло замечательно 💯 Отдельное спасибо Анне 🌸",
    image: "/partner/reviews/natalia-whatsapp.jpg",
  },
  {
    name: "Екатерина",
    quote: "Здравствуйте, да, всё прошло хорошо.",
    image: "/partner/reviews/ekaterina-whatsapp.jpg",
  },
  {
    name: "Гость GoVietStay",
    quote: "Всё было отлично. Спасибо вам большое за такую хорошую экскурсию.",
    image: "/partner/reviews/guest-whatsapp.jpg",
  },
];

const faq = [
  {
    q: "Нужно ли платить за участие?",
    a: "Нет. Регистрация и участие в пилотной партнёрской программе бесплатны.",
  },
  {
    q: "Что именно делает партнёр?",
    a: "Партнёр самостоятельно ищет туристов, консультирует их на русском языке, собирает полные данные и отправляет бронирование GoVietStay.",
  },
  {
    q: "Кто организует саму экскурсию?",
    a: "GoVietStay проверяет наличие мест, трансфер, состояние моря, подтверждает бронирование и полностью организует тур.",
  },
  {
    q: "Когда выплачивается комиссия?",
    a: "После того, как турист завершил экскурсию. Обычный срок выплаты — 24–48 часов.",
  },
  {
    q: "Что происходит при отмене?",
    a: "За отменённую или полностью возвращённую бронь комиссия не начисляется.",
  },
  {
    q: "Можно ли менять цену?",
    a: "Нет. Партнёр использует только актуальную цену, опубликованную или письменно подтверждённую GoVietStay.",
  },
];

function money(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export default function PartnerLandingPage() {
  const [guestCount, setGuestCount] = useState(10);
  const estimatedIncome = useMemo(
    () => guestCount * COMMISSION_PER_ADULT,
    [guestCount],
  );

  function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const country = String(form.get("country") || "").trim();
    const city = String(form.get("city") || "").trim();
    const contact = String(form.get("contact") || "").trim();
    const social = String(form.get("social") || "").trim();
    const experience = String(form.get("experience") || "").trim();
    const audience = String(form.get("audience") || "").trim();

    const message = [
      "ЗАЯВКА В ПАРТНЁРСКУЮ ПРОГРАММУ GOVIETSTAY",
      "",
      `Имя: ${name}`,
      `Страна: ${country}`,
      `Город во Вьетнаме: ${city}`,
      `WhatsApp / Telegram: ${contact}`,
      `Instagram / Facebook: ${social || "не указано"}`,
      `Опыт: ${experience || "не указано"}`,
      `Аудитория / потенциальные клиенты: ${audience || "не указано"}`,
      "",
      "Я хочу консультировать туристов и оформлять бронирования для GoVietStay.",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function openBookingTemplate() {
    const message = [
      "НОВОЕ БРОНИРОВАНИЕ — CHAM ISLAND",
      "",
      "Код партнёра:",
      "Имя основного гостя:",
      "WhatsApp / Telegram гостя:",
      "Дата экскурсии:",
      "Взрослые:",
      "Дети (возраст и рост):",
      "Отель / адрес трансфера:",
      "Дополнительная активность: Sea Walk / дайвинг / нет",
      "Питание, аллергии или важная информация:",
      "Цена, озвученная гостю:",
      "Статус оплаты:",
      "Примечание:",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="/ru" aria-label="GoVietStay">
          <img src="/partner/govietstay-logo.jpeg" alt="GoVietStay" />
          <span>
            <strong>GoVietStay</strong>
            <small>Partner Network · Vietnam</small>
          </span>
        </a>
        <nav className={styles.nav} aria-label="Навигация">
          <a href="#income">Доход</a>
          <a href="#trust">Отзывы</a>
          <a href="#process">Как это работает</a>
          <a href="#apply" className={styles.navCta}>Стать партнёром</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroBackdrop} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.pill}>Пилотная программа · Острова Чам</div>
          <h1>
            Зарабатывайте онлайн,
            <span> консультируя туристов во Вьетнаме</span>
          </h1>
          <p className={styles.heroLead}>
            Вы находите русскоязычных туристов, консультируете и оформляете
            бронирование. GoVietStay подтверждает и полностью организует экскурсию.
          </p>
          <div className={styles.heroIncome}>
            <strong>150 000 VND</strong>
            <span>за каждого взрослого гостя, завершившего тур</span>
          </div>
          <div className={styles.heroActions}>
            <a href="#apply" className={styles.primaryButton}>Стать партнёром бесплатно</a>
            <a href={TOUR_URL} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
              Посмотреть тур ↗
            </a>
          </div>
          <div className={styles.trustStrip}>
            <span>✓ Без вступительного взноса</span>
            <span>✓ Работа из любой точки Вьетнама</span>
            <span>✓ Выплата после завершения тура</span>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.photoFrame}>
            <img src="/partner/cham.jpg" alt="Острова Чам" />
            <div className={styles.photoBadge}>
              <span>Стартовый продукт</span>
              <strong>Cham Island</strong>
            </div>
          </div>
          <div className={styles.floatingCard}>
            <span>Пример</span>
            <strong>10 гостей = 1 500 000 VND</strong>
            <small>дополнительного дохода</small>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Почему это удобно</span>
          <h2>Вам не нужно создавать тур с нуля</h2>
          <p>GoVietStay даёт готовый продукт. Ваша задача — профессионально проконсультировать гостя и передать точное бронирование.</p>
        </div>
        <div className={styles.benefitGrid}>
          {benefits.map((item) => (
            <article className={styles.benefitCard} key={item.title}>
              <div className={styles.benefitIcon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.incomeSection}`} id="income">
        <div className={styles.incomePanel}>
          <div>
            <span className={styles.eyebrow}>Калькулятор дохода</span>
            <h2>Сколько вы можете заработать?</h2>
            <p>Передвигайте ползунок. Расчёт основан на комиссии 150 000 VND за взрослого гостя.</p>
            <label className={styles.rangeLabel} htmlFor="guestCount">
              Гостей в месяц: <strong>{guestCount}</strong>
            </label>
            <input
              id="guestCount"
              type="range"
              min="1"
              max="30"
              value={guestCount}
              onChange={(event) => setGuestCount(Number(event.target.value))}
              className={styles.range}
            />
            <div className={styles.rangeTicks}>
              <span>1</span><span>10</span><span>20</span><span>30</span>
            </div>
          </div>
          <div className={styles.incomeResult}>
            <span>Ваш ориентировочный доход</span>
            <strong>{money(estimatedIncome)} VND</strong>
            <small>при {guestCount} взрослых гостях</small>
            <a href="#apply">Начать бесплатно</a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.productCard}>
          <div className={styles.productImages}>
            <img src="/partner/guest-pickup.jpg" alt="Гости GoVietStay перед трансфером" />
            <img src="/partner/guest-on-island.jpg" alt="Гости GoVietStay на острове Чам" />
          </div>
          <div className={styles.productContent}>
            <span className={styles.eyebrow}>Первый продукт для продажи</span>
            <h2>Острова Чам: катер и снорклинг</h2>
            <p>Готовый однодневный тур из Дананга или Хойана с трансфером, скоростным катером, снорклингом, обедом и отдыхом на пляже.</p>
            <dl className={styles.productFacts}>
              <div><dt>Цена для взрослого</dt><dd>950 000 VND</dd></div>
              <div><dt>Комиссия партнёра</dt><dd>150 000 VND</dd></div>
              <div><dt>Цена для ребёнка</dt><dd>800 000 VND</dd></div>
              <div><dt>Формат</dt><dd>Групповой тур</dd></div>
            </dl>
            <div className={styles.productButtons}>
              <a href={TOUR_URL} target="_blank" rel="noreferrer" className={styles.primaryButton}>Открыть страницу тура ↗</a>
              <button type="button" onClick={openBookingTemplate} className={styles.outlineButton}>Отправить бронирование</button>
            </div>
            <p className={styles.microcopy}>Стандартный тур обычно проводится с англоязычным гидом. Перед оплатой GoVietStay подтверждает дату, трансфер, детский тариф и состояние моря.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.trustSection}`} id="trust">
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Реальные туристы · Реальные поездки</span>
          <h2>Русскоязычные гости уже доверяют GoVietStay</h2>
          <p>Партнёру легче продавать продукт, который уже подтверждён настоящими фотографиями, сообщениями гостей и открытыми отзывами Google.</p>
        </div>
        <div className={styles.reviewGrid}>
          {reviews.map((review) => (
            <article className={styles.reviewCard} key={review.name}>
              <div className={styles.reviewStars}>★★★★★</div>
              <blockquote>“{review.quote}”</blockquote>
              <div className={styles.reviewFooter}>
                <div>
                  <strong>{review.name}</strong>
                  <span>Отзыв после поездки · WhatsApp</span>
                </div>
                <a href={review.image} target="_blank" rel="noreferrer">Оригинал ↗</a>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.googleBox}>
          <div className={styles.googleMark}>G</div>
          <div>
            <strong>Проверьте репутацию GoVietStay самостоятельно</strong>
            <span>Откройте страницу компании и посмотрите отзывы реальных клиентов в Google.</span>
          </div>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">Смотреть отзывы Google ↗</a>
        </div>
      </section>

      <section className={styles.section} id="process">
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Простой процесс</span>
          <h2>От регистрации до первой комиссии</h2>
        </div>
        <div className={styles.timeline}>
          {steps.map((step) => (
            <article className={styles.timelineItem} key={step.number}>
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.rolesSection}`}>
        <div className={styles.rolesGrid}>
          <article className={styles.roleCard}>
            <span className={styles.eyebrow}>Ваша роль</span>
            <h2>Партнёр продаёт</h2>
            <ul>
              <li>Находит русскоязычных туристов</li>
              <li>Изучает продукт и консультирует клиента</li>
              <li>Уточняет дату, взрослых, детей и отель</li>
              <li>Объясняет актуальную цену и условия</li>
              <li>Передаёт полную форму бронирования</li>
              <li>Не меняет цену и не обещает неподтверждённые услуги</li>
            </ul>
          </article>
          <article className={`${styles.roleCard} ${styles.roleCardDark}`}>
            <span className={styles.eyebrow}>Наша роль</span>
            <h2>GoVietStay организует</h2>
            <ul>
              <li>Готовит продукт, материалы и инструкции</li>
              <li>Проверяет места, трансфер и состояние моря</li>
              <li>Подтверждает бронирование и стоимость</li>
              <li>Координирует оператора, транспорт и поездку</li>
              <li>Помогает в операционных ситуациях</li>
              <li>Фиксирует завершённый тур и выплачивает комиссию</li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Прозрачные правила</span>
          <h2>Понятные условия с первого дня</h2>
        </div>
        <div className={styles.ruleGrid}>
          <div><strong>150 000 VND</strong><span>комиссия за взрослого гостя</span></div>
          <div><strong>24–48 часов</strong><span>обычный срок выплаты после тура</span></div>
          <div><strong>0 VND</strong><span>стоимость регистрации и участия</span></div>
          <div><strong>Только завершённые туры</strong><span>отменённые брони не оплачиваются</span></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>FAQ</span>
          <h2>Частые вопросы партнёров</h2>
        </div>
        <div className={styles.faqList}>
          {faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.applySection}`} id="apply">
        <div className={styles.applyIntro}>
          <span className={styles.eyebrow}>Регистрация занимает около минуты</span>
          <h2>Станьте одним из первых партнёров GoVietStay</h2>
          <p>Сейчас мы тестируем программу на туре Cham Island. Успешным партнёрам первыми будут доступны новые туры: Ba Na Hills, Hoi An, Hue и Phu Quoc.</p>
          <div className={styles.applyPoints}>
            <span>✓ Бесплатная регистрация</span>
            <span>✓ Персональный партнёрский код</span>
            <span>✓ Готовые материалы для продаж</span>
            <span>✓ Прямая связь с GoVietStay</span>
          </div>
        </div>

        <form className={styles.form} onSubmit={submitApplication}>
          <div className={styles.formHeader}>
            <strong>Заявка партнёра</strong>
            <span>После отправки откроется WhatsApp с готовой заявкой.</span>
          </div>
          <label>
            Имя и фамилия *
            <input name="name" type="text" required placeholder="Например: Анна Иванова" />
          </label>
          <div className={styles.formRow}>
            <label>
              Страна *
              <input name="country" type="text" required placeholder="Россия / Казахстан / Беларусь…" />
            </label>
            <label>
              Город во Вьетнаме *
              <input name="city" type="text" required placeholder="Дананг / Нячанг / Фукуок…" />
            </label>
          </div>
          <label>
            WhatsApp или Telegram *
            <input name="contact" type="text" required placeholder="Номер или @username" />
          </label>
          <label>
            Instagram или Facebook
            <input name="social" type="text" placeholder="Ссылка или @username" />
          </label>
          <label>
            Ваш опыт общения или продаж туристам
            <textarea name="experience" rows={3} placeholder="Коротко расскажите о себе" />
          </label>
          <label>
            Где вы планируете находить клиентов?
            <textarea name="audience" rows={3} placeholder="Социальные сети, отель, знакомые, Telegram-группа…" />
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" required />
            <span>Я согласен использовать только актуальные цены и подтверждённую информацию GoVietStay.</span>
          </label>
          <button type="submit" className={styles.submitButton}>Отправить заявку в WhatsApp</button>
          <small>GoVietStay свяжется с вами после проверки заявки. Отправка формы не гарантирует автоматическое одобрение.</small>
        </form>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <img src="/partner/govietstay-logo.jpeg" alt="GoVietStay" />
          <div>
            <strong>GoVietStay Partner Network</strong>
            <span>Trusted Local Support in Vietnam</span>
          </div>
        </div>
        <div className={styles.footerLinks}>
          <a href="https://www.govietstay.com/ru" target="_blank" rel="noreferrer">GoVietStay.com/ru</a>
          <a href="https://www.instagram.com/govietstay" target="_blank" rel="noreferrer">Instagram @govietstay</a>
          <a href="https://t.me/GoVietStay" target="_blank" rel="noreferrer">Telegram @GoVietStay</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp +84 937 762 607</a>
        </div>
      </footer>

      <a className={styles.mobileCta} href="#apply">Стать партнёром · 150 000 VND за гостя</a>
    </main>
  );
}
