"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";

const journeyTours = [
  {
    number: "1",
    title: "Ba Na Hills",
    subtitle: "Golden Bridge",
    image: "/tour/bana.jpg",
    badge: "Golden Bridge Explorer",
  },
  {
    number: "2",
    title: "Hoi An",
    subtitle: "Ancient Town",
    image: "/tour/hoian.jpg",
    badge: "Hoi An Story Keeper",
  },
  {
    number: "3",
    title: "Hue",
    subtitle: "Imperial City",
    image: "/tour/hue.jpg",
    badge: "Hue Heritage Explorer",
  },
  {
    number: "4",
    title: "Marble Mountains",
    subtitle: "Caves & Pagodas",
    image: "/tour/marble.jpg",
    badge: "Marble Adventurer",
  },
  {
    number: "5",
    title: "Son Tra Peninsula",
    subtitle: "Lady Buddha View",
    image: "/tour/marble.jpg",
    badge: "Son Tra Explorer",
  },
  {
    number: "6",
    title: "Coconut Forest",
    subtitle: "Basket Boat",
    image: "/tour/coconut.jpg",
    badge: "Coconut Forest Rider",
  },
  {
    number: "7",
    title: "Cham Island",
    subtitle: "Snorkeling Day",
    image: "/tour/cham.jpg",
    badge: "Island Discoverer",
  },
  {
    number: "8",
    title: "Hai Van Pass",
    subtitle: "Ocean Road",
    image: "/tour/haivan.jpg",
    badge: "Hai Van Pass Rider",
  },
  {
    number: "9",
    title: "Da Nang Food",
    subtitle: "Local Taste",
    image: "/tour/food.jpg",
    badge: "Food Explorer",
  },
  {
    number: "10",
    title: "Omakase Experience",
    subtitle: "Your Secret Day",
    image: "/tour/omakase.jpg",
    badge: "GoVietStay Insider",
  },
];

const GVSLogo = ({ className = "" }: { className?: string }) => (
  <img
    src="/ar-assets/logo.webp"
    alt="GoVietStay"
    className={className}
    onError={(event) => {
      const image = event.currentTarget;
      if (!image.src.endsWith("/logo.jpg")) image.src = "/logo.jpg";
    }}
  />
);

type JourneyForm = {
  todayDate: string;
  todayPlace: string;
  todayActivity: string;
  todayMoment: string;
  todayMood: string;
  foodName: string;
  foodPlace: string;
  foodRating: string;
  eatAgain: string;
  dailyNotes: string;
  memoryOne: string;
  memoryTwo: string;
  memoryThree: string;
  favoritePhoto: string;
};

const emptyJourneyForm: JourneyForm = {
  todayDate: "",
  todayPlace: "",
  todayActivity: "",
  todayMoment: "",
  todayMood: "",
  foodName: "",
  foodPlace: "",
  foodRating: "",
  eatAgain: "",
  dailyNotes: "",
  memoryOne: "",
  memoryTwo: "",
  memoryThree: "",
  favoritePhoto: "",
};

const JOURNEY_STORAGE_KEY = "govietstay-my-vietnam-journey-v1";

const googleReviewLink = "https://maps.app.goo.gl/znWBmL8zPKEJqnoW6?g_st=ic";

/** Loaded only after the guest chooses to open the private travel journal. */
export default function JourneyModal({onClose}:{onClose:()=>void}) {
  const [journeyForm, setJourneyForm] = useState<JourneyForm>(emptyJourneyForm);
  const [completedJourneyTours, setCompletedJourneyTours] = useState<string[]>(
    [],
  );
  const [journeySavedAt, setJourneySavedAt] = useState<string>("");
  const [journeyReady,setJourneyReady] = useState(false);

  const updateJourneyField = (field: keyof JourneyForm, value: string) => {
    setJourneyForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleJourneyTour = (number: string) => {
    setCompletedJourneyTours((prev) =>
      prev.includes(number)
        ? prev.filter((item) => item !== number)
        : [...prev, number],
    );
  };

  const saveJourneyToPhone = () => {
    const savedAt = new Date().toLocaleString();
    localStorage.setItem(
      JOURNEY_STORAGE_KEY,
      JSON.stringify({
        form: journeyForm,
        completedTours: completedJourneyTours,
        savedAt,
      }),
    );
    setJourneySavedAt(savedAt);
  };

  const handleFavoritePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateJourneyField("favoritePhoto", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const downloadJourneyToDevice = () => {
    const completedNames = journeyTours
      .filter((tour) => completedJourneyTours.includes(tour.number))
      .map((tour) => `${tour.number}. ${tour.title} - ${tour.subtitle}`)
      .join("\n");

    const content =
      `MY VIETNAM JOURNEY - GoVietStay\n\n` +
      `Date: ${journeyForm.todayDate || ""}\n` +
      `Place visited: ${journeyForm.todayPlace || ""}\n` +
      `What I did: ${journeyForm.todayActivity || ""}\n` +
      `Best moment: ${journeyForm.todayMoment || ""}\n` +
      `Mood: ${journeyForm.todayMood || ""}\n\n` +
      `Best food: ${journeyForm.foodName || ""}\n` +
      `Where I tried it: ${journeyForm.foodPlace || ""}\n` +
      `Food rating: ${journeyForm.foodRating || ""}/5\n` +
      `Would eat again: ${journeyForm.eatAgain || ""}\n\n` +
      `Tours completed:\n${completedNames || "Not selected yet"}\n\n` +
      `Daily notes:\n${journeyForm.dailyNotes || ""}\n\n` +
      `Memory highlights:\n1. ${journeyForm.memoryOne || ""}\n2. ${journeyForm.memoryTwo || ""}\n3. ${journeyForm.memoryThree || ""}\n\n` +
      `Created with love by GoVietStay\nWebsite: GoVietStay.com\nWhatsApp: +84 937 762 607\nReview: ${googleReviewLink}\n`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-vietnam-journey-govietstay.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    try {
      const savedJourney = localStorage.getItem(JOURNEY_STORAGE_KEY);
      if (!savedJourney) return;

      const parsed = JSON.parse(savedJourney) as {
        form?: JourneyForm;
        completedTours?: string[];
        savedAt?: string;
      };

      if (parsed.form) setJourneyForm({ ...emptyJourneyForm, ...parsed.form });
      if (Array.isArray(parsed.completedTours))
        setCompletedJourneyTours(parsed.completedTours);
      if (parsed.savedAt) setJourneySavedAt(parsed.savedAt);
    } catch {
      // Keep the journal empty if the saved browser data is unavailable.
    } finally {
      setJourneyReady(true);
    }
  }, []);

  useEffect(() => {
    if (!journeyReady) return;
    try {
      localStorage.setItem(
        JOURNEY_STORAGE_KEY,
        JSON.stringify({
          form: journeyForm,
          completedTours: completedJourneyTours,
          savedAt: journeySavedAt,
        }),
      );
    } catch {
      // Some browsers may block storage or reject very large images.
    }
  }, [journeyReady, journeyForm, completedJourneyTours, journeySavedAt]);


  return (

        <div className="gvs-overlay fixed inset-0 z-[80] bg-[#04150f]/88 p-2 text-[#073c2c] backdrop-blur-md sm:p-4 md:p-8">
          <div className="gvs-panel mx-auto flex max-h-[94vh] max-w-7xl flex-col overflow-hidden rounded-[1.6rem] border border-white/20 bg-[#efe3c8] shadow-2xl sm:rounded-[2rem]">
            <div className="flex items-center justify-between gap-3 border-b border-[#073c2c]/10 bg-[#fff8e8] px-4 py-2.5 md:px-7 md:py-4">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[3px] text-[#b96a2d] sm:text-[10px] sm:tracking-[4px]">
                  Private memory book
                </p>
                <h3 className="font-serif text-[1.65rem] font-black italic leading-tight text-[#06432f] md:text-4xl">
                  My Vietnam Journey
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onClose()}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#06432f] text-lg text-white shadow-lg transition hover:scale-105 md:h-11 md:w-11 md:text-xl"
                aria-label="Close My Vietnam Journey"
              >
                ×
              </button>
            </div>

            <div className="gvs-no-scrollbar overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(217,118,45,0.16),transparent_34%),linear-gradient(135deg,#f7edd5,#ead9b8)] p-2.5 md:p-7">
              <div className="grid gap-4 xl:grid-cols-[0.86fr_1.14fr] xl:gap-5">
                <article className="relative overflow-hidden rounded-[1.5rem] border border-[#5e3b1f]/15 bg-[#fff8e8] p-2 shadow-2xl shadow-[#073c2c]/15 sm:rounded-[2rem] sm:p-3">
                  <div className="relative min-h-[580px] overflow-hidden rounded-[1.3rem] bg-[#f6e8c9] sm:min-h-[680px] sm:rounded-[1.6rem]">
                    <Image
                      src="/ar-assets/hero-hoian.webp"
                      alt="My Vietnam Journey cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={75}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#fff8e8]/78 via-[#fff8e8]/38 to-[#05291d]/95" />
                    <div className="absolute inset-0 bg-black/10 sm:bg-black/5" />
                    <div className="absolute left-4 right-[5.2rem] top-4 z-10 sm:left-5 sm:right-[6.5rem] sm:top-5">
                      <div className="inline-flex max-w-full flex-col rounded-2xl bg-[#fff8e8]/94 px-3.5 py-2.5 text-left shadow-lg backdrop-blur sm:rounded-full sm:px-5 sm:py-3">
                        <span className="whitespace-nowrap text-[8px] font-black uppercase leading-none tracking-[2px] text-[#06432f] sm:text-[9px] sm:tracking-[3px]">
                          Da Nang • Hoi An • Hue
                        </span>
                        <span className="mt-1 text-[7.5px] font-black uppercase leading-none tracking-[2px] text-[#b96a2d] sm:text-[8.5px] sm:tracking-[3px]">
                          A small gift from GoVietStay
                        </span>
                      </div>
                    </div>
                    <div className="absolute right-4 top-4 z-20 grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border-4 border-white/80 bg-[#fff8e8] shadow-xl sm:right-5 sm:top-5 sm:h-[4.6rem] sm:w-[4.6rem]">
                      <GVSLogo className="h-full w-full object-contain p-1.5" />
                    </div>

                    <div className="absolute inset-x-5 top-[39%] -translate-y-1/2 text-center sm:inset-x-7 sm:top-[39%]">
                      <h4 className="mx-auto max-w-[18rem] font-serif text-[2.65rem] font-black italic leading-[0.9] tracking-tight text-[#06432f] drop-shadow-sm sm:max-w-[25rem] sm:text-[4.2rem] md:text-[4.9rem]">
                        My Vietnam
                        <br />
                        Journey
                      </h4>
                      <div className="mx-auto mt-4 h-px w-20 bg-[#d9762d]/85 sm:mt-5 sm:w-28" />
                      <p className="mx-auto mt-4 max-w-[16rem] rounded-2xl border border-white/35 bg-[#fff8e8]/62 px-4 py-3 font-serif text-[1.1rem] italic leading-snug text-[#9f4f1f] shadow-sm backdrop-blur-[3px] sm:max-w-[18rem] sm:text-[1.45rem]">
                        Your adventure.<br />
                        Your story.<br />
                        Your memories.
                      </p>
                    </div>

                    <div className="absolute inset-x-4 bottom-4 rounded-[1.3rem] border border-white/30 bg-[#05291d]/90 p-4 text-center text-white shadow-2xl backdrop-blur sm:inset-x-5 sm:bottom-5 sm:rounded-[1.5rem] sm:p-5">
                      <p className="font-serif text-[1.35rem] italic leading-snug sm:text-xl">
                        Some trips are measured in kilometers.
                      </p>
                      <p className="mt-1 text-xs text-white/75 sm:text-sm">
                        The best ones are measured in memories.
                      </p>
                    </div>
                  </div>
                </article>

                <div className="grid gap-5">
                  <article className="overflow-hidden rounded-[2rem] border border-[#073c2c]/10 bg-[#fff8e8] shadow-xl">
                    <div className="border-b border-[#073c2c]/10 bg-[#06432f] px-5 py-4 text-white md:px-6">
                      <p className="text-[10px] font-black uppercase tracking-[4px] text-[#f7c982]">
                        Travel collection
                      </p>
                      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <h4 className="font-serif text-3xl font-black italic md:text-4xl">
                            Places I carried home
                          </h4>
                          <p className="mt-1 text-sm text-white/70">
                            Tick the memories, not the tasks.
                          </p>
                        </div>
                        <div className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black">
                          {completedJourneyTours.length}/10 memories
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 p-4 md:grid-cols-2 md:p-5">
                      {journeyTours.map((tour) => {
                        const completed = completedJourneyTours.includes(
                          tour.number,
                        );
                        return (
                          <button
                            key={tour.number}
                            type="button"
                            onClick={() => toggleJourneyTour(tour.number)}
                            className={`group relative overflow-hidden rounded-[1.4rem] border p-3 text-left transition hover:-translate-y-1 ${
                              completed
                                ? "border-[#06432f] bg-[#06432f] text-white shadow-lg shadow-[#06432f]/20"
                                : "border-[#073c2c]/10 bg-[#fbf0d6] text-[#073c2c]"
                            }`}
                          >
                            <div className="flex gap-3">
                              <div className="relative h-20 w-20 shrink-0 rotate-[-2deg] overflow-hidden rounded-xl border-4 border-white bg-white shadow-md">
                                <Image
                                  src={tour.image}
                                  alt={tour.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={`grid h-7 w-7 place-items-center rounded-full text-xs font-black ${completed ? "bg-[#d9762d] text-white" : "bg-white text-[#06432f]"}`}
                                  >
                                    {completed ? "✓" : tour.number}
                                  </span>
                                  <span
                                    className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[2px] ${completed ? "bg-white/15 text-white" : "bg-[#06432f]/10 text-[#06432f]"}`}
                                  >
                                    stamp
                                  </span>
                                </div>
                                <p className="mt-2 font-serif text-lg font-black italic leading-tight">
                                  {tour.title}
                                </p>
                                <p
                                  className={`mt-1 text-xs ${completed ? "text-white/70" : "text-[#073c2c]/55"}`}
                                >
                                  {tour.subtitle}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </article>

                  <div className="grid gap-5 lg:grid-cols-2">
                    <article className="rounded-[2rem] border border-[#073c2c]/10 bg-[#fff8e8] p-5 shadow-xl md:p-6">
                      <p className="text-[10px] font-black uppercase tracking-[4px] text-[#b96a2d]">
                        Diary page
                      </p>
                      <h4 className="mt-2 font-serif text-3xl font-black italic text-[#06432f]">
                        Today I want to remember...
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-[#073c2c]/65">
                        Keep it simple. One place, one feeling, one moment.
                      </p>

                      <div className="mt-5 space-y-4 text-sm">
                        <label className="block font-bold text-[#06432f]">
                          Date
                          <input
                            type="date"
                            value={journeyForm.todayDate}
                            onChange={(event) =>
                              updateJourneyField(
                                "todayDate",
                                event.target.value,
                              )
                            }
                            className="mt-2 w-full rounded-2xl border border-[#073c2c]/10 bg-[#fbf0d6] px-4 py-3 outline-none"
                          />
                        </label>

                        <label className="block font-bold text-[#06432f]">
                          Today I visited
                          <input
                            value={journeyForm.todayPlace}
                            onChange={(event) =>
                              updateJourneyField(
                                "todayPlace",
                                event.target.value,
                              )
                            }
                            placeholder="Ba Na Hills, Hoi An, Hue..."
                            className="mt-2 w-full rounded-2xl border border-[#073c2c]/10 bg-[#fbf0d6] px-4 py-3 outline-none"
                          />
                        </label>

                        <label className="block font-bold text-[#06432f]">
                          My favorite moment
                          <textarea
                            value={journeyForm.todayMoment}
                            onChange={(event) =>
                              updateJourneyField(
                                "todayMoment",
                                event.target.value,
                              )
                            }
                            rows={4}
                            placeholder="A smile, a sunset, a meal, a road, a person..."
                            className="mt-2 w-full resize-none rounded-2xl border border-[#073c2c]/10 bg-[repeating-linear-gradient(to_bottom,#fbf0d6_0px,#fbf0d6_34px,rgba(7,60,44,0.18)_35px)] px-4 py-3 leading-[35px] outline-none"
                          />
                        </label>

                        <div>
                          <p className="font-bold text-[#06432f]">
                            My feeling today
                          </p>
                          <div className="mt-2 grid grid-cols-5 gap-2">
                            {[
                              ["Amazing", "😍"],
                              ["Happy", "😊"],
                              ["Peaceful", "🌿"],
                              ["Touched", "🥹"],
                              ["Tired", "😴"],
                            ].map(([mood, icon]) => (
                              <button
                                key={mood}
                                type="button"
                                onClick={() =>
                                  updateJourneyField("todayMood", mood)
                                }
                                className={`rounded-2xl border px-1 py-3 text-[10px] transition ${
                                  journeyForm.todayMood === mood
                                    ? "border-[#06432f] bg-[#06432f] text-white"
                                    : "border-[#073c2c]/10 bg-[#fbf0d6] text-[#073c2c]"
                                }`}
                              >
                                <span className="block text-xl">{icon}</span>
                                {mood}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>

                    <article className="rounded-[2rem] border border-[#073c2c]/10 bg-[#fff8e8] p-5 shadow-xl md:p-6">
                      <p className="text-[10px] font-black uppercase tracking-[4px] text-[#b96a2d]">
                        Food memory
                      </p>
                      <h4 className="mt-2 font-serif text-3xl font-black italic text-[#06432f]">
                        A taste I will miss
                      </h4>

                      <div className="mt-5 space-y-4 text-sm">
                        <label className="block font-bold text-[#06432f]">
                          Best food today
                          <input
                            value={journeyForm.foodName}
                            onChange={(event) =>
                              updateJourneyField("foodName", event.target.value)
                            }
                            placeholder="Mi Quang, Cao Lau, Bun Bo Hue..."
                            className="mt-2 w-full rounded-2xl border border-[#073c2c]/10 bg-[#fbf0d6] px-4 py-3 outline-none"
                          />
                        </label>
                        <label className="block font-bold text-[#06432f]">
                          Where I tried it
                          <input
                            value={journeyForm.foodPlace}
                            onChange={(event) =>
                              updateJourneyField(
                                "foodPlace",
                                event.target.value,
                              )
                            }
                            placeholder="A small local restaurant, a market, a family meal..."
                            className="mt-2 w-full rounded-2xl border border-[#073c2c]/10 bg-[#fbf0d6] px-4 py-3 outline-none"
                          />
                        </label>

                        <div>
                          <p className="font-bold text-[#06432f]">
                            How much did I love it?
                          </p>
                          <div className="mt-2 flex gap-1 text-3xl text-[#d9762d]">
                            {["1", "2", "3", "4", "5"].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() =>
                                  updateJourneyField("foodRating", rating)
                                }
                                aria-label={`Rate ${rating} stars`}
                              >
                                {Number(journeyForm.foodRating || 0) >=
                                Number(rating)
                                  ? "★"
                                  : "☆"}
                              </button>
                            ))}
                          </div>
                        </div>

                        <label className="block font-bold text-[#06432f]">
                          Favorite photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFavoritePhotoChange}
                            className="mt-2 w-full rounded-2xl border border-dashed border-[#073c2c]/25 bg-[#fbf0d6] px-4 py-4 text-xs"
                          />
                        </label>

                        {journeyForm.favoritePhoto ? (
                          <div className="rotate-[-1deg] rounded-2xl bg-white p-2 shadow-xl">
                            <img
                              src={journeyForm.favoritePhoto}
                              alt="Favorite travel memory"
                              className="h-48 w-full rounded-xl object-cover"
                            />
                            <p className="px-2 py-2 font-serif text-sm italic text-[#073c2c]/70">
                              My favorite Vietnam memory
                            </p>
                          </div>
                        ) : (
                          <div className="grid h-48 place-items-center rounded-2xl border border-dashed border-[#073c2c]/20 bg-[#fbf0d6] text-center text-sm font-bold text-[#073c2c]/45">
                            Add one photo you never want to forget
                          </div>
                        )}
                      </div>
                    </article>
                  </div>

                  <article className="rounded-[2rem] border border-[#073c2c]/10 bg-[#fff8e8] p-5 shadow-xl md:p-6">
                    <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[4px] text-[#b96a2d]">
                          Last page
                        </p>
                        <h4 className="mt-2 font-serif text-3xl font-black italic text-[#06432f]">
                          Before I leave Vietnam...
                        </h4>
                        <textarea
                          value={journeyForm.dailyNotes}
                          onChange={(event) =>
                            updateJourneyField("dailyNotes", event.target.value)
                          }
                          rows={7}
                          placeholder="One day I will leave Vietnam. But the memories, the smiles, the sunsets and the people I met will travel with me forever..."
                          className="mt-4 w-full resize-none rounded-2xl border border-[#073c2c]/10 bg-[repeating-linear-gradient(to_bottom,#fbf0d6_0px,#fbf0d6_34px,rgba(7,60,44,0.18)_35px)] px-4 py-3 leading-[35px] outline-none"
                        />
                      </div>

                      <div className="rounded-[1.5rem] bg-[#06432f] p-5 text-white">
                        <p className="font-serif text-2xl font-black italic">
                          Thank you for letting us be a small part of your
                          journey.
                        </p>
                        <p className="mt-3 text-sm leading-6 text-white/70">
                          This memory book is saved on your own phone.
                          GoVietStay only hopes you keep one warm feeling from
                          Vietnam.
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={saveJourneyToPhone}
                            className="rounded-full bg-white px-4 py-3 text-sm font-black text-[#06432f] shadow-lg"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={downloadJourneyToDevice}
                            className="rounded-full bg-[#d9762d] px-4 py-3 text-sm font-black text-white shadow-lg"
                          >
                            Download
                          </button>
                        </div>

                        {journeySavedAt ? (
                          <p className="mt-3 text-center text-xs font-bold text-white/75">
                            Saved: {journeySavedAt}
                          </p>
                        ) : null}

                        <a
                          href={googleReviewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 block rounded-2xl border border-white/20 bg-white/10 p-4 text-center text-sm font-bold text-white hover:bg-white/15"
                        >
                          ⭐ Write your GoVietStay memory on Google
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
