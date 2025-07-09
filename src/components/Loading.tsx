'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLoaderStore } from '@/store/loaderStore';

export default function Loading() {
  const isLoading = useLoaderStore((state) => state.isLoading);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-gradient-to-br from-dark-bg to-dark-surface backdrop-blur-md flex flex-col items-center justify-center space-y-6 font-vazir text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="w-16 h-16"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          >
            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-neon-blue drop-shadow-neon">
              <path
                fill="currentColor"
                d="M32 0C14.327 0 0 14.327 0 32s14.327 32 32 32 32-14.327 32-32S49.673 0 32 0zm0 58C17.664 58 6 46.336 6 32S17.664 6 32 6s26 11.664 26 26-11.664 26-26 26z"
              />
              <circle cx="20" cy="32" r="4" fill="#f06292" />
              <circle cx="44" cy="32" r="4" fill="#f06292" />
              <circle cx="32" cy="20" r="4" fill="#f06292" />
              <circle cx="32" cy="44" r="4" fill="#f06292" />
            </svg>
          </motion.div>
          <p className="text-neon-pink text-lg drop-shadow-neon-pink">در حال بارگذاری...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
