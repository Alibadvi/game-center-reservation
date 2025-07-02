"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const success = register(username, password);
    if (success) {
      toast.success("ثبت‌نام با موفقیت انجام شد!");
      router.push("/login");
    } else {
      toast.error("این نام کاربری قبلا ثبت شده.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 font-vazir">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-bold text-yellow-400 mb-4">ثبت‌نام</h1>

        <input
          type="text"
          placeholder="نام کاربری"
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="رمز عبور"
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-gray-900 py-2 rounded font-bold hover:bg-yellow-300 transition"
        >
          ثبت‌نام
        </button>
      </form>
    </div>
  );
}
