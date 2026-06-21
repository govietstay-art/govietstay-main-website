"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { secretGems } from "../data";
import type { SecretGem } from "../data";

type ExplorerPost = {
  id: string;
  name: string;
  country: string;
  message: string;
  image?: string;
  createdAt: string;
};

export default function SecretGemClient({ gem }: { gem: SecretGem }) {
  const [quest, setQuest] = useState(0);
  const [hint, setHint] = useState(false);
  const [reward, setReward] = useState(false);
  const [discovered, setDiscovered] = useState(false);
  const [wall, setWall] = useState<ExplorerPost[]>([]);
  const [form, setForm] = useState({ name: "", country: "", message: "" });
  const [imagePreview, setImagePreview] = useState<string>("");

  const completed = quest >= gem.quests.length;
  const xp = quest * 20;
  const currentQuest = gem.quests[Math.min(quest, gem.quests.length - 1)];
  const storageKey = `gvs-secret-${gem.slug}`;
  const wallKey = `gvs-wall-${gem.slug}`;

  useEffect(() => {
    const savedQuest = Number(localStorage.getItem(`${storageKey}-quest`) || "0");
    const savedDiscovered = localStorage.getItem(`${storageKey}-discovered`) === "yes";
    const savedWall = JSON.parse(localStorage.getItem(wallKey) || "[]") as ExplorerPost[];

    setQuest(Math.min(savedQuest, gem.quests.length));
    setDiscovered(savedDiscovered);
    setWall(savedWall);
  }, [gem.quests.length, storageKey, wallKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}-quest`, String(quest));
  }, [quest, storageKey]);

  const nextGem = useMemo(() => {
    const index = secretGems.findIndex((item) => item.slug === gem.slug);
    if (index === -1) return secretGems[0];
    return secretGems[(index + 1) % secretGems.length];
  }, [gem.slug]);

  function completeQuest() {
    if (completed) return;
    setReward(true);
    setHint(false);
    setTimeout(() => setQuest((v) => Math.min(v + 1, gem.quests.length)), 400);
    setTimeout(() => setReward(false), 1200);
  }

  function markDiscovered() {
    setDiscovered(true);
    localStorage.setItem(`${storageKey}-discovered`, "yes");
  }

  function handleImage(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result));
    reader.readAsDataURL(file);
  }

  function submitExplorerPost(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.country.trim()) return;

    const post: ExplorerPost = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      country: form.country.trim(),
      message: form.message.trim() || `I discovered ${gem.title} with GoVietStay.`,
      image: imagePreview,
      createdAt: new Date().toISOString(),
    };

    const next = [post, ...wall].slice(0, 12);
    setWall(next);
    localStorage.setItem(wallKey, JSON.stringify(next));

    const whatsappMessage = `
New GoVietStay Explorer 🌿

Hidden Gem: ${gem.title}
Badge: ${gem.badge}
Name: ${post.name}
Country: ${post.country}
Message: ${post.message}

Page: ${window.location.href}

Note: Guest uploaded a photo on Explorer Wall. Please ask them to send the photo here if needed.
`;

    const whatsappUrl = `https://wa.me/84937762607?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");

    setForm({ name: "", country: "", message: "" });
    setImagePreview("");
  }

  return (
    <main className="min-h-screen bg-[#03140f] text-white">
      {reward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="animate-bounce rounded-[2rem] bg-gradient-to-br from-emerald-300 to-yellow-300 px-10 py-8 text-center text-black shadow-2xl">
            <div className="text-7xl">✨</div>
            <h2 className="mt-2 text-4xl font-black">+20 XP</h2>
            <p className="font-bold">Quest Completed</p>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden px-3 py-5 md:px-10 md:py-8">
        <div className="absolute inset-0 opacity-15">
          <img src={gem.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#03140f]/90 to-[#03140f]" />

        <div className="relative mx-auto max-w-7xl">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <Link href="/secret" className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur">
              ← Secret Explorer
            </Link>

            <div className="rounded-2xl bg-emerald-400 px-5 py-3 text-center text-black shadow-[0_0_30px_rgba(52,211,153,0.55)]">
              <p className="text-xs font-bold">XP</p>
              <p className="text-2xl font-black">{xp}</p>
            </div>
          </header>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl md:rounded-[2.5rem]">
              <div className="relative overflow-hidden bg-black">
                <img
                  src={gem.image}
                  alt={gem.title}
                  className="h-auto w-full object-contain"
                />
                <div className="absolute left-3 top-3 rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-[#06251b] md:left-5 md:top-5 md:px-5 md:py-3 md:text-base">
                  Hidden Gem #{gem.number}
                </div>
              </div>

              <div className="p-5 md:p-6">
                <h1 className="text-4xl font-black leading-tight md:text-6xl">{gem.title}</h1>
                <p className="mt-2 text-base text-white/75 md:text-lg">{gem.subtitle}</p>

                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                  <Info label="Area" value={gem.area} />
                  <Info label="Best Time" value={gem.bestTime} />
                  <Info label="Difficulty" value={gem.difficulty} />
                  <Info label="Badge" value={gem.badge} />
                </div>
              </div>
            </div>

            <aside className="rounded-[1.8rem] border border-white/10 bg-[#092219]/95 p-4 shadow-2xl backdrop-blur-xl md:rounded-[2.5rem] md:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-300">Mission</p>
              <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">
                {completed ? "Badge unlocked" : currentQuest.title}
              </h2>
              <p className="mt-4 leading-relaxed text-white/70">{gem.story}</p>

              <div className="mt-6 flex gap-2">
                {gem.quests.map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 flex-1 rounded-full ${
                      i < quest ? "bg-emerald-400" : i === quest ? "bg-yellow-300" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-2 text-sm text-white/55">
                {quest}/{gem.quests.length} quests completed
              </p>

              {!completed ? (
                <div className="mt-6 rounded-[1.5rem] border border-emerald-300/30 bg-black/30 p-5 md:rounded-[2rem]">
                  <div className="text-5xl md:text-6xl">{currentQuest.icon}</div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
                    Active Quest #{quest + 1}
                  </p>
                  <h3 className="mt-1 text-2xl font-black md:text-3xl">{currentQuest.title}</h3>
                  <p className="mt-3 text-white/75">{currentQuest.task}</p>

                  {hint && (
                    <div className="mt-5 rounded-3xl bg-yellow-300/10 p-4">
                      <p className="text-sm font-bold text-yellow-200">💡 David Local Tip</p>
                      <p className="mt-1 text-sm text-white/80">{currentQuest.tip}</p>
                    </div>
                  )}

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <button onClick={() => setHint((v) => !v)} className="rounded-full border border-white/20 py-4 font-bold">
                      Reveal Tip
                    </button>
                    <button onClick={completeQuest} className="rounded-full bg-emerald-400 py-4 font-black text-black">
                      Complete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-[2rem] bg-gradient-to-br from-emerald-300 to-yellow-300 p-6 text-center text-black">
                  <div className="text-7xl">🏅</div>
                  <h3 className="mt-3 text-3xl font-black">{gem.badge}</h3>
                  <p className="font-bold">Badge Unlocked</p>
                </div>
              )}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a href={gem.mapUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-5 py-4 text-center font-black text-black">
                  Open Google Maps
                </a>
                <button onClick={markDiscovered} className="rounded-full bg-yellow-400 px-5 py-4 font-black text-[#06251b]">
                  I Discovered This Place
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-3 py-8 md:px-10 md:py-10 lg:grid-cols-3">
        <Panel title="Why people love this place" items={gem.why} />
        <Panel title="Local secrets" items={gem.localTips} />
        <Panel title="Perfect for" items={gem.perfectFor} />
      </section>

      {discovered && (
        <section className="mx-auto max-w-7xl px-3 pb-12 md:px-10">
          <div className="rounded-[1.8rem] border border-emerald-300/20 bg-white/10 p-5 backdrop-blur-xl md:rounded-[2.5rem] md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-300">Explorer Wall</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Share your discovery</h2>
            <p className="mt-3 max-w-3xl text-white/65">
              Submit your discovery to GoVietStay. Your message will open WhatsApp so our local team can review it.
            </p>

            <form onSubmit={submitExplorerPost} className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[1.5rem] bg-black/25 p-5 md:rounded-[2rem]">
                <label className="block text-sm font-bold text-white/70">Upload photo</label>
                <input type="file" accept="image/*" onChange={(e) => handleImage(e.target.files?.[0])} className="mt-3 w-full rounded-2xl bg-white/10 p-3 text-sm" />
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 aspect-video w-full rounded-2xl object-cover" />}
              </div>

              <div className="grid gap-3 rounded-[1.5rem] bg-black/25 p-5 md:rounded-[2rem]">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="rounded-2xl bg-white px-4 py-4 text-black outline-none" />
                <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Country" className="rounded-2xl bg-white px-4 py-4 text-black outline-none" />
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Short message" className="min-h-28 rounded-2xl bg-white px-4 py-4 text-black outline-none" />
                <button className="rounded-full bg-emerald-400 py-4 font-black text-black">Submit & Send to WhatsApp</button>
              </div>
            </form>

            {wall.length > 0 && (
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {wall.map((post) => (
                  <div key={post.id} className="overflow-hidden rounded-[2rem] bg-white text-[#06251b]">
                    {post.image && <img src={post.image} alt="Explorer" className="aspect-video w-full object-cover" />}
                    <div className="p-5">
                      <p className="font-black">
                        {post.name} • {post.country}
                      </p>
                      <p className="mt-2 text-sm text-[#06251b]/65">{post.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-3 pb-16 md:px-10">
        <Link href={`/secret/${nextGem.slug}`} className="block rounded-[1.8rem] bg-gradient-to-r from-emerald-300 to-yellow-300 p-6 text-[#06251b] md:rounded-[2.5rem] md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.25em]">Next secret card</p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">{nextGem.title} →</h2>
          <p className="mt-2 text-[#06251b]/70">{nextGem.subtitle}</p>
        </Link>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white/10 p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">{label}</p>
      <p className="mt-2 font-black text-white">{value}</p>
    </div>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
      <h3 className="text-2xl font-black">{title}</h3>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-white/75">
            <span className="text-emerald-300">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}