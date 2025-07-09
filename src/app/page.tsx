"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";

const reservationSteps = [
  {
    title: "ثبت‌نام یا ورود",
    desc: "برای شروع، ابتدا وارد حساب کاربری‌ خود شوید یا ثبت‌نام کنید.",
    icon: "🧑‍🚀",
  },
  {
    title: "انتخاب زمان و دستگاه",
    desc: "تاریخ، بازه زمانی و نوع دستگاه (PC یا PS5) را انتخاب کنید.",
    icon: "🎮",
  },
  {
    title: "افزودن به سبد خرید",
    desc: "موارد انتخاب شده را به سبد اضافه کرده و نهایی کنید.",
    icon: "🛒",
  },
  {
    title: "پرداخت و تایید رزرو",
    desc: "با پرداخت آنلاین، رزرو شما کامل و تایید می‌شود.",
    icon: "✅",
  },
];

const gameImages = [
  "/assets/games/spiderman2.png",
  "/assets/games/reddeadredemption.png",
  "/assets/games/spiderman2.png",
  "/assets/games/reddeadredemption.png",
  "/assets/games/spiderman2.png",
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yMountains = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const yTrees = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    slides: {
      perView: 3,
      spacing: 20,
    },
    dragSpeed: 1,
    created: (instance) => {
      setTimeout(() => instance.update(), 100); // Fix layout shift
    },
  });

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!paused && slider) {
      interval = setInterval(() => {
        slider.current?.next();
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [paused, slider]);

  return (
    <div className="font-vazir text-white text-right rtl">
      {/* 🎯 HERO SECTION */}
      <section
        ref={heroRef}
        className="relative h-[100vh] overflow-hidden bg-black isolate"
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          src="/assets/layers/layer1.png"
          alt="Sky & Sun"
          className="fixed -top-20 left-0 w-full h-[140vh] sm:h-[100vh] object-cover z-0"
          draggable={false}
        />

        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          src="/assets/layers/layer2.png"
          alt="Mountains"
          style={{ y: yMountains }}
          className="absolute top-40 left-0 w-full h-[75vh] z-40 pointer-events-none"
          draggable={false}
        />

        <motion.img
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
          style={{ y: yTrees }}
          src="/assets/layers/layer3.png"
          alt="Trees"
          className="absolute -bottom-40 left-0 w-full h-[100vh] object-cover z-50 pointer-events-none"
          draggable={false}
        />

        <div className="absolute bottom-0 w-full h-48 z-50 bg-gradient-to-t from-[#0f1117] via-[#0f1117]/85 to-transparent pointer-events-none" />

        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 70, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 2.2 }}
          className="fixed flex w-full z-30 justify-center items-center"
        >
          <motion.img
            src="/assets/layers/logo.png"
            className="h-72"
            alt="Game Zone Logo"
          />
        </motion.div>
      </section>

      {/* 🚀 RESERVATION STEPS */}
      <section className="relative z-40 bg-[#0f1117] py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-neon-blue mb-4">
            مراحل رزرو آسان
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-16 text-sm md:text-base">
            در کمتر از چند دقیقه، دستگاهت رو رزرو کن و آماده‌ی بازی باش!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {reservationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#1a1a2f] to-[#232c45] p-6 rounded-xl border border-neon-pink/40 shadow-[0_0_20px_rgba(255,64,129,0.4)] hover:shadow-[0_0_30px_rgba(255,64,129,0.6)] transition-all duration-300 hover:scale-105 flex flex-col items-center text-center group relative overflow-hidden"
              >
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-neon-pink blur-2xl opacity-10 rotate-45" />
                <div className="text-5xl mb-4 group-hover:scale-125 transition">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-neon-blue mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎮 GAME SLIDER */}
      <section className="relative py-20 bg-[#0f1117] overflow-hidden">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-neon-pink mb-14">
          جدیدترین بازی‌ها را در Game Zone تجربه کنید
        </h2>

        <div
          className="relative w-full px-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={sliderRef}
            className="keen-slider transition-transform"
          >
            {gameImages.map((src, i) => (
              <div
                key={i}
                className="keen-slider__slide group min-w-[250px] md:min-w-[350px] h-[400px] rounded-xl overflow-hidden border border-[#2c2c2c] shadow-md hover:shadow-[0_0_20px_#ff4081aa] transition-all duration-300"
              >
                <Image
                  src={src}
                  alt={`Game ${i}`}
                  width={350}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Edge Gradient Fades */}
          <div className="absolute top-0 left-0 h-full w-24 z-10 bg-gradient-to-r from-[#0f1117] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-24 z-10 bg-gradient-to-l from-[#0f1117] to-transparent pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
