"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { CalendarClock, Sun, Moon, Clock } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

export default function ReservationForm() {
  const [type, setType] = useState<"PC" | "PS5">("PC");
  const [date, setDate] = useState<any>(null);
  const [count, setCount] = useState<number>(1);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showCartButton, setShowCartButton] = useState(false);
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const addToCart = useCartStore((state) => state.addToCart);

  const ps5TimeSlots = ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("برای رزرو ابتدا وارد شوید.");
      router.push("/login");
    }
  }, [isLoggedIn]);

  const handleAddToCart = (session: "afternoon" | "night" | string) => {
    if (!user || !date || count < 1 || (type === "PS5" && !selectedTime)) {
      toast.error("لطفاً همه فیلدها را کامل وارد کنید.");
      return;
    }

    const price =
      type === "PC"
        ? session === "afternoon"
          ? 250000
          : 350000
        : 60000 * count;

    const id = `${type}-${date?.format("YYYY-MM-DD")}-${session || selectedTime}`;

    addToCart({
      id,
      date: date?.format("YYYY-MM-DD"),
      session: session || selectedTime,
      type,
      count,
      price,
      time: type === "PS5" ? selectedTime : undefined,
    });

    toast.success("افزوده شد به سبد خرید");
    setShowCartButton(true);
  };

  if (!isLoggedIn) return null;

  return (
    <form
      onSubmit={(e: FormEvent) => e.preventDefault()}
      className="space-y-8 bg-[#1B263B] p-6 rounded-xl border border-gray-700 shadow-xl"
    >
      <div className="space-y-2">
        <label className="text-gray-300 text-sm">نوع سیستم</label>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value as "PC" | "PS5");
            setSelectedTime("");
          }}
          className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-600"
        >
          <option value="PC">کامپیوتر</option>
          <option value="PS5">پلی‌استیشن ۵</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-gray-300 flex items-center gap-1 text-sm">
          <CalendarClock size={18} /> تاریخ رزرو
        </label>
        <DatePicker
          value={date}
          onChange={setDate}
          calendar={persian}
          locale={persian_fa}
          inputClass="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-600"
        />
      </div>

      <div className="space-y-2">
        <label className="text-gray-300 text-sm">تعداد سیستم</label>
        <input
          type="number"
          min={1}
          max={type === "PC" ? 10 : 2}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-600"
        />
      </div>

      {type === "PC" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-600 space-y-3">
            <div className="flex items-center gap-2 text-neon-blue font-bold">
              <Sun size={20} /> بازه عصر (17:00 - 22:00)
            </div>
            <p className="text-sm text-gray-300">هزینه: ۲۵۰٬۰۰۰ تومان</p>
            <button
              type="button"
              onClick={() => handleAddToCart("afternoon")}
              className="w-full bg-neon-blue text-gray-900 font-bold py-2 rounded"
            >
              افزودن به سبد خرید
            </button>
          </div>
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-600 space-y-3">
            <div className="flex items-center gap-2 text-neon-blue font-bold">
              <Moon size={20} /> بازه شب (23:00 - 04:00)
            </div>
            <p className="text-sm text-gray-300">هزینه: ۳۵۰٬۰۰۰ تومان</p>
            <button
              type="button"
              onClick={() => handleAddToCart("night")}
              className="w-full bg-neon-blue text-gray-900 font-bold py-2 rounded"
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-neon-pink font-bold">
            <Clock size={20} /> انتخاب ساعت (برای هر ساعت: ۶۰٬۰۰۰ تومان)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ps5TimeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={`text-sm px-3 py-2 rounded border font-medium ${
                  selectedTime === slot
                    ? "bg-neon-pink text-gray-900 border-neon-pink"
                    : "bg-gray-800 text-gray-100 border-gray-600 hover:border-neon-pink"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleAddToCart(selectedTime)}
            className="w-full bg-neon-pink text-gray-900 font-bold py-2 rounded mt-2"
          >
            افزودن به سبد خرید
          </button>
        </div>
      )}

      {showCartButton && (
        <div className="pt-4">
          <button
            type="button"
            onClick={() => router.push("/cart")}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded transition"
          >
            مشاهده سبد خرید
          </button>
        </div>
      )}
    </form>
  );
}
