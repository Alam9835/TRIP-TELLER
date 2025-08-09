import React, { useState, useEffect } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (hotel?.hotelName || hotel?.name) {
      fetchPhotoFromGoogle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel]);

  const fetchPhotoFromGoogle = async () => {
    try {
      const query = hotel?.hotelName || hotel?.name;
      const data = { textQuery: query };
      const response = await GetPlaceDetails(data);
      const photoName = response?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoName) {
        setPhotoUrl(PHOTO_REF_URL.replace("{NAME}", photoName));
      }
    } catch (error) {
      console.error("Google Place fetch error:", error.message);
    }
  };

  const name = hotel?.hotelName || hotel?.name || "Unnamed Hotel";
  const address = hotel?.hotelAddress || hotel?.address || "Address not available";
  const price = hotel?.price || hotel?.pricePerNight || "Price not available";
  const rating = hotel?.rating || "No rating";
  const description = hotel?.description || "";

  // ✅ Use a reliable fallback image URL (not placeholder.com)
  const fallbackImage =
    hotel?.hotelImageUrl ||
    hotel?.imageUrl ||
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  const displayImage = photoUrl?.trim() ? photoUrl : fallbackImage;

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name}, ${address}`
  )}`;

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
      onClick={() => window.open(googleMapsLink, "_blank")}
    >
      <img
        src={displayImage}
        alt={name}
        className="rounded-xl w-full h-[180px] object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
        }}
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-blue-700">{name}</h3>
        <p className="text-gray-600 text-sm">📍 <span className="text-gray-700">{address}</span></p>
        <p className="text-sm text-emerald-600">💰 {price}</p>
        <p className="text-sm text-orange-500">⭐ {rating}</p>
        {description && (
          <p className="text-sm text-gray-500 mt-2">📝 {description}</p>
        )}
      </div>
    </div>
  );
}

export default HotelCardItem;
