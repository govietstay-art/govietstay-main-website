# Why the current Travel Kit does not stay in the mind

The product on PR #80 is competent. A visitor can change city, open a guide, check a list, and reach a person on WhatsApp. The failure is not the function. The failure is that nothing in the picture is only GoVietStay.

## What a visitor actually sees

The first screen is a beige column of equal-weight blocks: a kicker, a serif headline, a paragraph, a green pill, then a photograph squeezed into a rounded rectangle, then more cards. At desktop width the same blocks are rearranged into a sidebar and a grid. The layout system never changes. It only gains columns.

That is the look of a well-built settings app wearing a travel headline. An international visitor has seen this exact rhythm on banks, clinics, and SaaS onboarding. Nothing asks them to stop.

## The specific misses

**Hierarchy.** Every section uses the same kicker, the same title size, the same card. “Just landed” and “Packing list” occupy the same visual rank. The eye has no place it is forced to land.

**Photography.** The pictures are real and correctly matched, which is rare and valuable. The design then treats them as card backgrounds. A 3:4 crop with a 22px radius and a soft shadow turns the Golden Bridge, Ngo Mon, and the covered bridge into the same component. The place never gets to be the architecture of the page.

**Typography.** System UI plus Georgia is a fallback pair, not a voice. Georgia is asked to carry every headline, so it stops meaning anything. There is no scale that feels authored: 13px kicker, 17px body, 34px title, repeated.

**Rhythm.** Spacing is even. Cards are the same radius, the same border, the same padding. Evenness is tidy. It is also how a page refuses to have a pause, a shout, or a margin that means something.

**No signature moment.** The honest sentence (“the next useful step”) is the right idea and the wrong staging. It sits above a button, like a feature announcement. There is no frame where the city, the hour, and one action are the whole screen.

**Brand voice.** “Trusted local support” is set as a subtitle under the logo. The logo itself sits in a white chip because the file has a white ground. The chip is a fix, not an idea. The support control is a green bar. Nothing on the page behaves like a person who knows the city.

**App chrome.** The bottom bar (Home, Explore, Tools, My trip) is the correct information architecture and a borrowed silhouette. It makes the kit feel like a category, not like this company.

## What was studied, and not copied

The useful patterns are structural:

- A flight instrument (the Flighty kind of product) puts one status in huge type and lets everything else be secondary. The lesson is rank, not the dark aeroplane aesthetic.
- A city-navigation app puts one decision on the glass: leave now, this way. The lesson is a single next action.
- A travel magazine (the Cereal / Monocle kind of page) lets a photograph be the wall, and type sit in a margin. The lesson is composition, not a lifestyle filter.
- A hotel desk puts a note and a tray of requests on a surface, and does not pretend the desk is a feed. The lesson is that a human service has a physical metaphor. It does not need a fake face.

None of those products is GoVietStay. Copying the dark UI, the magazine crop, or the hotel marble would be a costume.

## The ground to design from

GoVietStay’s own line is “Trusted local support.” The visitor is already in Vietnam, or about to be. The photographs already name real places. The useful act is small: an address, a phrase, a number, a person on WhatsApp after the visitor presses send.

A memorable kit would make one of those acts impossible to confuse with a tour brochure or a card grid. The three prototypes in `public/travel-kit-concepts/` try three different ways, and they are not skins of the current screen.
