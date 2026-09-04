export const metadata = {
  title: "Pi Network Vietnam Travel | 10% Pioneer Welcome | GoVietStay",
  description:
    "A special GoVietStay landing page for Pi Pioneers travelling to Vietnam. 10% Pioneer welcome, local support, WhatsApp, Telegram, Google Reviews and trusted Vietnam travel guides.",
  alternates: {
    canonical: "https://www.govietstay.com/pi-network-vietnam",
  },
  openGraph: {
    title: "Pi Pioneer travelling to Vietnam? Welcome to GoVietStay",
    description:
      "Eight years of belief. One global community. 10% Pioneer welcome in Vietnam.",
    url: "https://www.govietstay.com/pi-network-vietnam",
    siteName: "GoVietStay",
    type: "website",
    images: [
      {
        url: "/pi-network/govietstay-pi-handshake.webp",
        width: 1254,
        height: 1254,
        alt: "GoVietStay and Pi Pioneer community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoVietStay x Pi Pioneer Community",
    description:
      "Pi Pioneer travelling to Vietnam? Claim a 10% Pioneer welcome with GoVietStay.",
    images: ["/pi-network/govietstay-pi-handshake.webp"],
  },
};

const whatsapp =
  "https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20am%20a%20Pi%20Pioneer.%20I%20want%20to%20claim%20the%2010%25%20Pioneer%20welcome.%20Code%3A%20PI10";

const telegram = "https://t.me/govietstay_travel_bot";
const googleReviews = "https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic";

const destinations = [
  {
    code: "01",
    city: "PHU QUOC",
    title: "Pearl Island, planned around your trip.",
    copy:
      "Island hopping, airport transfer, family planning and weather-aware local support.",
    href: "/travel/phu-quoc-travel-guide",
  },
  {
    code: "02",
    city: "DA NANG",
    title: "Vietnam's coastal city with a trusted local base.",
    copy:
      "Ba Na Hills, beaches, airport transfer, private cars and Central Vietnam planning.",
    href: "/travel/da-nang-travel-guide",
  },
  {
    code: "03",
    city: "HOI AN",
    title: "Ancient streets, lantern evenings and local experiences.",
    copy:
      "Coconut Forest, basket boat, Ancient Town, food, lanterns and a practical evening route.",
    href: "/travel/hoi-an-day-trip-from-da-nang",
  },
  {
    code: "04",
    city: "HUE",
    title: "A full heritage day with time to understand it.",
    copy:
      "Imperial City, cultural context, Hai Van routing and joined or private options.",
    href: "/travel/hue-day-trip-from-da-nang",
  },
];

export default function PiNetworkVietnamPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pi Network Vietnam Travel | GoVietStay",
    url: "https://www.govietstay.com/pi-network-vietnam",
    description:
      "Independent GoVietStay travel page welcoming Pi Pioneers visiting Vietnam.",
    mainEntity: {
      "@type": "Offer",
      name: "Pi Pioneer Welcome - PI10",
      description:
        "10% off eligible GoVietStay bookings for Pi Pioneers travelling to Vietnam.",
      url: "https://www.govietstay.com/pi-network-vietnam",
      seller: {
        "@type": "Organization",
        name: "GoVietStay",
        url: "https://www.govietstay.com",
      },
    },
  };

  return (
    <main className="piPageV6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="heroV6">
        <div className="heroImageV6" />
        <div className="heroShadeV6" />

        <nav className="navV6 shellV6">
          <a className="brandV6" href="/">
            GoVietStay
            <span>TRUSTED LOCAL SUPPORT</span>
          </a>

          <div className="navLinksV6">
            <a href="#journey">Our Journey</a>
            <a href="#pioneer-gift">10% Pioneer Gift</a>
            <a href="#vietnam">Vietnam</a>
          </div>

          <a className="navClaimV6" href={whatsapp} target="_blank" rel="noreferrer">
            Claim PI10
          </a>
        </nav>

        <div className="heroInnerV6 shellV6">
          <div className="heroEyebrowV6">
            <b>PI PIONEERS X VIETNAM</b>
            <span>INDEPENDENT COMMUNITY WELCOME</span>
          </div>

          <h1>
            A Pioneer journey that
            <em> never stopped believing.</em>
          </h1>

          <p className="heroLeadV6">
            For eight years, Pi has represented more than a screen to us. It has
            represented an idea: technology becomes meaningful when real people
            can connect it with real life.
          </p>

          <div className="heroActionsV6">
            <a className="primaryV6" href="#pioneer-gift">
              Unlock 10% Pioneer Welcome
            </a>
            <a className="secondaryV6" href="#future">
              See the future we believe in
            </a>
          </div>

          <div className="heroStatsV6">
            <div>
              <strong>PI10</strong>
              <span>10% Pioneer welcome</span>
            </div>
            <div>
              <strong>GLOBAL</strong>
              <span>Pioneers from any country</span>
            </div>
            <div>
              <strong>VIETNAM</strong>
              <span>Da Nang - Hoi An - Hue - Phu Quoc</span>
            </div>
          </div>
        </div>
      </section>

      <section className="collabV6">
        <div className="shellV6 collabInnerV6">
          <span className="sectionLabelV6">GOVIETSTAY X PI PIONEER COMMUNITY</span>

          <img
            className="officialLogoV6"
            src="/pi-network/govietstay-logo.png"
            alt="GoVietStay official logo"
          />

          <h2>
            Travel meets <em>community.</em>
          </h2>

          <p className="collabLeadV6">
            A special GoVietStay welcome for Pioneers travelling to Vietnam -
            real local support, real destinations and a clear way to contact us.
          </p>

          <div className="collabImageWrapV6">
            <img
              src="/pi-network/govietstay-pi-handshake.webp"
              alt="GoVietStay and Pi Pioneer community travel concept"
            />
          </div>

          <div className="contactGridV6">
            <a
              className="contactCardV6 waV6"
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contactIconV6">WA</span>
              <span className="contactTextV6">
                <b>WhatsApp 24/7</b>
                <small>Claim PI10 - talk to GoVietStay</small>
              </span>
              <span className="contactArrowV6">-&gt;</span>
            </a>

            <a
              className="contactCardV6 tgV6"
              href={telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contactIconV6">TG</span>
              <span className="contactTextV6">
                <b>Telegram</b>
                <small>Open @govietstay_travel_bot</small>
              </span>
              <span className="contactArrowV6">-&gt;</span>
            </a>

            <a
              className="contactCardV6 grV6"
              href={googleReviews}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contactIconV6">G</span>
              <span className="contactTextV6">
                <b>Google Reviews</b>
                <small>Verify GoVietStay before booking</small>
              </span>
              <span className="contactArrowV6">-&gt;</span>
            </a>
          </div>

          <p className="independentNoteV6">
            Independent GoVietStay community page for Pi Pioneers. This page and
            visual do not imply official endorsement, sponsorship or partnership
            by Pi Network or the Pi Core Team.
          </p>
        </div>
      </section>

      <section id="pioneer-gift" className="giftV6">
        <div className="shellV6 giftGridV6">
          <div>
            <span className="sectionLabelV6 darkLabelV6">A GIFT TO THE COMMUNITY</span>
            <h2>
              ANY PIONEER.
              <br />
              ANY COUNTRY.
              <br />
              <b>10% OFF.</b>
            </h2>
          </div>

          <div className="giftCardV6">
            <span className="piCodeV6">CODE: PI10</span>
            <h3>10% Pioneer Welcome</h3>
            <p>
              If you are a Pi Pioneer travelling to Vietnam, GoVietStay welcomes
              you with 10% off eligible bookings - wherever in the world you come from.
            </p>

            <div className="stepsV6">
              <div><span>01</span><b>Tell us you are a Pi Pioneer.</b></div>
              <div><span>02</span><b>Send dates, guests and hotel.</b></div>
              <div><span>03</span><b>Use PI10 when we confirm the booking.</b></div>
            </div>

            <a className="primaryV6 fullV6" href={whatsapp} target="_blank" rel="noreferrer">
              Claim my Pioneer 10%
            </a>

            <small className="giftLegalV6">
              Service availability and booking conditions apply. This is a
              GoVietStay travel promotion, not an investment or financial offer.
            </small>
          </div>
        </div>
      </section>

      <section id="journey" className="journeyV6 shellV6">
        <span className="sectionLabelV6">WHY THIS PAGE EXISTS</span>
        <h2>We did not build this page only because Pi is being discussed.</h2>
        <p className="journeyIntroV6">
          We built it because the journey matters to us.
        </p>

        <div className="journeyGridV6">
          <blockquote>
            "A digital community becomes powerful when it creates trust between real people."
          </blockquote>

          <div>
            <p>
              We stayed with Pi through uncertainty, waiting, debate and change.
              That experience shaped how we see technology: belief alone is not
              enough - utility has to reach everyday life.
            </p>
            <p>
              GoVietStay works in the physical world: airports, hotels, cars,
              boats, guides, families, restaurants and real journeys. Our
              contribution is simple - welcome Pioneers who come to Vietnam and
              connect the digital community with trusted local support.
            </p>
          </div>
        </div>
      </section>

      <section id="future" className="futureV6">
        <div className="shellV6">
          <span className="sectionLabelV6 lightLabelV6">THE FUTURE WE BELIEVE IN</span>
          <h2>
            From a phone screen
            <br />
            to <em>real places.</em>
          </h2>

          <p className="futureLeadV6">
            We hope digital communities become easier to connect with legitimate
            businesses and useful services around the world - travel, transport,
            food, experiences and everyday needs.
          </p>

          <div className="futureCardsV6">
            <article>
              <span>01</span>
              <h3>People first</h3>
              <p>Technology should make connection easier, not replace human trust.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Utility over hype</h3>
              <p>Real value grows when digital tools solve real everyday needs.</p>
            </article>
            <article>
              <span>03</span>
              <h3>More real-world doors</h3>
              <p>We hope more legitimate services can welcome Pi communities over time.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="vietnam" className="destinationsV6 shellV6">
        <div className="destinationHeadV6">
          <span className="sectionLabelV6">WELCOME TO VIETNAM</span>
          <h2>Your Pioneer journey can become a real journey here.</h2>
          <p>Every destination button below goes to an existing GoVietStay landing page.</p>
        </div>

        <div className="destinationGridV6">
          {destinations.map((d) => (
            <a className="destinationCardV6" href={d.href} key={d.city}>
              <span className="destinationCodeV6">{d.code}</span>
              <h3>{d.city}</h3>
              <h4>{d.title}</h4>
              <p>{d.copy}</p>
              <b>Open guide -&gt;</b>
            </a>
          ))}
        </div>
      </section>

      <section className="reviewsV6">
        <div className="shellV6">
          <div className="reviewsHeadV6">
            <div>
              <span className="sectionLabelV6 lightLabelV6">GOOGLE MAPS & REVIEWS</span>
              <h2>
                Do not just believe us.
                <br />
                <em>Verify GoVietStay.</em>
              </h2>
              <p>
                Read public reviews, traveler photos, business details and
                directions directly on Google Maps before booking.
              </p>
            </div>

            <a
              className="reviewButtonV6"
              href={googleReviews}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="starsV6">5 STARS</span>
              <b>Open Google Reviews</b>
            </a>
          </div>

          <div className="reviewGridV6">
            <article>
              <span>01</span>
              <h3>Real public feedback</h3>
              <p>Use Google Maps to check what travelers say before you pay.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Real photos</h3>
              <p>See traveler photos, business updates and local activity.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Verify first</h3>
              <p>Confirm GoVietStay, then message our local team directly.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="factsV6 shellV6">
        <span className="sectionLabelV6">OFFICIAL PI SOURCES</span>
        <h2>Belief is personal. Facts should still be verifiable.</h2>

        <div className="factGridV6">
          <a href="https://minepi.com/about/" target="_blank" rel="noreferrer">
            <b>Pi Network - About</b>
            <span>Official Pi Network overview</span>
          </a>
          <a href="https://minepi.com/blog/pi-day-2025/" target="_blank" rel="noreferrer">
            <b>Open Network utility</b>
            <span>Official Pi article on ecosystem utility</span>
          </a>
          <a href="https://minepi.com/pi-trademark-guidelines/" target="_blank" rel="noreferrer">
            <b>Trademark guidelines</b>
            <span>Official Pi trademark guidance</span>
          </a>
        </div>
      </section>

      <section className="closingV6">
        <div className="shellV6 closingInnerV6">
          <span className="sectionLabelV6 lightLabelV6">PI PIONEER TRAVELLING TO VIETNAM?</span>
          <h2>
            Welcome.
            <br />
            Your PI10 is waiting.
          </h2>
          <p>Send us your dates. We will help turn Vietnam into a real local experience.</p>

          <div className="closingButtonsV6">
            <a className="primaryV6" href={whatsapp} target="_blank" rel="noreferrer">
              WhatsApp GoVietStay
            </a>
            <a className="secondaryV6" href={telegram} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a className="secondaryV6" href={googleReviews} target="_blank" rel="noreferrer">
              Google Reviews
            </a>
          </div>

          <small className="finalLegalV6">
            GoVietStay is not Pi Network, the Pi Core Team or an official Pi
            representative. This page does not imply endorsement, sponsorship or
            affiliation by Pi Network. No price prediction, investment promise or
            financial advice is provided here.
          </small>
        </div>
      </section>

      <div className="dockV6" aria-label="GoVietStay contact shortcuts">
        <a className="dockBtnV6 dockWaV6" href={whatsapp} target="_blank" rel="noreferrer">
          <span>WA</span><b>WhatsApp</b>
        </a>
        <a className="dockBtnV6 dockTgV6" href={telegram} target="_blank" rel="noreferrer">
          <span>TG</span><b>Telegram</b>
        </a>
        <a className="dockBtnV6 dockGrV6" href={googleReviews} target="_blank" rel="noreferrer">
          <span>G</span><b>Reviews</b>
        </a>
      </div>

      <style>{`
        *{box-sizing:border-box}
        .piPageV6{
          --ink:#07130f;
          --green:#0b704b;
          --lime:#d8f28d;
          --gold:#e5bd62;
          --cream:#f7f4ea;
          --muted:#637168;
          background:#faf9f5;
          color:var(--ink);
          font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          overflow:hidden;
        }
        .shellV6{width:min(1180px,calc(100% - 40px));margin:0 auto}

        .heroV6{
          min-height:860px;
          position:relative;
          color:#fff;
          background:#06110c;
        }
        .heroImageV6{
          position:absolute;
          inset:0;
          background:url('/tour/phuquoc/tour-09-1.jpg') center 50%/cover no-repeat;
        }
        .heroShadeV6{
          position:absolute;
          inset:0;
          background:
            linear-gradient(90deg,rgba(3,15,10,.96) 0%,rgba(3,15,10,.82) 45%,rgba(3,15,10,.38) 76%,rgba(3,15,10,.55) 100%),
            linear-gradient(0deg,rgba(3,15,10,.7),transparent 50%);
        }
        .navV6{
          position:relative;
          z-index:4;
          min-height:94px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:20px;
          border-bottom:1px solid rgba(255,255,255,.17);
        }
        .brandV6{
          color:white;
          text-decoration:none;
          font-size:23px;
          font-weight:950;
          letter-spacing:-.8px;
        }
        .brandV6 span{
          display:block;
          margin-top:3px;
          font-size:9px;
          letter-spacing:1.6px;
          opacity:.63;
        }
        .navLinksV6{display:flex;gap:28px}
        .navLinksV6 a{color:#fff;text-decoration:none;font-size:13px;font-weight:800;opacity:.77}
        .navClaimV6{
          text-decoration:none;
          color:#06110c;
          background:var(--lime);
          padding:12px 17px;
          border-radius:999px;
          font-size:13px;
          font-weight:950;
        }
        .heroInnerV6{position:relative;z-index:3;padding:122px 0 95px}
        .heroEyebrowV6{
          display:flex;
          gap:14px;
          align-items:center;
          font-size:11px;
          letter-spacing:1.8px;
        }
        .heroEyebrowV6 b{color:var(--lime)}
        .heroEyebrowV6 span{opacity:.6}
        .heroV6 h1{
          max-width:1040px;
          margin:24px 0 30px;
          font-size:clamp(68px,8.6vw,116px);
          line-height:.9;
          letter-spacing:-5px;
        }
        .heroV6 h1 em{
          display:block;
          color:var(--gold);
          font-family:Georgia,serif;
          font-weight:400;
        }
        .heroLeadV6{
          max-width:720px;
          margin:0;
          font-size:21px;
          line-height:1.7;
          color:rgba(255,255,255,.82);
        }
        .heroActionsV6{display:flex;gap:12px;flex-wrap:wrap;margin-top:34px}
        .primaryV6,.secondaryV6{
          min-height:52px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          padding:14px 21px;
          border-radius:999px;
          text-decoration:none;
          font-size:15px;
          font-weight:950;
        }
        .primaryV6{background:var(--lime);color:#06110c}
        .secondaryV6{
          color:#fff;
          border:1px solid rgba(255,255,255,.32);
          background:rgba(255,255,255,.06);
        }
        .heroStatsV6{
          max-width:870px;
          display:grid;
          grid-template-columns:repeat(3,1fr);
          margin-top:70px;
          border-top:1px solid rgba(255,255,255,.2);
          border-bottom:1px solid rgba(255,255,255,.2);
        }
        .heroStatsV6 div{padding:20px 24px 20px 0}
        .heroStatsV6 strong{display:block;font-size:23px}
        .heroStatsV6 span{display:block;margin-top:5px;font-size:12px;opacity:.6}

        .collabV6{
          padding:105px 0 115px;
          background:
            radial-gradient(circle at 50% 0%,rgba(229,189,98,.2),transparent 34%),
            linear-gradient(180deg,#fffef9,#f4f0e4);
        }
        .collabInnerV6{text-align:center;display:flex;flex-direction:column;align-items:center}
        .sectionLabelV6{
          display:inline-block;
          color:#426254;
          font-size:11px;
          font-weight:950;
          letter-spacing:2px;
        }
        .officialLogoV6{
          width:clamp(210px,20vw,310px);
          height:auto;
          margin:28px auto 20px;
          filter:drop-shadow(0 20px 38px rgba(7,19,15,.2));
        }
        .collabV6 h2{
          max-width:1050px;
          margin:8px 0 22px;
          font-size:clamp(64px,8vw,108px);
          line-height:.9;
          letter-spacing:-5px;
        }
        .collabV6 h2 em{font-family:Georgia,serif;font-weight:400;color:var(--green)}
        .collabLeadV6{
          max-width:850px;
          margin:0 auto 40px;
          color:#526159;
          font-size:22px;
          line-height:1.65;
        }
        .collabImageWrapV6{
          width:min(1140px,100%);
          padding:12px;
          background:white;
          border:1px solid rgba(7,19,15,.08);
          border-radius:32px;
          box-shadow:0 30px 90px rgba(7,19,15,.13);
        }
        .collabImageWrapV6 img{display:block;width:100%;height:auto;border-radius:22px}
        .contactGridV6{
          width:min(1120px,100%);
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:15px;
          margin-top:34px;
        }
        .contactCardV6{
          min-height:100px;
          display:flex;
          align-items:center;
          gap:15px;
          padding:20px;
          border-radius:22px;
          text-decoration:none;
          color:var(--ink);
          border:1px solid rgba(7,19,15,.1);
          box-shadow:0 15px 38px rgba(7,19,15,.08);
          transition:.18s ease;
        }
        .contactCardV6:hover{transform:translateY(-4px);box-shadow:0 22px 52px rgba(7,19,15,.14)}
        .waV6{background:#e0f7e8}
        .tgV6{background:#e4f3ff}
        .grV6{background:#fff0c7}
        .contactIconV6{
          flex:0 0 52px;
          width:52px;
          height:52px;
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:50%;
          background:var(--ink);
          color:#fff;
          font-size:13px;
          font-weight:1000;
        }
        .contactTextV6{min-width:0;flex:1;text-align:left}
        .contactTextV6 b{display:block;font-size:20px}
        .contactTextV6 small{display:block;margin-top:5px;color:#637168;font-size:14px;line-height:1.4}
        .contactArrowV6{font-size:22px;font-weight:950}
        .independentNoteV6{max-width:920px;margin:22px auto 0;color:#78837e;font-size:12px;line-height:1.6}

        .giftV6{padding:100px 0;background:var(--gold)}
        .giftGridV6{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
        .darkLabelV6{color:#435447}
        .giftV6 h2{
          margin:18px 0 0;
          font-size:clamp(64px,7vw,96px);
          line-height:.87;
          letter-spacing:-5px;
        }
        .giftV6 h2 b{color:white}
        .giftCardV6{
          padding:38px;
          background:var(--ink);
          color:white;
          border-radius:30px;
          box-shadow:0 30px 80px rgba(55,37,2,.22);
        }
        .piCodeV6{
          display:inline-block;
          padding:8px 12px;
          border-radius:999px;
          border:1px solid rgba(216,242,141,.35);
          color:var(--lime);
          font-size:11px;
          font-weight:950;
          letter-spacing:1.3px;
        }
        .giftCardV6 h3{font-size:40px;letter-spacing:-1.5px;margin:22px 0 10px}
        .giftCardV6 p{font-size:17px;line-height:1.7;color:rgba(255,255,255,.72)}
        .stepsV6{margin:24px 0}
        .stepsV6 div{display:flex;gap:14px;padding:14px 0;border-top:1px solid rgba(255,255,255,.11)}
        .stepsV6 span{color:var(--lime);font-weight:950}
        .fullV6{width:100%}
        .giftLegalV6{display:block;margin-top:14px;color:rgba(255,255,255,.48);line-height:1.5}

        .journeyV6{padding:115px 0}
        .journeyV6>h2{
          max-width:900px;
          margin:17px 0 14px;
          font-size:clamp(54px,6vw,82px);
          line-height:.95;
          letter-spacing:-4px;
        }
        .journeyIntroV6{font-size:20px;color:var(--muted)}
        .journeyGridV6{display:grid;grid-template-columns:1fr 1fr;gap:70px;margin-top:65px}
        .journeyGridV6 blockquote{
          margin:0;
          color:var(--green);
          font-family:Georgia,serif;
          font-size:clamp(36px,4vw,56px);
          line-height:1.08;
        }
        .journeyGridV6 p{margin-top:0;font-size:18px;line-height:1.85;color:#526159}

        .futureV6{padding:120px 0;background:var(--ink);color:white}
        .lightLabelV6{color:var(--lime)}
        .futureV6 h2{
          max-width:1000px;
          margin:18px 0 28px;
          font-size:clamp(62px,8vw,108px);
          line-height:.88;
          letter-spacing:-6px;
        }
        .futureV6 h2 em{font-family:Georgia,serif;font-weight:400;color:var(--gold)}
        .futureLeadV6{max-width:800px;font-size:21px;line-height:1.7;color:rgba(255,255,255,.68)}
        .futureCardsV6{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:55px}
        .futureCardsV6 article{
          min-height:230px;
          padding:28px;
          border-radius:22px;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(255,255,255,.05);
        }
        .futureCardsV6 article>span{color:var(--lime);font-size:11px;font-weight:950}
        .futureCardsV6 h3{margin:38px 0 10px;font-size:25px}
        .futureCardsV6 p{margin:0;font-size:15px;line-height:1.6;color:rgba(255,255,255,.63)}

        .destinationsV6{padding:115px 0}
        .destinationHeadV6{max-width:880px}
        .destinationHeadV6 h2{
          margin:15px 0;
          font-size:clamp(54px,6.5vw,84px);
          line-height:.95;
          letter-spacing:-4px;
        }
        .destinationHeadV6 p{font-size:18px;color:var(--muted)}
        .destinationGridV6{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin-top:48px}
        .destinationCardV6{
          position:relative;
          min-height:330px;
          display:block;
          padding:30px;
          border-radius:23px;
          background:white;
          border:1px solid rgba(7,19,15,.1);
          text-decoration:none;
          color:var(--ink);
          transition:.18s ease;
        }
        .destinationCardV6:hover{transform:translateY(-4px);box-shadow:0 24px 58px rgba(7,19,15,.09)}
        .destinationCodeV6{position:absolute;right:25px;top:20px;color:#e0e5e1;font-size:46px;font-weight:950}
        .destinationCardV6 h3{margin:55px 0 5px;font-size:44px;letter-spacing:-2px}
        .destinationCardV6 h4{margin:0 0 10px;font-size:21px}
        .destinationCardV6 p{max-width:520px;font-size:16px;line-height:1.7;color:#66736c}
        .destinationCardV6 b{display:inline-block;margin-top:12px;color:var(--green)}

        .reviewsV6{padding:110px 0;background:#06110c;color:white}
        .reviewsHeadV6{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:end}
        .reviewsHeadV6 h2{
          max-width:900px;
          margin:16px 0;
          font-size:clamp(58px,7vw,92px);
          line-height:.91;
          letter-spacing:-4.5px;
        }
        .reviewsHeadV6 h2 em{font-family:Georgia,serif;font-weight:400;color:var(--gold)}
        .reviewsHeadV6 p{max-width:720px;margin:0;font-size:18px;line-height:1.65;color:rgba(255,255,255,.67)}
        .reviewButtonV6{
          min-width:270px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:7px;
          padding:21px 24px;
          border-radius:20px;
          background:var(--lime);
          color:var(--ink);
          text-decoration:none;
        }
        .starsV6{font-size:12px;letter-spacing:2px;font-weight:950;color:#6b5400}
        .reviewGridV6{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-top:52px}
        .reviewGridV6 article{
          min-height:210px;
          padding:28px;
          border-radius:22px;
          border:1px solid rgba(255,255,255,.13);
          background:rgba(255,255,255,.05);
        }
        .reviewGridV6 article>span{color:var(--lime);font-size:11px;font-weight:950}
        .reviewGridV6 h3{margin:34px 0 10px;font-size:25px}
        .reviewGridV6 p{margin:0;font-size:15px;line-height:1.6;color:rgba(255,255,255,.63)}

        .factsV6{padding:110px 0}
        .factsV6>h2{
          max-width:900px;
          margin:16px 0 42px;
          font-size:clamp(50px,6vw,76px);
          line-height:.96;
          letter-spacing:-4px;
        }
        .factGridV6{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}
        .factGridV6 a{
          min-height:130px;
          display:flex;
          flex-direction:column;
          justify-content:center;
          padding:24px;
          border-radius:20px;
          background:#eef0ea;
          border:1px solid #e1e5de;
          color:var(--ink);
          text-decoration:none;
        }
        .factGridV6 b{font-size:17px}
        .factGridV6 span{margin-top:8px;color:#67736c;font-size:14px}

        .closingV6{padding:105px 0 135px;background:var(--green);color:white}
        .closingInnerV6{text-align:center}
        .closingV6 h2{
          margin:18px 0 24px;
          font-size:clamp(62px,8vw,108px);
          line-height:.87;
          letter-spacing:-6px;
        }
        .closingV6 p{font-size:19px;color:rgba(255,255,255,.76)}
        .closingButtonsV6{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:30px}
        .finalLegalV6{
          display:block;
          max-width:900px;
          margin:55px auto 0;
          padding-top:25px;
          border-top:1px solid rgba(255,255,255,.18);
          color:rgba(255,255,255,.5);
          line-height:1.6;
        }

        .dockV6{
          position:fixed;
          z-index:9999;
          right:16px;
          bottom:16px;
          display:flex;
          flex-direction:column;
          gap:8px;
        }
        .dockBtnV6{
          min-width:156px;
          min-height:50px;
          display:flex;
          align-items:center;
          gap:9px;
          padding:10px 14px;
          border-radius:999px;
          text-decoration:none;
          color:var(--ink);
          box-shadow:0 12px 32px rgba(0,0,0,.18);
          border:1px solid rgba(255,255,255,.7);
        }
        .dockBtnV6 span{
          width:28px;
          height:28px;
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:50%;
          background:var(--ink);
          color:white;
          font-size:9px;
          font-weight:1000;
        }
        .dockWaV6{background:#dcf8e5}
        .dockTgV6{background:#e4f4ff}
        .dockGrV6{background:#fff1cb}

        @media(max-width:820px){
          .shellV6{width:min(100% - 28px,1180px)}
          .navLinksV6{display:none}
          .heroV6{min-height:810px}
          .heroInnerV6{padding:95px 0 70px}
          .heroV6 h1{font-size:58px;letter-spacing:-3px}
          .heroLeadV6{font-size:18px}
          .heroStatsV6{grid-template-columns:1fr;margin-top:48px}
          .heroStatsV6 div{border-top:1px solid rgba(255,255,255,.12)}
          .collabV6{padding:78px 0 88px}
          .officialLogoV6{width:205px}
          .collabV6 h2{font-size:58px;letter-spacing:-3px}
          .collabLeadV6{font-size:18px}
          .collabImageWrapV6{padding:7px;border-radius:21px}
          .contactGridV6,.giftGridV6,.journeyGridV6,.futureCardsV6,.destinationGridV6,.reviewGridV6,.factGridV6{grid-template-columns:1fr}
          .giftV6 h2{font-size:58px;letter-spacing:-3px}
          .giftCardV6{padding:27px}
          .journeyV6>h2,.destinationHeadV6 h2{font-size:56px;letter-spacing:-3px}
          .futureV6 h2,.closingV6 h2{font-size:60px;letter-spacing:-3px}
          .reviewsHeadV6{grid-template-columns:1fr}
          .reviewsHeadV6 h2{font-size:58px;letter-spacing:-3px}
          .reviewButtonV6{width:100%;min-width:0}
          .destinationCardV6{min-height:285px}
          .dockV6{
            left:7px;
            right:7px;
            bottom:7px;
            display:grid;
            grid-template-columns:repeat(3,minmax(0,1fr));
            gap:6px;
          }
          .dockBtnV6{min-width:0;justify-content:center;padding:8px 6px}
          .dockBtnV6 b{font-size:11px}
        }

        @media(max-width:520px){
          .heroV6 h1{font-size:52px;letter-spacing:-2.6px}
          .heroEyebrowV6 span{display:none}
          .heroActionsV6{flex-direction:column}
          .heroActionsV6 a{width:100%}
          .officialLogoV6{width:185px}
          .collabV6 h2{font-size:51px;letter-spacing:-2.6px}
          .collabLeadV6{font-size:17px}
          .contactTextV6 b{font-size:18px}
          .contactTextV6 small{font-size:13px}
          .giftV6 h2{font-size:53px}
          .futureV6 h2,.closingV6 h2{font-size:53px}
          .reviewsHeadV6 h2{font-size:51px}
          .destinationHeadV6 h2,.journeyV6>h2{font-size:50px}
        }
      `}</style>
    </main>
  );
}
