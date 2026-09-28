import type {ReactNode} from "react";
// Global Organization and WebSite entities are authored once in app/layout.tsx.
// Localized guides inherit those IDs instead of introducing conflicting duplicates.
export default function TaiwanLayout({children}:{children:ReactNode}){return <>{children}</>;}
