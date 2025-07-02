import type {Metadata} from "next";
import {Vazirmatn} from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const vazir = Vazirmatn({
    subsets: ['arabic'],
    variable: '--font-vazir',
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
        <body className={`${vazir.variable} font-sans antialiased`}>
        <Navbar/>
        <main className="pt-16">{children}</main>
        </body>
        </html>
    );
}
