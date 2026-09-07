import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function BookingPaymentPage({ params }: Props) {
  const { token } = await params;
  if (!/^[a-f0-9]{64}$/i.test(token)) notFound();
  redirect(
    `https://vscffgnxaexestnayvae.supabase.co/functions/v1/booking-payment-public?token=${encodeURIComponent(token)}`
  );
}
