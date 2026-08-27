import type {Metadata} from "next";
export const metadata:Metadata={other:{"content-language":"it-IT","applicable-device":"pc,mobile"}};
export default function ItalyLayout({children}:{children:React.ReactNode}){return <div lang="it-IT">{children}</div>}
