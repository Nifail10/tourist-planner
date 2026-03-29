"use client";

import { useState, useEffect, useCallback } from "react";
import type { Itinerary } from "@/types";
import { DESTINATIONS } from "@/lib/data/destinations";

interface UseItineraryState {
  data: Itinerary | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook that fetches a Gemini-generated itinerary for a given
 * destination and number of days.
 *
 * The actual Gemini call happens server-side through POST /api/generate
 * so the API key is never exposed to the browser.
 *
 * Agent B handles the UI that consumes { data, loading, error }.
 */
export function useItinerary(destination: string, days: number): UseItineraryState {
  const [state, setState] = useState<UseItineraryState>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchItinerary = useCallback(async () => {
    if (!destination.trim() || days < 1) return;

    setState({ data: null, loading: true, error: null });

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: destination.trim(), days }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(
          json?.error ?? `Request failed with status ${response.status}`
        );
      }

      // Merge AI-generated data with any curated metadata we have locally
      const curatedMatch = DESTINATIONS.find(
        (d) =>
          d.name.toLowerCase() === destination.trim().toLowerCase() ||
          destination.trim().toLowerCase().includes(d.name.toLowerCase())
      );

      const merged: Itinerary = {
        ...json,
        // Enrich with curated data if we have a local match
        ...(curatedMatch && {
          // Agent B handles the UI — this merged object is passed straight through
          _curatedDescription: curatedMatch.description,
          _curatedTags: curatedMatch.tags,
        }),
      };

      setState({ data: merged, loading: false, error: null });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setState({ data: null, loading: false, error: message });
    }
  }, [destination, days]);

  useEffect(() => {
    fetchItinerary();
  }, [fetchItinerary]);

  return state;
}
