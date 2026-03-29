export interface DestinationPlace {
  name: string;
  entryFee: string;
  description: string;
  bestTime: string;
  category: "monument" | "nature" | "food" | "religious" | "market";
}

export interface DestinationHotel {
  name: string;
  pricePerNight: number;
  rating: number;
  category: "budget" | "mid-range" | "luxury";
}

export interface DestinationRestaurant {
  name: string;
  cuisine: string;
  avgCost: number;
}

export interface DestinationBudget {
  budget: number;
  mid: number;
  luxury: number;
}

export interface CuratedDestination {
  id: string;
  name: string;
  country: "India";
  state: string;
  image: string;
  rating: number;
  description: string;
  places: DestinationPlace[];
  hotels: DestinationHotel[];
  restaurants: DestinationRestaurant[];
  budget: DestinationBudget;
  // Included to support Agent B's/C's pre-existing code that destructured tags:
  tags?: string[];
}

export const destinations: CuratedDestination[] = [
  {
    id: "delhi",
    name: "New Delhi",
    country: "India",
    state: "Delhi",
    image: "https://images.unsplash.com/photo-1587474260580-589f81df98db?auto=format&fit=crop&q=80&w=1200",
    rating: 4.6,
    description: "The capital of India, a massive metropolitan area in the country’s north. A beautiful blend of historical monuments and modern infrastructure.",
    tags: ["history", "food", "capital"],
    places: [
      { name: "Red Fort", entryFee: "₹35", description: "Historic 17th-century fort built by the Mughal Emperor Shah Jahan.", bestTime: "Morning", category: "monument" },
      { name: "Qutub Minar", entryFee: "₹35", description: "A UNESCO World Heritage Site with a towering 73m-high minaret.", bestTime: "Morning", category: "monument" },
      { name: "India Gate", entryFee: "Free", description: "A war memorial honoring British Indian Army soldiers who died in WWI.", bestTime: "Evening", category: "monument" },
      { name: "Jama Masjid", entryFee: "Free", description: "One of the largest and most famous mosques in India.", bestTime: "Morning", category: "religious" },
      { name: "Lotus Temple", entryFee: "Free", description: "A Bahá'í House of Worship famous for its flower-like shape.", bestTime: "Afternoon", category: "religious" },
      { name: "Chandni Chowk", entryFee: "Free", description: "One of the oldest and busiest markets in Old Delhi.", bestTime: "Evening", category: "market" }
    ],
    hotels: [
      { name: "Zostel Delhi", pricePerNight: 800, rating: 4.2, category: "budget" },
      { name: "The Lalit New Delhi", pricePerNight: 9000, rating: 4.5, category: "mid-range" },
      { name: "The Taj Mahal Hotel", pricePerNight: 20000, rating: 4.8, category: "luxury" }
    ],
    restaurants: [
      { name: "Karim's", cuisine: "Mughlai", avgCost: 800 },
      { name: "Indian Accent", cuisine: "Modern Indian", avgCost: 5000 },
      { name: "Bukhara", cuisine: "North Indian", avgCost: 4000 }
    ],
    budget: { budget: 2000, mid: 6000, luxury: 15000 }
  },
  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    state: "Rajasthan",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=1200",
    rating: 4.7,
    description: "The Pink City of India, known for its royal heritage, majestic palaces, and vibrant culture.",
    tags: ["culture", "palaces", "forts"],
    places: [
      { name: "Amber Fort", entryFee: "₹100", description: "A magnificent hill fort showcasing Rajput architecture.", bestTime: "Morning", category: "monument" },
      { name: "Hawa Mahal", entryFee: "₹50", description: "The iconic Palace of Winds with a unique honeycomb facade.", bestTime: "Morning", category: "monument" },
      { name: "City Palace", entryFee: "₹200", description: "A grand palace complex located at the heart of the city.", bestTime: "Afternoon", category: "monument" },
      { name: "Jantar Mantar", entryFee: "₹50", description: "An astronomical observation site with the world's largest stone sundial.", bestTime: "Morning", category: "monument" },
      { name: "Nahargarh Fort", entryFee: "₹50", description: "A fort sitting on the edge of the Aravalli Hills overlooking Jaipur.", bestTime: "Evening", category: "monument" },
      { name: "Jal Mahal", entryFee: "Free", description: "A stunning palace situated in the middle of Man Sagar Lake.", bestTime: "Evening", category: "monument" }
    ],
    hotels: [
      { name: "Zostel Jaipur", pricePerNight: 700, rating: 4.4, category: "budget" },
      { name: "Pearl Palace Heritage", pricePerNight: 4000, rating: 4.7, category: "mid-range" },
      { name: "Rambagh Palace", pricePerNight: 45000, rating: 4.9, category: "luxury" }
    ],
    restaurants: [
      { name: "Chokhi Dhani", cuisine: "Rajasthani", avgCost: 1200 },
      { name: "Suvarna Mahal", cuisine: "Indian Royal", avgCost: 5000 },
      { name: "Tapri Central", cuisine: "Cafe", avgCost: 700 }
    ],
    budget: { budget: 1500, mid: 4500, luxury: 18000 }
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    state: "Maharashtra",
    image: "https://images.unsplash.com/photo-1522542475432-8dfbdf549924?auto=format&fit=crop&q=80&w=1200",
    rating: 4.5,
    description: "India's financial capital and the home of Bollywood. A fast-paced city of dreams that never sleeps.",
    tags: ["city", "nightlife", "entertainment"],
    places: [
      { name: "Gateway of India", entryFee: "Free", description: "An iconic arch-monument overlooking the Arabian Sea.", bestTime: "Early Morning", category: "monument" },
      { name: "Marine Drive", entryFee: "Free", description: "A picturesque 3.6-kilometer-long boulevard along the coast.", bestTime: "Evening", category: "nature" },
      { name: "Elephanta Caves", entryFee: "₹40", description: "Ancient rock-cut temples dedicated to Lord Shiva on an island.", bestTime: "Morning", category: "monument" },
      { name: "Chhatrapati Shivaji Terminus", entryFee: "Free", description: "A historic railway station showcasing Victorian Gothic architecture.", bestTime: "Afternoon", category: "monument" },
      { name: "Siddhivinayak Temple", entryFee: "Free", description: "A highly revered Hindu temple dedicated to Lord Ganesha.", bestTime: "Morning", category: "religious" },
      { name: "Colaba Causeway", entryFee: "Free", description: "A vibrant street market known for jewelry, clothing, and antiques.", bestTime: "Evening", category: "market" }
    ],
    hotels: [
      { name: "Hornsby House", pricePerNight: 2000, rating: 4.0, category: "budget" },
      { name: "Trident Nariman Point", pricePerNight: 12000, rating: 4.6, category: "mid-range" },
      { name: "The Taj Mahal Palace", pricePerNight: 30000, rating: 4.9, category: "luxury" }
    ],
    restaurants: [
      { name: "Leopold Cafe", cuisine: "Continental", avgCost: 1500 },
      { name: "Trishna", cuisine: "Seafood", avgCost: 2500 },
      { name: "Wasabi by Morimoto", cuisine: "Japanese", avgCost: 8000 }
    ],
    budget: { budget: 2500, mid: 8000, luxury: 25000 }
  },
  {
    id: "goa",
    name: "Goa",
    country: "India",
    state: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200",
    rating: 4.8,
    description: "A tropical paradise featuring pristine beaches, Portuguese heritage, and vibrant nightlife.",
    tags: ["beaches", "party", "nature"],
    places: [
      { name: "Baga Beach", entryFee: "Free", description: "One of North Goa's most popular beaches famous for nightlife.", bestTime: "Evening", category: "nature" },
      { name: "Basilica of Bom Jesus", entryFee: "Free", description: "A UNESCO World Heritage site holding the remains of St. Francis Xavier.", bestTime: "Morning", category: "religious" },
      { name: "Dudhsagar Falls", entryFee: "₹50", description: "A spectacular four-tiered waterfall located on the Mandovi River.", bestTime: "Morning", category: "nature" },
      { name: "Fort Aguada", entryFee: "Free", description: "A well-preserved 17th-century Portuguese fort and lighthouse.", bestTime: "Afternoon", category: "monument" },
      { name: "Anjuna Flea Market", entryFee: "Free", description: "A legendary weekly market for bohemian clothing and souvenirs.", bestTime: "Afternoon", category: "market" },
      { name: "Palolem Beach", entryFee: "Free", description: "A beautiful crescent-shaped beach lined with palm trees in South Goa.", bestTime: "Morning", category: "nature" }
    ],
    hotels: [
      { name: "Woke Hostel Arpora", pricePerNight: 900, rating: 4.4, category: "budget" },
      { name: "Novotel Goa Resort & Spa", pricePerNight: 8000, rating: 4.5, category: "mid-range" },
      { name: "The Leela Goa", pricePerNight: 25000, rating: 4.8, category: "luxury" }
    ],
    restaurants: [
      { name: "Britto's", cuisine: "Goan Seafood", avgCost: 1400 },
      { name: "Gunpowder", cuisine: "South Indian", avgCost: 1800 },
      { name: "Thalassa", cuisine: "Greek", avgCost: 3000 }
    ],
    budget: { budget: 2000, mid: 7000, luxury: 18000 }
  },
  {
    id: "agra",
    name: "Agra",
    country: "India",
    state: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1564507592205-51fbd6f0ccbc?auto=format&fit=crop&q=80&w=1200",
    rating: 4.6,
    description: "Home to the iconic Taj Mahal, Agra sits on the banks of the Yamuna River and boasts immense Mughal history.",
    tags: ["monuments", "history", "romantic"],
    places: [
      { name: "Taj Mahal", entryFee: "₹50", description: "The famous ivory-white marble mausoleum and symbol of eternal love.", bestTime: "Sunrise", category: "monument" },
      { name: "Agra Fort", entryFee: "₹40", description: "A historical fort which served as the main residence of the Mughal Emperors.", bestTime: "Morning", category: "monument" },
      { name: "Fatehpur Sikri", entryFee: "₹40", description: "A fascinating deserted red sandstone city built by Emperor Akbar.", bestTime: "Afternoon", category: "monument" },
      { name: "Mehtab Bagh", entryFee: "₹25", description: "A charbagh complex perfectly aligned with the Taj Mahal across the river.", bestTime: "Sunset", category: "nature" },
      { name: "Itmad-ud-Daula", entryFee: "₹20", description: "Often called the 'Baby Taj', known for intricate marble inlay work.", bestTime: "Morning", category: "monument" },
      { name: "Kinari Bazaar", entryFee: "Free", description: "An authentic local market near Jama Masjid for spices, fabrics, and jewelry.", bestTime: "Evening", category: "market" }
    ],
    hotels: [
      { name: "Zostel Agra", pricePerNight: 600, rating: 4.4, category: "budget" },
      { name: "ITC Mughal", pricePerNight: 7000, rating: 4.6, category: "mid-range" },
      { name: "The Oberoi Amarvilas", pricePerNight: 40000, rating: 4.9, category: "luxury" }
    ],
    restaurants: [
      { name: "Pinch of Spice", cuisine: "North Indian", avgCost: 1200 },
      { name: "Joney's Place", cuisine: "Indian cafe", avgCost: 400 },
      { name: "Esphahan", cuisine: "Awadhi", avgCost: 5000 }
    ],
    budget: { budget: 1500, mid: 5000, luxury: 25000 }
  }
];

export const DESTINATIONS = destinations;
export const getDestination = (id: string) => destinations.find(d => d.id === id);
