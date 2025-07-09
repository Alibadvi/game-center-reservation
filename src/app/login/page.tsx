'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notifyError, notifySuccess } from '@/lib/toast';
import { useAuthStore } from '@/store/authStore';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const handleInputChange = (field: 'phone' | 'password', value: string) => {
    const persianCharRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF۰-۹]/g;
    const cleaned = value.replace(persianCharRegex, '');
    setForm((prev) => ({ ...prev, [field]: cleaned }));
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (form.password.length < 4) {
      return notifyError('رمز عبور باید حداقل ۴ حرف باشد.');
    }

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      notifyError(data.error || 'ورود ناموفق بود.');
    } else {
      notifySuccess('ورود موفق!');
      login(
          data.user.phone,
          data.user.name,
          data.user.id,
          data.user.balance,
          data.user.role
      );
      router.push('/');
    }
  }

  return (
      <div className="my-32 flex items-center justify-center px-4">
        <div className="w-full max-w-md border border-gray-700 p-8 rounded-xl shadow-lg font-vazir rtl text-white">
          <h2 className="text-2xl font-bold text-neon-blue mb-6 text-center">ورود به حساب</h2>
          <form onSubmit={handleLogin} className="space-y-6 text-right">
            <div className="space-y-1">
              <p className="text-sm text-gray-300">شماره موبایل</p>
              <Input
                  type="text"
                  placeholder="مثلاً 09123456789"
                  value={form.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-[#0D0F14] text-white border-gray-700 focus-visible:ring-neon-blue"
                  required
              />
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-300">رمز عبور</p>
              <Input
                  type="password"
                  placeholder="رمز عبور خود را وارد کنید"
                  value={form.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="bg-[#0D0F14] text-white border-gray-700 focus-visible:ring-neon-blue"
                  required
              />
            </div>

            <Button
                type="submit"
                className="w-full bg-neon-blue hover:bg-blue-500 text-white font-bold transition"
            >
              ورود
            </Button>
          </form>
        </div>
      </div>
  );
}
