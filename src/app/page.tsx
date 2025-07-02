export default function HomePage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-blue-600">به مرکز بازی خوش آمدید</h1>
                <p className="text-lg text-gray-600">
                    بهترین مکان برای بازی‌های گروهی با کامپیوتر و پلی‌استیشن ۵
                </p>
                <p className="text-md text-gray-700">
                    برای رزرو صندلی و ساعت بازی، از بخش رزرو استفاده کنید.
                </p>
            </section>

            <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-2 text-blue-500">10 سیستم شبکه‌ای PC</h2>
                    <p className="text-gray-600">
                        مناسب برای بازی‌های چند نفره با دوستان، با تجهیزات حرفه‌ای و محیط مناسب
                    </p>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-2 text-blue-500">2 دستگاه PS5</h2>
                    <p className="text-gray-600">
                        لذت بازی‌های کنسولی با کیفیت تصویر بالا و کنترلرهای اورجینال
                    </p>
                </div>
            </section>
        </div>
    );
}
