import type {Metadata} from "next";
export const metadata:Metadata={other:{"content-language":"en-PH","applicable-device":"pc,mobile"}};
export default function PhilippinesLayout({children}:{children:React.ReactNode}){return <div lang="en-PH">{children}</div>}
