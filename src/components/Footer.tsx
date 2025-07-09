import Link from "next/link";
import { Instagram, Send } from "lucide-react"; // Send = Telegram

export default function Footer() {
  return (
    <footer className="relative bg-[#0D0F14] text-gray-200 font-vazir border-t border-gray-800 pt-12 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6 pb-10 text-sm rtl text-right">
        
        {/* Contact Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-neon-blue mb-3">تماس با ما</h3>
          <p className="text-gray-400">شماره تماس: ۰۹۱۲-۰۰۰-۰۰۰۰</p>
          <p className="text-gray-400">آدرس: تهران، میدان انقلاب، پلاک ۱۲</p>
          <p className="text-gray-400">ساعات کاری: ۱۰ صبح تا ۱۲ شب</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-neon-blue mb-3">دسترسی سریع</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/rules" className="text-gray-300 hover:text-neon-pink transition duration-300">
                قوانین رزرو
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-300 hover:text-neon-pink transition duration-300">
                سوالات متداول
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-300 hover:text-neon-pink transition duration-300">
                درباره ما
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-300 hover:text-neon-pink transition duration-300">
                ارتباط با ما
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neon-blue mb-3">ما را دنبال کنید</h3>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400 transition"
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition"
            >
              <Send size={22} />
            </a>
          </div>
          <p className="text-gray-500 text-xs mt-4 leading-relaxed">
            برای دریافت جدیدترین اخبار، بازی‌ها، و تخفیف‌های ویژه، ما را در شبکه‌های اجتماعی دنبال کنید.
          </p>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="relative z-10 text-center text-xs text-gray-500 mt-8 py-4 border-t border-gray-700 bg-[#0B0E12]">
        © {new Date().getFullYear()} گیم‌سنتر. تمام حقوق محفوظ است.
      </div>
    </footer>
  );
}
