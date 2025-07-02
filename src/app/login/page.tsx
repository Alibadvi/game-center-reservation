// File: src/app/login/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("همه فیلدها را پر کنید.");
      return;
    }

    // Fake login
    login({ username });
    toast.success("با موفقیت وارد شدید!");
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 font-vazir text-right rtl">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400">ورود</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-300">نام کاربری</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-600"
          />
        </div>

        <div>
          <label className="text-gray-300">رمز عبور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded hover:bg-yellow-300 transition"
        >
          ورود
        </button>
      </form>
    </div>
  );
}