"use client";

import { useAuthStore } from "@/store/authStore";
import { getUserReservations } from "@/lib/reservations";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoggedIn) redirect("/login");

    if (user && typeof user.email === "string") {
      const data = getUserReservations(user.email);
      setReservations(data);
    }
  }, [user]);

  const getDisplayName = () => {
    if (!user) return "نامشخص";

    if (typeof user.username === "string") return user.username;
    if (typeof user.email === "string") return user.email.split("@")[0];

    return "کاربر";
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 font-vazir rtl text-right">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400">پروفایل کاربری</h1>

      {/* Profile Info */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 space-y-2">
        <p className="text-gray-300 font-bold">
          نام کاربری: <span className="text-yellow-400">{getDisplayName()}</span>
        </p>
        <p className="text-gray-300">
          ایمیل:{" "}
          <span className="text-white">
            {typeof user?.email === "string" ? user.email : "نامشخص"}
          </span>
        </p>
      </div>

      {/* Reservation History */}
      <h2 className="text-lg font-bold text-yellow-300 mb-2">رزروهای شما:</h2>
      {reservations.length === 0 ? (
        <p className="text-gray-400">هیچ رزروی ثبت نشده است.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((res) => (
            <div
              key={res.id}
              className="bg-gray-700 p-4 rounded-lg border border-gray-600"
            >
              <p className="text-white">تاریخ: {res.date}</p>
              <p className="text-white">سیستم: {res.system}</p>
              {res.session ? (
                <p className="text-white">
                  بازه: {res.session === "afternoon" ? "عصر" : "شب"}
                </p>
              ) : (
                <p className="text-white">ساعت: {res.time}</p>
              )}
              <p className="text-yellow-400 font-bold">
                قیمت: {res.price.toLocaleString()} تومان
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
