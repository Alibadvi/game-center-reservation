"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { User, CalendarCheck } from "lucide-react";

// These will be replaced with real API calls later
const mockUsers = [
  { id: 1, name: "Ali", email: "ali@email.com" },
  { id: 2, name: "Sara", email: "sara@email.com" },
];

const mockReservations = [
  {
    id: 1,
    user: "Ali",
    type: "PC",
    session: "afternoon",
    date: "2025-07-03",
    count: 3,
    price: 250000,
  },
  {
    id: 2,
    user: "Sara",
    type: "PS5",
    session: "18:00",
    date: "2025-07-04",
    count: 1,
    price: 60000,
  },
];

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Placeholder logic for fetching data
    setUsers(mockUsers);
    setReservations(mockReservations);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-vazir text-right rtl">
      <h1 className="text-3xl font-bold mb-10 text-yellow-400">پنل مدیریت</h1>

      {/* Users Section */}
      <section className="mb-10">
        <h2 className="text-xl text-gray-300 flex items-center gap-2 mb-4">
          <User size={18} /> کاربران ثبت‌نام‌شده
        </h2>
        <div className="bg-gray-800 border border-gray-700 rounded p-4 space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center border-b border-gray-600 pb-2"
            >
              <span className="text-gray-200">{user.name}</span>
              <span className="text-gray-400 text-sm">{user.email}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reservations Section */}
      <section>
        <h2 className="text-xl text-gray-300 flex items-center gap-2 mb-4">
          <CalendarCheck size={18} /> رزروها
        </h2>
        <div className="bg-gray-800 border border-gray-700 rounded p-4 space-y-3">
          {reservations.map((res) => (
            <div
              key={res.id}
              className="border-b border-gray-600 pb-3 space-y-1 text-sm"
            >
              <p className="text-gray-200">کاربر: {res.user}</p>
              <p className="text-gray-400">
                سیستم: {res.type}, تاریخ: {res.date}, {" "}
                {res.type === "PC" ? `بازه: ${res.session}` : `ساعت: ${res.session}`}, تعداد:
                {res.count}, قیمت: {res.price.toLocaleString()} تومان
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}