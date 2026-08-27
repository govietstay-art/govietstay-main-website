import type {Metadata} from "next";
export const metadata:Metadata={other:{"content-language":"he-IL"}};
export default function Layout({children}:{children:React.ReactNode}){return <div lang="he-IL" dir="rtl">{children}</div>}