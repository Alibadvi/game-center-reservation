'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notifyError, notifySuccess } from '@/lib/toast';
import { useAuthStore } from '@/store/authStore';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', phone: '', password: '' });
  const router = useRouter();
  const register = useAuthStore((s) => s.register);

  const handleInputChange = (field: 'name' | 'phone' | 'password', value: string) => {
    const persianCharRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF۰-۹]/g;
    const cleaned = value.replace(persianCharRegex, '');
    setForm((prev) => ({ ...prev, [field]: cleaned }));
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    // Validation
    if (!form.name.trim() || form.name.length < 2) {
      return notifyError('لطفاً یک نام معتبر وارد کنید.');
    }

    if (!form.phone.match(/^09\d{9}$/)) {
      return notifyError('شماره موبایل معتبر نیست (مثلاً 09123456789).');
    }

    if (form.password.length < 4) {
      return notifyError('رمز عبور باید حداقل ۴ حرف باشد.');
    }

    // Submit
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      notifyError(data.error || 'مشکلی پیش آمد.');
    } else {
      notifySuccess('ثبت‌نام موفقیت‌آمیز بود!');
      register(data.user.phone, data.user.name, data.user.balance, data.user.role);
      router.push('/');
    }
  }

  return (
      <div className="my-32 flex items-center justify-center px-4">
        <div className="w-full max-w-md  border border-gray-700 p-8 rounded-xl shadow-lg font-vazir rtl text-white">
          <h2 className="text-2xl font-bold text-neon-pink mb-6 text-center">ثبت‌نام</h2>
          <form onSubmit={handleRegister} className="space-y-6 text-right">
            <div className="space-y-1">
              <p className="text-sm text-gray-300">نام کامل</p>
              <Input
                  type="text"
                  placeholder="مثلاً علی محمدی"
                  value={form.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-[#0D0F14] text-white border-gray-700 focus-visible:ring-neon-pink"
                  required
              />
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-300">شماره موبایل</p>
              <Input
                  type="text"
                  placeholder="مثلاً 09123456789"
                  value={form.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-[#0D0F14] text-white border-gray-700 focus-visible:ring-neon-pink"
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
                  className="bg-[#0D0F14] text-white border-gray-700 focus-visible:ring-neon-pink"
                  required
              />
            </div>

            <Button
                type="submit"
                className="w-full bg-neon-pink hover:bg-pink-500 text-black font-bold transition"
            >
              ثبت‌نام
            </Button>
          </form>
        </div>
      </div>
  );
}
