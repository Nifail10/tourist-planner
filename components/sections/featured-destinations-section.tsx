"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, ArrowLeft } from "lucide-react";
import { useRef } from "react";

// Placeholder data since we need 5 specific Indian destinations for the mock
const FEATURED_DESTINATIONS = [
  {
    id: "delhi",
    name: "New Delhi",
    country: "India",
    image: "https://images.unsplash.com/photo-1587474260580-589f81df98db?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    entryFee: "Free",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    entryFee: "Free",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    image: "https://images.unsplash.com/photo-1522542475432-8dfbdf549924?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    entryFee: "Free",
  },
  {
    id: "goa",
    name: "Goa",
    country: "India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    entryFee: "₹500",
  },
  {
    id: "agra",
    name: "Agra",
    country: "India",
    image: "https://images.unsplash.com/photo-1564507592205-51fbd6f0ccbc?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    entryFee: "₹50",
  },
];

export function FeaturedDestinationsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; // Card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Explore some of our most popular starting points for unforgettable adventures.
            </p>
          </div>
          
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scroll("left")}
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </button>
            <button 
              onClick={() => scroll("right")}
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors"
            >
              <ArrowRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {FEATURED_DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-[300px] w-[300px] md:min-w-[350px] md:w-[350px] flex-shrink-0 snap-start group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${dest.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top labels */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-sm backdrop-blur-sm bg-opacity-90">
                  {dest.country}
                </div>
                <div className="bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {dest.rating}
                </div>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{dest.name}</h3>
                <div className="flex items-center text-white/80 text-sm">
                  <span className="font-medium bg-white/20 backdrop-blur-md px-2 py-1 rounded-md">
                    Est. Entry: {dest.entryFee}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
