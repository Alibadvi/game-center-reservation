'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroParallax() {
  const { scrollY } = useScroll();

  const yMountains = useTransform(scrollY, [0, 600], [0, -60]);
  const yTrees = useTransform(scrollY, [0, 600], [0, -120]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden isolate z-0">
      {/* 🌅 Layer 1 - Background Sky+Sun */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/layers/layer1.png"
          alt="Sky and Sun"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* 🏔️ Layer 2 - Mountains */}
      <motion.img
        src="/assets/layers/layer2.png"
        alt="Mountains"
        style={{ y: yMountains }}
        className={`absolute bottom-0 left-0 z-10 w-full pointer-events-none ${
          isMobile ? 'h-[55vh]' : 'h-[65vh]'
        }`}
        draggable={false}
      />

      {/* 🌲 Layer 3 - Trees (connects with content below) */}
      <motion.img
        src="/assets/layers/layer3.png"
        alt="Trees"
        style={{ y: yTrees }}
        className={`absolute bottom-0 left-0 z-20 w-full pointer-events-none ${
          isMobile ? 'h-[70vh]' : 'h-[90vh]'
        }`}
        draggable={false}
      />

      {/* 💬 Hero Text */}
      <div className="relative z-30 text-center pt-[20vh] px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow">
          به دنیای گیم خوش آمدید!
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-xl mx-auto">
          تجربه‌ای حرفه‌ای از بازی‌های گروهی و انفرادی در یک محیط هیجان‌انگیز و مدرن
        </p>
        <div className="mt-8">
          <a
            href="/reserve"
            className="inline-block bg-neon-pink text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-pink-400 transition duration-300"
          >
            همین حالا رزرو کن
          </a>
        </div>
      </div>

      {/* 🔲 Extended Fade to hide background properly */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] md:h-[100px] z-30 bg-gradient-to-b from-transparent to-[#0f1117]" />
    </section>
  );
}
