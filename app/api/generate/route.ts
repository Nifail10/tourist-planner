import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";
import type { Itinerary } from "@/types";

/**
 * Builds the structured Gemini prompt for an itinerary request.
 * Returns only valid JSON so we can parse the response directly.
 */
function buildPrompt(destination: string, days: number): string {
  return `Generate a detailed day-by-day travel itinerary for ${destination} for ${days} days.

For each day return:
- Day number
- List of places to visit with:
  - time slot (e.g. 9:00 AM)
  - place name
  - entry fee (write "Free" if no cost, else write ₹amount)
  - one line description

Also return:
- List of 3 recommended hotels with name, price per night in ₹, rating (out of 5)
- Budget summary: total entry fees for the trip, estimated food cost per day, estimated hotel cost per night

Return ONLY valid JSON matching exactly this structure, no markdown, no explanation:
{
  "destination": string,
  "days": number,
  "schedule": [
    {
      "day": number,
      "places": [
        {
          "time": string,
          "name": string,
          "entryFee": string,
          "description": string
        }
      ]
    }
  ],
  "hotels": [
    {
      "name": string,
      "pricePerNight": string,
      "rating": number
    }
  ],
  "budget": {
    "entryFees": string,
    "foodPerDay": string,
    "hotelPerNight": string,
    "total": string
  }
}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { destination, days } = body as { destination?: string; days?: unknown };

    // Input validation — keep it strict and clear
    if (!destination || typeof destination !== "string" || destination.trim() === "") {
      return NextResponse.json(
        { error: "Missing or invalid field: 'destination' must be a non-empty string." },
        { status: 400 }
      );
    }

    const numDays = Number(days);
    if (!days || isNaN(numDays) || numDays < 1 || numDays > 30) {
      return NextResponse.json(
        { error: "Missing or invalid field: 'days' must be a number between 1 and 30." },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(destination.trim(), numDays);
    const rawText = await callGemini(prompt);

    // Parse and validate the JSON shape returned by Gemini
    let itinerary: Itinerary;
    try {
      itinerary = JSON.parse(rawText) as Itinerary;
    } catch {
      console.error("[/api/generate] Gemini returned non-JSON:", rawText.slice(0, 300));
      return NextResponse.json(
        { error: "AI returned an invalid response. Please try again." },
        { status: 502 }
      );
    }

    // Basic structural check — make sure key fields are present
    if (!itinerary.schedule || !Array.isArray(itinerary.schedule)) {
      return NextResponse.json(
        { error: "AI response was missing expected fields. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json(itinerary, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    console.error("[/api/generate] Unhandled error:", message);
    return NextResponse.json(
      { error: "Failed to generate itinerary. Please try again later." },
      { status: 500 }
    );
  }
}
