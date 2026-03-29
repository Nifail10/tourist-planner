"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Plus, Minus } from "lucide-react";
import { DESTINATIONS } from "@/lib/data/destinations";

export default function PlanPage() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [isSearching, setIsSearching] = useState(false);
  
  // Filter destinations based on input
  const filteredDestinations = destination.trim() === ""
    ? []
    : DESTINATIONS.filter(d => 
        d.name.toLowerCase().includes(destination.toLowerCase()) || 
        d.country.toLowerCase().includes(destination.toLowerCase())
      ).slice(0, 5); // Limit to top 5 matches

  const handleSelectDestination = (destName: string) => {
    setDestination(destName);
    setIsSearching(false);
  };

  const handleAdjustDays = (amount: number) => {
    setDays((prev) => Math.min(Math.max(1, prev + amount), 14));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    
    // Agent C: This is where we navigate to the results page, passing params
    // Next.js URLSearchParams encoding
    const params = new URLSearchParams({
      dest: destination,
      days: days.toString()
    });
    
    router.push(`/itinerary?${params.toString()}`);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[calc(100vh-4rem)] bg-background relative overflow-hidden">
      {/* Decorative gradient blur background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-purple-600/10 dark:bg-purple-900/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Where do you want to <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">go?</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Tell us your destination and duration. We'll handle the rest.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="bg-card border border-border/50 rounded-2xl shadow-xl p-6 sm:p-8 space-y-8 relative z-10">
          
          {/* Destination Input */}
          <div className="space-y-3 relative">
            <label htmlFor="destination" className="text-sm font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-500" />
              Destination
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="destination"
                type="text"
                autoComplete="off"
                placeholder="e.g., Tokyo, Paris, Bali..."
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setIsSearching(true);
                }}
                onFocus={() => setIsSearching(true)}
                onBlur={() => setTimeout(() => setIsSearching(false), 200)} // delay to allow clicks
                className="w-full h-14 pl-12 pr-4 bg-background border border-input rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow"
                required
              />
              
              {/* Dropdown Results */}
              {isSearching && filteredDestinations.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-lg overflow-hidden z-20">
                  <ul className="py-2">
                    {filteredDestinations.map((dest) => (
                      <li key={dest.id}>
                        <button
                          type="button"
                          onClick={() => handleSelectDestination(dest.name)}
                          className="w-full px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground flex items-center justify-between group transition-colors"
                        >
                          <span className="font-medium">{dest.name}</span>
                          <span className="text-sm text-muted-foreground group-hover:text-purple-500 transition-colors">
                            {dest.country}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Days Selector */}
          <div className="space-y-3">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              Duration
            </label>
            <div className="flex items-center justify-between p-2 bg-background border border-input rounded-xl">
              <button
                type="button"
                onClick={() => handleAdjustDays(-1)}
                disabled={days <= 1}
                className="h-10 w-10 flex items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease days</span>
              </button>
              
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">{days}</span>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {days === 1 ? 'Day' : 'Days'}
                </span>
              </div>
              
              <button
                type="button"
                onClick={() => handleAdjustDays(1)}
                disabled={days >= 14}
                className="h-10 w-10 flex items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase days</span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!destination.trim()}
            className="w-full h-14 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_0_30px_-10px_rgba(124,58,237,0.5)]"
          >
            Generate Itinerary
          </button>
        </form>
      </motion.div>
    </div>
  );
}
