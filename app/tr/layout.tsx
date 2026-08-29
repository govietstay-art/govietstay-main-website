import type {Metadata} from "next";
export const metadata:Metadata={other:{"content-language":"tr-TR","applicable-device":"pc,mobile"}};
export default function TurkeyLayout({children}:{children:React.ReactNode}){return <div lang="tr-TR">{children}</div>}
