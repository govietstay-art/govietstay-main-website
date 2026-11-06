"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./hotel-partner-v3.css";

const supabase = createClient("https://vscffgnxaexestnayvae.supabase.co",
  "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV",
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });

const TEMPLATES = ["Standard", "Superior", "Deluxe", "Premier", "Executive", "Family", "Suite", "Apartment", "Penthouse", "Villa", "Khác"];
const BEDS = ["1 King", "1 Queen", "1 Double", "2 Twin", "1 King + 1 Twin", "2 Double", "2 King", "Khác"];
const VIEWS = ["Không có view", "Hướng phố", "Hướng vườn", "Hướng hồ bơi", "Hướng biển một phần", "Hướng biển trực diện", "Khác"];
const AMENITIES = ["Wi-Fi", "Điều hòa", "TV", "Minibar", "Bồn tắm", "Ban công", "Bếp", "Phòng khách", "Máy sấy tóc", "Két sắt", "Hồ bơi", "Phòng gym"];
const PRICE_FORMAT = (n:number) => new Intl.NumberFormat("vi-VN").format(n) + " ₫";

type Org = { id:string; name:string; kind:string };
type Property = { id:string; org_id:string; pilot_code:string|null; name:string; address:string|null; city:string|null; description:string|null; maps_url:string|null; entrance_notes:string|null; stars:number|null; amenities:string[]; status:string };
type Room = { id:string; property_id:string; pilot_code:string|null; name:string; template:string; area_sqm:number|null; bed_details:string|null; max_adults:number|null; max_children:number|null; view_details:string|null; breakfast_included:boolean|null; extra_bed:string|null; amenities:string[]; notes:string|null; status:string };
type Request = { id:string; property_id:string; created_by:string; kind:string; target_id:string|null; payload:Record<string,unknown>; status:string; review_note:string|null; created_at:string };
type Photo = { id:string; property_id:string; room_id:string|null; storage_path:string; is_cover:boolean; alt_text:string|null; url?:string };
type Page = "catalog"|"property"|"room"|"photo"|"rate"|"queue"|"onboard";
type RoomDraft = { name:string; template:string; area_sqm:string; bed_details:string; max_adults:string; max_children:string; view_details:string; breakfast_included:boolean; extra_bed:string; amenities:string[]; notes:string };
const freshRoom = ():RoomDraft => ({name:"",template:"Deluxe",area_sqm:"",bed_details:"1 King",max_adults:"2",max_children:"1",view_details:"Hướng phố",breakfast_included:true,extra_bed:"Không",amenities:["Wi-Fi","Điều hòa","TV"],notes:""});
const today = () => new Date().toISOString().slice(0,10);

async function shrinkPhoto(file:File):Promise<Blob> {
  if (!file.type.startsWith("image/")) throw new Error("Vui lòng chọn ảnh JPG, PNG, HEIC hoặc WebP.");
  const objectUrl=URL.createObjectURL(file);
  try {
    const image=await new Promise<HTMLImageElement>((resolve,reject)=> {
      const el=new Image(); el.onload=()=>resolve(el); el.onerror=()=>reject(new Error("Không đọc được ảnh này.")); el.src=objectUrl;
    });
    const ratio=Math.min(1,1400/Math.max(image.naturalWidth,image.naturalHeight));
    let last:Blob|null=null;
    for(const factor of [1,.85,.72]) {
      const canvas=document.createElement("canvas");
      canvas.width=Math.max(1,Math.round(image.naturalWidth*ratio*factor));
      canvas.height=Math.max(1,Math.round(image.naturalHeight*ratio*factor));
      const ctx=canvas.getContext("2d");
      if(!ctx) throw new Error("Trình duyệt không hỗ trợ xử lý hình ảnh.");
      ctx.drawImage(image,0,0,canvas.width,canvas.height);
      for(const quality of [.8,.67,.53]) {
        const blob=await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,"image/webp",quality));
        if(!blob) throw new Error("Không thể chuyển ảnh sang WebP.");
        last=blob;
        if(blob.size<=300*1024) return blob;
      }
    }
    if(!last || last.size>2*1024*1024) throw new Error("Ảnh sau xử lý vẫn quá lớn, vui lòng chọn ảnh khác.");
    return last;
  } finally { URL.revokeObjectURL(objectUrl); }
}

function SkeletonPhoto({url,alt,room=false}:{url?:string;alt:string;room?:boolean}) {
  return <div className={"hv3-photo"+(room?" hv3-room-photo":"")}>
    {url?<img src={url} alt={alt} loading="lazy"/>:
      <div className="hv3-photo-placeholder"><span>▧</span><small>Chờ ảnh thật được duyệt</small></div>}
  </div>;
}

export default function HotelPartnerV3() {
  const [authUser,setAuthUser]=useState<string|null>(null);
  const [admin,setAdmin]=useState(false);
  const [authorized,setAuthorized]=useState(false);
  const [checking,setChecking]=useState(true);
  const [loginEmail,setLoginEmail]=useState("");
  const [loginPassword,setLoginPassword]=useState("");
  const [signup,setSignup]=useState(false);
  useEffect(()=>{
    if(new URLSearchParams(window.location.search).get("signup")==="1")setSignup(true);
  },[]);
  const [orgs,setOrgs]=useState<Org[]>([]);
  const [editableOrgIds,setEditableOrgIds]=useState<string[]>([]);
  const [properties,setProperties]=useState<Property[]>([]);
  const [rooms,setRooms]=useState<Room[]>([]);
  const [requests,setRequests]=useState<Request[]>([]);
  const [photos,setPhotos]=useState<Photo[]>([]);
  const [rates,setRates]=useState<Array<{id:string;room_id:string;net_price_vnd:number;valid_from:string;valid_until:string}>>([]);
  const [page,setPage]=useState<Page>("catalog");
  const [selected,setSelected]=useState("");
  const [search,setSearch]=useState("");
  const [roomDraft,setRoomDraft]=useState<RoomDraft>(freshRoom);
  const [editingRoom,setEditingRoom]=useState<string|null>(null);
  const [draftId,setDraftId]=useState<string|null>(null);
  const [propertyDraft,setPropertyDraft]=useState({name:"",address:"",city:"",description:"",maps_url:"",entrance_notes:""});
  const [imageFile,setImageFile]=useState<File|null>(null);
  const [photoTarget,setPhotoTarget]=useState("hotel");
  const [priceForm,setPriceForm]=useState({room_id:"",valid_from:"",valid_until:"",supplier_price_vnd:"",discount_percent:"0",conditions:"",includes_breakfast:true,includes_tax:true});
  const [newHotel,setNewHotel]=useState({org_id:"",org_name:"",name:"",city:"",address:""});
  const [createPartnerOrg,setCreatePartnerOrg]=useState(false);
  const [memberEmail,setMemberEmail]=useState("");
  const [memberRole,setMemberRole]=useState("editor");
  const [reviewNote,setReviewNote]=useState("");
  const [working,setWorking]=useState(false);
  const [message,setMessage]=useState("");
  const [error,setError]=useState("");
  const [reloadKey,setReloadKey]=useState(0);

  const refresh=useCallback(async()=>{
    setChecking(true);setError("");
    try {
      const {data:{user},error:authErr}=await supabase.auth.getUser();
      if(authErr||!user){setAuthUser(null);setAdmin(false);setAuthorized(false);setChecking(false);return;}
      setAuthUser(user.id);
      const [staff,members]=await Promise.all([
        supabase.from("staff_profiles").select("role,active").eq("auth_user_id",user.id).maybeSingle(),
        supabase.from("hotel_partner_members").select("org_id,role").eq("user_id",user.id).eq("active",true)
      ]);
      const isAdmin=!staff.error && staff.data?.active && ["owner","admin"].includes(staff.data.role);
      const canAccess=Boolean(isAdmin || (members.data?.length||0)>0);
      setAdmin(Boolean(isAdmin));setAuthorized(canAccess);
      setEditableOrgIds((members.data||[]).filter(m=>["owner","manager","editor"].includes(m.role)).map(m=>m.org_id));
      if(!canAccess){setChecking(false);return;}
      const [orgResult,hotelResult,roomResult,requestResult,photoResult]=await Promise.all([
        supabase.from("hotel_partner_orgs").select("id,name,kind").eq("active",true).order("name"),
        supabase.from("hotel_properties").select("*").order("name"),
        supabase.from("hotel_room_types").select("*").order("name"),
        supabase.from("hotel_change_requests").select("*").order("created_at",{ascending:false}).limit(150),
        supabase.from("hotel_media").select("*").eq("status","approved")
      ]);
      for(const item of [orgResult,hotelResult,roomResult,requestResult,photoResult]) {
        if(item.error) throw new Error(item.error.message);
      }
      setOrgs((orgResult.data||[]) as Org[]);
      setProperties((hotelResult.data||[]) as Property[]);
      setRooms((roomResult.data||[]) as Room[]);
      setRequests((requestResult.data||[]) as Request[]);
      const photoData=(photoResult.data||[]) as Photo[];
      const signed=await Promise.all(photoData.map(async p=>{
        const {data}=await supabase.storage.from("hotel-partner-private").createSignedUrl(p.storage_path,300);
        return {...p,url:data?.signedUrl};
      }));
      setPhotos(signed);
      if(isAdmin){
        const rateResult=await supabase.from("hotel_net_rates").select("id,room_id,net_price_vnd,valid_from,valid_until").limit(500);
        if(!rateResult.error) setRates(rateResult.data||[]);
      }else setRates([]);
      const list=(hotelResult.data||[]) as Property[];
      setSelected(prev=>list.some(h=>h.id===prev)?prev:(list[0]?.id||""));
    }catch(err){setError(err instanceof Error?err.message:String(err));}
    finally{setChecking(false);}
  },[]);

  useEffect(()=>{
    void refresh();
    const {data}=supabase.auth.onAuthStateChange(()=>{setReloadKey(v=>v+1);});
    return ()=>data.subscription.unsubscribe();
  },[refresh]);
  useEffect(()=>{if(reloadKey>0) void refresh();},[reloadKey,refresh]);

  const manageableOrgs=admin?orgs:orgs.filter(o=>editableOrgIds.includes(o.id));
  const canAddHotel=admin||manageableOrgs.length>0;
  const hotel=properties.find(p=>p.id===selected);
  const hotelRooms=rooms.filter(r=>r.property_id===selected);
  const hotelPhotos=photos.filter(p=>p.property_id===selected && !p.room_id);
  const pending=requests.filter(r=>r.status==="submitted");
  const filtered=useMemo(()=>properties.filter(p=>(p.name+" "+(p.city||"")+" "+(p.pilot_code||"")).toLowerCase().includes(search.toLowerCase())),[properties,search]);
  const roomPhoto=(id:string)=>photos.find(p=>p.room_id===id)?.url;
  const roomRate=(id:string)=>rates.filter(p=>p.room_id===id).sort((a,b)=>b.valid_from.localeCompare(a.valid_from))[0];

  function openProperty(h:Property){
    setSelected(h.id);setDraftId(null);setPriceForm(v=>({...v,room_id:""}));setPhotoTarget("hotel");
    setPropertyDraft({name:h.name,address:h.address||"",city:h.city||"",description:h.description||"",maps_url:h.maps_url||"",entrance_notes:h.entrance_notes||""});
    setPage("property");setMessage("");
  }
  function editProperty(){if(!hotel)return;setPropertyDraft({name:hotel.name,address:hotel.address||"",city:hotel.city||"",description:hotel.description||"",maps_url:hotel.maps_url||"",entrance_notes:hotel.entrance_notes||""});setDraftId(null);setPage("property");}
  function addRoom(copy?:Room){
    if(copy){setRoomDraft({name:copy.name+" (bản sao)",template:TEMPLATES.find(t=>t.toLowerCase()===copy.template.toLowerCase())||"Khác",area_sqm:String(copy.area_sqm??""),bed_details:copy.bed_details||"1 King",max_adults:String(copy.max_adults??2),max_children:String(copy.max_children??0),view_details:copy.view_details||"",breakfast_included:Boolean(copy.breakfast_included),extra_bed:copy.extra_bed||"Không",amenities:copy.amenities||[],notes:copy.notes||""});}
    else setRoomDraft(freshRoom());
    setEditingRoom(null);setDraftId(null);setMessage("");setPage("room");
  }
  function modifyRoom(room:Room){
    setRoomDraft({name:room.name,template:TEMPLATES.find(t=>t.toLowerCase()===room.template.toLowerCase())||"Khác",area_sqm:String(room.area_sqm??""),bed_details:room.bed_details||"",max_adults:String(room.max_adults??2),max_children:String(room.max_children??0),view_details:room.view_details||"",breakfast_included:Boolean(room.breakfast_included),extra_bed:room.extra_bed||"",amenities:room.amenities||[],notes:room.notes||""});
    setEditingRoom(room.id);setDraftId(null);setMessage("");setPage("room");
  }
  async function login(e:React.FormEvent){
    e.preventDefault();setWorking(true);setError("");setMessage("");
    try{
      const out=signup?
        await supabase.auth.signUp({email:loginEmail,password:loginPassword,options:{emailRedirectTo:window.location.origin+"/admin/hotels-v3"}}):
        await supabase.auth.signInWithPassword({email:loginEmail,password:loginPassword});
      if(out.error)throw out.error;
      setMessage(signup?"Đã đăng ký. Vui lòng xác nhận email, sau đó nhờ GoVietStay cấp quyền.":"Đăng nhập thành công.");
      await refresh();
    }catch(e){setError(e instanceof Error?e.message:String(e));}finally{setWorking(false);}
  }
  async function logout(){await supabase.auth.signOut();setAuthorized(false);setAuthUser(null);}
  async function submit(kind:Request["kind"],payload:Record<string,unknown>,target_id:string|null=null,asDraft=false) {
    if(!authUser||!hotel) return;
    setWorking(true);setError("");setMessage("");
    try {
      if(kind==="room"&&!String(payload.name||"").trim())throw new Error("Phải có tên hạng phòng.");
      if(kind==="rate" && (!payload.valid_from||!payload.valid_until||Number(payload.supplier_price_vnd)<1)) throw new Error("Hãy nhập ngày áp dụng và giá hợp lệ.");
      const entry={property_id:hotel.id,created_by:authUser,kind,target_id,payload,status:asDraft?"draft":"submitted"};
      const canReuse=Boolean(draftId&&requests.some(r=>r.id===draftId&&r.property_id===hotel.id&&r.kind===kind&&r.status==="draft"));
      const result=canReuse?
        await supabase.from("hotel_change_requests").update(entry).eq("id",draftId).eq("status","draft").select("id").single():
        await supabase.from("hotel_change_requests").insert(entry).select("id").single();
      if(result.error)throw result.error;
      setDraftId(asDraft?result.data?.id:null);
      setMessage(asDraft?"Đã lưu bản nháp vào Supabase.":"Đã gửi GoVietStay kiểm duyệt. Chưa được công bố.");
      await refresh();
    }catch(err){setError(err instanceof Error?err.message:String(err));}finally{setWorking(false);}
  }
  async function uploadPhoto(){
    if(!hotel||!imageFile) return;
    setWorking(true);setError("");setMessage("");
    try {
      const roomId=photoTarget==="hotel"?null:photoTarget;
      const existing=photos.filter(p=>p.property_id===hotel.id && p.room_id===roomId).length;
      const inReview=requests.filter(r=>r.property_id===hotel.id && r.kind==="photo" && ["draft","submitted"].includes(r.status) && (r.payload?.room_id||null)===roomId).length;
      if(roomId && existing+inReview>=1)throw new Error("Mỗi phòng chỉ có 1 ảnh. Hãy đợi GoVietStay xử lý ảnh cũ trước khi thay.");
      if(!roomId&&existing+inReview>=6)throw new Error("Khách sạn chỉ được tối đa 6 ảnh tổng quan.");
      const optimized=await shrinkPhoto(imageFile);
      const key=hotel.org_id+"/"+hotel.id+"/"+crypto.randomUUID()+".webp";
      const upload=await supabase.storage.from("hotel-partner-private").upload(key,optimized,{upsert:false,contentType:"image/webp",cacheControl:"3600"});
      if(upload.error)throw upload.error;
      const {error:reqError}=await supabase.from("hotel_change_requests").insert({
        property_id:hotel.id,created_by:authUser,kind:"photo",status:"submitted",
        payload:{storage_path:key,room_id:roomId,alt_text:roomId?hotelRooms.find(r=>r.id===roomId)?.name:hotel.name,is_cover:!roomId&&existing===0,sort_order:existing}
      });
      if(reqError)throw reqError;
      setMessage("Ảnh đã nén còn "+Math.round(optimized.size/1024)+" KB và gửi kiểm duyệt thành công.");
      setImageFile(null);await refresh();
    }catch(err){setError(err instanceof Error?err.message:String(err));}finally{setWorking(false);}
  }
  async function review(req:Request,decision:"approved"|"rejected"){
    setWorking(true);setError("");setMessage("");
    try {
      const {error}=await supabase.rpc("hotel_review_request",{p_request_id:req.id,p_decision:decision,p_note:reviewNote||null});
      if(error)throw error;
      setReviewNote("");setMessage(decision==="approved"?"Đã phê duyệt và lưu vào hệ thống.":"Đã từ chối và giữ nguyên dữ liệu công bố.");
      await refresh();
    }catch(e){setError(e instanceof Error?e.message:String(e));}finally{setWorking(false);}
  }
  async function onboard(){
    if(!canAddHotel)return;
    setWorking(true);setError("");setMessage("");
    try{
      const hotelName=newHotel.name.trim();
      if(hotelName.length<2)throw new Error("Vui lòng nhập tên khách sạn.");
      let orgId=newHotel.org_id||manageableOrgs[0]?.id;
      if(admin&&createPartnerOrg){
        if(newHotel.org_name.trim().length<2)throw new Error("Cần nhập tên công ty đối tác.");
        const org=await supabase.from("hotel_partner_orgs")
          .insert({name:newHotel.org_name.trim(),kind:"hotel_supplier"}).select("id").single();
        if(org.error)throw org.error;
        orgId=org.data.id;
      }
      if(!orgId)throw new Error("Chưa có đơn vị đối tác hợp lệ. GoVietStay cần cấp quyền trước.");
      const {data:newId,error:createError}=await supabase.rpc("hotel_partner_add_property",{
        p_org_id:orgId,p_name:hotelName,
        p_city:newHotel.city.trim()||null,
        p_address:newHotel.address.trim()||null
      });
      if(createError)throw createError;
      setSelected(newId as string);
      setPropertyDraft({name:hotelName,address:newHotel.address,city:newHotel.city,description:"",maps_url:"",entrance_notes:""});
      setNewHotel({org_id:orgId,org_name:"",name:"",city:"",address:""});
      setCreatePartnerOrg(false);
      await refresh();
      setPage("property");
      setMessage("Đã thêm "+hotelName+" vào danh mục công ty. Hồ sơ mới ở trạng thái bản nháp; bạn có thể nhập phòng, ảnh và giá ngay.");
    }catch(err){setError(err instanceof Error?err.message:String(err));}
    finally{setWorking(false);}
  }
    async function linkPartner(){
    if(!hotel||!admin)return;setWorking(true);setError("");setMessage("");
    try{
      const {error}=await supabase.rpc("hotel_admin_link_partner",{p_org:hotel.org_id,p_email:memberEmail.trim(),p_role:memberRole});
      if(error)throw error;
      setMessage("Đã cấp quyền cho "+memberEmail+". Người dùng đăng nhập cổng đối tác để nhập liệu.");
      setMemberEmail("");
    }catch(err){setError(err instanceof Error?err.message:String(err));}finally{setWorking(false);}
  }
  function restoreDraft(r:Request){
    setSelected(r.property_id);setDraftId(r.id);
    if(r.kind==="room"){
      const d=r.payload;
      setRoomDraft({name:String(d.name||""),template:String(d.template||"custom"),area_sqm:String(d.area_sqm||""),bed_details:String(d.bed_details||""),max_adults:String(d.max_adults||2),max_children:String(d.max_children||0),view_details:String(d.view_details||""),breakfast_included:Boolean(d.breakfast_included),extra_bed:String(d.extra_bed||""),amenities:Array.isArray(d.amenities)?d.amenities as string[]:[],notes:String(d.notes||"")});
      setEditingRoom(r.target_id);setPage("room");
    }else if(r.kind==="property"){
      const d=r.payload;
      setPropertyDraft({name:String(d.name||""),address:String(d.address||""),city:String(d.city||""),description:String(d.description||""),maps_url:String(d.maps_url||""),entrance_notes:String(d.entrance_notes||"")});
      setPage("property");
    }
  }

  if(checking) return <div className="hv3-center"><div className="hv3-loading">Đang xác thực dữ liệu và phân quyền…</div></div>;
  if(!authUser) return <div className="hv3-center"><form className="hv3-auth" onSubmit={login}>
    <div className="hv3-logo">GVS</div><h1>GoVietStay Hotel Partner</h1>
    <p>Cổng nhập liệu khách sạn · Đăng nhập bằng tài khoản được GoVietStay cấp quyền</p>
    <label>Email</label><input type="email" required value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} placeholder="hotel@example.com"/>
    <label>Mật khẩu</label><input type="password" required minLength={6} value={loginPassword} onChange={e=>setLoginPassword(e.target.value)}/>
    <button className="hv3-primary" disabled={working}>{signup?"Tạo tài khoản":"Đăng nhập"}</button>
    <button type="button" className="hv3-text-button" onClick={()=>setSignup(!signup)}>{signup?"Đã có tài khoản? Đăng nhập":"Chưa có tài khoản? Đăng ký để GoVietStay cấp quyền"}</button>
    {error&&<p className="hv3-error">{error}</p>}{message&&<p className="hv3-note">{message}</p>}
    <a href="/hotel-partners">← Trang giới thiệu đối tác</a>
  </form></div>;
  if(!authorized) return <div className="hv3-center"><div className="hv3-auth"><div className="hv3-logo">GVS</div>
    <h1>Chờ cấp quyền khách sạn</h1><p>Tài khoản đã đăng nhập, nhưng chưa được gắn với khách sạn. Vui lòng gửi email đăng ký cho quản trị viên GoVietStay để được cấp quyền đúng đơn vị.</p>
    <button className="hv3-primary" onClick={()=>void refresh()}>Kiểm tra lại quyền</button><button className="hv3-text-button" onClick={()=>void logout()}>Đăng xuất</button>
  </div></div>;

  return <div className="hv3-app">
    <aside className="hv3-sidebar">
      <div className="hv3-brand"><div className="hv3-logo">GVS</div><div><strong>GoVietStay</strong><small>HOTEL PARTNER · V3</small></div></div>
      <div className="hv3-sidebar-section">QUẢN LÝ KHÁCH SẠN</div>
      <nav className="hv3-menu" aria-label="Điều hướng khách sạn">
        <button className={page==="catalog"?"active":""} onClick={()=>setPage("catalog")}>▦ <span>Danh mục khách sạn</span></button>
        <button className={page==="property"?"active":""} onClick={()=>{editProperty();setPage("property");}}>⌂ <span>Hồ sơ khách sạn</span></button>
        <button className={page==="room"?"active":""} onClick={()=>addRoom()}>▤ <span>Thêm hạng phòng nhanh</span></button>
        <button className={page==="photo"?"active":""} onClick={()=>{setDraftId(null);setPage("photo");}}>▧ <span>Hình ảnh & nhận diện</span></button>
        <button className={page==="rate"?"active":""} onClick={()=>{setDraftId(null);setPage("rate");}}>₫ <span>Giá & chính sách</span></button>
        <button className={page==="queue"?"active":""} onClick={()=>{setDraftId(null);setPage("queue");}}>✓ <span>{admin?"Kiểm duyệt":"Yêu cầu đã gửi"}</span><b>{pending.length}</b></button>
        {canAddHotel&&<button className={page==="onboard"?"active":""} onClick={()=>{setDraftId(null);setPage("onboard");}}>＋ <span>Thêm khách sạn</span></button>}
      </nav>
      <div className="hv3-side-foot"><span>● Dữ liệu Supabase thật</span><small>{admin?"Quyền chủ hệ thống":"Quyền đối tác khách sạn"}</small><button onClick={()=>void logout()}>Đăng xuất</button></div>
    </aside>
    <main className="hv3-main">
      <header className="hv3-header"><div><span className="hv3-eyebrow">GO VIETSTAY / OPERATIONS / HOTEL MANAGEMENT</span><h1>{page==="catalog"?"Hệ thống khách sạn":page==="room"?"Nhập hạng phòng nhanh":page==="property"?"Hồ sơ khách sạn":page==="photo"?"Hình ảnh khách sạn":page==="rate"?"Giá NET & chính sách":page==="queue"?"Trung tâm kiểm duyệt":"Thêm khách sạn mới"}</h1></div><div className="hv3-header-right"><span className="hv3-secure">🔒 Phân quyền Supabase</span><button onClick={()=>void refresh()} className="hv3-refresh">↻ Làm mới</button></div></header>
      {(error||message)&&<div role="status" className={error?"hv3-error":"hv3-success"}>{error||message}<button onClick={()=>{setError("");setMessage("");}} aria-label="Đóng thông báo">×</button></div>}
      <div className="hv3-stats"><div><small>KHÁCH SẠN ĐƯỢC QUẢN LÝ</small><strong>{properties.length}</strong><span>Tách biệt theo từng đối tác</span></div><div><small>HẠNG PHÒNG HIỆN CÓ</small><strong>{rooms.length}</strong><span>Chọn mẫu hoặc nhân bản</span></div><div><small>CHỜ GO VIETSTAY DUYỆT</small><strong>{pending.length}</strong><span>Thông tin chưa công bố</span></div><div><small>HÌNH ẢNH ĐÃ DUYỆT</small><strong>{photos.length}</strong><span>WebP · ảnh riêng tư</span></div></div>

      {page==="catalog"&&<>
        <div className="hv3-section-head"><div><h2>Danh mục khách sạn của {admin?"hệ thống":"đối tác"}</h2><p>Mỗi tài khoản đối tác được phép quản lý và thêm nhiều khách sạn trong công ty mình, không cần cấp tài khoản mới.</p></div>
          <div className="hv3-catalog-actions"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Tìm tên hoặc khu vực…" aria-label="Tìm khách sạn"/>
            {canAddHotel&&<button className="hv3-primary" onClick={()=>{setDraftId(null);setPage("onboard");}}>＋ Thêm khách sạn</button>}
          </div></div>
        <div className="hv3-grid">{filtered.map(p=><button className="hv3-property-card" key={p.id} onClick={()=>openProperty(p)}>
          <SkeletonPhoto url={photos.find(x=>x.property_id===p.id&&!x.room_id&&x.is_cover)?.url||photos.find(x=>x.property_id===p.id&&!x.room_id)?.url} alt={p.name}/>
          <div className="hv3-card-body"><div className="hv3-row"><span className="hv3-code">{p.pilot_code||"HOTEL"}</span><span className={p.status==="published"?"hv3-status ok":"hv3-status"}>{p.status==="published"?"Đã duyệt":"Bản nháp"}</span></div><h3>{p.name}</h3><p>⌖ {p.address||p.city||"Chưa bổ sung địa chỉ"}</p><div className="hv3-card-end"><span>{rooms.filter(r=>r.property_id===p.id).length} hạng phòng</span><span>Xem chi tiết →</span></div></div>
        </button>)}</div>
        {!filtered.length&&<p>Chưa tìm thấy khách sạn phù hợp.</p>}
      </>}

      {page!=="catalog"&&page!=="onboard"&&<div className="hv3-context">
        <label htmlFor="hv3-hotel">ĐANG LÀM VIỆC VỚI</label>
        <select id="hv3-hotel" value={selected} onChange={e=>{const p=properties.find(x=>x.id===e.target.value);if(p){setSelected(p.id);setDraftId(null);setPhotoTarget("hotel");setPriceForm(v=>({...v,room_id:""}));setPropertyDraft({name:p.name,address:p.address||"",city:p.city||"",description:p.description||"",maps_url:p.maps_url||"",entrance_notes:p.entrance_notes||""});}}}>
          {properties.map(p=><option value={p.id} key={p.id}>{p.name}</option>)}
        </select><span>{hotel?.status==="published"?"Thông tin đã công bố":"Chưa công bố — cần duyệt"}</span>
      </div>}

      {page==="property"&&hotel&&<>
        <div className="hv3-cols">
          <section className="hv3-panel"><div className="hv3-panel-head"><h2>Thông tin khách sạn</h2><span>BƯỚC 1 / 5</span></div>
            <div className="hv3-two"><label>Tên khách sạn<input value={propertyDraft.name} onChange={e=>setPropertyDraft(v=>({...v,name:e.target.value}))}/></label><label>Thành phố<input value={propertyDraft.city} onChange={e=>setPropertyDraft(v=>({...v,city:e.target.value}))}/></label></div>
            <label>Địa chỉ đầy đủ<input value={propertyDraft.address} onChange={e=>setPropertyDraft(v=>({...v,address:e.target.value}))}/></label>
            <label>Link Google Maps<input value={propertyDraft.maps_url} onChange={e=>setPropertyDraft(v=>({...v,maps_url:e.target.value}))} placeholder="https://maps.app.goo.gl/…"/></label>
            <label>Mô tả ngắn<textarea value={propertyDraft.description} onChange={e=>setPropertyDraft(v=>({...v,description:e.target.value}))} rows={3}/></label>
            <label>Hướng dẫn nhận diện lối vào / điểm đón xe<textarea value={propertyDraft.entrance_notes} onChange={e=>setPropertyDraft(v=>({...v,entrance_notes:e.target.value}))} rows={2} placeholder="Ví dụ: cửa vào bên phải tòa nhà, xe đón trước sảnh…"/></label>
            <div className="hv3-actions"><button className="hv3-secondary" disabled={working} onClick={()=>void submit("property",propertyDraft,null,true)}>Lưu nháp</button><button className="hv3-primary" disabled={working} onClick={()=>void submit("property",propertyDraft)}>Gửi GoVietStay duyệt →</button></div>
          </section>
          <aside className="hv3-preview"><span className="hv3-eyebrow">XEM TRƯỚC</span><SkeletonPhoto url={hotelPhotos[0]?.url} alt={hotel.name}/><h2>{propertyDraft.name||hotel.name}</h2><p>⌖ {propertyDraft.address||"Chưa nhập địa chỉ"}</p><p>{propertyDraft.description||"Chưa có mô tả"}</p><div className="hv3-info">▧ {hotelPhotos.length}/6 ảnh tổng quan</div><div className="hv3-info">▤ {hotelRooms.length} hạng phòng</div><small>Thay đổi cần được duyệt trước khi công bố.</small></aside>
        </div>
        <div className="hv3-section-head"><h2>Danh sách hạng phòng</h2><button className="hv3-primary" onClick={()=>addRoom()}>+ Thêm phòng</button></div>
        <div className="hv3-room-list">{hotelRooms.map(r=><div className="hv3-room" key={r.id}><SkeletonPhoto room url={roomPhoto(r.id)} alt={r.name}/><div><span className="hv3-code">{r.pilot_code||"ROOM"}</span><h3>{r.name}</h3><p>{r.area_sqm?r.area_sqm+" m² · ":""}{r.bed_details||"Chưa rõ giường"} · {r.max_adults||"?"} người lớn</p><div className="hv3-mini-tags">{r.breakfast_included&&<span>Ăn sáng</span>}{r.view_details&&<span>{r.view_details}</span>}<span>{r.status==="published"?"Đã công bố":"Bản nháp"}</span></div></div><div className="hv3-room-buttons"><button onClick={()=>modifyRoom(r)}>Chỉnh sửa</button><button onClick={()=>addRoom(r)}>Nhân bản</button></div></div>)}</div>
      </>}

      {page==="room"&&hotel&&<div className="hv3-cols"><section className="hv3-panel"><div className="hv3-panel-head"><h2>{editingRoom?"Đề nghị sửa phòng":"Tạo hạng phòng nhanh"}</h2><span>BƯỚC 2 / 5</span></div>
        <div className="hv3-two"><label>Mẫu hạng phòng<select value={roomDraft.template} onChange={e=>setRoomDraft(v=>({...v,template:e.target.value,name:v.name||e.target.value}))}>{TEMPLATES.map(t=><option key={t}>{t}</option>)}</select></label><label>Tên hạng phòng *<input value={roomDraft.name} onChange={e=>setRoomDraft(v=>({...v,name:e.target.value}))} placeholder="Deluxe Ocean King"/></label></div>
        <div className="hv3-three"><label>Diện tích (m²)<input inputMode="decimal" value={roomDraft.area_sqm} onChange={e=>setRoomDraft(v=>({...v,area_sqm:e.target.value}))}/></label><label>Người lớn tối đa<input type="number" min={1} max={30} value={roomDraft.max_adults} onChange={e=>setRoomDraft(v=>({...v,max_adults:e.target.value}))}/></label><label>Trẻ em tối đa<input type="number" min={0} max={30} value={roomDraft.max_children} onChange={e=>setRoomDraft(v=>({...v,max_children:e.target.value}))}/></label></div>
        <div className="hv3-two"><label>Giường<select value={roomDraft.bed_details} onChange={e=>setRoomDraft(v=>({...v,bed_details:e.target.value}))}>{BEDS.map(t=><option key={t}>{t}</option>)}{!BEDS.includes(roomDraft.bed_details)&&<option value={roomDraft.bed_details}>{roomDraft.bed_details}</option>}</select></label><label>Hướng nhìn<select value={roomDraft.view_details} onChange={e=>setRoomDraft(v=>({...v,view_details:e.target.value}))}>{VIEWS.map(t=><option key={t}>{t}</option>)}{!VIEWS.includes(roomDraft.view_details)&&<option value={roomDraft.view_details}>{roomDraft.view_details}</option>}</select></label></div>
        <div className="hv3-two"><label>Giường phụ<select value={roomDraft.extra_bed} onChange={e=>setRoomDraft(v=>({...v,extra_bed:e.target.value}))}>{["Không","Có, tính phí","Có, miễn phí","Theo yêu cầu","Chưa rõ"].map(t=><option key={t}>{t}</option>)}</select></label><label className="hv3-check"> <input type="checkbox" checked={roomDraft.breakfast_included} onChange={e=>setRoomDraft(v=>({...v,breakfast_included:e.target.checked}))}/> Bao gồm ăn sáng</label></div>
        <label className="hv3-field-label">Tiện nghi — tích chọn nhanh</label><div className="hv3-chipgrid">{AMENITIES.map(t=><button type="button" key={t} className={roomDraft.amenities.includes(t)?"chosen":""} onClick={()=>setRoomDraft(v=>({...v,amenities:v.amenities.includes(t)?v.amenities.filter(s=>s!==t):[...v.amenities,t]}))}>{roomDraft.amenities.includes(t)?"✓ ":"+ "}{t}</button>)}</div>
        <label>Ghi chú / chính sách riêng<textarea value={roomDraft.notes} onChange={e=>setRoomDraft(v=>({...v,notes:e.target.value}))} rows={2}/></label>
        <div className="hv3-actions"><button className="hv3-secondary" disabled={working} onClick={()=>void submit("room",roomDraft,editingRoom,true)}>Lưu nháp</button><button className="hv3-primary" disabled={working} onClick={()=>void submit("room",roomDraft,editingRoom)}>Gửi duyệt phòng →</button></div>
      </section><aside className="hv3-preview"><span className="hv3-eyebrow">PREVIEW TRỰC TIẾP</span><SkeletonPhoto alt={roomDraft.name||"Hạng phòng"}/><h2>{roomDraft.name||"Nhập tên hạng phòng"}</h2><p>{roomDraft.area_sqm?roomDraft.area_sqm+" m² · ":""}{roomDraft.bed_details}</p><div className="hv3-info">♙ {roomDraft.max_adults} người lớn · {roomDraft.max_children} trẻ em</div><div className="hv3-info">⌖ {roomDraft.view_details}</div><div className="hv3-info">{roomDraft.breakfast_included?"✓ Bao gồm ăn sáng":"Không bao gồm ăn sáng"}</div><div className="hv3-mini-tags">{roomDraft.amenities.map(t=><span key={t}>{t}</span>)}</div><small>Để tạo nhanh 10 phòng giống nhau: tạo 1 phòng, sau đó dùng “Nhân bản” để chỉnh phần khác biệt.</small></aside></div>}

      {page==="photo"&&hotel&&<div className="hv3-cols"><section className="hv3-panel"><div className="hv3-panel-head"><h2>Tải ảnh thật — tự động tối ưu</h2><span>BƯỚC 3 / 5</span></div><p className="hv3-muted">Một ảnh đại diện mỗi hạng phòng, tối đa 6 ảnh tổng quan khách sạn. Hệ thống tự đổi thành WebP và cố gắng nén dưới 300 KB, giữ nguyên tỷ lệ.</p>
        <label>Vị trí hình ảnh<select value={photoTarget} onChange={e=>setPhotoTarget(e.target.value)}><option value="hotel">Ảnh tổng quan khách sạn · {hotelPhotos.length}/6 đã duyệt</option>{hotelRooms.map(r=><option value={r.id} key={r.id}>Phòng: {r.name} · {photos.filter(p=>p.room_id===r.id).length}/1</option>)}</select></label>
        <label>Chọn ảnh JPG / PNG / WebP từ điện thoại<input type="file" accept="image/*" onChange={e=>setImageFile(e.target.files?.[0]||null)}/></label>
        {imageFile&&<p className="hv3-muted">Đã chọn: {imageFile.name} ({Math.round(imageFile.size/1024)} KB trước khi tối ưu)</p>}
        <button className="hv3-primary" disabled={working||!imageFile} onClick={()=>void uploadPhoto()}>{working?"Đang xử lý…":"Nén ảnh & gửi kiểm duyệt →"}</button>
      </section><aside className="hv3-preview"><span className="hv3-eyebrow">QUY TẮC HÌNH ẢNH</span><h2>Nhẹ, đủ và dễ nhận diện</h2><div className="hv3-info">✓ 1 ảnh đại diện khách sạn</div><div className="hv3-info">✓ Tối đa 6 ảnh tổng quan</div><div className="hv3-info">✓ Mỗi phòng 1 ảnh</div><div className="hv3-info">✓ Ưu tiên mặt tiền, bảng hiệu, lối vào, điểm đón xe</div><div className="hv3-info">✓ Giới hạn lưu trữ 2 MB/ảnh, WebP riêng tư</div><small>Ảnh chỉ xuất hiện sau khi GoVietStay duyệt. Tối đa 24 lượt tải ảnh chờ/đã duyệt trong một hồ sơ trước khi quản trị dọn ảnh cũ.</small></aside></div>}

      {page==="rate"&&hotel&&<div className="hv3-cols"><section className="hv3-panel"><div className="hv3-panel-head"><h2>Giá phòng theo thời gian</h2><span>BƯỚC 4 / 5</span></div><p className="hv3-muted">Giá NET chỉ hiển thị với quản trị GoVietStay. Đối tác nhập giá hợp đồng hoặc giá trước chiết khấu để quản trị duyệt.</p>
        <label>Hạng phòng<select value={priceForm.room_id} onChange={e=>setPriceForm(v=>({...v,room_id:e.target.value}))}><option value="">Chọn hạng phòng</option>{hotelRooms.map(r=><option value={r.id} key={r.id}>{r.name}</option>)}</select></label>
        <div className="hv3-two"><label>Từ ngày<input type="date" value={priceForm.valid_from} onChange={e=>setPriceForm(v=>({...v,valid_from:e.target.value}))}/></label><label>Đến ngày<input type="date" min={priceForm.valid_from||today()} value={priceForm.valid_until} onChange={e=>setPriceForm(v=>({...v,valid_until:e.target.value}))}/></label></div>
        <div className="hv3-two"><label>Giá nguồn (VND/phòng/đêm)<input type="number" min={1} value={priceForm.supplier_price_vnd} onChange={e=>setPriceForm(v=>({...v,supplier_price_vnd:e.target.value}))}/></label><label>Chiết khấu NET (%)<input type="number" min={0} max={100} step=".01" value={priceForm.discount_percent} onChange={e=>setPriceForm(v=>({...v,discount_percent:e.target.value}))}/></label></div>
        <div className="hv3-two"><label className="hv3-check"><input type="checkbox" checked={priceForm.includes_breakfast} onChange={e=>setPriceForm(v=>({...v,includes_breakfast:e.target.checked}))}/> Gồm ăn sáng</label><label className="hv3-check"><input type="checkbox" checked={priceForm.includes_tax} onChange={e=>setPriceForm(v=>({...v,includes_tax:e.target.checked}))}/> Gồm thuế phí</label></div>
        <label>Điều kiện / ngày loại trừ<textarea value={priceForm.conditions} onChange={e=>setPriceForm(v=>({...v,conditions:e.target.value}))} rows={3} placeholder="Không áp dụng lễ, Tết; phụ thu cuối tuần…"/></label>
        <button className="hv3-primary" disabled={working||!priceForm.room_id||!priceForm.valid_from||!priceForm.valid_until} onClick={()=>void submit("rate",priceForm)}>Gửi giá để quản trị duyệt →</button>
      </section><aside className="hv3-preview"><span className="hv3-eyebrow">GIÁ NET TÍNH TỰ ĐỘNG</span><h2>{priceForm.supplier_price_vnd?PRICE_FORMAT(Number(priceForm.supplier_price_vnd)*(1-Number(priceForm.discount_percent||0)/100)):"—"}</h2><p>Giá được tính thử trên biểu mẫu, chưa được công bố.</p><div className="hv3-info">Giá nguồn: {priceForm.supplier_price_vnd?PRICE_FORMAT(Number(priceForm.supplier_price_vnd)):"—"}</div><div className="hv3-info">Chiết khấu: {priceForm.discount_percent||0}%</div><div className="hv3-info">Hiệu lực: {priceForm.valid_from||"…"} đến {priceForm.valid_until||"…"}</div>{admin&&<><h3>Giá đã duyệt</h3>{hotelRooms.filter(r=>roomRate(r.id)).slice(0,12).map(r=><div className="hv3-info" key={r.id}>{r.name}: {PRICE_FORMAT(roomRate(r.id)!.net_price_vnd)}</div>)}</>}<small>Không hiển thị cho tài khoản khách hoặc đối tác không có quyền.</small></aside></div>}

      {page==="queue"&&<><div className="hv3-section-head"><div><h2>{admin?"Yêu cầu cần phê duyệt":"Tiến độ gửi hồ sơ"}</h2><p>GoVietStay duyệt hoặc yêu cầu sửa trước khi dữ liệu được công bố.</p></div></div>
        <div className="hv3-queue">{requests.filter(r=>!selected||r.property_id===selected||admin).map(r=><article className="hv3-request" key={r.id}>
          <div className="hv3-request-top"><div><span className="hv3-code">{({property:"Hồ sơ khách sạn",room:"Hạng phòng",photo:"Hình ảnh",rate:"Giá NET"} as Record<string,string>)[r.kind]||r.kind}</span><h3>{properties.find(p=>p.id===r.property_id)?.name||"Khách sạn"}</h3><small>{new Date(r.created_at).toLocaleString("vi-VN")} · {r.target_id?"Đề nghị cập nhật":"Đề nghị mới"}</small></div><span className={r.status==="approved"?"hv3-status ok":"hv3-status"}>{({draft:"Bản nháp",submitted:"Chờ duyệt",approved:"Đã duyệt",rejected:"Từ chối"} as Record<string,string>)[r.status]||r.status}</span></div>
          <div className="hv3-request-details">{Object.entries(r.payload||{}).filter(([k])=>!["storage_path"].includes(k)).slice(0,6).map(([k,v])=><span key={k}><b>{k}</b>: {Array.isArray(v)?v.join(", "):String(v??"—").slice(0,130)}</span>)}</div>
          {r.review_note&&<p className="hv3-muted">Ghi chú kiểm duyệt: {r.review_note}</p>}
          {r.status==="draft"&&r.created_by===authUser&&r.kind!=="photo"&&r.kind!=="rate"&&<button className="hv3-secondary" onClick={()=>restoreDraft(r)}>Tiếp tục chỉnh sửa bản nháp</button>}
          {admin&&r.status==="submitted"&&<div className="hv3-review-actions"><input placeholder="Ghi chú (nếu cần)" value={reviewNote} onChange={e=>setReviewNote(e.target.value)}/><button className="hv3-secondary" disabled={working} onClick={()=>void review(r,"rejected")}>Yêu cầu sửa / từ chối</button><button className="hv3-primary" disabled={working} onClick={()=>void review(r,"approved")}>✓ Duyệt & lưu</button></div>}
        </article>)}</div>
        {!requests.length&&<div className="hv3-empty">Chưa có yêu cầu. Đối tác bắt đầu nhập thông tin và bấm “Gửi duyệt”.</div>}
      </>}

      {page==="onboard"&&canAddHotel&&<div className="hv3-cols">
        <section className="hv3-panel">
          <div className="hv3-panel-head"><h2>Thêm khách sạn vào danh mục</h2><span>{admin?"ADMIN / ĐỐI TÁC":"TÀI KHOẢN ĐỐI TÁC"}</span></div>
          <p className="hv3-muted">Cùng một tài khoản, bạn có thể tự thêm nhiều khách sạn. Mỗi khách sạn được lưu riêng trong cùng đơn vị hợp tác, không cần tạo tài khoản mới.</p>
          {admin&&<label className="hv3-check"><input type="checkbox" checked={createPartnerOrg} onChange={e=>setCreatePartnerOrg(e.target.checked)}/> Đây là công ty đối tác hoàn toàn mới</label>}
          {admin&&createPartnerOrg?
            <label>Tên công ty đối tác mới<input value={newHotel.org_name} onChange={e=>setNewHotel(v=>({...v,org_name:e.target.value}))} placeholder="Ví dụ: ABC Hotel Group"/></label>:
            <label>Đơn vị sở hữu danh mục khách sạn
              <select value={newHotel.org_id||manageableOrgs[0]?.id||""} onChange={e=>setNewHotel(v=>({...v,org_id:e.target.value}))}>
                {manageableOrgs.map(o=><option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
            </label>}
          <label>Tên khách sạn mới *<input value={newHotel.name} onChange={e=>setNewHotel(v=>({...v,name:e.target.value}))} placeholder="Ví dụ: ABC Boutique Hotel"/></label>
          <div className="hv3-two">
            <label>Tỉnh / thành phố<input value={newHotel.city} onChange={e=>setNewHotel(v=>({...v,city:e.target.value}))} placeholder="Đà Nẵng"/></label>
            <label>Địa chỉ<input value={newHotel.address} onChange={e=>setNewHotel(v=>({...v,address:e.target.value}))} placeholder="Địa chỉ khách sạn"/></label>
          </div>
          <div className="hv3-actions"><button className="hv3-secondary" onClick={()=>setPage("catalog")}>Quay lại danh mục</button>
            <button className="hv3-primary" disabled={working||!newHotel.name.trim()||(!createPartnerOrg&&!manageableOrgs.length)} onClick={()=>void onboard()}>
              {working?"Đang tạo…":"＋ Tạo hồ sơ khách sạn"}
            </button></div>
        </section>
        <aside className="hv3-panel">
          {admin?<><div className="hv3-panel-head"><h2>Cấp quyền nhân viên</h2><span>MỘT CÔNG TY · NHIỀU KHÁCH SẠN</span></div>
            <p className="hv3-muted">Đối tác đăng ký một tài khoản trước, GoVietStay cấp quyền ở cấp công ty. Nhân viên được cấp quyền sẽ thấy toàn bộ khách sạn cùng đơn vị, không phải từng khách sạn riêng.</p>
            <label>Chọn một khách sạn thuộc công ty cần cấp quyền
              <select value={selected} onChange={e=>setSelected(e.target.value)}>
                {properties.map(p=><option key={p.id} value={p.id}>{p.name} — {orgs.find(o=>o.id===p.org_id)?.name||""}</option>)}
              </select></label>
            <label>Email tài khoản đối tác đã đăng ký<input type="email" value={memberEmail} onChange={e=>setMemberEmail(e.target.value)} placeholder="manager@company.com"/></label>
            <label>Vai trò<select value={memberRole} onChange={e=>setMemberRole(e.target.value)}>
              {["editor","manager","viewer","owner"].map(role=><option key={role} value={role}>{role}</option>)}</select></label>
            <button className="hv3-primary" disabled={working||!memberEmail||!hotel} onClick={()=>void linkPartner()}>Cấp quyền toàn bộ danh mục của công ty</button>
          </>:<><div className="hv3-panel-head"><h2>Quy trình rất đơn giản</h2><span>THÊM NHIỀU KHÁCH SẠN</span></div>
            <div className="hv3-info">1. Nhập tên và địa chỉ khách sạn</div>
            <div className="hv3-info">2. Bấm “Tạo hồ sơ khách sạn”</div>
            <div className="hv3-info">3. Chọn các hạng phòng từ danh sách xổ xuống</div>
            <div className="hv3-info">4. Thêm tối đa 6 ảnh khách sạn, 1 ảnh cho mỗi phòng</div>
            <div className="hv3-info">5. Nhập giá, chính sách và gửi GoVietStay duyệt</div>
            <p className="hv3-muted">Hoàn tất một khách sạn, bạn chỉ cần quay về danh mục và bấm “+ Thêm khách sạn” cho khách sạn tiếp theo.</p>
          </>}
        </aside>
      </div>}
            <footer className="hv3-footer">GoVietStay Hotel Partner Management V3 · Dữ liệu có phân quyền · Không nhận booking tự động · Ảnh WebP riêng tư · Nội dung chưa duyệt không công bố</footer>
    </main>
  </div>;
}
