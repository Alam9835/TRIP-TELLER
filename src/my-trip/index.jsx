import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '@/view-trip/tComponents/InfoSection';
import {doc,getDoc,setDoc} from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import Hotels from '@/view-trip/tComponents/Hotels';
import PlacesToVisit from '@/view-trip/tComponents/PlacesToVist';
import Footer from '@/view-trip/tComponents/Footer';


function Viewtrip() {

    const {tripId}=useParams();
    const [trip,setTrip]=useState({})

    useEffect(
        ()=>{
            tripId&&GetTripData();
        },[tripId]
    )
     
// use to get trip informatiom from firrbase

    const  GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Documnets:",docSnap.data());
            setTrip(docSnap.data());
            
        }else{
            console.log("No such Document");
            toast("No trip found");
            
        }


    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
 
 {/* Information  */}

 <InfoSection trip={trip} />


{/* 
 Reccodnded */}

 <Hotels trip={trip}/>

 {/* daily plan  */}

 <PlacesToVist trip={trip} />



 {/* footer */}

<Footer trip={trip}/>
    </div>
  )
}

export default Viewtrip