"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import "../../../components/admin-v5/admin-v5.css";

const db = createClient("https://vscffgnxaexestnayvae.supabase.co", "sb_publishable_BI1rIhiGB5cEUyJbnKGI5w_kCMI--oV", {auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
type Role = "owner"|"admin"|"desk"|"sales"|"finance"|"partner_manager"|"guide"|"viewer";
type Staff = {id:string;display_name:string;role:Role;active:boolean;auth_user_id:string|null;sales_code:string|null;allow_booking_portal:boolean};
type Permission = {role:Role;module:string;action:string;scope:"none"|"own"|"all"};
const roles:Role[] = ["sales","desk","finance","partner_manager","guide","viewer","admin"];
const names:Record<Role,string>={owner:"Owner",admin:"Admin",desk:"Điều phối / Desk",sales:"Sales",finance:"Kế toán / Finance",partner_manager:"Quản lý đối tác",guide:"Hướng dẫn viên",viewer:"Chỉ xem"};
const livePermissions=[
  {module:"bookings",action:"read",name:"Booking · xem",hint:"Sales có thể chỉ xem booking của mình."},
  {module:"bookings",action:"create",name:"Booking · tạo",hint:"Phạm vi cá nhân gắn với staff_id của người đăng nhập."},
  {module:"contacts",action:"read",name:"Khách hàng · xem",hint:"Cá nhân: khách tạo bởi nhân viên hoặc thuộc booking của nhân viên."},
  {module:"contacts",action:"create",name:"Khách hàng · tạo",hint:"Cá nhân: hệ thống tự ghi nhận người tạo."},
  {module:"finance",action:"read",name:"Tài chính · xem",hint:"Chỉ đọc dữ liệu giao dịch và các bảng tài chính đã nối quyền; không được xác nhận thanh toán."}
] as const;
const futureModules=["Dashboard tổng hợp","Điều phối nâng cao","Hướng dẫn viên","Partner","Marketing","SEO","Payroll","Duyệt / chốt thanh toán"];
const panel:React.CSSProperties={background:"#fff",border:"1px solid #dbe5e7",borderRadius:16,padding:20,boxShadow:"0 2px 10px rgba(9,39,42,.045)"};
const field:React.CSSProperties={width:"100%",minHeight:42,padding:"9px 12px",border:"1px solid #cbd8d9",borderRadius:9,background:"#fff",color:"#183236"};
const small:React.CSSProperties={color:"#587073",fontSize:13,lineHeight:1.5};
function errorText(error:any){return error?.message||"Thao tác không thành công. Vui lòng thử lại.";}

export default function PersonnelPermissionsPage(){
  const [loading,setLoading]=useState(true);
  const [isOwner,setIsOwner]=useState(false);
  const [people,setPeople]=useState<Staff[]>([]);
  const [permissions,setPermissions]=useState<Permission[]>([]);
  const [role,setRole]=useState<Role>("sales");
  const [name,setName]=useState("");
  const [newRole,setNewRole]=useState<Role>("sales");
  const [emails,setEmails]=useState<Record<string,string>>({});
  const [busy,setBusy]=useState("");
  const [notice,setNotice]=useState("");
  const [error,setError]=useState("");
  async function load(){
    setError("");
    try{
      const {data:{user},error:userError}=await db.auth.getUser();
      if(userError||!user){setIsOwner(false);return;}
      const me=await db.from("staff_profiles").select("id,role,active").eq("auth_user_id",user.id).maybeSingle();
      if(me.error)throw me.error;
      if(!me.data?.active||me.data.role!=="owner"){setIsOwner(false);return;}
      setIsOwner(true);
      const [staffResult,permissionResult]=await Promise.all([
        db.from("staff_profiles").select("id,display_name,role,active,auth_user_id,sales_code,allow_booking_portal").order("display_name"),
        db.from("govietstay_role_permissions").select("role,module,action,scope")
      ]);
      if(staffResult.error)throw staffResult.error;
      if(permissionResult.error)throw permissionResult.error;
      setPeople((staffResult.data||[]) as Staff[]);
      setPermissions((permissionResult.data||[]) as Permission[]);
    }catch(e:any){setError(errorText(e));}
    finally{setLoading(false);}
  }
  useEffect(()=>{void load();},[]);
  async function perform(key:string,work:()=>Promise<void>,success:string){
    setBusy(key);setError("");setNotice("");
    try{await work();setNotice(success);await load();}
    catch(e:any){setError(errorText(e));}
    finally{setBusy("");}
  }
  async function createStaff(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();const display_name=name.trim();if(display_name.length<2)return setError("Nhập tên nhân viên từ 2 ký tự.");
    if(newRole==="admin"&&!window.confirm("Cấp Admin có quyền truy cập quản trị rất rộng. Anh xác nhận tạo nhân viên với quyền Admin?"))return;
    await perform("new",async()=>{
      const {error}=await db.from("staff_profiles").insert({display_name,role:newRole,active:true,allow_booking_portal:false});
      if(error)throw error;setName("");
    },"Đã tạo hồ sơ nhân viên. Liên kết email đã xác minh bên dưới để nhân viên đăng nhập.");
  }
  async function changeRole(person:Staff,value:Role){
    if(person.role==="owner")return;
    if(value==="admin"&&!window.confirm(`Cấp Admin cho ${person.display_name}? Admin có quyền quản trị rộng.`))return;
    if(!window.confirm(`Đổi vai trò ${person.display_name}: ${names[person.role]} → ${names[value]}?`))return;
    await perform(person.id+"-role",async()=>{
      const {data,error}=await db.from("staff_profiles").update({role:value}).eq("id",person.id).eq("role",person.role).select("id").maybeSingle();
      if(error)throw error;if(!data)throw new Error("Hồ sơ đã thay đổi; hãy tải lại trước khi sửa.");
    },"Đã cập nhật vai trò và áp dụng cho phiên truy cập tiếp theo của nhân viên.");
  }
  async function toggleActive(person:Staff){
    if(person.role==="owner")return;
    if(!window.confirm(`${person.active?"Khóa":"Kích hoạt lại"} tài khoản ${person.display_name}?`))return;
    await perform(person.id+"-active",async()=>{
      const {data,error}=await db.from("staff_profiles").update({active:!person.active}).eq("id",person.id).eq("active",person.active).select("id").maybeSingle();
      if(error)throw error;if(!data)throw new Error("Hồ sơ đã thay đổi; tải lại trang.");
    },person.active?"Đã vô hiệu hóa quyền truy cập nhân viên trên database.":"Đã kích hoạt lại hồ sơ nhân viên.");
  }
  async function linkAccount(person:Staff){
    const email=(emails[person.id]||"").trim();
    if(!email||!email.includes("@"))return setError("Nhập email tài khoản đã xác minh của nhân viên.");
    if(!window.confirm(`Liên kết hồ sơ ${person.display_name} với tài khoản ${email}?`))return;
    await perform(person.id+"-link",async()=>{
      const {error}=await db.rpc("admin_link_staff_account",{p_staff_id:person.id,p_email:email});
      if(error)throw error;setEmails(prev=>({...prev,[person.id]:""}));
    },"Đã liên kết tài khoản đã xác minh. Nhân viên có thể đăng nhập bằng email của mình.");
  }
  function scopeFor(module:string,action:string):Permission["scope"]{
    return permissions.find(p=>p.role===role&&p.module===module&&p.action===action)?.scope||"none";
  }
  async function setScope(module:string,action:string,scope:Permission["scope"]){
    if(!window.confirm(`Áp dụng: ${names[role]} · ${module}/${action} → ${scope}?`))return;
    await perform(role+module+action,async()=>{
      const {error}=await db.from("govietstay_role_permissions").upsert({role,module,action,scope,updated_at:new Date().toISOString()},{onConflict:"role,module,action"});
      if(error)throw error;
    },"Đã lưu quyền vào Supabase. Chính sách RLS sẽ kiểm tra quyền mới ở lần truy vấn tiếp theo.");
  }
  if(loading)return <main style={{padding:32}}>Đang kiểm tra tài khoản Owner…</main>;
  if(!isOwner)return <main style={{padding:32,maxWidth:760,margin:"auto"}}><h1>Nhân sự & Phân quyền</h1><p>Chỉ tài khoản Owner đã đăng nhập mới có thể mở trang này.</p><Link href="/admin">← Về Admin / đăng nhập</Link>{error&&<p role="alert">{error}</p>}</main>;
  return <main style={{minHeight:"100vh",background:"#f3f7f7",padding:"clamp(12px,3vw,36px)",color:"#163537"}}>
    <div style={{maxWidth:1260,margin:"auto",display:"grid",gap:20}}>
      <header style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:14}}>
        <div><Link href="/admin" style={{color:"#007e75",fontWeight:700}}>← Admin chính</Link><h1 style={{margin:"10px 0 4px",fontSize:"clamp(25px,4vw,36px)"}}>Nhân sự & Phân quyền</h1><p style={small}>Chỉ Owner được thay vai trò, kích hoạt tài khoản và cấp quyền. Mọi chỉnh sửa được lưu trực tiếp trên Supabase.</p></div>
        <button type="button" className="gva-btn secondary" onClick={()=>void load()} disabled={!!busy}>↻ Làm mới</button>
      </header>
      {error&&<div role="alert" style={{padding:14,background:"#fff0ef",borderRadius:10,color:"#a51f17"}}>{error}</div>}
      {notice&&<div role="status" style={{padding:14,background:"#e6f7ef",borderRadius:10,color:"#075e48"}}>{notice}</div>}
      <section style={panel}><h2 style={{marginTop:0}}>Thêm nhân viên</h2><form onSubmit={createStaff} style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12,alignItems:"end"}}>
        <label>Họ tên<input style={field} value={name} required minLength={2} onChange={e=>setName(e.target.value)} placeholder="Tên nhân viên" /></label>
        <label>Vai trò<select style={field} value={newRole} onChange={e=>setNewRole(e.target.value as Role)}>{roles.map(r=><option key={r} value={r}>{names[r]}</option>)}</select></label>
        <button className="gva-btn" disabled={!!busy}>{busy==="new"?"Đang tạo…":"+ Tạo hồ sơ"}</button>
      </form><p style={small}>Tạo hồ sơ không tự tạo mật khẩu, không gửi lời mời và không mở cổng Sales PIN. Nhân viên cần tài khoản Supabase Auth đã xác minh email trước khi Owner liên kết.</p></section>
      <section style={panel}><h2 style={{marginTop:0}}>Danh sách nhân sự ({people.length})</h2><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:720}}><thead><tr style={{textAlign:"left",background:"#eaf4f1"}}>{["Nhân viên","Vai trò","Trạng thái","Tài khoản đăng nhập","Hành động"].map(x=><th key={x} style={{padding:12}}>{x}</th>)}</tr></thead><tbody>
        {people.map(person=><tr key={person.id} style={{borderBottom:"1px solid #e2eaea"}}><td style={{padding:12}}><strong>{person.display_name}</strong>{person.sales_code&&<div style={small}>{person.sales_code}</div>}</td><td style={{padding:12}}>{person.role==="owner"?<strong>Owner · cố định</strong>:<select aria-label={`Vai trò của ${person.display_name}`} style={{...field,minWidth:150}} value={person.role} disabled={!!busy} onChange={e=>void changeRole(person,e.target.value as Role)}>{roles.map(r=><option key={r} value={r}>{names[r]}</option>)}</select>}</td><td style={{padding:12}}><span style={{fontWeight:700,color:person.active?"#087d58":"#a32b2b"}}>{person.active?"Đang hoạt động":"Đã khóa"}</span></td><td style={{padding:12}}>{person.auth_user_id?<span style={{color:"#067456",fontWeight:700}}>✓ Đã liên kết</span>:<div style={{display:"flex",gap:6,minWidth:240}}><input aria-label={`Email đã xác minh của ${person.display_name}`} style={{...field,minWidth:160}} type="email" placeholder="Email đã xác minh" value={emails[person.id]||""} disabled={!!busy} onChange={e=>setEmails(prev=>({...prev,[person.id]:e.target.value}))}/><button className="gva-btn secondary" type="button" disabled={!!busy||!person.active} onClick={()=>void linkAccount(person)}>Liên kết</button></div>}</td><td style={{padding:12}}>{person.role==="owner"?<span style={small}>Không được khóa</span>:<button type="button" className="gva-btn secondary" disabled={!!busy} onClick={()=>void toggleActive(person)}>{person.active?"Khóa":"Kích hoạt"}</button>}</td></tr>)}
      </tbody></table></div></section>
      <section style={panel}><h2 style={{marginTop:0}}>Ma trận quyền đang có hiệu lực</h2><p style={small}>Anh chỉnh theo vai trò; tất cả nhân viên cùng vai trò áp dụng chung. <strong>None</strong> = không cấp, <strong>Own</strong> = dữ liệu của mình, <strong>All</strong> = toàn bộ dữ liệu trong phạm vi chức năng. Quyền Owner/Admin đang cố định vì các hàm Admin cũ chưa hỗ trợ chỉnh chi tiết.</p>
      <label style={{display:"block",maxWidth:340,marginBottom:18}}>Chọn vai trò<select style={field} value={role} onChange={e=>setRole(e.target.value as Role)}>{roles.filter(r=>r!=="admin").map(r=><option key={r} value={r}>{names[r]}</option>)}</select></label>
      <div style={{display:"grid",gap:10}}>{livePermissions.map(item=><div key={item.module+item.action} style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,padding:13,border:"1px solid #e1eaea",borderRadius:10}}><div style={{flex:"1 1 260px"}}><strong>{item.name}</strong><div style={small}>{item.hint}</div></div><select aria-label={`Quyền ${item.name} của ${names[role]}`} style={{...field,maxWidth:170}} value={scopeFor(item.module,item.action)} disabled={!!busy} onChange={e=>void setScope(item.module,item.action,e.target.value as Permission["scope"])}><option value="none">Không có</option>{item.module!=="finance"&&<option value="own">Chỉ của mình</option>}<option value="all">Toàn bộ</option></select></div>)}</div>
      <div style={{marginTop:20,padding:14,background:"#fff7e4",borderRadius:10,color:"#725018"}}><strong>Các mục chưa cho chỉnh trong phiên bản này:</strong><p style={{margin:"6px 0 0"}}>{futureModules.join(" · ")}. Các màn hình/hàm cũ vẫn kiểm tra vai trò cố định; em chưa hiển thị nút cấp quyền ảo cho những mục này.</p></div>
      </section>
      <footer style={small}>Lưu ý: liên kết email chỉ hoạt động với tài khoản đã xác nhận email; việc khóa hồ sơ ngăn các truy vấn dữ liệu dựa trên RLS, nhưng không tự đăng xuất thiết bị hoặc thu hồi các liên kết/token bên ngoài đã cấp trước đó.</footer>
    </div>
  </main>;
}
