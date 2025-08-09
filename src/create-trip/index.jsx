import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelersList,
} from "../constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateTripPlan } from "@/service/AIModal";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );
      console.log("User Info:", resp.data);
      localStorage.setItem("user", JSON.stringify(resp.data));
      toast.success("Signed in successfully!");
      setOpenDialog(false);
    } catch (err) {
      console.error("Error fetching user info", err);
      toast.error("Failed to fetch user info");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      GetUserProfile(tokenResponse);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Login failed");
    },
  });

  const onGenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setOpenDialog(true);
      return;
    }

    const noOfDays = parseInt(formData.noOfDays, 10);

    if (isNaN(noOfDays) || noOfDays <= 0) {
      toast.error("Invalid Input", {
        description: "Enter a valid number of days.",
      });
      return;
    }

    if (
      noOfDays > 5 &&
      (!formData?.location || !formData?.budget || !formData?.traveler)
    ) {
      toast.error("Missing Fields", {
        description: "Fill in location, budget, and number of travelers.",
      });
      return;
    }

    if (!formData?.location?.label) {
      toast.error("Location not selected properly");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replaceAll(
      "{location}",
      formData.location.label
    )
      .replaceAll("{totalDays}", noOfDays)
      .replaceAll("{traveler}", formData.traveler)
      .replaceAll("{budget}", formData.budget);

    const result = await generateTripPlan(FINAL_PROMPT);
    setLoading(false);
    console.log("Trip Result Raw:", result);

    SaveAiTrip(result);
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    try {
      // Remove markdown code fences and trim
      const cleanedString = TripData.replace(/```json|```/g, "").trim();

      // Extract only the JSON object portion
      const jsonMatch = cleanedString.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in AI response");
      }

      const parsedTripData = JSON.parse(jsonMatch[0]);

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTripData,
        userEmail: user?.email,
        id: docId,
      });

      navigate("/view-trip/" + docId);
    } catch (err) {
      console.error("Error parsing trip data", err);
      toast.error("Failed to parse AI trip data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is Destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            value={formData.noOfDays || ""}
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData.budget === item.title && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icons}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelersList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData?.traveler === item.people && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icons}</h2>
              <h2 className="font-bold text-lg mt-2">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign In with Google</DialogTitle>
            <DialogDescription>
              Sign in to generate your trip plan securely.
            </DialogDescription>
          </DialogHeader>

          <img src="/logo.svg" alt="Logo" className="w-20 mx-auto mb-3" />

          <Button
            onClick={login}
            className="w-full mt-5 flex gap-4 items-center"
          >
            <FcGoogle className="h-7 w-7" />
            Sign In with Google
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
