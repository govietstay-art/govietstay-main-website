import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pi Network Vietnam Travel | 10% Pioneer Welcome | GoVietStay",
  description:
    "A special GoVietStay page for Pi Pioneers travelling to Vietnam. Discover Da Nang, Hoi An, Hue and Phu Quoc, plus a 10% Pioneer welcome offer.",
  keywords: [
    "Pi Network Vietnam",
    "Pi Network travel",
    "Pi Pioneer Vietnam",
    "Pi Network Da Nang",
    "Pi Network Phu Quoc",
    "Vietnam travel Pi Network",
    "GoVietStay Pi Network",
  ],
  alternates: { canonical: "https://www.govietstay.com/pi-network-vietnam" },
  openGraph: {
    title: "Pi Pioneer Travelling to Vietnam? Welcome to GoVietStay",
    description: "Any Pioneer. Any country. 10% off GoVietStay bookings in Vietnam.",
    url: "https://www.govietstay.com/pi-network-vietnam",
    siteName: "GoVietStay",
    type: "website",
    images: [{ url: "/tour/phuquoc/tour-09-1.jpg", width: 1600, height: 1067, alt: "Phu Quoc, Vietnam" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pi Pioneer x Vietnam | GoVietStay",
    description: "8 years of belief. One global community. 10% Pioneer welcome in Vietnam.",
    images: ["/tour/phuquoc/tour-09-1.jpg"],
  },
};

const whatsapp =
  "https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20am%20a%20Pi%20Pioneer.%20I%20want%20to%20claim%20the%2010%25%20Pioneer%20welcome%20offer.%20Code%3A%20PI10";

const shareX =
  "https://twitter.com/intent/tweet?text=Eight%20years%20with%20Pi.%20Now%20GoVietStay%20welcomes%20Pi%20Pioneers%20to%20Vietnam%20with%2010%25%20off%20bookings.%20A%20small%20step%20from%20digital%20community%20to%20real-world%20travel.&url=https%3A%2F%2Fwww.govietstay.com%2Fpi-network-vietnam";

const destinations = [
  {
    city: "PHU QUOC",
    title: "Pearl Island, planned around your trip.",
    copy: "Island hopping, airport transfer, family planning and private experiences with local support.",
    href: "/travel/phu-quoc-travel-guide",
    tag: "ISLANDS · BEACH · FAMILY",
  },
  {
    city: "DA NANG",
    title: "Vietnam's coastal city with local support.",
    copy: "Ba Na Hills, Marble Mountains, airport transfer, private cars and Central Vietnam planning.",
    href: "/travel/da-nang-travel-guide",
    tag: "CITY · BEACH · DAY TRIPS",
  },
  {
    city: "HOI AN",
    title: "Ancient streets, lantern evenings, real moments.",
    copy: "Coconut Village, old-town walks, local food and private evening experiences from Da Nang.",
    href: "/travel/hoi-an-from-da-nang",
    tag: "CULTURE · FOOD · LANTERNS",
  },
  {
    city: "HUE",
    title: "A heritage day with room to understand it.",
    copy: "Imperial history, Hai Van Pass routing and private day-trip planning with a local team.",
    href: "/travel/hue-from-da-nang",
    tag: "HERITAGE · PRIVATE DAY",
  },
];

export default function PiNetworkVietnamPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pi Network Vietnam Travel | GoVietStay",
    url: "https://www.govietstay.com/pi-network-vietnam",
    description:
      "Independent GoVietStay travel landing page welcoming Pi Pioneers visiting Vietnam.",
    about: ["Vietnam travel", "Pi Network community", "Pi Pioneers"],
    mainEntity: {
      "@type": "Offer",
      name: "Pi Pioneer Welcome - 10% Off",
      description: "10% off eligible GoVietStay bookings for verified Pi Pioneers worldwide.",
      url: "https://www.govietstay.com/pi-network-vietnam",
      seller: { "@type": "Organization", name: "GoVietStay", url: "https://www.govietstay.com" },
    },
  };

  return (
    <main className="piPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="hero">
        <div className="heroPhoto" aria-hidden="true" />
        <div className="heroShade" aria-hidden="true" />
        <div className="network" aria-hidden="true">
          <span className="n n1" /><span className="n n2" /><span className="n n3" /><span className="n n4" />
          <span className="line l1" /><span className="line l2" /><span className="line l3" />
        </div>

        <nav className="nav shell">
          <a className="brand" href="/">GoVietStay<span>Trusted Local Support</span></a>
          <div className="navLinks">
            <a href="#journey">Our Journey</a>
            <a href="#pioneer-gift">10% Pioneer Gift</a>
            <a href="#vietnam">Vietnam</a>
          </div>
          <a className="navCta" href={whatsapp}>Claim PI10</a>
        </nav>

        <div className="heroInner shell">
          <div className="eyebrow"><b>PI PIONEERS × VIETNAM</b><span>INDEPENDENT COMMUNITY WELCOME</span></div>
          <h1>A Pioneer journey that<br /><em>never stopped believing.</em></h1>
          <p className="lead">
            For eight years, Pi has represented more than a screen to us. It has represented an idea: that technology becomes meaningful when real people can use it in real life.
          </p>
          <div className="heroActions">
            <a className="primary" href="#pioneer-gift">Unlock 10% Pioneer Welcome</a>
            <a className="ghost" href="#future">See the future we believe in ↓</a>
          </div>
          <div className="trustRow">
            <div><strong>60M+</strong><span>engaged members stated by Pi Network</span></div>
            <div><strong>GLOBAL</strong><span>Pioneer community</span></div>
            <div><strong>VIETNAM</strong><span>Da Nang · Hoi An · Hue · Phu Quoc</span></div>
          </div>
        </div>

        <div className="heroNote">GO VIETNAM · GO LOCAL · GO WITH TRUST</div>
      </section>

      {/* GVS_PI_CONTACT_V3 */}
      <section className="collabShowcase" aria-label="GoVietStay and Pi Pioneer community">
        <div className="shell collabWrap">
          <span className="kicker">GOVIETSTAY Ã— PI PIONEER COMMUNITY</span>

          <img
            className="collabOfficialLogo"
            src="/pi-network/govietstay-logo.png"
            alt="GoVietStay official logo"
          />

          <h2 className="collabTitle">
            Travel meets <em>community.</em>
          </h2>

          <p className="collabIntro">
            A special GoVietStay welcome for Pioneers travelling to Vietnam â€”
            real local support, real destinations and <strong>10% off eligible bookings with code PI10.</strong>
          </p>

          <div className="collabArtFrame">
            <img
              className="collabArt"
              src="/pi-network/govietstay-pi-handshake.webp"
              alt="GoVietStay and Pi Network community handshake concept"
            />
          </div>

          <p className="collabIndependent">
            Independent GoVietStay community tribute for Pi Pioneers. This visual does not imply official endorsement,
            sponsorship or partnership by Pi Network or the Pi Core Team.
          </p>

          <div className="contactMega">
            <a
              className="contactMegaBtn wa"
              href="https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20am%20a%20Pi%20Pioneer.%20I%20want%20to%20claim%20the%2010%25%20Pioneer%20welcome.%20Code%3A%20PI10"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contactIcon">ðŸ’¬</span>
              <span><b>WhatsApp 24/7</b><small>Claim PI10 Â· Talk to GoVietStay</small></span>
            </a>

            <a
              className="contactMegaBtn tg"
              href="https://t.me/govietstay_travel_bot"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contactIcon">âœˆï¸</span>
              <span><b>Telegram</b><small>Open GoVietStay Travel Bot</small></span>
            </a>

            <a
              className="contactMegaBtn gr"
              href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contactIcon">â­</span>
              <span><b>Google Reviews</b><small>Verify GoVietStay before booking</small></span>
            </a>
          </div>
        </div>
      </section>
      <section id="pioneer-gift" className="gift">
        <div className="shell giftGrid">
          <div>
            <span className="kicker">A GIFT TO THE COMMUNITY</span>
            <h2>ANY PIONEER.<br />ANY COUNTRY.<br /><b>10% OFF.</b></h2>
          </div>
          <div className="giftCard">
            <span className="code">CODE · PI10</span>
            <h3>10% Pioneer Welcome</h3>
            <p>
              If you are a Pi Pioneer travelling to Vietnam, GoVietStay welcomes you with 10% off eligible GoVietStay bookings — wherever in the world you come from.
            </p>
            <ol>
              <li><span>01</span>Tell us you are a Pi Pioneer.</li>
              <li><span>02</span>Send your travel date, hotel and group size.</li>
              <li><span>03</span>Use code <b>PI10</b> when we confirm your booking.</li>
            </ol>
            <a className="primary wide" href={whatsapp}>Claim my Pioneer 10% →</a>
            <small>Offer confirmation, service availability and booking conditions apply. This is a GoVietStay travel promotion, not an investment or financial offer.</small>
          </div>
        </div>
      </section>

      <section id="journey" className="journey shell">
        <div className="sectionHead">
          <span className="kicker">WHY THIS PAGE EXISTS</span>
          <h2>We did not build this page because Pi is trending.</h2>
          <p>We built it because the journey matters to us.</p>
        </div>
        <div className="storyGrid">
          <div className="bigQuote">“A digital community becomes powerful when it creates trust between real people.”</div>
          <div className="storyText">
            <p>
              We have stayed with Pi through uncertainty, waiting, debate and change. That experience shaped how we see technology: belief alone is not enough — utility has to reach everyday life.
            </p>
            <p>
              GoVietStay works in the physical world: airports, hotels, boats, guides, families, local restaurants and real journeys. Our contribution is simple — welcome Pioneers who come to Vietnam and connect the digital community with a trusted local experience.
            </p>
          </div>
        </div>
        <div className="timeline">
          <div><span>EARLY DAYS</span><b>Belief</b><p>Stay curious. Keep learning.</p></div>
          <div><span>OPEN NETWORK</span><b>Utility</b><p>Real-world use becomes the important question.</p></div>
          <div><span>NOW</span><b>Travel</b><p>Bring the community into real places and real experiences.</p></div>
          <div><span>NEXT</span><b>More doors</b><p>We hope useful digital value becomes easier to use around the world.</p></div>
        </div>
      </section>

      <section id="future" className="future">
        <div className="futureGlow" aria-hidden="true" />
        <div className="shell futureInner">
          <span className="kicker light">THE FUTURE WE BELIEVE IN</span>
          <h2>From a phone screen<br />to <em>real places.</em></h2>
          <p className="futureLead">
            Imagine a traveller landing in a new country and discovering that the community they have been part of for years can connect them to transport, food, experiences and trusted local businesses.
          </p>
          <div className="futureCards">
            <article><span>01</span><h3>People first</h3><p>Technology should make connection easier — not replace human trust.</p></article>
            <article><span>02</span><h3>Utility over hype</h3><p>Real value is created when digital tools solve everyday needs.</p></article>
            <article><span>03</span><h3>More places, over time</h3><p>We hope to see Pi accepted by more legitimate businesses, communities and services worldwide.</p></article>
          </div>
          <a className="xButton" href={shareX} target="_blank" rel="noreferrer">Share this vision on X ↗</a>
        </div>
      </section>

      <section id="vietnam" className="vietnam shell">
        <div className="vietnamHero">
          <img src="/hero-hoian-new.png" alt="Dragon Bridge in Da Nang, Vietnam" />
          <div className="vietnamOverlay">
            <span>WELCOME TO VIETNAM</span>
            <h2>Your Pioneer journey can become a real journey here.</h2>
            <p>Travel with local support in Central Vietnam and Phu Quoc.</p>
          </div>
        </div>

        <div className="destGrid">
          {destinations.map((d, i) => (
            <a className="dest" href={d.href} key={d.city}>
              <span className="num">0{i + 1}</span>
              <small>{d.tag}</small>
              <h3>{d.city}</h3>
              <h4>{d.title}</h4>
              <p>{d.copy}</p>
              <b>Explore →</b>
            </a>
          ))}
        </div>
      </section>

      <section className="facts shell">
        <div className="sectionHead compact">
          <span className="kicker">OFFICIAL PI SOURCES</span>
          <h2>Belief is personal. Facts should still be verifiable.</h2>
        </div>
        <div className="factGrid">
          <a href="https://minepi.com/about/" target="_blank" rel="noreferrer"><b>Pi Network · About</b><span>Official overview and stated 60M+ engaged members ↗</span></a>
          <a href="https://minepi.com/blog/pi-day-2025/" target="_blank" rel="noreferrer"><b>Open Network utility</b><span>Official Pi article on local commerce and real-world utility ↗</span></a>
          <a href="https://minepi.com/pi-trademark-guidelines/" target="_blank" rel="noreferrer"><b>Trademark guidelines</b><span>Why this page remains visually independent from Pi's official branding ↗</span></a>
        </div>
      </section>

      {/* GVS_PI_REVIEWS_V3 */}
      <section className="piReviews">
        <div className="shell">
          <div className="reviewHeader">
            <div>
              <span className="kicker light">REAL GOOGLE REVIEWS</span>
              <h2>Do not just believe us.<br /><em>Verify us.</em></h2>
            </div>
            <a
              className="reviewAllBtn"
              href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic"
              target="_blank"
              rel="noreferrer"
            >
              â˜…â˜…â˜…â˜…â˜… Read all Google Reviews â†—
            </a>
          </div>

          <div className="reviewCards">
            <article>
              <div className="stars">â˜…â˜…â˜…â˜…â˜…</div>
              <p>â€œ10/10 service. David and Terry are very professional and super supportive.â€</p>
              <b>Mehak Khanna</b>
              <small>Google Review Â· GoVietStay</small>
            </article>

            <article>
              <div className="stars">â˜…â˜…â˜…â˜…â˜…</div>
              <p>â€œAn amazing trip! Great service and very helpful support. Highly recommended!â€</p>
              <b>Ryan</b>
              <small>Google Review Â· GoVietStay</small>
            </article>

            <article>
              <div className="stars">â˜…â˜…â˜…â˜…â˜…</div>
              <p>â€œA wonderful, unforgettable holiday. Thank you, Anna and David!â€</p>
              <b>Dariga Baitleuova</b>
              <small>Google Review Â· GoVietStay</small>
            </article>
          </div>

          <div className="reviewTrustLine">
            <span>âœ“ Real public reviews</span>
            <span>âœ“ Real traveler experiences</span>
            <span>âœ“ Check our Google Maps profile before booking</span>
          </div>
        </div>
      </section>
      <section className="closing">
        <div className="shell closingInner">
          <span className="kicker light">PI PIONEER TRAVELLING TO VIETNAM?</span>
          <h2>Welcome.<br />Your 10% is waiting.</h2>
          <p>Send us your dates. We will help you turn Vietnam into a real local experience.</p>
          <div className="heroActions center">
            <a className="primary" href={whatsapp}>WhatsApp GoVietStay · PI10</a>
            <a className="ghost" href="/travel">Explore Vietnam Guides</a>
          </div>
          <div className="disclaimer">
            Independent community page by GoVietStay. GoVietStay is not Pi Network, Pi Core Team, or an official Pi representative, and this page does not imply endorsement, sponsorship or affiliation by Pi Network. No price prediction, investment promise or financial advice is provided here.
          </div>
          <div className="credits">
            Vietnam visuals are served from GoVietStay website assets.
          </div>
        </div>
      </section>

      <style>{`
        :root{--ink:#07130f;--green:#0a7a4b;--lime:#b7e46f;--gold:#e5bd62;--cream:#f5f2e8;--muted:#66736d;--line:rgba(7,19,15,.12)}
        *{box-sizing:border-box}.piPage{background:#f8f7f2;color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow:hidden}.shell{width:min(1180px,calc(100% - 40px));margin:0 auto}
        .hero{min-height:860px;position:relative;color:white;background:#07130f;display:flex;flex-direction:column}.heroPhoto{position:absolute;inset:0;background:url('/tour/phuquoc/tour-09-1.jpg') center 54%/cover no-repeat;filter:saturate(.94) contrast(1.03)}.heroShade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,15,10,.94) 0%,rgba(3,15,10,.79) 43%,rgba(3,15,10,.34) 72%,rgba(3,15,10,.58) 100%),linear-gradient(0deg,rgba(3,15,10,.66) 0%,transparent 42%)}
        .nav{position:relative;z-index:5;display:flex;align-items:center;justify-content:space-between;padding:22px 0;border-bottom:1px solid rgba(255,255,255,.18)}.brand{color:#fff;text-decoration:none;font-size:22px;font-weight:900;letter-spacing:-.8px}.brand span{display:block;font-size:9px;font-weight:700;letter-spacing:1.7px;opacity:.65;text-transform:uppercase;margin-top:2px}.navLinks{display:flex;gap:28px}.navLinks a{color:#fff;text-decoration:none;font-size:13px;font-weight:700;opacity:.78}.navCta{color:#06110c;background:#d8f28d;text-decoration:none;padding:11px 16px;border-radius:999px;font-size:13px;font-weight:900}
        .heroInner{position:relative;z-index:3;padding:128px 0 92px}.eyebrow{display:flex;align-items:center;gap:14px;font-size:11px;letter-spacing:1.8px;text-transform:uppercase}.eyebrow b{color:#d8f28d}.eyebrow span{opacity:.64}.hero h1{font-size:clamp(66px,8.8vw,118px);line-height:.91;letter-spacing:-5px;max-width:980px;margin:22px 0 28px}.hero h1 em,.future h2 em{font-family:Georgia,serif;font-weight:400;color:#e4c369}.lead{font-size:21px;line-height:1.7;max-width:670px;color:rgba(255,255,255,.82)}.heroActions{display:flex;gap:12px;flex-wrap:wrap;margin-top:32px}.primary,.ghost{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;border-radius:999px;padding:15px 21px;font-weight:900;font-size:16px}.primary{background:#d8f28d;color:#07130f}.ghost{border:1px solid rgba(255,255,255,.35);color:white;background:rgba(255,255,255,.05);backdrop-filter:blur(8px)}.trustRow{display:grid;grid-template-columns:repeat(3,1fr);max-width:820px;margin-top:76px;border-top:1px solid rgba(255,255,255,.22);border-bottom:1px solid rgba(255,255,255,.22)}.trustRow div{padding:19px 20px 19px 0}.trustRow strong{display:block;font-size:22px}.trustRow span{display:block;font-size:11px;opacity:.62;margin-top:5px}.heroNote{position:absolute;right:26px;bottom:28px;z-index:4;font-size:10px;letter-spacing:2px;opacity:.55;writing-mode:vertical-rl}.network{position:absolute;right:7vw;top:22%;z-index:2;width:280px;height:280px;opacity:.65}.n{position:absolute;width:12px;height:12px;border-radius:50%;background:#d8f28d;box-shadow:0 0 26px #d8f28d}.n1{left:16px;top:85px}.n2{left:130px;top:22px}.n3{right:25px;top:120px}.n4{left:105px;bottom:18px}.line{position:absolute;height:1px;background:linear-gradient(90deg,transparent,#d8f28d,transparent);transform-origin:left center}.l1{width:145px;left:25px;top:92px;transform:rotate(-28deg)}.l2{width:155px;left:138px;top:34px;transform:rotate(37deg)}.l3{width:160px;left:117px;bottom:29px;transform:rotate(-56deg)}
        .gift{background:#e7c56a;padding:92px 0}.giftGrid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}.kicker{display:inline-block;font-size:11px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#3c5d4b}.gift h2{font-size:clamp(62px,7.6vw,102px);line-height:.86;letter-spacing:-5px;margin:17px 0}.gift h2 b{color:#fff}.giftCard{background:#07130f;color:white;border-radius:30px;padding:38px;box-shadow:0 30px 80px rgba(56,38,4,.25)}.code{display:inline-block;border:1px solid rgba(216,242,141,.35);color:#d8f28d;border-radius:999px;padding:8px 12px;font-size:11px;font-weight:900;letter-spacing:1.4px}.giftCard h3{font-size:40px;letter-spacing:-1.5px;margin:22px 0 10px}.giftCard p{color:rgba(255,255,255,.72);line-height:1.65}.giftCard ol{list-style:none;padding:0;margin:25px 0}.giftCard li{display:flex;gap:14px;align-items:center;padding:13px 0;border-top:1px solid rgba(255,255,255,.11);font-size:14px}.giftCard li span{color:#d8f28d;font-weight:900}.wide{width:100%}.giftCard small{display:block;color:rgba(255,255,255,.48);line-height:1.5;margin-top:14px}
        .journey{padding:112px 0}.sectionHead{max-width:800px}.sectionHead h2{font-size:clamp(52px,6.6vw,86px);line-height:.96;letter-spacing:-4px;margin:15px 0}.sectionHead p{color:var(--muted);font-size:18px}.storyGrid{display:grid;grid-template-columns:1.1fr 1fr;gap:70px;margin-top:70px}.bigQuote{font-family:Georgia,serif;font-size:clamp(34px,4.2vw,56px);line-height:1.07;color:#0b6846}.storyText p{font-size:17px;line-height:1.85;color:#4e5e56;margin-top:0}.timeline{display:grid;grid-template-columns:repeat(4,1fr);margin-top:70px;border-top:1px solid var(--line)}.timeline div{padding:28px 22px 0 0}.timeline span{font-size:10px;letter-spacing:1.6px;color:#718078;font-weight:900}.timeline b{display:block;font-size:24px;margin:8px 0}.timeline p{font-size:13px;line-height:1.5;color:#708078}
        .future{position:relative;background:#07130f;color:white;padding:120px 0;overflow:hidden}.futureGlow{position:absolute;width:800px;height:800px;border:1px solid rgba(216,242,141,.12);border-radius:50%;right:-260px;top:-220px;box-shadow:0 0 140px rgba(164,209,91,.08) inset}.futureGlow:before,.futureGlow:after{content:"";position:absolute;border:1px solid rgba(229,189,98,.12);border-radius:50%;inset:120px}.futureGlow:after{inset:250px}.light{color:#d8f28d}.future h2{font-size:clamp(58px,8vw,104px);line-height:.88;letter-spacing:-6px;margin:20px 0 30px;max-width:950px}.futureLead{font-size:22px;line-height:1.65;max-width:760px;color:rgba(255,255,255,.7)}.futureCards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:58px}.futureCards article{min-height:230px;padding:28px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);border-radius:22px;backdrop-filter:blur(7px)}.futureCards span{font-size:11px;color:#d8f28d;font-weight:900}.futureCards h3{font-size:25px;margin:36px 0 10px}.futureCards p{color:rgba(255,255,255,.62);line-height:1.6;font-size:14px}.xButton{display:inline-flex;margin-top:30px;color:white;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.4);padding-bottom:4px;font-weight:800}
        .vietnam{padding:112px 0}.vietnamHero{height:560px;border-radius:30px;overflow:hidden;position:relative;background:#132}.vietnamHero img{width:100%;height:100%;object-fit:cover}.vietnamHero:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,14,8,.82),rgba(2,14,8,.08) 62%)}.vietnamOverlay{position:absolute;z-index:2;left:38px;right:38px;bottom:35px;color:white}.vietnamOverlay span{font-size:10px;letter-spacing:2px;font-weight:900;color:#d8f28d}.vietnamOverlay h2{font-size:clamp(38px,5.5vw,67px);letter-spacing:-3px;line-height:.96;max-width:850px;margin:10px 0}.vietnamOverlay p{opacity:.75}.destGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:18px}.dest{position:relative;display:block;text-decoration:none;color:var(--ink);border:1px solid var(--line);border-radius:22px;padding:30px;min-height:310px;background:white;transition:.2s ease}.dest:hover{transform:translateY(-4px);box-shadow:0 25px 60px rgba(3,20,13,.08)}.dest .num{position:absolute;right:24px;top:22px;font-size:42px;color:#dde4df;font-weight:900}.dest small{font-size:10px;letter-spacing:1.4px;color:#738078;font-weight:800}.dest h3{font-size:44px;letter-spacing:-2px;margin:45px 0 4px}.dest h4{font-size:21px;margin:0 0 10px}.dest p{max-width:520px;color:#68756f;line-height:1.7;font-size:16px}.dest b{display:inline-block;margin-top:14px;color:#0b6846}
        .facts{padding:0 0 110px}.compact h2{font-size:clamp(36px,5vw,58px)}.factGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:38px}.factGrid a{display:block;text-decoration:none;color:var(--ink);padding:24px;border-radius:18px;background:#eef0ea;border:1px solid #e1e5de}.factGrid b{display:block}.factGrid span{display:block;color:#6a766f;font-size:13px;line-height:1.5;margin-top:8px}
        .closing{background:#0a6d49;color:white;padding:100px 0}.closingInner{text-align:center}.closing h2{font-size:clamp(58px,8vw,100px);line-height:.88;letter-spacing:-6px;margin:18px auto 25px}.closing p{font-size:18px;color:rgba(255,255,255,.74)}.center{justify-content:center}.disclaimer,.credits{max-width:900px;margin:58px auto 0;padding-top:24px;border-top:1px solid rgba(255,255,255,.18);font-size:11px;line-height:1.6;color:rgba(255,255,255,.5)}.credits{margin-top:12px;padding-top:0;border:0}
        @media(max-width:820px){.shell{width:min(100% - 28px,1180px)}.navLinks{display:none}.navCta{font-size:12px;padding:10px 13px}.hero{min-height:820px}.heroInner{padding:96px 0 70px}.hero h1{letter-spacing:-3.3px}.lead{font-size:16px}.trustRow{grid-template-columns:1fr;margin-top:48px}.trustRow div{border-top:1px solid rgba(255,255,255,.12)}.network{right:-100px;top:25%;opacity:.3}.giftGrid,.storyGrid,.destGrid,.factGrid{grid-template-columns:1fr}.gift{padding:76px 0}.gift h2{letter-spacing:-3px}.giftCard{padding:26px}.timeline{grid-template-columns:1fr 1fr}.future{padding:90px 0}.future h2,.closing h2{letter-spacing:-4px}.futureCards{grid-template-columns:1fr}.vietnam{padding:76px 0}.vietnamHero{height:520px;border-radius:22px}.vietnamOverlay{left:22px;right:22px;bottom:22px}.vietnamOverlay h2{letter-spacing:-2px}.dest{min-height:280px}.facts{padding-bottom:80px}}
        @media(max-width:520px){.hero{min-height:780px}.heroPhoto{background-position:63% center}.hero h1{font-size:56px;letter-spacing:-2.7px}.eyebrow span{display:none}.heroActions{flex-direction:column}.heroActions a{width:100%}.gift h2{font-size:58px}.timeline{grid-template-columns:1fr}.timeline div{padding-bottom:18px}.future h2{font-size:58px}.vietnamHero{height:500px}.closing h2{font-size:60px}.heroNote{display:none}}
      `}</style>
      {/* GVS_PI_FLOATING_CONTACT_V3 */}
      <div className="contactDock" aria-label="Contact GoVietStay">
        <a
          className="dockBtn dockWA"
          href="https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20am%20a%20Pi%20Pioneer.%20Code%3A%20PI10"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp GoVietStay"
        >
          <span>ðŸ’¬</span><b>WhatsApp</b>
        </a>
        <a
          className="dockBtn dockTG"
          href="https://t.me/govietstay_travel_bot"
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram GoVietStay"
        >
          <span>âœˆï¸</span><b>Telegram</b>
        </a>
        <a
          className="dockBtn dockGR"
          href="https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic"
          target="_blank"
          rel="noreferrer"
          aria-label="Google Reviews GoVietStay"
        >
          <span>â­</span><b>Reviews</b>
        </a>
      </div>
    </main>
  );
}
