"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  CalendarDays, 
  Hotel, 
  Wallet, 
  Map, 
  Clock, 
  Star,
  ArrowRight,
  Utensils,
  Landmark,
  Car
} from "lucide-react";

// Agent C: This mock data should be replaced with API response data later
const MOCK_ITINERARY = {
  destination: "Kyoto, Japan",
  duration: 3,
  days: [
    {
      day: 1,
      title: "Arrival & Historic Temples",
      activities: [
        {
          time: "09:00 AM",
          title: "Kinkaku-ji (Golden Pavilion)",
          description: "Stunning Zen temple covered in gold leaf, reflecting beautifully in the surrounding pond.",
          fee: "₹500",
          location: "Northern Kyoto"
        },
        {
          time: "01:00 PM",
          title: "Ryoan-ji Temple",
          description: "Famous for its minimalist rock garden and traditional architecture.",
          fee: "₹400",
          location: "Northern Kyoto"
        },
        {
          time: "04:30 PM",
          title: "Arashiyama Bamboo Grove",
          description: "A mesmerizing walk through soaring bamboo stalks. Best visited in the late afternoon.",
          fee: "Free",
          location: "Western Kyoto"
        }
      ]
    },
    {
      day: 2,
      title: "Geisha District & Shrines",
      activities: [
        {
          time: "08:00 AM",
          title: "Fushimi Inari Taisha",
          description: "Iconic shrine known for its thousands of vermilion torii gates winding up the mountain.",
          fee: "Free",
          location: "Southern Kyoto"
        },
        {
          time: "02:00 PM",
          title: "Kiyomizu-dera",
          description: "Historic wooden temple offering panoramic views of the city below.",
          fee: "₹600",
          location: "Eastern Kyoto"
        },
        {
          time: "06:00 PM",
          title: "Gion District Walking Tour",
          description: "Explore the traditional entertainment district. You might spot a geiko or maiko.",
          fee: "Free",
          location: "Central Kyoto"
        }
      ]
    },
    {
      day: 3,
      title: "Castles & Markets",
      activities: [
        {
          time: "09:30 AM",
          title: "Nijo Castle",
          description: "Former residence of the Tokugawa shogun, featuring 'nightingale' floors that squeak to warn of intruders.",
          fee: "₹800",
          location: "Central Kyoto"
        },
        {
          time: "12:30 PM",
          title: "Nishiki Market",
          description: "Known as 'Kyoto's Kitchen', this narrow street is packed with food vendors.",
          fee: "Free (Pay for food)",
          location: "Central Kyoto"
        }
      ]
    }
  ],
  hotels: [
    { id: 1, name: "Kyoto Granbell Hotel", price: "₹8,500/night", rating: 4.6, image: "https://images.unsplash.com/photo-1542051841857-4190ee9cb781?auto=format&fit=crop&q=80&w=600", category: "Mid-range" },
    { id: 2, name: "The Thousand Kyoto", price: "₹22,000/night", rating: 4.9, image: "https://images.unsplash.com/photo-1498503182468-3bb2227d8f96?auto=format&fit=crop&q=80&w=600", category: "Luxury" },
    { id: 3, name: "Piece Hostel Sanjo", price: "₹3,200/night", rating: 4.8, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600", category: "Budget" },
  ],
  budget: {
    activities: "₹2,300",
    food: "₹9,000",
    transport: "₹3,000",
    hotels: "₹25,500", // based on mid-range 3 nights
    total: "₹39,800"
  }
};

type TabType = 'itinerary' | 'hotels' | 'budget';

export default function ItineraryResultPage() {
  const searchParams = useSearchParams();
  const destParam = searchParams?.get("dest") || "";
  const daysParam = searchParams?.get("days") || "";
  
  const [activeTab, setActiveTab] = useState<TabType>('itinerary');
  const [activeDay, setActiveDay] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay for the "Generate Itinerary" effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Use URL params if available, otherwise fallback to mock
  const displayDest = destParam || MOCK_ITINERARY.destination;
  const displayDays = daysParam ? parseInt(daysParam) : MOCK_ITINERARY.duration;

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="h-16 w-16 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin mb-4" />
        <h2 className="text-xl font-medium animate-pulse">Crafting your perfect AI itinerary...</h2>
        <p className="text-muted-foreground mt-2">Analyzing the best spots in {displayDest}</p>
      </div>
    );
  }

  const currentDayData = MOCK_ITINERARY.days.find(d => d.day === activeDay) || MOCK_ITINERARY.days[0];

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight capitalize">
          {displayDest}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold">
            <CalendarDays className="h-4 w-4" />
            {displayDays} {displayDays === 1 ? 'Day' : 'Days'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            AI Generated Plan
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex max-w-md mx-auto sm:mx-0 p-1 bg-muted/50 rounded-xl mb-8">
        {(['itinerary', 'hotels', 'budget'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold capitalize transition-all
              ${activeTab === tab 
                ? 'bg-background shadow-sm text-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }
            `}
          >
            {tab === 'itinerary' && <Map className="h-4 w-4" />}
            {tab === 'hotels' && <Hotel className="h-4 w-4" />}
            {tab === 'budget' && <Wallet className="h-4 w-4" />}
            <span className="hidden sm:inline">{tab}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        
        {/* ITINERARY TAB */}
        {activeTab === 'itinerary' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Horizontal Timeline */}
            <div className="relative pt-4 pb-2 px-2 overflow-x-auto scrollbar-hide">
              <div className="absolute top-8 left-6 right-6 h-0.5 bg-border -z-10" />
              <div className="flex justify-between min-w-[max-content] gap-12 sm:gap-0 px-4">
                {MOCK_ITINERARY.days.map((dayObj) => (
                  <button
                    key={dayObj.day}
                    onClick={() => setActiveDay(dayObj.day)}
                    className="flex flex-col items-center gap-3 group outline-none"
                  >
                    <div className={`
                      h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${activeDay === dayObj.day 
                        ? 'bg-purple-600 border-purple-600 text-white scale-110 shadow-md shadow-purple-500/30' 
                        : 'bg-background border-border text-muted-foreground group-hover:border-purple-400 group-hover:text-foreground'
                      }
                    `}>
                      <span className="text-sm font-bold">{dayObj.day}</span>
                    </div>
                    <span className={`text-xs font-semibold whitespace-nowrap transition-colors ${activeDay === dayObj.day ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'}`}>
                      Day {dayObj.day}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Activities List */}
            <div className="bg-card border border-border/50 rounded-2xl p-4 sm:p-6 shadow-sm overflow-hidden">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-border/50 flex items-center gap-2">
                Day {currentDayData.day}: {currentDayData.title}
              </h2>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent"
                >
                  {currentDayData.activities.map((act, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      
                      {/* Timeline Dot */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-purple-200 bg-purple-50 dark:border-purple-900/50 dark:bg-purple-900/20 text-purple-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 transition-transform group-hover:scale-110">
                        <Clock className="h-4 w-4" />
                      </div>
                      
                      {/* Card Content */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-background border border-border/50 shadow-sm transition-shadow hover:shadow-md hover:border-purple-500/30">
                        <div className="flex items-start justify-between mb-2 gap-2">
                          <div>
                            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1 block">
                              {act.time}
                            </span>
                            <h3 className="text-base font-bold text-foreground tracking-tight leading-tight">
                              {act.title}
                            </h3>
                          </div>
                          <span className={`
                            shrink-0 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap
                            ${act.fee.toLowerCase().includes('free') 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                            }
                          `}>
                            {act.fee}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {act.description}
                        </p>
                        {act.location && (
                          <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground font-medium">
                            <MapPin className="h-3 w-3" />
                            {act.location}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* HOTELS TAB */}
        {activeTab === 'hotels' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recommended Stays</h2>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-3 py-1 rounded-full bg-secondary">Budget</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-foreground font-medium">Mid-range</span>
                <span className="px-3 py-1 rounded-full bg-secondary">Luxury</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_ITINERARY.hotels.map((hotel, i) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover:shadow-lg transition-all hover:border-purple-500/30 cursor-pointer flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-2 py-1 rounded-md">
                      {hotel.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-500" />
                      {hotel.rating}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-purple-600 transition-colors">{hotel.name}</h3>
                    <p className="text-lg font-black text-muted-foreground mt-auto mb-4 tracking-tight">
                      {hotel.price}
                    </p>
                    <button className="w-full py-2.5 rounded-xl bg-secondary text-secondary-foreground font-semibold group-hover:bg-purple-600 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* BUDGET TAB */}
        {activeTab === 'budget' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Wallet className="h-6 w-6 text-purple-600" />
                Estimated Budget
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Activities & Entry Fees</span>
                  </div>
                  <span className="font-bold text-lg">{MOCK_ITINERARY.budget.activities}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      <Utensils className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Food & Dining</span>
                  </div>
                  <span className="font-bold text-lg">{MOCK_ITINERARY.budget.food}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <Car className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Local Transport</span>
                  </div>
                  <span className="font-bold text-lg">{MOCK_ITINERARY.budget.transport}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                      <Hotel className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Accommodation</span>
                  </div>
                  <span className="font-bold text-lg">{MOCK_ITINERARY.budget.hotels}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estimated Total</p>
                  <p className="text-xs text-muted-foreground">For {displayDays} days, 1 traveler</p>
                </div>
                <div className="text-3xl font-black text-purple-600 dark:text-purple-400 tracking-tight">
                  {MOCK_ITINERARY.budget.total}
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
