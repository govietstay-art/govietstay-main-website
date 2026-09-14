export const metadata = {
  title: "GoVietStay Partner Network V11",
  description: "GoVietStay Partner Network V11 staging page",
  robots: { index: false, follow: false },
};

export default function PartnerV11Page() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "#03120c",
        zIndex: 9999,
      }}
    >
      <iframe
        src="/partner-v11.html"
        title="GoVietStay Partner Network V11"
        style={{ width: "100%", height: "100%", border: 0, display: "block" }}
      />
    </main>
  );
}
