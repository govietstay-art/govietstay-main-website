// Browser-only XLSX export. No external runtime dependencies or network calls.
// All untrusted text is serialized as inline strings, never as formulas.
type Formula = { formula:string; value:number };
type Cell = string | number | Formula | null;
export type FinanceSheet = { name:string; rows:Cell[][]; widths?:number[]; statusColumn?:number };
const xmlHeader = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
const ns = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
const relNs = "http://schemas.openxmlformats.org/package/2006/relationships";
const officeRel = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
function esc(v:unknown) {
  return String(v??"").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g,"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");
}
function col(i:number) {
  let result=""; for(i++;i>0;i=Math.floor((i-1)/26)) result=String.fromCharCode(65+(i-1)%26)+result; return result;
}
function sheetXml(sheet:FinanceSheet) {
  const count=Math.max(1,...sheet.rows.map(r=>r.length));
  const ref="A1:"+col(count-1)+Math.max(1,sheet.rows.length);
  const cols=Array.from({length:count},(_,i)=>'<col min="'+(i+1)+'" max="'+(i+1)+'" width="'+(sheet.widths?.[i]??18)+'" customWidth="1"/>').join("");
  const rows=sheet.rows.map((row,i)=>'<row r="'+(i+1)+'">'+row.map((cell,j)=>{
    const r=col(j)+(i+1);
    let style=i===0?1:0;
    if(i>0&&j===sheet.statusColumn&&typeof cell==="string") style=cell==="KHỚP"?3:cell==="CHÊNH LỆCH"||cell==="THIẾU DỮ LIỆU"?5:4;
    if(cell===null)return '<c r="'+r+'" s="'+style+'"/>';
    if(typeof cell==="number")return '<c r="'+r+'" s="'+(i===0?1:2)+'"><v>'+String(Number.isFinite(cell)?cell:0)+'</v></c>';
    if(typeof cell==="object")return '<c r="'+r+'" s="2"><f>'+esc(cell.formula)+'</f><v>'+String(Number.isFinite(cell.value)?cell.value:0)+'</v></c>';
    return '<c r="'+r+'" s="'+style+'" t="inlineStr"><is><t xml:space="preserve">'+esc(cell.slice(0,32767))+'</t></is></c>';
  }).join("")+'</row>').join("");
  return xmlHeader+'<worksheet xmlns="'+ns+'"><dimension ref="'+ref+'"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="16"/><cols>'+cols+'</cols><sheetData>'+rows+'</sheetData>'+(sheet.rows.length>1?'<autoFilter ref="'+ref+'"/>':'')+'</worksheet>';
}
const styles=xmlHeader+'<styleSheet xmlns="'+ns+'"><numFmts count="1"><numFmt numFmtId="164" formatCode="#,##0;[Red](#,##0);0"/></numFmts><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="6"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF174D3B"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFDCFCE7"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFEF3C7"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFEE2E2"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="6"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="0" xfId="0" applyFill="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" xfId="0" applyFill="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="0" xfId="0" applyFill="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>';
function crc32(bytes:Uint8Array) {
  let crc=0xffffffff;for(const b of bytes){crc^=b;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return (crc^0xffffffff)>>>0;
}
function zip(files:{name:string;content:string}[]):ArrayBuffer {
  const enc=new TextEncoder();
  const parts:Uint8Array[]=[];const directory:Uint8Array[]=[];let offset=0;let centralSize=0;
  for(const file of files){
    const name=enc.encode(file.name), data=enc.encode(file.content), crc=crc32(data);
    const local=new Uint8Array(30+name.length), l=new DataView(local.buffer);
    l.setUint32(0,0x04034b50,true);l.setUint16(4,20,true);l.setUint16(6,0x800,true);l.setUint16(12,33,true);l.setUint32(14,crc,true);l.setUint32(18,data.length,true);l.setUint32(22,data.length,true);l.setUint16(26,name.length,true);local.set(name,30);
    const central=new Uint8Array(46+name.length), c=new DataView(central.buffer);
    c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x800,true);c.setUint16(14,33,true);c.setUint32(16,crc,true);c.setUint32(20,data.length,true);c.setUint32(24,data.length,true);c.setUint16(28,name.length,true);c.setUint32(42,offset,true);central.set(name,46);
    parts.push(local,data);directory.push(central);offset+=local.length+data.length;centralSize+=central.length;
  }
  const end=new Uint8Array(22),e=new DataView(end.buffer);
  e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,centralSize,true);e.setUint32(16,offset,true);
  const output=new Uint8Array(offset+centralSize+end.length);let at=0;for(const part of [...parts,...directory,end]){output.set(part,at);at+=part.length;}return output.buffer;
}
export function makeFinanceXlsx(sheets:FinanceSheet[]):ArrayBuffer {
  const files=[
    {name:"[Content_Types].xml",content:xmlHeader+'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'+sheets.map((_,i)=>'<Override PartName="/xl/worksheets/sheet'+(i+1)+'.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>').join("")+'</Types>'},
    {name:"_rels/.rels",content:xmlHeader+'<Relationships xmlns="'+relNs+'"><Relationship Id="rId1" Type="'+officeRel+'/officeDocument" Target="xl/workbook.xml"/></Relationships>'},
    {name:"xl/workbook.xml",content:xmlHeader+'<workbook xmlns="'+ns+'" xmlns:r="'+officeRel+'"><sheets>'+sheets.map((s,i)=>'<sheet name="'+esc(s.name)+'" sheetId="'+(i+1)+'" r:id="rId'+(i+1)+'"/>').join("")+'</sheets><calcPr calcMode="auto" fullCalcOnLoad="1"/></workbook>'},
    {name:"xl/_rels/workbook.xml.rels",content:xmlHeader+'<Relationships xmlns="'+relNs+'">'+sheets.map((_,i)=>'<Relationship Id="rId'+(i+1)+'" Type="'+officeRel+'/worksheet" Target="worksheets/sheet'+(i+1)+'.xml"/>').join("")+'<Relationship Id="rId'+(sheets.length+1)+'" Type="'+officeRel+'/styles" Target="styles.xml"/></Relationships>'},
    {name:"xl/styles.xml",content:styles},
    ...sheets.map((s,i)=>({name:"xl/worksheets/sheet"+(i+1)+".xml",content:sheetXml(s)}))
  ];
  return zip(files);
}
export function downloadFinanceXlsx(sheets:FinanceSheet[],month:string){
  const url=URL.createObjectURL(new Blob([makeFinanceXlsx(sheets)],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
  const a=document.createElement("a");a.href=url;a.download="GoVietStay_PnL_"+month+".xlsx";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
