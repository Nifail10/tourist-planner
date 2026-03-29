// ── Destination ──────────────────────────────────────────────────────────────

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl?: string;
  tags: string[];
}

// ── Itinerary ────────────────────────────────────────────────────────────────

export interface ItineraryDay {
  day: number;
  title: string;
  activities: Activity[];
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  location?: string;
}

export interface Itinerary {
  destination: string;
  duration: number; // in days
  travelers: number;
  budget: "budget" | "moderate" | "luxury";
  days: ItineraryDay[];
  tips?: string[];
}

// ── Trip Form ────────────────────────────────────────────────────────────────

export interface TripFormValues {
  destination: string;
  duration: number;
  travelers: number;
  budget: Itinerary["budget"];
  interests: string[];
}
