# Travel Kit image credits

These photographs are already in the GoVietStay repository. They are used as atmosphere on the Today card. No cartoon illustration and no generated image is used. The owner should confirm that GoVietStay can keep using each file, and can swap any of them for a tighter library later.

The Today card loads one image at a time through `next/image` (`sizes` aimed at a 390px column, quality 70). The hero is requested with priority because it is the first screen. There are no other images on Home, so there is nothing further to lazy-load.

| File | City / moment | What it shows |
| --- | --- | --- |
| `public/tour/marble.jpg` | Da Nang, all sample days | Marble Mountains, limestone above the water |
| `public/tour/hoi-an-coconut-forest/gallery/hoi-an-ancient-house.webp` | Hoi An, landed and rain | Interior of an old wooden house |
| `public/tour/hoian.jpg` | Hoi An, evening | Lanterns over a street in the old town |
| `public/tour/hue.jpg` | Hue, all sample days | A gate of the Imperial City |
| `public/tour/phuquoc/partner-2026/pq-15.webp` | Phu Quoc, all sample days | Beach and wooden boats |

Files with promotional text burned into the picture (for example `public/partner-assets/hero-danang-pavel-standard.jpg` and `public/phu-quoc/ru-cluster/hero-sunset.png`) were not used.

No Unsplash, Pexels, or other third-party download was added. Fonts are the device’s own UI and serif faces, so the page does not request a font file.
