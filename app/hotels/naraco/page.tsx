import type { Metadata } from "next";
import NaracoClient from "./NaracoClient";

export const metadata: Metadata = {
  title: "Naraco Hoi An | Rooms & 10% Direct Booking Offer | GoVietStay",
  description: "Explore five Naraco room categories in Hoi An, with breakfast, welcome drink and an exclusive 10% direct booking offer via GoVietStay. Rates and availability subject to confirmation.",
};

export default function NaracoPage() { return <NaracoClient />; }
