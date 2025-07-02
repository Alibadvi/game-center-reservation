"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const username = useAuthStore((s) => s.username);
  const logout = useAuthStore((s) => s.logout);

  const cartItems = useCartStore((s) => s.items);

  return (
    <header className="bg-gray-900 text-gray-200 shadow-md font-vazir">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between rtl">
        {/* Logo */}
        <div className="text-yellow-400 text-xl font-bold">گیم‌سنتر</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          <li><Link href="/" className="hover:text-yellow-400">صفحه اصلی</Link></li>
          <li><Link href="/reserve" className="hover:text-yellow-400">رزرو</Link></li>
          <li><Link href="/about" className="hover:text-yellow-400">درباره ما</Link></li>
          <li><Link href="/contact" className="hover:text-yellow-400">ارتباط با ما</Link></li>

          {/* Auth Links */}
          {!isLoggedIn ? (
            <>
              <li><Link href="/login" className="hover:text-yellow-400">ورود</Link></li>
              <li><Link href="/register" className="hover:text-yellow-400">ثبت‌نام</Link></li>
            </>
          ) : (
            <>
              <li className="text-yellow-400 font-bold">سلام، {username}</li>
              <li>
                <button onClick={logout} className="text-red-400 hover:text-red-500">خروج</button>
              </li>
            </>
          )}

          {/* Cart Icon */}
          <li>
            <Link href="/cart" className="relative hover:text-yellow-400">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs rounded-full px-1">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-200 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-4 text-right space-y-4">
          <Link href="/" className="block hover:text-yellow-400">صفحه اصلی</Link>
          <Link href="/reserve" className="block hover:text-yellow-400">رزرو</Link>
          <Link href="/about" className="block hover:text-yellow-400">درباره ما</Link>
          <Link href="/contact" className="block hover:text-yellow-400">ارتباط با ما</Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login" className="block hover:text-yellow-400">ورود</Link>
              <Link href="/register" className="block hover:text-yellow-400">ثبت‌نام</Link>
            </>
          ) : (
            <>
              <div className="text-yellow-400 font-bold">سلام، {username}</div>
              <button onClick={logout} className="text-red-400 hover:text-red-500 block">خروج</button>
            </>
          )}

          <Link href="/cart" className="block hover:text-yellow-400">سبد خرید</Link>
        </div>
      )}
    </header>
  );
}
