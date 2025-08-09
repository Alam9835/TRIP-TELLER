export const SelectTravelersList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icons: '🧍‍♂️', // solo traveler
    people: '1',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two people traveling together',
    icons: '🧑‍🤝‍🧑', // couple/friends
    people: '2',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'Traveling with family members',
    icons: '👨‍👩‍👧‍👦', // family
    people: '3 to 5 Peoples ',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A group of friends on an adventure',
    icons: '🚐', // van/group travel
    people: '5 to 10 Peoples',
  },
]

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icons: '💸',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Balance comfort and value',
    icons: '💰',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Top-tier travel experiences',
    icons: '🏨', // new: luxury hotel
  },
]



export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget,give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, description and suggest itinerary with placeName, Place Details, Place Image Url,Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} with each day plan with best time to visit in JSON format';

