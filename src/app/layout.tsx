import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner"; // ✅ ADD THIS

const vazir = Vazirmatn({
    subsets: ["arabic"],
    variable: "--font-vazir",
});

export const metadata: Metadata = {
    title: "Game Center",
    description: "Modern Reservation Website for PC & PS5 Gaming",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fa" dir="rtl">
            <body className={`${vazir.variable} font-vazir antialiased bg-gray-950 text-gray-200`}>
                <Toaster richColors /> {/* ✅ ADD THIS */}
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-1 pt-16">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
