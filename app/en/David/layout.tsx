import type {Metadata} from "next";
import type {ReactNode} from "react";
// Internal staff booking portal, not a public travel search landing page.
export const metadata:Metadata={robots:{index:false,follow:false}};
export default function StaffBookingLayout({children}:{children:ReactNode}){return <>{children}</>;}
