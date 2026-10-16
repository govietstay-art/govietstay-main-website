# Travel Kit image credits

The Today card uses seven photographs supplied by a GoVietStay customer, plus one photograph that was already in this repository. They are GoVietStay’s own customer-supplied photos, kept as atmosphere for the city and the sample day. No cartoon, no generated image, and no Unsplash or Pexels download was added.

The owner must confirm he has permission to use any photo that shows an identifiable person before this kit is public. One used frame does: the Japanese Covered Bridge shows a person from behind, in light clothing, walking toward the bridge. No face is in frame. If that permission is not certain, swap the landed Hoi An card for the rooftop still listed below. The Golden Bridge and Ngo Mon also have small distant figures. No face is the subject of any file.

Each new file is a WebP in `public/travel-kit/`, about 1200px on the long side of a 3:4 frame, saved from a fresh RGB image so EXIF, GPS, and XMP are not carried over. `next/image` builds the responsive sizes (`sizes` is a 390px column, quality 75, the quality this app allows). The card itself is 3:4, so a portrait landmark is not sliced into a short band. Fonts are the device’s own UI and serif faces.

| File | Card | What it shows | Source still |
| --- | --- | --- | --- |
| `public/travel-kit/da-nang-golden-bridge.webp` | Da Nang, just landed | Golden Bridge at Ba Na Hills, stone hands, mist. Distant figures only. | `01M51PN1E6P1F65C0Q6Z0YF3Z1.jpg` |
| `public/travel-kit/da-nang-marble-caves.webp` | Da Nang, rain | A Marble Mountains cavern, stone Buddha, light from the opening. | `01M51PN6WXGAHMMG4W3XAFN859.jpg` |
| `public/travel-kit/da-nang-lady-buddha.webp` | Da Nang, evening | Lady Buddha on a lotus, Son Tra, Da Nang. | `01M51PN0Y6XKBZ6CSHCK01FE4R.webp` |
| `public/travel-kit/hoi-an-covered-bridge.webp` | Hoi An, just landed | Japanese Covered Bridge, Hoi An, from the river. One person from behind, no face. Permission still to confirm. | `01M51PN1H4PSDS34MSMVK0Z095.jpg` |
| `public/travel-kit/hoi-an-tailor.webp` | Hoi An, rain | Wood-lined tailor workshop, garments, no one at the counter. | `01M51PN7H35C2K5N4513QNJW37.jpg` |
| `public/travel-kit/hoi-an-lantern-boats.webp` | Hoi An, evening | Lantern-lit wooden boats on the Hoi An river at blue hour. | `01M51PN26X1ETNPSD6BWBS94CT.jpg` |
| `public/travel-kit/hue-ngo-mon.webp` | Hue, all three sample days | Ngo Mon gate, Imperial City, Hue. Small figures at the base. | `01M51PN4RDW69CCARPRXW6PZBH.jpg` |
| `public/tour/phuquoc/partner-2026/pq-15.webp` | Phu Quoc, all three sample days | Pale sand and wooden boats. Already in the repo. None of the new stills is clearly Phu Quoc, so this file stays. | existing library |

The Hoi An rooftops still (`01M51PN1JE5SSQQFHFKYRZ4XHE.jpg`) is the strongest photo not used. It is clearly the old town and has no person. The landed slot went to the Japanese bridge because that landmark is recognisable on its own. Swap them if the owner prefers the empty roofs.

## Not used

| Source still | Why it stayed off the card |
| --- | --- |
| `01M51PN1JE5SSQQFHFKYRZ4XHE.jpg` | Hoi An rooftops. Strong, but the covered bridge already names Hoi An on the landed card. First alternate. |
| `01M51PN1H56KDGHXYWS2FP4AYA.jpg` | Yellow Hoi An alley. A person in a conical hat, seen from behind, fills the frame. |
| `01M51PN5HVCQ29QKQ1ZCQYEWBS.jpg` | My Khe. A posed figure in a blue dress is the subject. Da Nang is already covered by the bridge, the caves, and the Lady Buddha. |
| `01M51PN5K9EMNC0NFATYZ91KZX.jpg` | Clear turquoise shallows and a person from behind. The place is not a landmark that can be named. Not labelled Phu Quoc. |
| `01M51PN63ASDYZGKVWVHY2PJNA.jpg` | Hoi An river at sunset. Same idea as the lantern boats, with a person large in the foreground. |
| `01M51PN6XJKAP5YKSVR6TJXV4T.jpg` | Hoi An lantern street. Same evening as the boats, with two people walking away. The boats have the lanterns and no one close. |
| `01M51PN69QR7YF5H2XTPGA6W6J.jpg` | A woman lying on sand with a conch, face visible. Fashion pose, not a place card. |
| `01M51PN6W418DJDR7X8QG6QKFH.jpg` | Beach framed as a person’s legs. Awkward crop, and the place is not clear. |

Video files in the same folder were ignored. Older repo files (`public/tour/marble.jpg`, `public/tour/hoian.jpg`, `public/tour/hue.jpg`, and the Hoi An ancient-house interior) are no longer on this card.
