import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };
      const response = await GetPlaceDetails(data);
      const photoName = response?.data?.places?.[0]?.photos?.[0]?.name;
      if (photoName) {
        const generatedPhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(generatedPhotoUrl);
      }
    } catch (error) {
      console.error("Failed to get photo:", error);
    }
  };

  return (
    <div>
      <img
        src={
          photoUrl ||
          "https://imgs.search.brave.com/q1QDUxq9EoHm_DSPteJZm6SRU9dqUWNxrAhZVIZylFM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvYWlycGxhbmUt/bGFuZGluZy1pbGx1/c3RyYXRpb25fMTU5/NzU3LTIxNi5qcGc_/c2VtdD1haXNfaHli/cmlk"
        }
        className="h-[350px] w-full object-cover rounded-xl"
        alt="Place Preview"
      />

      <div className="flex justify-between items-center mt-5">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-4 flex-wrap text-sm md:text-base">
            <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-600">
              📅 {trip?.userSelection?.noOfDays} Day
            </span>
            <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-600">
              💰 {trip?.userSelection?.budget} Budget
            </span>
            <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-600">
              🥂 Travelers: {trip?.userSelection?.noOfTravelers || "N/A"}
            </span>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
