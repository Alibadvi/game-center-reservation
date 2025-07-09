import ReservationForm from "@/components/ReservationForm";

export default function ReservePage() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-12 font-vazir text-right rtl">
      <h1 className="text-3xl font-extrabold text-neon-blue mb-8 drop-shadow-md text-center">
        🗓️ رزرو سیستم
      </h1>
      <ReservationForm />
    </section>
  );
}
