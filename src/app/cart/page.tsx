"use client";

import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const total = items.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 font-vazir text-right rtl">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400">سبد خرید شما</h1>

      {items.length === 0 ? (
        <div className="bg-gray-800 text-center py-12 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-lg">سبد خرید شما خالی است.</p>
          <Link
            href="/reserve"
            className="inline-block mt-6 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-2 px-6 rounded transition"
          >
            بازگشت به صفحه رزرو
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-700 bg-gray-800 rounded-lg p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm sm:text-base">
                <p className="text-gray-300">
                  <span className="font-bold text-yellow-400">تاریخ:</span> {item.date}
                </p>
                <p className="text-gray-300">
                  <span className="font-bold text-yellow-400">نوع:</span> {item.type === "PC" ? "کامپیوتر" : "پلی‌استیشن ۵"}
                </p>
                {item.session && (
                  <p className="text-gray-300">
                    <span className="font-bold text-yellow-400">بازه:</span>{" "}
                    {item.session === "afternoon" ? "عصر (۱۷ تا ۲۲)" : "شب (۲۳ تا ۴)"}
                  </p>
                )}
                {item.hour && (
                  <p className="text-gray-300">
                    <span className="font-bold text-yellow-400">ساعت:</span> {item.hour}
                  </p>
                )}
                <p className="text-gray-300">
                  <span className="font-bold text-yellow-400">تعداد:</span> {item.count}
                </p>
                <p className="text-yellow-400 font-bold">
                  قیمت: {item.price.toLocaleString()} تومان
                </p>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-700 pt-6 flex justify-between items-center text-lg">
            <p className="text-gray-300 font-bold">جمع کل:</p>
            <p className="text-yellow-400 font-extrabold text-xl">
              {total.toLocaleString()} تومان
            </p>
          </div>

          {isLoggedIn ? (
            <button className="w-full py-3 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-300 transition">
              ادامه فرایند پرداخت
            </button>
          ) : (
            <Link
              href="/login"
              className="block w-full text-center py-3 bg-gray-700 text-white font-bold rounded hover:bg-gray-600 transition"
            >
              برای ادامه ابتدا وارد شوید
            </Link>
          )}

          <button
            onClick={clearCart}
            className="w-full py-2 text-sm text-red-400 hover:underline text-center"
          >
            حذف تمام موارد سبد خرید
          </button>
        </div>
      )}
    </div>
  );
}
