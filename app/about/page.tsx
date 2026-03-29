"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Mail, User, MessageSquare } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex-1 w-full bg-background overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Side: Copy */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold">
            <MapPin className="h-4 w-4" />
            Our Mission
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Connecting travelers to the <span className="bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">perfect trip</span>.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Tourist Planner was built with one goal: eliminate the stress of planning and maximize the joy of traveling. Powered by AI, we analyze thousands of destinations, reviews, and routes to give you the perfect day-by-day plan instantly.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Whether you are exploring ancient temples in Kyoto, hunting for the best street food in Delhi, or relaxing on the sunny beaches of Goa, we've got you covered.
          </p>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 w-full max-w-md lg:max-w-none"
        >
          <div className="bg-card border border-border/50 rounded-2xl shadow-xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-violet-500" />
            
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full h-12 pl-10 pr-4 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full h-12 pl-10 pr-4 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <textarea 
                    placeholder="How can we help you plan?" 
                    rows={4}
                    className="w-full py-3 pl-10 pr-4 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-shadow resize-none"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-md"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
