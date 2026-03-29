// ── Destination ──────────────────────────────────────────────────────────────

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl?: string;
  tags: string[];
}

// ── Itinerary Core Types (Agent C) ───────────────────────────────────────────

/** A single place/activity within a day's plan */
export interface Place {
  time: string;       // e.g. "9:00 AM"
  name: string;       // place name
  entryFee: string;   // "Free" or "₹amount"
  description: string;
}

/** One day's worth of places to visit */
export interface DayPlan {
  day: number;
  places: Place[];
}

/** A hotel recommendation */
export interface Hotel {
  name: string;
  pricePerNight: string; // e.g. "₹8,500"
  rating: number;        // 0–5
}

/** High-level budget estimate */
export interface Budget {
  entryFees: string;      // total for the trip
  foodPerDay: string;     // estimated per day
  hotelPerNight: string;  // estimated per night
  total: string;          // grand total estimate
}

/** Full itinerary as returned by the AI and consumed by the UI */
export interface Itinerary {
  destination: string;
  days: number;
  schedule: DayPlan[];
  hotels: Hotel[];
  budget: Budget;
}

// ── Legacy / Form types (kept for compatibility with Agent A's route) ─────────

/** @deprecated Use the new Itinerary type above. Kept for backwards compat. */
export interface TripFormValues {
  destination: string;
  days: number;
}
