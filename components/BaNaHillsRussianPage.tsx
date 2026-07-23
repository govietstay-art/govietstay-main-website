"use client";

import { useMemo, useState } from "react";

const PHONE = "84937762607";

const morning = [
  ["07:30–08:00", "Трансфер из отеля", "Встреча в выбранных отелях Дананга."],
  ["09:00", "Канатная дорога", "Прибытие в Sun World Ba Na Hills и подъём на гору."],
  ["09:30–11:30", "Золотой мост и сады", "Золотой мост, Le Jardin D’Amour и пагода Linh Ung."],
  ["11:30–12:45", "Обед «шведский стол»", "Обед согласно подтверждённому пакету экскурсии."],
  ["13:00–15:30", "Французская деревня и Fantasy Park", "Свободное время для посещения объектов стандартной программы."],
  ["15:30–17:00", "Спуск и возвращение", "Спуск по канатной дороге и трансфер обратно в Дананг."],
];

const evening = [
  ["13:00 / 13:30–14:00", "Трансфер из отеля", "Хойан — около 13:00; Дананг — около 13:30–14:00."],
  ["15:00", "Канатная дорога", "Прибытие на станцию и начало дневной программы."],
  ["15:30–16:30", "Золотой мост", "Золотой мост, пагода Linh Ung и цветочные сады."],
  ["16:30–17:15", "Французская деревня", "Прогулка и свободное время на высоте 1 487 метров."],
  ["17:15–18:45", "Ужин «шведский стол»", "Ужин в Beer Plaza, вечерние фотографии и прогулка."],
  ["18:45–19:20", "Спуск по канатной дороге", "Сбор на станции, спуск и посадка в автомобиль."],
  ["20:30 / 21:15", "Возвращение в отель", "Ориентировочное прибытие в Дананг / Хойан."],
];

const included = [
  "Трансфер из отеля и обратно в подтверждённой зоне",
  "Англоговорящий гид",
  "Билет на канатную дорогу туда и обратно",
  "Вход в Ba Na Hills и на Золотой мост",
  "Обед или ужин «шведский стол» по выбранной программе",
  "Бутилированная вода",
  "НДС (VAT)",
];

const excluded = [
  "Музей восковых фигур и винный погреб",
  "Билеты без очереди или приоритетный вход",
  "Игры с призами и платные развлечения",
  "Alpine Coaster и другие платные активности",
  "Личные расходы и услуги, не указанные выше",
  "Чаевые гиду",
];

const faqs = [
  ["Какая программа менее многолюдна?", "Дневная и вечерняя программа иногда бывает спокойнее, но гарантировать это невозможно. Ba Na Hills — очень популярное место, и количество посетителей быстро меняется."],
  ["Может ли GoVietStay гарантировать время на Золотом мосту?", "Нет. Гид следует расписанию и фактической ситуации. Очереди, погода, работа канатной дороги и движение группы могут изменить время на каждом объекте."],
  ["На каком языке говорит гид?", "В стандартной групповой экскурсии работает англоговорящий гид. Русскоязычного гида или сопровождение необходимо запросить и подтвердить отдельно."],
  ["Подходит ли экскурсия детям?", "Да. До бронирования сообщите возраст и рост каждого ребёнка: тариф определяется действующими правилами оператора по росту."],
  ["Что произойдёт при изменении погоды?", "Погода в горах быстро меняется. Программа может корректироваться из-за безопасности, видимости, работы канатной дороги или официальных указаний. Погода и видимость не гарантируются."],
];

const reviews = [
  {
    name: "Mehak Khanna",
    quote: "Сервис 10/10. David и Terry очень профессиональны и всегда готовы помочь. Наша поездка в Ba Na Hills была замечательной благодаря GoVietStay.",
    detail: "Индивидуальная экскурсия · личный автомобиль · поддержка во время поездки",
    image: "/tour/ba-na-hills/reviews/mehak-google.png",
  },
  {
    name: "Ryan",
    quote: "Потрясающая поездка! Наше первое путешествие в Дананг с GoVietStay. Отличный сервис и очень полезная поддержка. Рекомендуем!",
    detail: "Отзыв Google с настоящими фотографиями гостей Ba Na Hills",
    image: "/tour/ba-na-hills/reviews/ryan-google.png",
  },
  {
    name: "Гость GoVietStay",
    quote: "Искренняя благодарность туристической компании, особенно Анне и Дэвиду, которые всё очень понятно объяснили. Они уделили нам время от всего сердца, как родным.",
    detail: "Оригинальный русскоязычный отзыв гостя в Google",
    image: "/tour/ba-na-hills/reviews/russian-family-google.png",
  },
  {
    name: "Dariga Baitleuova",
    quote: "Прекрасный, незабываемый отдых. Спасибо Анне и Дэвиду! Вкусный ужин стал неожиданным сюрпризом — это было вау! Всем рекомендую.",
    detail: "Оригинальный русскоязычный отзыв гостя в Google",
    image: "/tour/ba-na-hills/reviews/dariga-google.png",
  },
];

export default function Home() {
  const [option, setOption] = useState<"morning" | "evening">("morning");
  const [booking, setBooking] = useState({ date: "", adults: "2", children: "0", childInfo: "", hotel: "" });
  const itinerary = option === "morning" ? morning : evening;
  const optionName = option === "morning" ? "Утренняя классическая экскурсия" : "Дневная и вечерняя экскурсия";

  const whatsapp = useMemo(() => {
    const message = `Здравствуйте, GoVietStay! Я хочу проверить наличие мест на экскурсию Ba Na Hills: ${optionName}.

Дата: ${booking.date || "не указана"}
Взрослые: ${booking.adults || "не указано"}
Дети: ${booking.children || "0"}
Возраст/рост детей: ${booking.childInfo || "нет"}
Отель: ${booking.hotel || "не указан"}
Язык гида: английский

Я понимаю, что в Ba Na Hills может быть очень многолюдно и невозможно гарантировать количество посетителей, очереди, погоду, видимость и фактическую ситуацию. Пожалуйста, подтвердите наличие мест, трансфер, питание и точную стоимость до оплаты.`;
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  }, [booking, optionName]);

  return (
    <main>
      <section className="hero">
        <img src="https://www.govietstay.com/tour/bana.jpg" alt="Ba Na Hills and Golden Bridge" />
        <div className="hero-shade" />
        <div className="hero-inner">
          <header>
            <a className="logo" href="#top"><span>G</span><strong>GoVietStay</strong></a>
            <a className="header-book" href="#booking">Проверить места</a>
          </header>
          <div className="hero-copy" id="top">
            <p className="eyebrow">Два варианта поездки в Ba Na Hills</p>
            <h1>Золотой мост<br />утром или вечером</h1>
            <p className="lead">Выберите классическую дневную программу или более поздний выезд с ужином и вечерней Французской деревней.</p>
            <div className="chips"><span>Англоговорящий гид</span><span>От 1 550 000 VND</span><span>Дананг и Хойан</span></div>
          </div>
        </div>
      </section>

      <section className="alert">
        <div className="alert-icon">!</div>
        <div>
          <strong>Важная информация перед бронированием Ba Na Hills</strong>
          <p>Ba Na Hills — одна из самых посещаемых достопримечательностей Центрального Вьетнама, особенно утром, в выходные, праздники и высокий сезон. GoVietStay не может гарантировать количество посетителей, время ожидания, видимость, погоду, работу канатной дороги или фактическую ситуацию на горе.</p>
        </div>
      </section>

      <section className="section intro">
        <div>
          <p className="label">Выберите свой вариант</p>
          <h2>Одна гора.<br />Два разных ритма.</h2>
        </div>
        <p>Утро — классическая программа и больше дневного времени. Дневной и вечерний вариант — более поздний выезд, прохлада и вечерняя атмосфера. Ни один вариант не может быть гарантированно без очередей.</p>
      </section>

      <section className="options">
        <button className={option === "morning" ? "option active" : "option"} onClick={() => setOption("morning")}>
          <div className="option-top"><span>01</span><em>Классический выбор</em></div>
          <h3>Утренняя экскурсия</h3>
          <p className="time">07:30–17:00</p>
          <ul><li>Золотой мост при дневном свете</li><li>Обед «шведский стол»</li><li>Французская деревня и Fantasy Park</li><li>Больше времени днём</li></ul>
          <strong>Выбрать утро →</strong>
        </button>
        <button className={option === "evening" ? "option active" : "option"} onClick={() => setOption("evening")}>
          <div className="option-top"><span>02</span><em>Поздний выезд</em></div>
          <h3>Днём и вечером</h3>
          <p className="time">13:00–20:30/21:15</p>
          <ul><li>Золотой мост во второй половине дня</li><li>Ужин в Beer Plaza</li><li>Французская деревня после заката</li><li>Прохладная вечерняя атмосфера</li></ul>
          <strong>Выбрать дневной вариант →</strong>
        </button>
      </section>

      <section className="section itinerary">
        <div className="section-head">
          <div><p className="label">Выбранная программа</p><h2>{optionName}</h2></div>
          <span>{option === "morning" ? "07:30–17:00" : "13:00–20:30/21:15"}</span>
        </div>
        <div className="timeline">
          {itinerary.map(([time, title, text], index) => (
            <article key={time}>
              <time>{time}</time><i>{index + 1}</i><div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
        <p className="schedule-note">Программа и время ориентировочные. Гид может изменить порядок и продолжительность в зависимости от очередей, погоды, работы канатной дороги, официальных указаний и фактического движения группы.</p>
      </section>

      <section className="included-grid">
        <div className="included"><p className="label">Включено</p><h2>Что входит в экскурсию</h2><ul>{included.map(x => <li key={x}><span>✓</span>{x}</li>)}</ul></div>
        <div className="excluded"><p className="label">Не включено</p><h2>Оплачивается отдельно</h2><ul>{excluded.map(x => <li key={x}><span>—</span>{x}</li>)}</ul></div>
      </section>

      <section className="section price-booking" id="booking">
        <div className="price-copy">
          <p className="label">Ориентировочная цена групповой экскурсии</p>
          <h2>Понятная цена.<br />Подтверждение до оплаты.</h2>
          <div className="prices">
            <div><span>Взрослый</span><strong>1 550 000</strong><small>VND / человек</small></div>
            <div><span>Ребёнок</span><strong>1 400 000</strong><small>VND / человек</small></div>
          </div>
          <p>Детский тариф определяется действующими правилами оператора по росту. Индивидуальную экскурсию для группы от четырёх человек можно запросить и подтвердить отдельно.</p>
        </div>
        <div className="form-card">
          <p className="form-choice">Выбрано: <strong>{optionName}</strong></p>
          <label>Дата поездки<input type="date" value={booking.date} onChange={e => setBooking({...booking, date:e.target.value})} /></label>
          <div className="form-row">
            <label>Взрослые<input inputMode="numeric" value={booking.adults} onChange={e => setBooking({...booking, adults:e.target.value})} /></label>
            <label>Дети<input inputMode="numeric" value={booking.children} onChange={e => setBooking({...booking, children:e.target.value})} /></label>
          </div>
          <label>Возраст и рост детей<input placeholder="Например: 7 лет, 125 см" value={booking.childInfo} onChange={e => setBooking({...booking, childInfo:e.target.value})} /></label>
          <label>Название отеля<input placeholder="Отель в Дананге или Хойане" value={booking.hotel} onChange={e => setBooking({...booking, hotel:e.target.value})} /></label>
          <a href={whatsapp} target="_blank" rel="noreferrer">Проверить места в WhatsApp</a>
          <small>Проверка мест бесплатна. Бронирование подтверждается только после ответа GoVietStay.</small>
        </div>
      </section>

      <section className="reviews-section">
        <div className="section reviews-inner">
          <div className="reviews-head">
            <div>
              <p className="label">Проверенные отзывы гостей</p>
              <h2>Что путешественники говорят о GoVietStay</h2>
              <p>Настоящие отзывы Google. Оригинальные скриншоты доступны для проверки.</p>
            </div>
            <a href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic" target="_blank" rel="noreferrer">Все отзывы в Google ↗</a>
          </div>
          <div className="review-grid">
            {reviews.map(review => (
              <article className="review-card" key={review.image}>
                <div className="stars" aria-label="Отзыв с пятью звёздами">★★★★★</div>
                <blockquote>“{review.quote}”</blockquote>
                <p>{review.detail}</p>
                <div className="review-footer">
                  <div><strong>{review.name}</strong><span>Отзыв Google · GoVietStay</span></div>
                  <a href={review.image} target="_blank" rel="noreferrer">Открыть оригинал</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq">
        <div><p className="label">Полезно знать</p><h2>Вопросы перед бронированием</h2></div>
        <div>{faqs.map(([q,a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="final">
        <p className="label">GoVietStay · Дананг · Хойан</p>
        <h2>Выберите время.<br />Мы подтвердим реальные условия.</h2>
        <p>Англоговорящий гид · Поддержка в WhatsApp · Все детали до оплаты</p>
        <a href={whatsapp} target="_blank" rel="noreferrer">Написать GoVietStay</a>
      </section>

      <footer><strong>GoVietStay</strong><span>Надёжная местная поддержка</span><a href="https://GoVietStay.com">GoVietStay.com</a><span>WhatsApp: +84 937 762 607</span></footer>
      <a className="mobile-book" href={whatsapp} target="_blank" rel="noreferrer"><span>{option === "morning" ? "Утро" : "День и вечер"}</span>Бронировать в WhatsApp</a>
    </main>
  );
}
