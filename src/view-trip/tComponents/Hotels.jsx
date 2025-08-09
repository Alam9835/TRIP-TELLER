import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  // ✅ Flexible extraction for different Firebase shapes
  let hotelOptions = [];

  if (trip?.hotelOptions) {
    hotelOptions = trip.hotelOptions;
  } else if (trip?.tripData) {
    // Try direct hotelOptions
    if (trip.tripData.hotelOptions) {
      hotelOptions = trip.tripData.hotelOptions;
    } else {
      // Try first day object
      const firstKey = Object.keys(trip.tripData)[0];
      hotelOptions = trip.tripData[firstKey]?.hotelOptions || [];
    }
  }

  return (
    <div className='p-4'>
      <h2 className='font-bold text-xl mt-5 mb-4'>Hotels Recommendation</h2>

      {hotelOptions.length === 0 ? (
        <p className="text-gray-600">🏨 No hotel recommendations available.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
          {hotelOptions.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Hotels;
