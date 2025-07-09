"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter(); // ✅ for client-side redirect
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.push("/login"); // ✅ fixed redirect
      return;
    }

    const fetchReservations = async () => {
      try {
        const res = await axios.get("/api/reservations", {
          params: { userId: user.id },
        });
        setReservations(res.data);
      } catch (err) {
        console.error("Error fetching reservations:", err);
      }
    };

    fetchReservations();
  }, [user, isLoggedIn, router]);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 font-vazir rtl text-right space-y-16">
      <h1 className="text-3xl font-extrabold text-neon-blue drop-shadow-md text-center">
        پروفایل کاربری
      </h1>

      {/* 👾 User Info Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-gradient-to-br from-[#0f1117] to-[#131827] p-6 rounded-2xl border border-neon-pink/50 shadow-[0_0_20px_rgba(255,64,129,0.6)] overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-neon-pink animate-pulse" />
        <p className="text-gray-300 font-bold">
          نام کاربر: <span className="text-neon-pink">{user?.name}</span>
        </p>
        <p className="text-gray-300">
          شماره تماس: <span className="text-white">{user?.phone}</span>
        </p>
      </motion.div>

      {/* 🛸 Reservation Steps - Alienish Glowing Cards */}
      <section className="bg-[#0f1117] py-20 px-4 md:px-10">
        <h2 className="text-4xl font-extrabold text-center text-neon-blue mb-16 drop-shadow-lg">
          مراحل رزرو بازی
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              title: "مرحله اول",
              subtitle: "ثبت‌نام یا ورود",
              icon: "👤",
              desc: "ابتدا وارد حساب خود شوید یا یک حساب بسازید.",
            },
            {
              title: "مرحله دوم",
              subtitle: "انتخاب دستگاه و زمان",
              icon: "🎮",
              desc: "PC یا PS5 را انتخاب کرده و زمان رزرو را تعیین کنید.",
            },
            {
              title: "مرحله سوم",
              subtitle: "تأیید و پرداخت",
              icon: "💳",
              desc: "رزرو خود را تأیید کرده و هزینه را پرداخت کنید.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.25 }}
              className="relative bg-gradient-to-tr from-[#0e1624] to-[#182132] p-8 rounded-2xl border border-cyan-400/30 shadow-[0_0_25px_rgba(0,255,255,0.25)] hover:shadow-[0_0_45px_rgba(0,255,255,0.45)] hover:scale-105 transition duration-300"
            >
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-neon-pink flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(255,64,129,0.9)] border border-pink-400">
                {step.icon}
              </div>

              <div className="mt-10 text-center space-y-3">
                <h3 className="text-xl text-neon-blue font-extrabold">
                  {step.title}
                </h3>
                <p className="text-white text-lg font-semibold">
                  {step.subtitle}
                </p>
                <p className="text-gray-400 text-sm leading-6">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
