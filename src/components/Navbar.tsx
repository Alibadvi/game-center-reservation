'use client';

import {useState} from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 right-0 left-0 bg-white shadow-md z-50">
            <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="text-xl font-bold text-gray-800">گیم سنتر</div>

                <div className="hidden md:flex space-x-6 rtl:space-x-reverse">
                    <Link href="#">خانه</Link>
                    <Link href="#">رزرو</Link>
                    <Link href="#">درباره ما</Link>
                </div>

                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
            </nav>

            {isOpen && (
                <div className="md:hidden bg-white px-4 pb-4 flex flex-col items-start space-y-2 rtl:items-end">
                    <Link href="#">خانه</Link>
                    <Link href="#">رزرو</Link>
                    <Link href="#">درباره ما</Link>
                </div>
            )}
        </header>
    );
}
