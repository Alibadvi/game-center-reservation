"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const user = useAuthStore((s) => s.user);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const logout = useAuthStore((s) => s.logout);
  const cartItems = useCartStore((s) => s.items);
  const cartCount = cartItems.length;
  const isAdmin = user?.role === "ADMIN";

  // 🔒 Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "خانه" },
    { href: "/reserve", label: "رزرو" },
    { href: "/about", label: "درباره ما" },
    { href: "/contact", label: "تماس" },
    ...(isAdmin
      ? [
          { href: "/admin", label: "پنل مدیریت" },
          { href: "/accounts", label: "حساب‌ها" },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-nav-blur border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between font-vazir relative" dir="ltr">

        {/* 🧡 Logo - Left side (always) */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-neon-orange tracking-wider z-50"
        >
          Game Zone
        </Link>

        {/* 🍔 Hamburger Menu - Right side on Mobile */}
        <motion.button
          className="md:hidden ml-auto z-50"
          initial={false}
          animate={isOpen ? "open" : "closed"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div
            className="w-10 h-10 rounded-full absolute top-4 right-4 bg-yellow-400 flex items-center justify-center shadow-lg"
            whileTap={{ scale: 0.9 }}
            layout
          >
            <motion.div className="relative w-6 h-5">
              <motion.span
                className="absolute w-6 h-0.5 bg-black left-0 top-[10px]"
                animate={isOpen ? { rotate: 45 } : { rotate: 0, top: "4px" }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute w-6 h-0.5 bg-black left-0 top-[10px]"
                animate={isOpen ? { opacity: 0 } : { opacity: 1, top: "10px" }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute w-6 h-0.5 bg-black left-0 top-[10px]"
                animate={isOpen ? { rotate: -45 } : { rotate: 0, top: "16px" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </motion.button>

        {/* 💻 Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm" dir="rtl">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-neon-pink transition">
                {label}
              </Link>
            </li>
          ))}
          {hasHydrated && isLoggedIn ? (
            <>
              <li className="text-neon-blue font-bold">
                سلام، {user?.name || user?.phone}
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-red-400 hover:text-red-500 transition"
                >
                  خروج
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="hover:text-neon-pink">
                  ورود
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-neon-pink">
                  ثبت‌نام
                </Link>
              </li>
            </>
          )}
          <li>
            <Link href="/cart" className="relative hover:text-yellow-400">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>

        {/* 📱 Mobile Menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full right-0 w-full bg-[#1B263B] px-6 py-6 space-y-4 text-sm rtl" dir="rtl"
            >
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="block text-white hover:text-neon-pink"
                >
                  {label}
                </Link>
              ))}

              {hasHydrated && isLoggedIn ? (
                <>
                  <div className="text-neon-blue font-bold">
                    سلام، {user?.name || user?.phone}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="text-red-400 hover:text-red-500 block"
                  >
                    خروج
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block hover:text-neon-pink"
                  >
                    ورود
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="block hover:text-neon-pink"
                  >
                    ثبت‌نام
                  </Link>
                </>
              )}

              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="block hover:text-yellow-400"
              >
                سبد خرید ({cartCount})
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
