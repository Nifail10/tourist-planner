import { NextRequest, NextResponse } from "next/server";
import { generateItinerary } from "@/lib/gemini";
import type { TripFormValues } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: TripFormValues = await request.json();

    if (!body.destination || !body.duration || !body.travelers) {
      return NextResponse.json(
        { error: "Missing required fields: destination, duration, travelers" },
        { status: 400 }
      );
    }

    const itinerary = await generateItinerary(body);
    return NextResponse.json(itinerary, { status: 200 });
  } catch (error) {
    console.error("[/api/generate] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate itinerary. Please try again." },
      { status: 500 }
    );
  }
}
