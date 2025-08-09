import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'




function UserTripCardItem({trip}) {

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

    <Link to={'/view-trip/'+trip?.id}>

    
    <div className='hover:scale-105 transition-all hover:shadow-md'> 
        <img src={generatedPhotoUrl?generatedPhotoUrl:'/placeholder.jpg'} className='object-cover rounded-xl' />

       <div>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection.noOfDays}2 days trip with {trip?.userSelection?.budget}Moderate Budget</h2>
       </div>
            
    </div>
    </Link>
  )
}

export default UserTripCardItem