'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notifyError, notifySuccess } from '../../lib/toast';
import { useAuthStore } from '@/store/authStore';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', phone: '', password: '' });
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      notifyError(data.error || 'مشکلی پیش آمده.');
    } else {
      notifySuccess('ثبت‌نام موفقیت‌آمیز بود!');
      register(data.user.phone, data.user.name, data.user.balance, data.user.role);
      router.push('/');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-24 bg-[#1B263B] p-8 rounded-xl shadow space-y-6 font-vazir text-right rtl">
      <h2 className="text-2xl font-bold text-neon-blue mb-4 text-center">ثبت‌نام</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="نام کامل"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 rounded bg-[#0D0F14] text-white border border-gray-700"
          required
        />
        <input
          type="text"
          placeholder="شماره موبایل"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full p-3 rounded bg-[#0D0F14] text-white border border-gray-700"
          required
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 rounded bg-[#0D0F14] text-white border border-gray-700"
          required
        />
        <button
          type="submit"
          className="w-full bg-neon-pink text-gray-900 font-bold py-3 rounded hover:bg-pink-400"
        >
          ثبت‌نام
        </button>
      </form>
    </div>
  );
}
