"use client";
import {useState,type FormEvent} from "react";
import type {VietnamSeoPage} from "../../../lib/vietnamSeoPages";
import {vietnamBusinessConfig} from "../../../lib/vietnamBusinessConfig";
import {sendPublicInquiry} from "../../../lib/publicInquiryClient";

type PriceConfig={sellPrice:number;verified:boolean;publishedPrice?:number};
const prices=vietnamBusinessConfig.prices as unknown as Record<string,PriceConfig>;
const money=(n:number)=>new Intl.NumberFormat("vi-VN").format(n)+"đ";

export default function VietnamConversion({page}:{page:VietnamSeoPage}){
  const ticketOnly=page.priceKey==="bana";
  const price=page.priceKey?prices[page.priceKey]:undefined;
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [email,setEmail]=useState("");
  const [date,setDate]=useState("");
  const [adults,setAdults]=useState(2);
  const [children,setChildren]=useState(0);
  const [childInfo,setChildInfo]=useState("");
  const [hotel,setHotel]=useState("");
  const [option,setOption]=useState("ticket_only");
  const [notes,setNotes]=useState("");
  const [consent,setConsent]=useState(false);
  const [website,setWebsite]=useState("");
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");
  const [inquiryCode,setInquiryCode]=useState("");
  const adultEstimate=(price?.sellPrice||0)*adults;
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(saving||inquiryCode)return;
    if(children>0&&!childInfo.trim()){setError("Vui lòng ghi tuổi hoặc chiều cao của trẻ để kiểm tra đúng loại vé.");return;}
    if(!consent){setError("Vui lòng đồng ý để GoVietStay liên hệ về yêu cầu đặt dịch vụ.");return;}
    setSaving(true);setError("");
    try{
      const detail=[
        "Lựa chọn: "+(ticketOnly?(option==="ticket_only"?"Chỉ vé cáp treo + buffet":option==="private_car"?"Vé + báo giá xe riêng":"Vé + báo giá tour riêng"):"Báo giá tour/dịch vụ theo yêu cầu"),
        "Giá hiển thị trên trang tại lúc yêu cầu: "+(price?.sellPrice?money(price.sellPrice)+"/người lớn":"báo giá theo nhóm"),
        ticketOnly?"Tạm tính vé người lớn (chưa gồm trẻ em và dịch vụ thêm): "+money(adultEstimate):"",
        children>0?"Tuổi/chiều cao trẻ: "+childInfo.trim():"",
        "Khách cần xác nhận tồn vé, ngày sử dụng, giá trẻ em và điều kiện trước thanh toán.",
        notes.trim()
      ].filter(Boolean).join("\n");
      const result=await sendPublicInquiry({
        product_code:ticketOnly?"VI-BANA-BUFFET":("VI-"+page.slug.toUpperCase()),
        product_name:ticketOnly?"Vé Bà Nà Hills cáp treo + buffet trưa":page.h1,
        source_page:"/vi/"+page.slug,
        full_name:name.trim(),
        whatsapp:phone.trim(),
        email:email.trim(),
        tour_date:date,
        adults,
        children,
        hotel:hotel.trim(),
        details:detail.slice(0,2000),
        language:"vi",
        website
      });
      setInquiryCode(result.inquiry_code);
    }catch(e){
      setError(e instanceof Error?e.message:"Không gửi được yêu cầu. Vui lòng liên hệ GoVietStay qua Zalo.");
    }finally{setSaving(false);}
  }
  return <section className="gpay">
    <div className="gprice">
      <div>
        <small>{ticketOnly?"VÉ BÀ NÀ HILLS + BUFFET · KHÁCH VIỆT":"GIÁ THAM KHẢO · KHÁCH VIỆT"}</small>
        <h2>{price?.sellPrice?(ticketOnly?money(price.sellPrice)+"/người lớn":"Từ "+money(price.sellPrice)):"Báo giá theo ngày và nhóm"}</h2>
        <span>{ticketOnly
          ?"Giá công bố "+money(price?.publishedPrice||1300000)+"; giá GoVietStay "+money(price?.sellPrice||1200000)+" cho vé cáp treo và buffet trưa. Không bao gồm xe, hướng dẫn viên. Giá và quyền lợi được xác nhận theo ngày sử dụng trước khi thanh toán."
          :"GoVietStay kiểm tra ngày đi, số người và các dịch vụ bao gồm trước khi báo giá cuối cùng."}</span>
      </div>
      <b>{ticketOnly?"TIẾT KIỆM 100.000Đ SO VỚI GIÁ CÔNG BỐ":"KHÔNG CẦN THANH TOÁN KHI GỬI FORM"}</b>
    </div>
    <div className="gcols">
      {inquiryCode?
        <div className="gform" role="status" aria-live="polite">
          <h3>Đã nhận yêu cầu của bạn</h3>
          <p>Mã yêu cầu: <strong>{inquiryCode}</strong></p>
          <p>Thông tin đã được ghi nhận để nhân viên GoVietStay xử lý. Đây chưa phải vé đã xuất hay booking được xác nhận.</p>
          <p>Bạn có thể mở Zalo và chỉ cần nhắn mã yêu cầu trên để nhân viên tìm đầy đủ thông tin.</p>
          <a className="gvi-zalo" href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">Mở Zalo GoVietStay</a>
        </div>
      :
        <form className="gform" onSubmit={submit}>
          <h3>{ticketOnly?"Gửi yêu cầu đặt vé Bà Nà + buffet":"Gửi yêu cầu đặt dịch vụ"}</h3>
          <p>Miễn phí gửi yêu cầu. Chúng tôi kiểm tra chỗ và xác nhận giá trước khi thu tiền.</p>
          <div className="gform-grid">
            <label>Họ và tên *<input required maxLength={160} autoComplete="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Nguyễn Văn A"/></label>
            <label>Số điện thoại / Zalo *<input required type="tel" maxLength={80} autoComplete="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="09xxxxxxxx"/></label>
            <label>Ngày sử dụng *<input required type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
            <label>Email (nếu có)<input type="email" maxLength={160} value={email} onChange={e=>setEmail(e.target.value)}/></label>
            <label>Số người lớn *<input type="number" required min={1} max={40} value={adults} onChange={e=>setAdults(Math.max(0,Number(e.target.value)))}/></label>
            <label>Số trẻ em<input type="number" min={0} max={39} value={children} onChange={e=>setChildren(Math.max(0,Number(e.target.value)))}/></label>
          </div>
          {children>0&&<label>Tuổi hoặc chiều cao từng bé *<input required maxLength={250} value={childInfo} onChange={e=>setChildInfo(e.target.value)} placeholder="Ví dụ: 2 bé 95cm và 125cm"/></label>}
          {ticketOnly&&<label>Gia đình cần gì thêm?
            <select value={option} onChange={e=>setOption(e.target.value)}>
              <option value="ticket_only">Chỉ mua vé Bà Nà + buffet</option>
              <option value="private_car">Vé + hỏi giá xe riêng</option>
              <option value="private_tour">Vé + hỏi giá tour riêng</option>
            </select>
          </label>}
          <label>Khách sạn / khu vực (nếu cần hỗ trợ xe)<input value={hotel} maxLength={200} onChange={e=>setHotel(e.target.value)} placeholder="Đà Nẵng, Hội An hoặc tên khách sạn"/></label>
          <label>Ghi chú<textarea maxLength={1200} rows={3} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Ngày giờ mong muốn, yêu cầu thêm..."/></label>
          <label className="gvi-privacy"><input required type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/> Tôi đồng ý để GoVietStay dùng thông tin này nhằm xử lý yêu cầu và liên hệ xác nhận dịch vụ.</label>
          <label className="gvi-honeypot" aria-hidden="true">Không điền ô này<input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/></label>
          {error&&<p role="alert" className="gvi-error">{error}</p>}
          <button type="submit" disabled={saving}>{saving?"Đang gửi…":"Gửi yêu cầu về GoVietStay"}</button>
          <p className="gvi-disclaimer">Gửi form không phải là thanh toán hoặc xác nhận đã có vé. GoVietStay sẽ xác nhận giá, tình trạng và điều kiện trước khi xuất vé.</p>
        </form>}
      <aside className="gqr">
        <small>ZALO HỖ TRỢ TRỰC TIẾP</small>
        <h3>Muốn hỏi nhanh? Nhắn Zalo ngay bên cạnh.</h3>
        <p>Nhắn ngày đi, số người và điều bạn cần. Form phía bên trái giúp GoVietStay nhận đủ thông tin và lưu vào hệ thống.</p>
        <a className="gvi-zalo" href={vietnamBusinessConfig.zaloUrl} target="_blank" rel="noreferrer">Nhắn Zalo GoVietStay</a>
        {ticketOnly&&<div className="gvi-estimate">
          <strong>Tham khảo cho {adults} người lớn</strong>
          <h3>{money(adultEstimate)}</h3>
          <p>Chưa bao gồm vé trẻ em, xe, hướng dẫn viên hay dịch vụ thêm. Giá chỉ được xác nhận sau khi kiểm tra ngày đi và điều kiện vé.</p>
          <p>Đặt cho hè 2027? Vui lòng yêu cầu báo giá mới theo chính sách mùa hè 2027.</p>
        </div>}
        {inquiryCode&&<p>Đã lưu mã yêu cầu: <strong>{inquiryCode}</strong></p>}
      </aside>
    </div>
  </section>;
}
