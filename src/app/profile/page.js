'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfoBox from "../../components/layout/InfoBox";
import SuccessBox from "../../components/layout/SuccessBox";
import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";


export default function ProfilePage(){
    const session =useSession();
    const [isAdmin,setIsAdmin]=useState(false);
    const[profileFetched, setProfileFetched] = useState(false);
    const {status} = session;

    useEffect(()=>{
        if(status === 'authenticated'){
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
            const response = fetch('/api/profile').then(response=>{
                response.json().then(data=>{
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    },[session,status]);

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
 
        const savingPromise = new Promise(async(resolve,reject)=> {
            const response = await fetch('/api/profile',{
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:userName,
                    image,
                    phone,
                    streetAddress,
                    postalCode,
                    city,
                    country,}),
            });
            if(response.ok)
                resolve()
            else
                reject();
        });

        await toast.promise(savingPromise,{
            loading: 'Saving...',
            success: 'Profile saved !',
            error: 'Error',
        });
    }
    if(status == 'loading' || !profileFetched){
        return <p className="text-white">Loading...</p>;
    }
    if(status ==='unauthenticated'){
        return redirect('/login');
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin}/>
            <div className="max-w-2xl mx-auto mt-8">
                
            </div>
        </section>
    );
}