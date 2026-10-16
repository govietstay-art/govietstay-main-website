# Three concepts

Static prototypes in `public/travel-kit-concepts/`. They are not part of the Travel Kit routes. No feature from this folder is switched on in the product.

Tools: HTML, CSS, and a little JavaScript, screenshotted in headless Chrome. No Figma, no image generator, no third-party font request at view time. The limits are at the end.

## Fonts

Self-hosted, SIL Open Font License 1.1. Files are the Latin or Cyrillic subsets from the Fontsource 5.2.5 builds of these families. The pages do not call a font server. The shared license terms are in `public/travel-kit-concepts/fonts/OFL.txt`. Copyright lines differ by family: Fraunces (Undercase), IBM Plex Sans and IBM Plex Mono (IBM), Newsreader (Production Type).

| Family | Used in | Licence |
| --- | --- | --- |
| Fraunces (Undercase, OFL) | A, headlines | SIL OFL 1.1 |
| IBM Plex Sans, Latin and Cyrillic (IBM, OFL) | B | SIL OFL 1.1 |
| IBM Plex Mono (IBM, OFL) | C, slip labels | SIL OFL 1.1 |
| Newsreader (Production Type, OFL) | C and the index | SIL OFL 1.1 |

## Photographs

Only files already in the repo. No generated image is presented as a place.

| Concept | Files | Place |
| --- | --- | --- |
| A | `da-nang-golden-bridge`, `da-nang-marble-caves`, `da-nang-lady-buddha` (960 WebP) | Da Nang only, so the film does not pretend one city is three |
| B | None on the home. The clock is the picture. | A missing rain frame for Hue and Phu Quoc is said out loud |
| C | Golden Bridge, Hoi An covered bridge, Ngo Mon, as a captioned contact sheet | Each caption names the place. Phu Quoc is mentioned and not given a fake indoor photo |

Better photography would lift A’s evening (the Lady Buddha is one statue, not a street), C’s desk (a real, permitted picture of the local person, or none), and any Phu Quoc or Hue rain chapter. Those frames do not exist here, so they are not invented.

The logo file `public/brand/govietstay-official-logo.jpg` is used unchanged, on a white chip, and links to `https://govietstay.com`.

## How each one feels to a first-time visitor

**A. Cinematic.** Trust comes from the place being unmistakable, not from a badge. The imagery is the product for three seconds. Usefulness is one line under the title, easy because there is nothing else to rank. It does not look like a booking site. You would come back for the next still of the day you are actually having. The risk is mood: a beautiful bridge does not tell you the passport rule.

**B. Companion.** Trust comes from the clock being the phone’s real Indochina time, and from the screen refusing to invent weather. The imagery is almost absent, which is a choice: the useful object is the sentence that changes when you tap “Дождь” or “Экстренно”. Russian is the default so a long line has to wrap instead of being clipped. It does not look like a magazine or a tour grid. You would come back tomorrow morning because the sentence should be different. The risk is coldness.

**C. Concierge.** Trust is the point. The page is a letter, not a feed. There is no portrait, because a face we cannot name would be a lie. The eSIM gift is a slip: 5 GB a day for 10 days, no charge shown, WhatsApp `+84 937 762 607` only after a tap. The letter says a reply time is not promised, and that 113, 114 and 115 come first. You understand it as a desk. You come back because a person is the reason the brand exists. The risk is that stationery feels small if the photograph never gets to be large.

## Judgements a template would not make

- A does not put the headline on the photograph at desktop. The still is allowed to be only a still. Type sits on a black margin, like a title card beside a projection, not a caption burned into the image.
- A’s three stills are one city. Mixing Hoi An lanterns into a Da Nang film would be prettier and false.
- B does not show a weather number. A labelled fake “29°” would look live. The prototype shows a real clock and says the forecast is elsewhere.
- B’s emergency state tints the panel and does not become a red alarm graphic. Panic colouring is a costume.
- C refuses a concierge headshot and says so on the letter. The signature is the company.
- C’s urgent slip is labelled “Not a request”, so WhatsApp is not offered as the emergency path.
- None of the three keeps the current card grid, the same radius, or the bottom tab bar. Those were the things that made the working product forgettable.
- The signal yellow in B is used only for the active key, the clock colon, and focus. It is not a brand wash.
- The seal red in C is the margin rule and the slip label. It is not the background.

## Recommendation

This is a recommendation, not an instruction to build.

Keep C as the spine, because the brand line is trusted local support and the other two concepts do not put a person in the room. Use A’s full-bleed arrival still as the first second, then B’s single next sentence and the real clock. Retire the equal card grid.

Do not integrate any of this until one direction, or that hybrid, is chosen.

## Limits of the tools

The prototypes are HTML and CSS in a browser, not frames from a design application. There is no motion reel beyond the light transitions on the pages (still crossfade, slip lift, panel tint), and those stop under `prefers-reduced-motion`. Photography could not be recomposed beyond crops the browser already makes. No new pictures were generated.
