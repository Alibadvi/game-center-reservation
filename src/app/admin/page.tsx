// src/app/admin/page.tsx
'use client';

import withAdminAuth from '@/components/withAdminAuth';
import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { toast } from "sonner";

interface Reservation {
  id: string;
  device: "PC" | "PS5";
  sessionType: "AFTERNOON" | "NIGHT" | "HOURLY";
  date: string;
  chairs: number;
  price: number;
  user: {
    name: string;
    phone: string;
  };
}

function AdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch("/api/reservations");
        if (!res.ok) throw new Error("Failed to fetch reservations");
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        console.error(err);
        toast.error("خطا در دریافت اطلاعات رزرو");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-vazir text-right rtl space-y-16">
      <h1 className="text-4xl font-extrabold text-neon-blue drop-shadow-md">
        🧑‍💼 پنل مدیریت
      </h1>

      <section className="space-y-6">
        <h2 className="text-2xl text-white flex items-center gap-2 font-bold">
          <CalendarCheck size={22} className="text-neon-pink" /> لیست رزروها
        </h2>

        {isLoading ? (
          <p className="text-gray-400">در حال بارگذاری...</p>
        ) : reservations.length === 0 ? (
          <p className="text-gray-400">هیچ رزروی ثبت نشده است.</p>
        ) : (
          <div className="space-y-5">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="bg-[#1B263B] p-5 rounded-lg border-l-4 border-neon-pink shadow"
              >
                <p className="text-neon-blue font-semibold text-base mb-1">
                  👤 کاربر: {res.user.name} ({res.user.phone})
                </p>
                <p className="text-gray-300 text-sm leading-6">
                  📅 تاریخ: {new Date(res.date).toLocaleDateString("fa-IR")} <br />
                  🎮 سیستم: {res.device === "PC" ? "کامپیوتر" : "پلی‌استیشن ۵"} <br />
                  🕓 بازه:{" "}
                  {res.device === "PC"
                    ? res.sessionType === "AFTERNOON"
                      ? "عصر (17-22)"
                      : "شب (23-04)"
                    : `ساعت ${res.sessionType}`} <br />
                  🔢 تعداد: {res.chairs} <br />
                  💰 قیمت: {res.price.toLocaleString()} تومان
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default withAdminAuth(AdminPage);
