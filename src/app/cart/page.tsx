"use client";

import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const router = useRouter();

  const total = items.reduce((acc, item) => acc + item.price * item.count, 0);

  const handleCheckout = () => {
    // This would be replaced later with Zarinpal redirect logic
    router.push("/checkout"); // or show a toast for now
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-vazir text-right rtl space-y-10">
      <h1 className="text-4xl font-extrabold text-neon-blue drop-shadow-md">
        🎯 سبد خرید شما
      </h1>

      {items.length === 0 ? (
        <div className="bg-[#1B263B] text-center py-16 rounded-lg border border-gray-700 shadow-inner space-y-6">
          <p className="text-gray-400 text-lg">سبد خرید شما خالی است.</p>
          <Link
            href="/reserve"
            className="inline-block bg-neon-pink hover:bg-pink-400 text-gray-900 font-bold py-2 px-6 rounded transition"
          >
            بازگشت به صفحه رزرو
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-700 bg-[#1B263B] rounded-lg p-6 shadow-sm hover:shadow-xl transition"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm sm:text-base">
                <p className="text-gray-300">
                  <span className="font-bold text-neon-pink">تاریخ:</span> {item.date}
                </p>
                <p className="text-gray-300">
                  <span className="font-bold text-neon-pink">نوع:</span>{" "}
                  {item.type === "PC" ? "کامپیوتر" : "پلی‌استیشن ۵"}
                </p>
                {item.session && (
                  <p className="text-gray-300">
                    <span className="font-bold text-neon-pink">بازه:</span>{" "}
                    {item.session === "afternoon"
                      ? "عصر (۱۷ تا ۲۲)"
                      : item.session === "night"
                      ? "شب (۲۳ تا ۴)"
                      : item.session}
                  </p>
                )}
                {item.time && (
                  <p className="text-gray-300">
                    <span className="font-bold text-neon-pink">ساعت:</span> {item.time}
                  </p>
                )}
                <p className="text-gray-300">
                  <span className="font-bold text-neon-pink">تعداد:</span> {item.count}
                </p>
                <p className="text-neon-blue font-bold">
                  قیمت: {item.price.toLocaleString()} تومان
                </p>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-700 pt-6 flex justify-between items-center text-lg">
            <p className="text-gray-300 font-bold">جمع کل:</p>
            <p className="text-neon-pink font-extrabold text-xl">
              {total.toLocaleString()} تومان
            </p>
          </div>

          {isLoggedIn ? (
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-neon-blue text-gray-900 font-bold rounded-lg hover:bg-blue-400 transition"
            >
              ادامه فرایند پرداخت
            </button>
          ) : (
            <Link
              href="/login"
              className="block w-full text-center py-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition"
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
