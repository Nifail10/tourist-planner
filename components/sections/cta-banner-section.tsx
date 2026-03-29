"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBannerSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#030303] text-white my-12 mx-4 sm:mx-6 lg:mx-8 rounded-3xl">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#030303] to-[#030303] z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] z-0" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8"
        >
          Start Planning Your <br />
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-violet-500 bg-clip-text text-transparent">
            Next Adventure
          </span>
        </motion.h2>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
        >
          <Link
            href="/plan"
            className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full bg-white text-purple-900 hover:bg-gray-100 font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            Plan My Trip
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
