import type {Metadata} from "next";

export const metadata:Metadata={
  other:{
    "content-language":"zh-CN",
    "applicable-device":"pc,mobile",
    "format-detection":"telephone=no",
  }
};

export default function ChinaLayout({children}:{children:React.ReactNode}){
  return <div lang="zh-CN">{children}</div>;
}
