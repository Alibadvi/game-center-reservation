import ReservationForm from "@/components/ReservationForm";

export default function ReservePage() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
        رزرو سیستم
      </h1>
      <ReservationForm />
    </section>
  );
}
