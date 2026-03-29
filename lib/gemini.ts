import type { TripFormValues, Itinerary } from "@/types";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

function buildPrompt(trip: TripFormValues): string {
  return `You are an expert travel planner. Create a detailed day-by-day itinerary for the following trip:

Destination: ${trip.destination}
Duration: ${trip.duration} days
Travelers: ${trip.travelers} person(s)
Budget level: ${trip.budget}
Interests: ${trip.interests.length ? trip.interests.join(", ") : "general sightseeing"}

Respond ONLY with a valid JSON object matching this TypeScript type (no markdown, no explanation):

{
  "destination": string,
  "duration": number,
  "travelers": number,
  "budget": "budget" | "moderate" | "luxury",
  "days": [
    {
      "day": number,
      "title": string,
      "activities": [
        {
          "time": string,
          "title": string,
          "description": string,
          "location": string
        }
      ]
    }
  ],
  "tips": string[]
}`;
}

export async function generateItinerary(trip: TripFormValues): Promise<Itinerary> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(trip) }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!raw) {
    throw new Error("No content returned from Gemini API.");
  }

  return JSON.parse(raw) as Itinerary;
}
