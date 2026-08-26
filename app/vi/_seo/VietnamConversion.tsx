"use client";
import {useMemo,useState} from "react";
import type {VietnamSeoPage} from "../../../lib/vietnamSeoPages";
import {vietnamBusinessConfig} from "../../../lib/vietnamBusinessConfig";
const fmt=(n:number)=>new Intl.NumberFormat("vi-VN").format(n)+"đ";
const code=(slug:string)=>"GVS-"+slug.slice(0,5).replace(/-/g,"").toUpperCase()+"-"+Math.random().toString(36).slice(2,6).toUpperCase();

export default function VietnamConversion({page}:{page:VietnamSeoPage}){
  type PriceConfig = {
  sellPrice: number;
  verified: boolean;
  netCost: number | null;
  targetPrice: number;
  marginMin: number;
};
const priceMap = vietnamBusinessConfig.prices as unknown as Record<string, PriceConfig>;
const p = page.priceKey ? priceMap[page.priceKey] ?? null : null;
  const [date,setDate]=useState(""); const [adults,setAdults]=useState(2); const [children,setChildren]=useState(0);
  const [hotel,setHotel]=useState(""); const [prefs,setPrefs]=useState(""); const [agree,setAgree]=useState(false); const [bk,setBk]=useState("");
  const total=useMemo(()=>p?.sellPrice?p.sellPrice*Math.max(adults,0):0,[p?.sellPrice,adults]);
  const dep=useMemo(()=>page.depositPercent?Math.ceil(total*page.depositPercent/100/1000)*1000:0,[total,page.depositPercent]);
  const exact=Boolean(p?.verified&&vietnamBusinessConfig.bank.bankId&&vietnamBusinessConfig.bank.accountNo&&page.depositPercent>0&&children===0&&adults>0);
  const qr=bk&&exact?`https://img.vietqr.io/image/${encodeURIComponent(vietnamBusinessConfig.bank.bankId)}-${encodeURIComponent(vietnamBusinessConfig.bank.accountNo)}-compact2.png?amount=${dep}&addInfo=${encodeURIComponent(bk)}&accountName=${encodeURIComponent(vietnamBusinessConfig.bank.accountName)}`:"";
  const msg=encodeURIComponent(`Xin chào GoVietStay, tôi xem ${page.h1}\nNgày: ${date||"chưa chọn"}\nNgười lớn: ${adults}\nTrẻ em: ${children}\nKhách sạn: ${hotel||"chưa có"}\nSở thích/yêu cầu: ${prefs||"chưa ghi"}${bk?`\nMã: ${bk}`:""}`);
  return <section className="gpay">
    <div className="gprice"><div><small>GIÁ & GIỮ CHỖ</small><h2>{p?.verified?`Từ ${fmt(p.sellPrice)}`:p?.sellPrice?"Giá tham khảo - chưa mở thanh toán":"Nhận báo giá theo lịch của bạn"}</h2><span>Giá chỉ khóa sau khi GoVietStay xác nhận booking.</span></div><b>{page.depositPercent===0?"0% DEPOSIT TRANSFER":`DEPOSIT ${page.depositPercent}%`}</b></div>
    <div className="gcols">
      <div className="gform"><h3>Cho chúng tôi biết chuyến đi</h3><label>Ngày đi<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label><div><label>Người lớn<input type="number" min="1" value={adults} onChange={e=>setAdults(+e.target.value)}/></label><label>Trẻ em<input type="number" min="0" value={children} onChange={e=>setChildren(+e.target.value)}/></label></div><label>Khách sạn<input value={hotel} onChange={e=>setHotel(e.target.value)} placeholder="Tên hotel / resort / khu vực"/></label><label>Sở thích, độ tuổi, điều không muốn<textarea value={prefs} onChange={e=>setPrefs(e.target.value)} placeholder="Ví dụ: 4 người, bé 5 tuổi, bố mẹ 68 tuổi, thích ăn ngon, không muốn về muộn..."/></label><a href={`${vietnamBusinessConfig.zaloUrl}?text=${msg}`} target="_blank">Gửi qua Zalo</a></div>
      <div className="gqr">{page.depositPercent===0?<><small>TRANSFER</small><h3>Không cần cọc với transfer tiêu chuẩn</h3><p>Thanh toán theo xác nhận booking. Dịch vụ đặc biệt có thể có điều kiện riêng.</p></>:exact?<><small>VIETQR · CÁCH A</small><h3>Tổng ước tính: {fmt(total)}</h3><div className="gamount">Đặt cọc {page.depositPercent}%<b>{fmt(dep)}</b></div><label className="gcheck"><input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)}/> Tôi đã kiểm tra ngày, số người và đồng ý Điều kiện VI-2026.08.26.</label>{!bk?<button disabled={!agree||!date} onClick={()=>setBk(code(page.slug))}>Tạo QR giữ chỗ</button>:<><div className="gcode">Mã booking tạm: <b>{bk}</b></div><img src={qr} alt={"VietQR "+bk}/><strong>Quét QR → kiểm tra số tiền → chuyển khoản</strong><p>Sau khi chuyển, gửi ảnh giao dịch qua Zalo. Chuyển khoản chưa tự xác nhận booking; GoVietStay kiểm tra tiền và gửi xác nhận chính thức.</p></>}</>:<><small>PAYMENT SAFETY</small><h3>QR chỉ mở sau khi giá được xác minh</h3><p>{children>0?"Booking có trẻ em cần kiểm tra tuổi/chiều cao và giá trước.":p&&!p.verified?"Net cost chưa được nhập khi deploy, nên hệ thống khóa thanh toán ở giá chưa xác minh.":"Sản phẩm này cần báo giá riêng trước khi đặt cọc."}</p><a href={`${vietnamBusinessConfig.zaloUrl}?text=${msg}`} target="_blank">Xác nhận giá trên Zalo</a></>}</div>
    </div>
  </section>
}