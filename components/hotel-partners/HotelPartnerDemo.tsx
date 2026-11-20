"use client";

import {useEffect,useRef,useState} from "react";

type HotelDraft={name:string;city:string;address:string;maps_url:string;description:string;entrance_notes:string};
type RoomDraft={name:string;template:string;area_sqm:string;bed_details:string;max_adults:string;max_children:string;view_details:string;extra_bed:string;breakfast_included:boolean;amenities:string[];notes:string};
type DemoRoom=RoomDraft&{id:number};
type DemoPhoto={id:number;url:string;name:string;target:string};
type RateDraft={roomId:string;from:string;until:string;price:string;discount:string;breakfast:boolean;tax:boolean;conditions:string};
type DemoRate=RateDraft&{id:number};
const templates=["Standard","Superior","Deluxe","Premier","Executive","Family","Suite","Apartment","Penthouse","Villa","Khác"];
const beds=["1 King","1 Queen","1 Double","2 Twin","1 King + 1 Twin","2 Double","2 King","Khác"];
const views=["Không có view","Hướng phố","Hướng vườn","Hướng hồ bơi","Hướng biển một phần","Hướng biển trực diện","Khác"];
const amenities=["Wi-Fi","Điều hòa","TV","Minibar","Bồn tắm","Ban công","Bếp","Phòng khách","Máy sấy tóc","Két sắt","Hồ bơi","Phòng gym"];
const freshRoom=():RoomDraft=>({name:"",template:"Deluxe",area_sqm:"",bed_details:"1 King",max_adults:"2",max_children:"1",view_details:"Hướng phố",extra_bed:"Không",breakfast_included:true,amenities:["Wi-Fi","Điều hòa","TV"],notes:""});
const freshRate=():RateDraft=>({roomId:"",from:"",until:"",price:"",discount:"0",breakfast:true,tax:true,conditions:""});
const formatVnd=(n:number)=>new Intl.NumberFormat("vi-VN",{maximumFractionDigits:0}).format(n)+" ₫";
const stepLabels=["Khách sạn","Hạng phòng","Hình ảnh","Giá & điều kiện","Gửi thử"];
const blankHotel=():HotelDraft=>({name:"",city:"",address:"",maps_url:"",description:"",entrance_notes:""});

export default function HotelPartnerDemo({onExit}:{onExit:()=>void}){
  const [stage,setStage]=useState(0);
  const [hotel,setHotel]=useState<HotelDraft>(blankHotel);
  const [room,setRoom]=useState<RoomDraft>(freshRoom);
  const [rooms,setRooms]=useState<DemoRoom[]>([]);
  const [editing,setEditing]=useState<number|null>(null);
  const [photos,setPhotos]=useState<DemoPhoto[]>([]);
  const [target,setTarget]=useState("hotel");
  const [rate,setRate]=useState<RateDraft>(freshRate);
  const [rates,setRates]=useState<DemoRate[]>([]);
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");
  const [submitted,setSubmitted]=useState(false);
  const photoUrls=useRef<string[]>([]);
  const nextId=useRef(1);
  useEffect(()=>()=>{for(const url of photoUrls.current)URL.revokeObjectURL(url);},[]);
  const clearMessages=()=>{setError("");setMessage("");};
  const go=(index:number)=>{
    clearMessages();
    if(index>stage&&stage===0&&(!hotel.name.trim()||!hotel.city.trim())){
      setError("Nhập tên khách sạn và tỉnh/thành phố trước khi chuyển bước.");return;
    }
    setStage(index);
  };
  const addRoom=()=>{
    clearMessages();
    if(room.name.trim().length<2){setError("Hãy nhập tên hạng phòng (ít nhất 2 ký tự).");return;}
    if(room.area_sqm.trim()&&(!Number.isFinite(Number(room.area_sqm))||Number(room.area_sqm)<=0)){setError("Diện tích phòng phải lớn hơn 0.");return;}
    if(!(Number(room.max_adults)>=1&&Number(room.max_adults)<=30)){setError("Số người lớn phải từ 1 đến 30.");return;}
    if(editing!==null)setRooms(v=>v.map(r=>r.id===editing?{...room,id:editing}:r));
    else setRooms(v=>[...v,{...room,id:nextId.current++}]);
    setMessage(editing!==null?"Đã cập nhật phòng trong bản thử.":"Đã lưu hạng phòng trong bản thử.");
    setRoom(freshRoom());setEditing(null);
  };
  const removeRoom=(id:number)=>{
    const key=String(id);setRooms(v=>v.filter(r=>r.id!==id));
    setRates(v=>v.filter(r=>r.roomId!==key));
    setPhotos(v=>v.filter(p=>p.target!==key));
    if(target===key)setTarget("hotel");
    if(editing===id){setEditing(null);setRoom(freshRoom());}
  };
  const addPhoto=(file:File|null)=>{
    clearMessages();
    if(!file)return;
    if(!file.type.startsWith("image/")){setError("Chỉ nhận ảnh JPG, PNG hoặc WebP.");return;}
    if(file.size>10*1024*1024){setError("Ảnh quá lớn để xem thử. Chọn ảnh dưới 10 MB.");return;}
    const used=photos.filter(p=>p.target===target).length;
    if(used >= (target==="hotel"?6:1)){setError(target==="hotel"?"Mỗi khách sạn tối đa 6 ảnh tổng quan.":"Mỗi hạng phòng chọn tối đa 1 ảnh đại diện.");return;}
    const url=URL.createObjectURL(file);photoUrls.current.push(url);
    setPhotos(v=>[...v,{id:nextId.current++,url,name:file.name,target}]);
    setMessage("Ảnh đã xuất hiện trong bản xem thử. Ảnh KHÔNG tải lên Supabase.");
  };
  const saveRate=()=>{
    clearMessages();
    const price=Number(rate.price),discount=Number(rate.discount);
    if(!rate.roomId||!rooms.some(r=>String(r.id)===rate.roomId)){setError("Hãy chọn hạng phòng đã nhập.");return;}
    if(!rate.from||!rate.until||rate.until<rate.from){setError("Ngày hiệu lực không hợp lệ.");return;}
    if(!Number.isFinite(price)||price<=0){setError("Giá nguồn phải lớn hơn 0.");return;}
    if(!Number.isFinite(discount)||discount<0||discount>100){setError("Chiết khấu phải từ 0% đến 100%.");return;}
    setRates(v=>[...v,{...rate,id:nextId.current++}]);
    setMessage("Đã thêm mức giá vào bản thử; chưa lưu giá thật.");
    setRate(freshRate());
  };
  const reset=()=>{
    for(const url of photoUrls.current)URL.revokeObjectURL(url);
    photoUrls.current=[];
    setStage(0);setHotel(blankHotel());setRoom(freshRoom());setRooms([]);setPhotos([]);
    setRates([]);setRate(freshRate());setEditing(null);setTarget("hotel");setSubmitted(false);clearMessages();
  };
  const calculated=Number(rate.price)>0&&Number(rate.discount)>=0&&Number(rate.discount)<=100
    ?formatVnd(Number(rate.price)*(1-Number(rate.discount)/100)):"—";
  return <div className="hv3-demo" aria-label="Trải nghiệm biểu mẫu đối tác">
    <div className="hv3-demo-banner"><div>
      <strong>CHẾ ĐỘ TRẢI NGHIỆM ĐỐI TÁC — DỮ LIỆU MẪU</strong>
      <p>Anh đang sử dụng giao diện như người điền. Mọi thao tác chỉ hiển thị tại trình duyệt: không lưu database, không gửi email, không phát ntfy và không tạo hồ sơ duyệt thật.</p>
    </div><button type="button" onClick={onExit}>← Về Admin thật</button></div>
    <div className="hv3-demo-steps" aria-label="Các bước nhập thông tin">
      {stepLabels.map((label,i)=><button type="button" key={label}
        className={stage===i?"active":i<stage?"done":""}
        aria-current={stage===i?"step":undefined} onClick={()=>go(i)}><span>{i+1}</span>{label}</button>)}
    </div>
    {(error||message)&&<div role="status" className={error?"hv3-error":"hv3-success"}>{error||message}</div>}

    {stage===0&&<div className="hv3-cols"><section className="hv3-panel">
      <div className="hv3-panel-head"><h2>1. Thêm khách sạn</h2><span>THỬ GIAO DIỆN</span></div>
      <p className="hv3-muted">Hãy nhập như một đối tác lần đầu khai báo khách sạn của mình. Các trường dưới đây tương ứng với hồ sơ khách sạn thật.</p>
      <div className="hv3-two"><label>Tên khách sạn *<input maxLength={200} value={hotel.name} onChange={e=>setHotel(v=>({...v,name:e.target.value}))} placeholder="Ví dụ: Azure Premium Hotel"/></label>
      <label>Tỉnh / thành phố *<input value={hotel.city} onChange={e=>setHotel(v=>({...v,city:e.target.value}))} placeholder="Phú Quốc"/></label></div>
      <label>Địa chỉ đầy đủ<input value={hotel.address} onChange={e=>setHotel(v=>({...v,address:e.target.value}))} placeholder="Số nhà, đường, phường/xã"/></label>
      <label>Link Google Maps<input type="url" value={hotel.maps_url} onChange={e=>setHotel(v=>({...v,maps_url:e.target.value}))} placeholder="https://maps.app.goo.gl/…"/></label>
      <label>Mô tả ngắn<textarea rows={3} value={hotel.description} onChange={e=>setHotel(v=>({...v,description:e.target.value}))} placeholder="Điểm nổi bật của khách sạn"/></label>
      <label>Hướng dẫn nhận diện lối vào / điểm đón xe<textarea rows={2} value={hotel.entrance_notes} onChange={e=>setHotel(v=>({...v,entrance_notes:e.target.value}))} placeholder="Cổng vào, sảnh, chỗ xe đón…"/></label>
      <div className="hv3-actions"><button type="button" className="hv3-primary" onClick={()=>go(1)}>Tiếp: Hạng phòng →</button></div>
    </section><aside className="hv3-preview"><span className="hv3-eyebrow">XEM TRƯỚC HỒ SƠ</span><h2>{hotel.name||"Tên khách sạn của bạn"}</h2><p>⌖ {hotel.address||hotel.city||"Chưa nhập địa chỉ"}</p><p>{hotel.description||"Mô tả của khách sạn sẽ hiển thị ở đây."}</p><div className="hv3-info">▤ {rooms.length} hạng phòng đã nhập thử</div><div className="hv3-info">▧ {photos.filter(p=>p.target==="hotel").length}/6 ảnh tổng quan</div></aside></div>}

    {stage===1&&<div className="hv3-cols"><section className="hv3-panel">
      <div className="hv3-panel-head"><h2>2. Khai báo hạng phòng</h2><span>{rooms.length} PHÒNG MẪU</span></div>
      <div className="hv3-two"><label>Mẫu phòng<select value={room.template} onChange={e=>setRoom(v=>({...v,template:e.target.value,name:v.name||e.target.value}))}>{templates.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Tên hạng phòng *<input value={room.name} onChange={e=>setRoom(v=>({...v,name:e.target.value}))} placeholder="Deluxe Ocean King"/></label></div>
      <div className="hv3-three"><label>Diện tích (m²)<input inputMode="decimal" value={room.area_sqm} onChange={e=>setRoom(v=>({...v,area_sqm:e.target.value}))}/></label>
      <label>Người lớn tối đa<input type="number" min={1} max={30} value={room.max_adults} onChange={e=>setRoom(v=>({...v,max_adults:e.target.value}))}/></label>
      <label>Trẻ em tối đa<input type="number" min={0} max={30} value={room.max_children} onChange={e=>setRoom(v=>({...v,max_children:e.target.value}))}/></label></div>
      <div className="hv3-two"><label>Giường<select value={room.bed_details} onChange={e=>setRoom(v=>({...v,bed_details:e.target.value}))}>{beds.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Hướng nhìn<select value={room.view_details} onChange={e=>setRoom(v=>({...v,view_details:e.target.value}))}>{views.map(x=><option key={x}>{x}</option>)}</select></label></div>
      <div className="hv3-two"><label>Giường phụ<select value={room.extra_bed} onChange={e=>setRoom(v=>({...v,extra_bed:e.target.value}))}>{["Không","Có, tính phí","Có, miễn phí","Theo yêu cầu","Chưa rõ"].map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="hv3-check"><input type="checkbox" checked={room.breakfast_included} onChange={e=>setRoom(v=>({...v,breakfast_included:e.target.checked}))}/> Bao gồm ăn sáng</label></div>
      <label className="hv3-field-label">Tiện nghi — tích chọn nhanh</label>
      <div className="hv3-chipgrid">{amenities.map(x=><button key={x} type="button" className={room.amenities.includes(x)?"chosen":""} onClick={()=>setRoom(v=>({...v,amenities:v.amenities.includes(x)?v.amenities.filter(t=>t!==x):[...v.amenities,x]}))}>{room.amenities.includes(x)?"✓ ":"+ "}{x}</button>)}</div>
      <label>Ghi chú / chính sách riêng<textarea rows={2} value={room.notes} onChange={e=>setRoom(v=>({...v,notes:e.target.value}))}/></label>
      <div className="hv3-actions"><button type="button" className="hv3-secondary" onClick={()=>{setRoom(freshRoom());setEditing(null);}}>Xóa phần đang điền</button><button type="button" className="hv3-primary" onClick={addRoom}>{editing!==null?"Lưu thay đổi":"＋ Thêm hạng phòng"}</button></div>
      <div className="hv3-demo-navigation"><button type="button" onClick={()=>go(0)}>← Khách sạn</button><button type="button" onClick={()=>go(2)}>Tiếp: Hình ảnh →</button></div>
    </section><aside className="hv3-preview"><span className="hv3-eyebrow">DANH SÁCH PHÒNG ĐÃ NHẬP</span>
      {rooms.length===0?<p>Chưa có phòng. Nhập một phòng mẫu rồi thêm các phòng khác.</p>:rooms.map(r=><div className="hv3-demo-saved" key={r.id}><strong>{r.name}</strong><small>{r.bed_details} · {r.max_adults} người lớn · {r.area_sqm||"—"} m²</small>
      <div><button type="button" onClick={()=>{setRoom({...r});setEditing(r.id);clearMessages();}}>Sửa</button><button type="button" onClick={()=>{setRoom({...r,name:r.name+" (bản sao)"});setEditing(null);clearMessages();}}>Nhân bản</button><button type="button" onClick={()=>removeRoom(r.id)}>Xóa</button></div></div>)}
    </aside></div>}

    {stage===2&&<div className="hv3-cols"><section className="hv3-panel">
      <div className="hv3-panel-head"><h2>3. Thử thêm hình ảnh</h2><span>KHÔNG TẢI LÊN MÁY CHỦ</span></div>
      <p className="hv3-muted">Tối đa 6 ảnh tổng quan mỗi khách sạn và 1 ảnh đại diện cho từng hạng phòng. Ảnh được xem trực tiếp trên máy của anh.</p>
      <label>Ảnh cho<select value={target} onChange={e=>{setTarget(e.target.value);clearMessages();}}><option value="hotel">Khách sạn — {photos.filter(p=>p.target==="hotel").length}/6 ảnh</option>
      {rooms.map(r=><option key={r.id} value={String(r.id)}>Phòng: {r.name} — {photos.filter(p=>p.target===String(r.id)).length}/1 ảnh</option>)}</select></label>
      <label>Chọn ảnh JPG / PNG / WebP<input type="file" accept="image/*" onChange={e=>{addPhoto(e.currentTarget.files?.[0]||null);e.currentTarget.value="";}}/></label>
      <div className="hv3-demo-navigation"><button type="button" onClick={()=>go(1)}>← Hạng phòng</button><button type="button" onClick={()=>go(3)}>Tiếp: Giá phòng →</button></div>
    </section><aside className="hv3-preview"><span className="hv3-eyebrow">ẢNH ĐANG XEM THỬ</span>
      {!photos.length&&<p>Chọn một ảnh bất kỳ để kiểm tra cách hiển thị.</p>}
      <div className="hv3-demo-images">{photos.map(p=><div key={p.id}><img src={p.url} alt={p.name}/><small>{p.target==="hotel"?"Khách sạn":rooms.find(r=>String(r.id)===p.target)?.name||"Hạng phòng"}</small><button type="button" onClick={()=>setPhotos(v=>v.filter(x=>x.id!==p.id))}>Xóa ảnh</button></div>)}</div>
    </aside></div>}

    {stage===3&&<div className="hv3-cols"><section className="hv3-panel">
      <div className="hv3-panel-head"><h2>4. Giá & chính sách phòng</h2><span>GIÁ DEMO</span></div>
      <p className="hv3-muted">Nhập giá trước chiết khấu và xem giá NET dự kiến. Bảng giá này hoàn toàn là bản thử.</p>
      <label>Chọn hạng phòng<select value={rate.roomId} onChange={e=>setRate(v=>({...v,roomId:e.target.value}))}><option value="">— Chọn hạng phòng —</option>{rooms.map(r=><option value={String(r.id)} key={r.id}>{r.name}</option>)}</select></label>
      <div className="hv3-two"><label>Ngày bắt đầu<input type="date" value={rate.from} onChange={e=>setRate(v=>({...v,from:e.target.value}))}/></label>
      <label>Ngày kết thúc<input type="date" min={rate.from||undefined} value={rate.until} onChange={e=>setRate(v=>({...v,until:e.target.value}))}/></label></div>
      <div className="hv3-two"><label>Giá nguồn (VND/phòng/đêm)<input type="number" min={1} value={rate.price} onChange={e=>setRate(v=>({...v,price:e.target.value}))} placeholder="1200000"/></label>
      <label>Chiết khấu NET (%)<input type="number" min={0} max={100} step=".01" value={rate.discount} onChange={e=>setRate(v=>({...v,discount:e.target.value}))}/></label></div>
      <div className="hv3-two"><label className="hv3-check"><input type="checkbox" checked={rate.breakfast} onChange={e=>setRate(v=>({...v,breakfast:e.target.checked}))}/> Bao gồm ăn sáng</label>
      <label className="hv3-check"><input type="checkbox" checked={rate.tax} onChange={e=>setRate(v=>({...v,tax:e.target.checked}))}/> Bao gồm thuế phí</label></div>
      <label>Điều kiện / ngày loại trừ<textarea rows={2} value={rate.conditions} onChange={e=>setRate(v=>({...v,conditions:e.target.value}))} placeholder="Lễ, Tết, cuối tuần…"/></label>
      <div className="hv3-actions"><button type="button" className="hv3-primary" onClick={saveRate}>＋ Thêm mức giá mẫu</button></div>
      <div className="hv3-demo-navigation"><button type="button" onClick={()=>go(2)}>← Hình ảnh</button><button type="button" onClick={()=>go(4)}>Tiếp: Xem & gửi thử →</button></div>
    </section><aside className="hv3-preview"><span className="hv3-eyebrow">GIÁ NET DỰ KIẾN</span><h2>{calculated}</h2><p>Chỉ là phép tính trên trình duyệt. Giá hợp đồng thật chỉ lưu khi đối tác gửi duyệt.</p>
      <h3>Các mức giá đã nhập thử</h3>{rates.length===0?<p>Chưa nhập giá.</p>:rates.map(r=><div key={r.id} className="hv3-demo-saved"><strong>{rooms.find(v=>String(v.id)===r.roomId)?.name}</strong><small>{formatVnd(Number(r.price)*(1-Number(r.discount)/100))} · {r.from} — {r.until}</small><button type="button" onClick={()=>setRates(v=>v.filter(x=>x.id!==r.id))}>Xóa</button></div>)}
    </aside></div>}

    {stage===4&&<div className="hv3-cols"><section className="hv3-panel">
      <div className="hv3-panel-head"><h2>5. Xem toàn bộ & gửi thử</h2><span>KHÔNG LƯU THẬT</span></div>
      <div className="hv3-demo-summary"><div><small>TÊN KHÁCH SẠN</small><strong>{hotel.name||"Chưa nhập"}</strong><p>{hotel.address||hotel.city||"Chưa có địa chỉ"}</p></div><div><small>HẠNG PHÒNG</small><strong>{rooms.length}</strong></div><div><small>HÌNH ẢNH</small><strong>{photos.length}</strong></div><div><small>MỨC GIÁ</small><strong>{rates.length}</strong></div></div>
      {rooms.length===0&&<p className="hv3-demo-warning">Chưa có hạng phòng. Trong dữ liệu thật, nên nhập tối thiểu một loại phòng trước khi gửi hồ sơ.</p>}
      {rates.length===0&&<p className="hv3-demo-warning">Chưa có mức giá. Có thể quay lại để thử nhập bảng giá.</p>}
      {!submitted?<div className="hv3-actions"><button type="button" className="hv3-secondary" onClick={()=>go(3)}>← Sửa bảng giá</button><button type="button" className="hv3-primary" onClick={()=>{if(!hotel.name.trim()){setStage(0);setError("Chưa có tên khách sạn.");return;}clearMessages();setSubmitted(true);}}>✓ Mô phỏng gửi GoVietStay duyệt</button></div>:
      <div className="hv3-demo-done" role="status"><strong>✓ Đã hoàn thành vòng thử</strong><p>Trong quy trình thật, hồ sơ của đối tác sẽ chuyển sang hàng chờ Admin và phát thông báo ntfy. Tại đây không có dữ liệu nào được gửi đi.</p><div className="hv3-actions"><button type="button" className="hv3-secondary" onClick={reset}>Thử lại từ đầu</button><button type="button" className="hv3-primary" onClick={onExit}>Quay về Admin thật</button></div></div>}
    </section><aside className="hv3-preview"><span className="hv3-eyebrow">KIỂM TRA TRƯỚC KHI MỜI ĐỐI TÁC</span><h2>Đánh giá trải nghiệm</h2>
      <div className="hv3-info">✓ Nhập thông tin khách sạn</div><div className="hv3-info">✓ Thêm, sửa, nhân bản hạng phòng</div><div className="hv3-info">✓ Thử chọn ảnh từ điện thoại</div><div className="hv3-info">✓ Nhập giá và xem cách tính NET</div><div className="hv3-info">✓ Xem lại và gửi thử</div>
      <p>Đây là bản mô phỏng nhập liệu, không thay thế bài kiểm thử đăng ký/xác minh email và phân quyền với tài khoản đối tác thật.</p>
    </aside></div>}
    <div className="hv3-demo-footer"><span>Chế độ demo không lưu dữ liệu. Rời trang hoặc tải lại sẽ mất biểu mẫu đang thử.</span><button type="button" onClick={reset}>↻ Xóa tất cả dữ liệu thử</button></div>
  </div>;
}
