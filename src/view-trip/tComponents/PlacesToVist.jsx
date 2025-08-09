import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  let itinerary = [];

  if (trip?.tripData) {
    if (Array.isArray(trip.tripData.itinerary)) {
      itinerary = trip.tripData.itinerary;
    } else {
      const planObj = Object.values(trip.tripData).find(
        (val) => Array.isArray(val?.itinerary)
      );
      if (planObj) itinerary = planObj.itinerary;
    }
  }

  if (itinerary.length === 0 && Array.isArray(trip?.itinerary)) {
    itinerary = trip.itinerary;
  }

  return (
    <div className="p-4">
      {itinerary.length > 0 ? (
        itinerary.map((day, dayIndex) => {
          const places = day.plan || day.dailyPlan || [];

          return (
            <div key={dayIndex} className="mb-10">
              <h2 className="text-xl font-bold mt-6 mb-2">
                🗓️ {day.day ? `Day ${day.day}` : `Day ${dayIndex + 1}`}
              </h2>
              {day.theme && (
                <p className="text-gray-500 mb-4 italic">{day.theme}</p>
              )}

              {places.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {places.map((place, i) => (
                    <PlaceCardItem key={i} place={place} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic mb-4">
                  🪪 No activities available for this day.
                </p>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-gray-600 italic text-center mt-4">
          🗺️ No itinerary available.
        </p>
      )}
    </div>
  );
};

export default PlacesToVisit;
