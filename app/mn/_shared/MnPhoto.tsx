import Image from "next/image";

// Reviewed Wikimedia Commons file-description pages on 2026-09-17.
// Use a Commons-generated 1280px thumbnail rather than hotlinking the full-size original.
// Photographs are not owned by GoVietStay. Keep author, source, license and display-crop notice visible.
type Photo = {
  file: string;
  author: string;
  alt: string;
  license: string;
  licenseUrl: string;
};

const byPlace: Record<string, Photo> = {
  daNang: {
    file: "Da nang dragon bridge.jpg",
    author: "Thangphan",
    alt: "Вьетнамын Дананг хотын Хан мөрөн дээрх Луу гүүрийн бодит зураг",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  hoiAn: {
    file: "Hoi An Ancient Town.jpg",
    author: "Andre Hospers",
    alt: "Вьетнамын Хой Ан хотын түүхэн хуучин гудамжны бодит зураг",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  hue: {
    file: "Ngo Mon Gate for entry to the Imperial Citadel, Hue (31654316702).jpg",
    author: "shankar s.",
    alt: "Хюэ хотын эзэн хааны цайзын Нго Мон хаалга",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  baNa: {
    file: "Golden Bridge at Ba Na Hills 20250718.jpg",
    author: "DvTor8303",
    alt: "Дананг хотын Ба На Хиллс дахь Алтан гүүрийн бодит зураг",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  phuQuoc: {
    file: "Phu Quoc beach Saigon Phu Quoc Resort and Spa.jpg",
    author: "Wikimedia Commons contributor",
    alt: "Фукуок арлын далайн эрэг, далай, элсний бодит зураг",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  grandWorld: {
    file: "2023-07-30 Grand World Phú Quốc 212320.jpg",
    author: "松岡明芳",
    alt: "Фукуокийн Grand World дахь Венец маягийн өнгөлөг суваг ба барилгууд",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  sunsetTown: {
    // Wikimedia Flickr review explicitly confirmed the license of this photograph in March 2023.
    file: "Kiss Bridge, Phu Quoc (52680380987).jpg",
    author: "Kevin Rutherford",
    alt: "Фукуокийн өмнөд хэсгийн Sunset Town дахь Kiss Bridge-ийн бодит зураг",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
};

function photoForSlug(slug: string): Photo {
  if (slug === "phu-quoc/grand-world") return byPlace.grandWorld;
  if (slug === "phu-quoc/sunset-town") return byPlace.sunsetTown;
  if (slug.startsWith("phu-quoc")) return byPlace.phuQuoc;
  if (slug.includes("ba-na-hills")) return byPlace.baNa;
  if (slug === "hue") return byPlace.hue;
  if (slug === "hoi-an" || slug.startsWith("central-vietnam")) return byPlace.hoiAn;
  if (slug.startsWith("da-nang")) return byPlace.daNang;
  return byPlace.hoiAn;
}

export default function MnPhoto({ slug }: { slug: string }) {
  const photo = photoForSlug(slug);
  const filePage = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(photo.file.replaceAll(" ", "_"))}`;
  const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(photo.file)}?width=1280`;

  return (
    <figure className="mx-auto mt-7 max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md sm:mt-10">
      <div className="relative aspect-[16/9] w-full bg-slate-200 sm:aspect-[21/9]">
        <Image
          src={imageUrl}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 94vw, 1152px"
          className="object-cover"
          loading="eager"
          unoptimized
        />
      </div>
      <figcaption className="px-4 py-3 text-[11px] leading-5 text-slate-600 sm:px-5">
        Бодит гэрэл зураг · © {photo.author} ·{" "}
        <a href={filePage} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-emerald-800">Wikimedia Commons эх зураг</a>
        {" · "}
        <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-emerald-800">{photo.license}</a>
        {" · "}1280px хувилбараар үзүүлсэн; дэлгэцийн харьцаанд тааруулан харагдах хүрээг тайрсан. GoVietStay энэ зургийг өөрийн бүтээл гэж мэдэгдэхгүй.
      </figcaption>
    </figure>
  );
}
