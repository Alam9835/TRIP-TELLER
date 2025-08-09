import React from "react";

const PlaceCardItem = ({ place }) => {
  // Extract all possible keys for image
  const imageUrl =
    place.imageUrl ||
    place.placeImageUrl ||
    place.PlaceImageUrl ||
    "";

  const placeName = place.placeName || place.PlaceName || "Unknown Place";
  const details = place.placeDetails || place.PlaceDetails || "";
  const ticket = place.ticketPricing || place.TicketPricing || "N/A";
  const timeTravel = place.travelTimeFromPrevious || place.TimeTravel || "";
  const bestTime = place.bestTimeToVisit || place.besttimeToVisit || "";

  // Fallback Unsplash image
  const fallbackImage =
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

  // ✅ Check if imageUrl is a Google photo_reference
  const isGooglePhotoRef =
    imageUrl && !imageUrl.startsWith("http") && imageUrl.length > 20;

  // Construct Google Places image URL if needed
  const googlePhotoUrl = isGooglePhotoRef
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${imageUrl}&key=YOUR_GOOGLE_API_KEY`
    : imageUrl;

  const displayImage = googlePhotoUrl?.trim() ? googlePhotoUrl : fallbackImage;

  const googleMapsLink = place.geoCoordinates
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${place.geoCoordinates.latitude},${place.geoCoordinates.longitude}`
      )}`
    : null;

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
      onClick={() => googleMapsLink && window.open(googleMapsLink, "_blank")}
    >
      <img
        src={displayImage}
        alt={placeName}
        className="rounded-xl w-full h-[180px] object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{placeName}</h3>
        <p className="text-gray-700 mb-2">{details}</p>
        {ticket && <p className="text-sm text-gray-600">🎟️ Ticket: {ticket}</p>}
        {timeTravel && (
          <p className="text-sm text-gray-600">⏱️ Travel: {timeTravel}</p>
        )}
        {bestTime && (
          <p className="text-sm text-gray-600">🕒 Best Time: {bestTime}</p>
        )}
      </div>
    </div>
  );
};

export default PlaceCardItem;
