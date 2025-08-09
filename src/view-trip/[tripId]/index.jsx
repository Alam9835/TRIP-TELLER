import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';

import InfoSection from '../tComponents/InfoSection';
import Hotels from '../tComponents/Hotels';
import PlacesToVisit from '../tComponents/PlacesToVist';
import Footer from '../tComponents/Footer';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        toast.error("No trip found");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Failed to fetch trip");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-gray-500">Loading trip details...</div>;
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip} />
      <Footer trip={trip} />
    </div>
  );
}

export default Viewtrip;
