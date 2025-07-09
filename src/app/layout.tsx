'use client';

import type { Metadata } from 'next';
import { useEffect, useState } from 'react';
import { useLoaderStore } from '@/store/loaderStore';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { showLoader, hideLoader } = useLoaderStore();

  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    showLoader();
    const timer = setTimeout(() => {
      hideLoader();
      setInitialLoadDone(true);
      setShowContent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!initialLoadDone) return;
    showLoader();
    setShowContent(false);

    const timer = setTimeout(() => {
      hideLoader();
      setShowContent(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="fa" dir="rtl">
      <body
        className={`
          font-vazir antialiased text-gray-200 relative
          ${!showContent ? 'overflow-hidden h-screen' : ''}
        `}
      >
        <Toaster richColors />
        <Loading />

        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="relative z-10 flex flex-col min-h-screen"
            >
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}
