"use client";
import {useMemo,useState} from "react";
import type {VietnamSeoPage} from "../../../lib/vietnamSeoPages";
import {vietnamBusinessConfig} from "../../../lib/vietnamBusinessConfig";

const fmt=(n:number)=>new Intl.NumberFormat("vi-VN").format(n)+"đ";
const code=(slug:string)=>"GVS-"+slug.slice(0,5).replace(/-/g,"").toUpperCase()+"-"+Math.random().toString(36).slice(2,6).toUpperCase();

export default function VietnamConversion({page}:{page:VietnamSeoPage}){
  type PriceConfig={sellPrice:number;verified:boolean;netCost:number|null;targetPrice:number;marginMin:number};
  const priceMap=vietnamBusinessConfig.prices as unknown as Record<string,PriceConfig>;
  const p=page.priceKey?priceMap[page.priceKey]??null:null;

  const [date,setDate]=useState("");
  const [adults,setAdults]=useState(2);
  const [children,setChildren]=useState(0);
  const [hotel,setHotel]=useState("");
  const [prefs,setPrefs]=useState("");
  const [agree,setAgree]=useState(false);
  const [bk,setBk]=useState("");

  const total=useMemo(()=>p?.sellPrice?p.sellPrice*Math.max(adults,0):0,[p?.sellPrice,adults]);
  const dep=useMemo(()=>page.depositPercent?Math.ceil(total*page.depositPercent/100/1000)*1000:0,[total,page.depositPercent]);

  const exact=Boolean(
    p?.verified &&
    vietnamBusinessConfig.bank.bankId &&
    vietnamBusinessConfig.bank.accountNo &&
    page.depositPercent>0 &&
    children===0 &&
    adults>0
  );

  const qr=bk&&exact
    ?`https://img.vietqr.io/image/${encodeURIComponent(vietnamBusinessConfig.bank.bankId)}-${encodeURIComponent(vietnamBusinessConfig.bank.accountNo)}-compact2.png?amount=${dep}&addInfo=${encodeURIComponent(bk)}&accountName=${encodeURIComponent(vietnamBusinessConfig.bank.accountName)}`
    :"";

  const msg=encodeURIComponent(
    `Xin chào GoVietStay, tôi đang xem ${page.h1}\n`+
    `Giá từ trên website: ${p?.sellPrice?fmt(p.sellPrice):"cần báo giá"}\n`+
    `Ngày đi: ${date||"chưa chọn"}\nNgười lớn: ${adults}\nTrẻ em: ${children}\n`+
    `Khách sạn: ${hotel||"chưa có"}\nYêu cầu thêm: ${prefs||"chưa ghi"}${bk?`\nMã booking tạm: ${bk}`:""}`
  );

  return <section className="gpay">
    <div className="gprice">
      <div>
        <small>GIÁ TỪ · KHÁCH VIỆT</small>
        <h2>{p?.sellPrice?`Từ ${fmt(p.sellPrice)}`:"Hỏi giá theo ngày đi"}</h2>
        <span>
          {p?.sellPrice
            ?"Mức “từ” có thể áp dụng tùy ngày và loại booking. GoVietStay sẽ xác nhận giá cuối cùng trước khi nhận cọc."
            :"Giá phụ thuộc ngày đi, số người, khách sạn và loại dịch vụ bạn chọn."}
        </span>
      </div>
      <b>{page.depositPercent===0?"TRANSFER TIÊU CHUẨN: 0% CỌC":`ĐẶT CỌC ${page.depositPercent}% SAU KHI XÁC NHẬN`}</b>
    </div>

    <div className="gcols">
      <div className="gform">
        <h3>Gửi vài thông tin để GoVietStay kiểm tra giúp</h3>
        <label>Ngày đi<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
        <div>
          <label>Người lớn<input type="number" min="1" value={adults} onChange={e=>setAdults(+e.target.value)}/></label>
          <label>Trẻ em<input type="number" min="0" value={children} onChange={e=>setChildren(+e.target.value)}/></label>
        </div>
        <label>Khách sạn / resort<input value={hotel} onChange={e=>setHotel(e.target.value)} placeholder="Tên khách sạn hoặc khu vực"/></label>
        <label>Gia đình thích gì hoặc cần lưu ý điều gì<textarea value={prefs} onChange={e=>setPrefs(e.target.value)} placeholder="Ví dụ: có bé 5 tuổi, bố mẹ 68 tuổi, không muốn về quá muộn..."/></label>
        <a href={`${vietnamBusinessConfig.zaloUrl}?text=${msg}`} target="_blank" rel="noreferrer">Gửi qua Zalo</a>
      </div>

      <div className="gqr">
        {page.depositPercent===0 ? <>
          <small>XE ĐƯA ĐÓN</small>
          <h3>Transfer tiêu chuẩn không cần đặt cọc</h3>
          <p>Bạn thanh toán theo xác nhận booking. Xe lớn, hành trình đặc biệt hoặc dịch vụ khác có thể có điều kiện riêng và sẽ được báo trước.</p>
        </> : exact ? <>
          <small>VIETQR</small>
          <h3>Tổng tạm tính: {fmt(total)}</h3>
          <div className="gamount">Đặt cọc {page.depositPercent}%<b>{fmt(dep)}</b></div>
          <label className="gcheck">
            <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)}/>
            Tôi đã kiểm tra ngày đi, số khách và đồng ý với Điều kiện đặt dịch vụ VI-2026.08.26.
          </label>
          {!bk ? <button disabled={!agree||!date} onClick={()=>setBk(code(page.slug))}>Tạo QR đặt cọc</button> : <>
            <div className="gcode">Mã booking tạm: <b>{bk}</b></div>
            <img src={qr} alt={"VietQR "+bk}/>
            <strong>Quét QR, kiểm tra số tiền rồi chuyển khoản</strong>
            <p>Sau khi chuyển, vui lòng gửi ảnh giao dịch qua Zalo. GoVietStay sẽ kiểm tra tiền và gửi xác nhận booking.</p>
          </>}
        </> : <>
          <small>CHƯA NHẬN CỌC TỰ ĐỘNG</small>
          <h3>{p?.sellPrice?`Giá từ ${fmt(p.sellPrice)}`:"Cần báo giá theo ngày đi"}</h3>
          <p>
            {children>0
              ?"Có trẻ em nên GoVietStay cần kiểm tra tuổi hoặc chiều cao trước khi chốt giá."
              :p?.sellPrice
                ?"Mức giá từ đang hiển thị để bạn tham khảo. Trước khi nhận cọc, GoVietStay sẽ xác nhận lại ngày đi và phần dịch vụ đi kèm."
                :"Dịch vụ này cần báo giá riêng trước khi đặt cọc."}
          </p>
          <a href={`${vietnamBusinessConfig.zaloUrl}?text=${msg}`} target="_blank" rel="noreferrer">Nhắn Zalo để chốt giá</a>
        </>}
      </div>
    </div>
  </section>
}