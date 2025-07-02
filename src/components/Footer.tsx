import Link from "next/link";
import { Instagram, Send } from "lucide-react"; // Lucide doesn't have Telegram, but "Send" works well

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-200 px-6 py-10 font-vazir">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm rtl text-right">
                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-3">تماس با ما</h3>
                    <p className="text-gray-400">شماره تماس: ۰۹۱۲-۰۰۰-۰۰۰۰</p>
                    <p className="text-gray-400">آدرس: تهران، میدان انقلاب، پلاک ۱۲</p>
                    <p className="text-gray-400">ساعات کاری: ۱۰ صبح تا ۱۲ شب</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-3">دسترسی سریع</h3>
                    <ul className="space-y-2">
                        <li><Link href="/rules" className="text-gray-300 hover:text-yellow-400 transition">قوانین رزرو</Link></li>
                        <li><Link href="/faq" className="text-gray-300 hover:text-yellow-400 transition">سوالات متداول</Link></li>
                        <li><Link href="/about" className="text-gray-300 hover:text-yellow-400 transition">درباره ما</Link></li>
                        <li><Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition">ارتباط با ما</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="flex space-x-4 rtl:space-x-reverse mt-2">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
                        <Instagram size={22} />
                    </a>
                    <a href="https://t.me" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition">
                        <Send size={22} />
                    </a>
                </div>

            </div>

            {/* Bottom note */}
            <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} گیم‌سنتر. تمام حقوق محفوظ است.
            </div>
        </footer>
    );
}
