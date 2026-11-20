import { ImageResponse } from "next/og";

// A dedicated, crawlable 1200×630 social preview. This page is intentionally
// an ImageResponse rather than a generic travel photograph shared by www.
export const runtime = "edge";
export const alt = "GoVietStay Hotel Partner — Independent Hotel Alliance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const white = "#f9ffff";

export default function Image() {
  return new ImageResponse(
    <div style={{
      display: "flex", position: "relative", width: "100%", height: "100%",
      background: "linear-gradient(117deg, #0a223c 0%, #103c59 58%, #006c72 100%)",
      color: white, fontFamily: "sans-serif", overflow: "hidden",
    }}>
      <div style={{
        display: "flex", position: "absolute", right: -170, top: -250,
        height: 660, width: 660, borderRadius: 350, border: "2px solid rgba(134,240,219,.14)",
        background: "radial-gradient(circle, rgba(31,200,176,.22), transparent 67%)"
      }}/>
      <div style={{
        display: "flex", position: "absolute", left: -180, bottom: -360,
        height: 650, width: 650, borderRadius: 400,
        background: "radial-gradient(circle, rgba(53,165,205,.2), transparent 68%)"
      }}/>
      <div style={{
        position: "absolute", left: 68, top: 61, display: "flex", alignItems: "center", gap: 15
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 70, height: 70, borderRadius: 18, fontSize: 23, fontWeight: 800,
          color: white, background: "linear-gradient(135deg,#14bfb0,#027e88)"
        }}>GVS</div>
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          <div style={{fontSize:26,fontWeight:800,letterSpacing:-0.5}}>GoVietStay</div>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:2.5,color:"#92dcd7"}}>TRUSTED LOCAL SUPPORT</div>
        </div>
      </div>
      <div style={{
        position:"absolute",top:189,left:68,display:"flex",flexDirection:"column",gap:22,width:745
      }}>
        <div style={{
          display:"flex",alignItems:"center",alignSelf:"flex-start",
          border:"1px solid rgba(153,248,230,.42)",background:"rgba(12,183,163,.13)",
          color:"#91f2de",borderRadius:40,padding:"11px 20px",fontSize:18,fontWeight:700,letterSpacing:1.4
        }}>HOTEL PARTNER PORTAL</div>
        <div style={{fontSize:69,fontWeight:800,lineHeight:1.04,letterSpacing:-2.2}}>
          Independent hotels.<br/>Stronger together.
        </div>
        <div style={{fontSize:24,color:"#d8ebef",lineHeight:1.45}}>
          Register partners · Add properties · Manage rooms & rates
        </div>
      </div>
      <div style={{
        position:"absolute",bottom:54,left:68,display:"flex",alignItems:"center",gap:13
      }}>
        <div style={{width:10,height:10,borderRadius:10,background:"#2be1bc"}}/>
        <div style={{color:"#bce8e7",fontSize:18,fontWeight:700}}>partners.govietstay.com</div>
      </div>

      <div style={{
        position:"absolute",right:60,top:153,width:270,height:390,
        borderRadius:24,border:"1px solid rgba(220,255,249,.4)",
        background:"rgba(225,252,250,.11)",display:"flex",alignItems:"center",
        justifyContent:"center",flexDirection:"column"
      }}>
        <div style={{
          display:"flex",position:"relative",width:174,height:230,
          background:"#e9faf7",borderRadius:12,border:"8px solid rgba(255,255,255,.72)",
          alignItems:"center",flexDirection:"column",justifyContent:"flex-start",
          paddingTop:23,gap:13
        }}>
          <div style={{display:"flex",height:12,width:90,borderRadius:5,background:"#199c9a"}}/>
          <div style={{display:"flex",flexDirection:"row",gap:10}}>
            {[0,1,2].map(i=><div key={i} style={{width:27,height:27,background:"#89bcbc",borderRadius:3}}/>)}
          </div>
          <div style={{display:"flex",flexDirection:"row",gap:10}}>
            {[0,1,2].map(i=><div key={i} style={{width:27,height:27,background:"#89bcbc",borderRadius:3}}/>)}
          </div>
          <div style={{display:"flex",flexDirection:"row",gap:10}}>
            {[0,1,2].map(i=><div key={i} style={{width:27,height:27,background:"#89bcbc",borderRadius:3}}/>)}
          </div>
          <div style={{display:"flex",width:39,height:43,background:"#1a6479",borderRadius:"5px 5px 0 0",marginTop:2}}/>
        </div>
        <div style={{display:"flex",fontSize:23,fontWeight:800,marginTop:25}}>HOTEL NETWORK</div>
        <div style={{display:"flex",fontSize:15,color:"#b5e8e4",marginTop:6}}>ONE ACCOUNT · MANY HOTELS</div>
      </div>
    </div>,
    { ...size }
  );
}
