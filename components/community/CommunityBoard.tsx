"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { createClient, type User } from "@supabase/supabase-js";
import styles from "./CommunityBoard.module.css";

const url = process.env.NEXT_PUBLIC_GVS_COMMUNITY_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_GVS_COMMUNITY_SUPABASE_KEY;
const db = url && key ? createClient(url, key) : null;
const BUCKET = "gvs-community-images";
const PLACES = ["Da Nang", "Hoi An", "Hue", "Phu Quoc", "Other Vietnam"] as const;

type Post = {
  id: string;
  author_id: string;
  author_name: string;
  body: string;
  kind: "story" | "question";
  place: string | null;
  language: string;
  image_path: string | null;
  status: "pending" | "published" | "rejected";
  created_at: string;
};
type Comment = {
  id: string;
  post_id: string;
  author_id: string;
  author_name: string;
  body: string;
  status: "pending" | "published" | "rejected";
  created_at: string;
};
type Like = { post_id: string; user_id: string };
type Lang = "vi" | "en";
const copy = {
  vi: {
    title: "GoVietStay Stories", subtitle: "Người thật. Câu chuyện thật. Việt Nam thật.",
    eyebrow: "CỘNG ĐỒNG DU LỊCH VIỆT NAM", lead: "Mọi chuyến đi đều có một câu chuyện.",
    intro: "Viết vài dòng, chia sẻ một tấm ảnh hoặc hỏi điều bạn đang tò mò. Không cần viết hay. Cứ là chính mình.",
    compose: "Hôm nay bạn muốn chia sẻ điều gì?", question: "Bạn muốn hỏi mọi người điều gì?",
    stories: "Chia sẻ", questions: "Hỏi mọi người", all: "Tất cả", place: "Địa điểm (không bắt buộc)",
    name: "Tên hiển thị", photo: "Thêm ảnh", post: "Đăng bài", publish: "Gửi duyệt",
    pending: "Chờ duyệt", live: "Đã đăng", reply: "Bình luận", like: "Thích", share: "Chia sẻ",
    submitReply: "Gửi bình luận", replyHint: "Bạn muốn nói gì?", cancel: "Hủy", signIn: "Đăng nhập",
    signOut: "Đăng xuất", email: "Địa chỉ email", sendLink: "Gửi liên kết đăng nhập",
    emailHelp: "Bạn chỉ cần xác nhận email một lần. Bản nháp vẫn được giữ lại.",
    google: "Tiếp tục với Google", sent: "Hãy kiểm tra email và bấm vào liên kết đăng nhập.",
    postSuccess: "Đã gửi bài. Nội dung sẽ xuất hiện sau khi được duyệt.",
    replySuccess: "Đã gửi bình luận để kiểm duyệt.", approval: "Bài của thành viên mới sẽ được duyệt trước khi hiển thị công khai.",
    signed: "Đã đăng nhập", empty: "Chưa có câu chuyện nào. Hãy là người đầu tiên chia sẻ.",
    emptyFilter: "Không tìm thấy bài phù hợp với bộ lọc.",
    community: "Cộng đồng", back: "Xem tất cả bài viết", tips: "Gợi ý để bắt đầu",
    tip1: "Lần đầu đến Việt Nam, điều gì khiến bạn bất ngờ?", tip2: "Một món ăn mà bạn luôn nhớ",
    tip3: "Điều bạn muốn hỏi người địa phương", moderator: "Duyệt bài",
    adminTitle: "Quản lý bài viết và bình luận", adminDenied: "Tài khoản này chưa có quyền duyệt bài.",
    approve: "Duyệt", reject: "Từ chối", moderationEmpty: "Không có nội dung đang chờ duyệt.",
    setup: "Cộng đồng đang được cấu hình. Chức năng đăng bài sẽ sớm mở.",
    smallFile: "Chỉ nhận JPG, PNG, WEBP dưới 5 MB.", generalError: "Có lỗi xảy ra. Vui lòng thử lại.",
    uploadError: "Không thể tải ảnh lên.", loading: "Đang tải...", working: "Đang gửi...",
    loginRequired: "Đăng nhập để chia sẻ hoặc bình luận.", needText: "Hãy viết ít nhất 3 ký tự.",
    tooLong: "Bài viết tối đa 10.000 ký tự.", comments: "Bình luận", view: "Đọc tiếp",
    noTitle: "Không cần đặt tiêu đề, không cần hashtag.", allPlaces: "Mọi địa điểm",
    autoDraft: "Bản nháp tự lưu trên điện thoại này.", startQuestion: "Tôi muốn hỏi..."
  },
  en: {
    title: "GoVietStay Stories", subtitle: "Real people. Real stories. Real Vietnam.",
    eyebrow: "VIETNAM TRAVEL COMMUNITY", lead: "Every journey has a story.",
    intro: "Share a thought, a photo or a question. No perfect writing required. Just be yourself.",
    compose: "What's on your mind today?", question: "What would you like to ask?",
    stories: "Stories", questions: "Questions", all: "All posts", place: "Place (optional)",
    name: "Display name", photo: "Add photo", post: "Post", publish: "Submit for review",
    pending: "Pending review", live: "Published", reply: "Reply", like: "Like", share: "Share",
    submitReply: "Send reply", replyHint: "Join the conversation...", cancel: "Cancel", signIn: "Sign in",
    signOut: "Sign out", email: "Email address", sendLink: "Email me a sign-in link",
    emailHelp: "Sign in once. Your draft will still be here when you return.",
    google: "Continue with Google", sent: "Check your email and follow the sign-in link.",
    postSuccess: "Story submitted. It will appear after review.",
    replySuccess: "Your reply has been sent for review.", approval: "New community posts are reviewed before becoming public.",
    signed: "Signed in", empty: "No stories yet. Be the first to share one.",
    emptyFilter: "No posts match these filters.",
    community: "Community", back: "All stories", tips: "Conversation starters",
    tip1: "What surprised you most about Vietnam?", tip2: "One Vietnamese dish you still think about",
    tip3: "A question for someone who lives here", moderator: "Review posts",
    adminTitle: "Community moderation", adminDenied: "This account does not have moderation access.",
    approve: "Approve", reject: "Reject", moderationEmpty: "Nothing is waiting for review.",
    setup: "Community is being configured. Posting will open shortly.",
    smallFile: "JPG, PNG or WEBP images under 5 MB only.", generalError: "Something went wrong. Please try again.",
    uploadError: "Could not upload photo.", loading: "Loading...", working: "Submitting...",
    loginRequired: "Sign in to post or reply.", needText: "Write at least 3 characters.",
    tooLong: "Up to 10,000 characters per post.", comments: "Replies", view: "Read more",
    noTitle: "No titles or hashtags required.", allPlaces: "Anywhere in Vietnam",
    autoDraft: "Draft saved automatically on this device.", startQuestion: "I'd like to ask..."
  }
};
const fmt = (iso: string, lang: Lang) => new Date(iso).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {day:"numeric", month:"short", year:"numeric"});
const userName = (user: User | null) => {
  const raw = user?.user_metadata?.full_name || user?.user_metadata?.name;
  return typeof raw === "string" && raw.trim() ? raw.trim().slice(0, 60) : "Traveler";
};

export default function CommunityBoard({ focusPostId, moderation = false }: { focusPostId?: string; moderation?: boolean }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];
  const [user, setUser] = useState<User | null>(null);
  const [moderator, setModerator] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [likes, setLikes] = useState<Like[]>([]);
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [kind, setKind] = useState<"story" | "question">("story");
  const [kindFilter, setKindFilter] = useState("all");
  const [placeFilter, setPlaceFilter] = useState("all");
  const [place, setPlace] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [draftReady, setDraftReady] = useState(false);
  const [replyPost, setReplyPost] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSent, setLoginSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [pendingComments, setPendingComments] = useState<Comment[]>([]);

  useEffect(() => {
    setLang(navigator.language.toLowerCase().startsWith("vi") ? "vi" : "en");
    try {
      const saved = JSON.parse(window.localStorage.getItem("gvs-community-draft") || "{}");
      if (typeof saved.body === "string") setBody(saved.body);
      if (typeof saved.name === "string") setName(saved.name);
      if (saved.kind === "story" || saved.kind === "question") setKind(saved.kind);
      if (typeof saved.place === "string") setPlace(saved.place);
    } catch { /* Private browsing can disable storage. */ }
    setDraftReady(true);
    if (!db) return;
    void db.auth.getUser().then(({data}) => setUser(data.user));
    const {data:{subscription}} = db.auth.onAuthStateChange((_event,session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!draftReady) return;
    try {
      window.localStorage.setItem("gvs-community-draft", JSON.stringify({body, name, kind, place}));
    } catch { /* Draft is optional. */ }
  }, [body, name, kind, place, draftReady]);

  useEffect(() => {
    if (!db || !user) { setModerator(false); return; }
    let active = true;
    void db.from("gvs_community_moderators").select("user_id").eq("user_id", user.id).maybeSingle()
      .then(({data}) => { if (active) setModerator(Boolean(data)); });
    return () => { active = false; };
  }, [user]);

  const loadFeed = useCallback(async () => {
    if (!db) { setLoading(false); return; }
    if (moderation && !moderator) { setPosts([]); setPendingComments([]); setLoading(false); return; }
    setLoading(true);
    let q = db.from("gvs_community_posts")
      .select("id,author_id,author_name,body,kind,place,language,image_path,status,created_at")
      .order("created_at", {ascending:false}).limit(60);
    if (focusPostId) q = q.eq("id", focusPostId);
    else if (moderation) q = q.eq("status", "pending");
    else if (user) q = q.or("status.eq.published,author_id.eq." + user.id);
    else q = q.eq("status", "published");
    const {data, error} = await q;
    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }
    const fresh = (data || []) as Post[];
    setPosts(fresh);
    if (moderation) {
      const withImages = fresh.filter(p => p.image_path);
      const signed = await Promise.all(withImages.map(async p => {
        const {data: signedData} = await db!.storage.from(BUCKET).createSignedUrl(p.image_path!,3600);
        return [p.id,signedData?.signedUrl||""] as const;
      }));
      setPhotos(Object.fromEntries(signed));
      const {data: awaiting} = await db.from("gvs_community_comments")
        .select("id,post_id,author_id,author_name,body,status,created_at")
        .eq("status","pending").order("created_at",{ascending:true}).limit(100);
      setPendingComments((awaiting || []) as Comment[]);
      setLoading(false);
      return;
    }
    const ids = fresh.map(p => p.id);
    if (!ids.length) { setComments({}); setLikes([]); setPhotos({}); setLoading(false); return; }
    const [commentResult, likeResult] = await Promise.all([
      db.from("gvs_community_comments").select("id,post_id,author_id,author_name,body,status,created_at").in("post_id",ids).order("created_at",{ascending:true}).limit(250),
      db.from("gvs_community_likes").select("post_id,user_id").in("post_id",ids).limit(3000)
    ]);
    const grouped: Record<string, Comment[]> = {};
    ((commentResult.data || []) as Comment[]).forEach(c => { (grouped[c.post_id] ||= []).push(c); });
    setComments(grouped);
    setLikes((likeResult.data || []) as Like[]);
    const withImages = fresh.filter(p => p.image_path);
    const signed = await Promise.all(withImages.map(async p => {
      const {data: signedData} = await db!.storage.from(BUCKET).createSignedUrl(p.image_path!, 3600);
      return [p.id, signedData?.signedUrl || ""] as const;
    }));
    setPhotos(Object.fromEntries(signed));
    setLoading(false);
  }, [user, focusPostId, moderation, moderator]);

  useEffect(() => { void loadFeed(); }, [loadFeed]);

  const filtered = useMemo(() => posts.filter(p =>
    (kindFilter === "all" || p.kind === kindFilter)
    && (placeFilter === "all" || p.place === placeFilter)
  ), [posts, kindFilter, placeFilter]);

  const requireLogin = () => { setLoginOpen(true); setMessage(t.loginRequired); };

  async function signIn(event: FormEvent) {
    event.preventDefault();
    if (!db || !loginEmail.trim()) return;
    setBusy(true); setMessage("");
    const {error} = await db.auth.signInWithOtp({
      email: loginEmail.trim(),
      options: {emailRedirectTo: window.location.origin + "/community"}
    });
    setBusy(false);
    if (error) setMessage(error.message);
    else setLoginSent(true);
  }

  async function googleSignIn() {
    if (!db) return;
    const {error} = await db.auth.signInWithOAuth({
      provider:"google", options:{redirectTo:window.location.origin + "/community"}
    });
    if (error) setMessage(error.message);
  }

  async function publish(event: FormEvent) {
    event.preventDefault();
    if (!db) return;
    if (body.trim().length < 3) { setMessage(t.needText); return; }
    if (body.length > 10000) { setMessage(t.tooLong); return; }
    if (!user) { requireLogin(); return; }
    setBusy(true); setMessage("");
    let image_path: string | null = null;
    if (picture) {
      const ext = picture.type === "image/png" ? "png" : picture.type === "image/webp" ? "webp" : "jpg";
      image_path = user.id + "/" + crypto.randomUUID() + "." + ext;
      const {error:uploadError} = await db.storage.from(BUCKET).upload(image_path,picture,{contentType:picture.type,upsert:false});
      if (uploadError) { setMessage(t.uploadError + " " + uploadError.message); setBusy(false); return; }
    }
    const {data: inserted, error} = await db.from("gvs_community_posts").insert({
      author_id:user.id, author_name:(name || userName(user)).trim().slice(0,60),
      body:body.trim(), kind, place:place || null, language:lang, image_path, status:"pending"
    }).select("id").single();
    if (error) {
      if (image_path) await db.storage.from(BUCKET).remove([image_path]);
      setMessage(error.message); setBusy(false); return;
    }
    if (moderator && inserted?.id) {
      await db.from("gvs_community_posts").update({status:"published"}).eq("id",inserted.id);
    }
    setBody(""); setPicture(null); setPlace(""); setKind("story");
    setMessage(moderator ? t.live : t.postSuccess);
    setBusy(false);
    await loadFeed();
  }

  function pickPhoto(event: ChangeEvent<HTMLInputElement>) {
    const f = event.target.files?.[0];
    if (!f) return;
    if (!["image/jpeg","image/png","image/webp"].includes(f.type) || f.size > 5*1024*1024) {
      setMessage(t.smallFile); event.target.value = ""; return;
    }
    setPicture(f); setMessage("");
  }

  async function submitComment(postId: string) {
    if (!db) return;
    if (!user) { requireLogin(); return; }
    if (replyText.trim().length < 2 || replyText.length > 2000) return;
    setBusy(true); setMessage("");
    const {data: inserted, error} = await db.from("gvs_community_comments").insert({
      post_id:postId,author_id:user.id,author_name:userName(user),
      body:replyText.trim(),status:"pending"
    }).select("id").single();
    if (error) { setMessage(error.message); setBusy(false); return; }
    if (moderator && inserted?.id) {
      await db.from("gvs_community_comments").update({status:"published"}).eq("id",inserted.id);
    }
    setReplyText(""); setReplyPost(null);
    setMessage(moderator ? t.live : t.replySuccess);
    setBusy(false); await loadFeed();
  }

  async function toggleLike(postId: string) {
    if (!db) return;
    if (!user) { requireLogin(); return; }
    const liked = likes.some(l => l.post_id === postId && l.user_id === user.id);
    const q = db.from("gvs_community_likes");
    const {error} = liked
      ? await q.delete().eq("post_id",postId).eq("user_id",user.id)
      : await q.insert({post_id:postId,user_id:user.id});
    if (error) setMessage(error.message);
    else await loadFeed();
  }

  async function moderate(table: "gvs_community_posts" | "gvs_community_comments", id: string, status: "published" | "rejected") {
    if (!db || !moderator) return;
    setBusy(true); setMessage("");
    const {error} = await db.from(table).update({status}).eq("id",id);
    if (error) setMessage(error.message);
    setBusy(false); await loadFeed();
  }

  async function sharePost(id: string) {
    const shareUrl = window.location.origin + "/community/post/" + id;
    try { await navigator.clipboard.writeText(shareUrl); setMessage(lang === "vi" ? "Đã sao chép liên kết bài viết." : "Story link copied."); }
    catch { window.prompt("Copy link",shareUrl); }
  }

  return <main className={styles.page}>
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo}>GoVietStay<span> Stories</span></Link>
        <div className={styles.headerRight}>
          <div className={styles.langPick}>
            <button type="button" className={lang==="vi"?styles.activeLang:""} onClick={()=>setLang("vi")}>VI</button>
            <span>/</span>
            <button type="button" className={lang==="en"?styles.activeLang:""} onClick={()=>setLang("en")}>EN</button>
          </div>
          {moderator && !moderation && <Link className={styles.moderatorLink} href="/community/moderate">{t.moderator}</Link>}
          {user ? <button className={styles.ghostButton} onClick={()=>void db?.auth.signOut()}>{t.signOut}</button>
            : <button className={styles.ghostButton} onClick={()=>setLoginOpen(true)}>{t.signIn}</button>}
        </div>
      </div>
    </header>

    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.eyebrow}>{t.eyebrow}</div>
        <h1>{moderation ? t.adminTitle : t.lead}</h1>
        <p>{moderation ? t.approval : t.intro}</p>
        {!moderation && <a className={styles.heroLink} href="#write">{t.compose} <span aria-hidden="true">→</span></a>}
      </div>
    </section>

    <div className={styles.layout}>
      <div className={styles.mainColumn}>
        {focusPostId && <Link className={styles.backLink} href="/community">← {t.back}</Link>}
        {moderation && !moderator ? <div className={styles.panel}><p>{user ? t.adminDenied : t.loginRequired}</p><button className={styles.secondaryButton} onClick={()=>setLoginOpen(true)}>{t.signIn}</button></div> : null}
        {!moderation && !focusPostId && <form id="write" className={styles.composer} onSubmit={publish}>
          <div className={styles.composerTop}>
            <div className={styles.avatar}>{(name || userName(user)).trim().charAt(0).toUpperCase()}</div>
            <div><strong>{t.compose}</strong><p>{t.noTitle}</p></div>
          </div>
          <div className={styles.switcher} role="group" aria-label="Post type">
            <button type="button" onClick={()=>setKind("story")} className={kind==="story"?styles.selected:""}>{t.stories}</button>
            <button type="button" onClick={()=>setKind("question")} className={kind==="question"?styles.selected:""}>{t.questions}</button>
          </div>
          <textarea aria-label={kind==="story"?t.compose:t.question} value={body}
            onChange={e=>setBody(e.target.value)} maxLength={10000}
            placeholder={kind==="question"?t.question:t.compose} rows={4} />
          <details className={styles.optionalDetails}><summary>{lang === "vi" ? "Thêm tên hoặc địa điểm (tùy chọn)" : "Add name or place (optional)"}</summary>
          <div className={styles.composeOptions}>
            <input className={styles.nameField} aria-label={t.name} placeholder={t.name+" (optional)"} maxLength={60} value={name} onChange={e=>setName(e.target.value)}/>
            <select aria-label={t.place} value={place} onChange={e=>setPlace(e.target.value)}>
              <option value="">{t.place}</option>
              {PLACES.map(p=><option value={p} key={p}>{p}</option>)}
            </select>
          </div></details>
          <div className={styles.composeBottom}>
            <label className={styles.photoButton}>
              {t.photo}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={pickPhoto} />
            </label>
            {picture && <span className={styles.filename}>{picture.name} <button type="button" onClick={()=>setPicture(null)} aria-label={t.cancel}>×</button></span>}
            <span className={styles.count}>{body.length}/10000</span>
            <button className={styles.primaryButton} disabled={busy || body.trim().length < 3} type="submit">{busy?t.working:t.publish}</button>
          </div>
          <p className={styles.finePrint}>{t.autoDraft} {t.approval}</p>
        </form>}

        {!moderation && !focusPostId && <div className={styles.filters}>
          <div className={styles.switcher}>
            <button className={kindFilter==="all"?styles.selected:""} onClick={()=>setKindFilter("all")}>{t.all}</button>
            <button className={kindFilter==="story"?styles.selected:""} onClick={()=>setKindFilter("story")}>{t.stories}</button>
            <button className={kindFilter==="question"?styles.selected:""} onClick={()=>setKindFilter("question")}>{t.questions}</button>
          </div>
          <select aria-label={t.place} value={placeFilter} onChange={e=>setPlaceFilter(e.target.value)}>
            <option value="all">{t.allPlaces}</option>
            {PLACES.map(p=><option value={p} key={p}>{p}</option>)}
          </select>
        </div>}

        {message && <div className={styles.notice} role="status">{message}<button type="button" onClick={()=>setMessage("")} aria-label="Close">×</button></div>}
        {!db && <div className={styles.panel}>{t.setup}</div>}
        {db && loading && <div className={styles.panel}>{t.loading}</div>}

        {db && !loading && (!moderation || moderator) && (moderation?posts:filtered).map(post => <article className={styles.post} key={post.id}>
          <div className={styles.postHeading}>
            <div className={styles.avatarSmall}>{post.author_name.charAt(0).toUpperCase()}</div>
            <div className={styles.postAuthor}>
              <strong>{post.author_name}</strong>
              <div className={styles.meta}>{fmt(post.created_at,lang)}{post.place?" · "+post.place:""} · {post.kind==="question"?t.questions:t.stories}</div>
            </div>
            {post.status==="pending" && <span className={styles.pending}>{t.pending}</span>}
          </div>
          <p className={styles.postText}>{post.body}</p>
          {photos[post.id] && <img className={styles.postImage} src={photos[post.id]} alt={"Travel photo shared by "+post.author_name} loading="lazy"/>}
          {moderation ? <div className={styles.modActions}>
            <button disabled={busy} onClick={()=>void moderate("gvs_community_posts",post.id,"published")}>{t.approve}</button>
            <button disabled={busy} onClick={()=>void moderate("gvs_community_posts",post.id,"rejected")}>{t.reject}</button>
          </div> : <>
            <div className={styles.actions}>
              <button onClick={()=>void toggleLike(post.id)} disabled={post.status!=="published"} className={likes.some(l=>l.post_id===post.id&&l.user_id===user?.id)?styles.liked:""}>{t.like} ({likes.filter(l=>l.post_id===post.id).length})</button>
              <button onClick={()=>post.status==="published"?(setReplyPost(replyPost===post.id?null:post.id),setReplyText("")):null}>{t.reply} ({comments[post.id]?.length||0})</button>
              {post.status==="published" && <button onClick={()=>void sharePost(post.id)}>{t.share}</button>}
              {!focusPostId && post.status==="published" && <Link href={"/community/post/"+post.id}>{t.view}</Link>}
            </div>
            {comments[post.id]?.length>0 && <div className={styles.replies}>{comments[post.id].map(c=><div className={styles.reply} key={c.id}>
              <strong>{c.author_name}</strong><span>{fmt(c.created_at,lang)}</span>
              {c.status!=="published" && <small>{t.pending}</small>}
              <p>{c.body}</p>
            </div>)}</div>}
            {replyPost===post.id && <div className={styles.replyForm}>
              <textarea value={replyText} onChange={e=>setReplyText(e.target.value)} rows={2} maxLength={2000} placeholder={t.replyHint}/>
              <div className={styles.replyButtons}>
                <button onClick={()=>{setReplyPost(null);setReplyText("");}} className={styles.ghostButton}>{t.cancel}</button>
                <button disabled={busy||replyText.trim().length<2} className={styles.primaryButton} onClick={()=>void submitComment(post.id)}>{t.submitReply}</button>
              </div>
            </div>}
          </>}
        </article>)}

        {moderation && moderator && pendingComments.length>0 && <section className={styles.commentQueue}>
          <h2>{t.comments} ({pendingComments.length})</h2>
          {pendingComments.map(c=><div key={c.id} className={styles.panel}>
            <div className={styles.meta}>{c.author_name} · {fmt(c.created_at,lang)}</div>
            <p>{c.body}</p>
            <Link href={"/community/post/"+c.post_id}>{t.view}</Link>
            <div className={styles.modActions}>
              <button disabled={busy} onClick={()=>void moderate("gvs_community_comments",c.id,"published")}>{t.approve}</button>
              <button disabled={busy} onClick={()=>void moderate("gvs_community_comments",c.id,"rejected")}>{t.reject}</button>
            </div>
          </div>)}
        </section>}
        {db && !loading && (moderation? moderator && !posts.length && !pendingComments.length:!filtered.length) &&
          <div className={styles.empty}>{moderation?t.moderationEmpty:posts.length?t.emptyFilter:t.empty}</div>}
      </div>
      {!moderation && <aside className={styles.aside}>
        <div className={styles.asideBox}>
          <h2>{t.tips}</h2>
          <button onClick={()=>{setKind("story");setBody(t.tip1);window.location.hash="write";}}>{t.tip1}</button>
          <button onClick={()=>{setKind("story");setBody(t.tip2);window.location.hash="write";}}>{t.tip2}</button>
          <button onClick={()=>{setKind("question");setBody(t.tip3);window.location.hash="write";}}>{t.tip3}</button>
        </div>
        <p className={styles.asideTagline}>{t.subtitle}</p>
        <Link className={styles.homeLink} href="/">GoVietStay.com</Link>
      </aside>}
    </div>

    {loginOpen && <div className={styles.modalOverlay} role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setLoginOpen(false);}}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="community-login">
        <button className={styles.close} onClick={()=>setLoginOpen(false)} aria-label={t.cancel}>×</button>
        <h2 id="community-login">{t.signIn}</h2>
        <p>{loginSent?t.sent:t.emailHelp}</p>
        {!loginSent && <><form onSubmit={signIn}>
          <input type="email" required aria-label={t.email} placeholder={t.email} value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}/>
          <button className={styles.primaryButton} disabled={busy} type="submit">{busy?t.working:t.sendLink}</button>
        </form>
        <button className={styles.googleButton} type="button" onClick={()=>void googleSignIn()}>{t.google}</button></>}
        {message && <p role="status">{message}</p>}
      </div>
    </div>}
  </main>;
}
