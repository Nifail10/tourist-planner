"use client";

import { motion } from "framer-motion";
import { MapPin, CalendarClock, Route } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Pick a destination",
    description: "Choose where you want to go from our curated list or search for anywhere in the world.",
  },
  {
    icon: CalendarClock,
    title: "Set your days",
    description: "Tell us how long you're staying. We handle trips from a quick weekend to a full 2-week vacation.",
  },
  {
    icon: Route,
    title: "Get your itinerary",
    description: "Instantly receive a day-by-day plan with activities, places to see, and estimated costs.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your next adventure is just three simple steps away.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[3.5rem] left-[15%] right-[15%] h-0.5 bg-border/50 -z-10" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center group"
              >
                <div className="mb-6 h-20 w-20 rounded-full bg-purple-100 dark:bg-purple-900/20 flexitems-center justify-center flex items-center group-hover:bg-purple-600 transition-colors duration-300">
                  <Icon className="h-10 w-10 text-purple-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {/* Step number badge */}
                <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center font-bold text-sm text-muted-foreground shadow-sm">
                  {index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
