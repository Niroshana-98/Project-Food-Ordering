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
    console.log(session);
    const [userName, setUserName] = useState('');
    const [image,setImage]=useState('');
    const[phone,setPhone]=useState('');
    const[streetAddress,setStreetAddress]=useState('');
    const[postalCode,setPostalCode]=useState('');
    const[city,setCity]=useState('');
    const[country,setCountry]=useState('');
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
                <div className="flex gap-4">
                    <div>
                        <div className="p-2 rounded-lg relative max-w-[120px]">
                            <EditableImage link={image} setLink={setImage}/>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <label className="text-white">
                            Full Name
                        </label>
                        <input 
                            type="text" 
                            placeholder="First and last name"
                            value={userName} 
                            onChange={ev => setUserName(ev.target.value)}
                            className="hover:bg-gray-300"
                         />

                        <label className="text-white">
                            Email
                        </label>
                        <input
                            type="email" 
                            disabled={true} 
                            value={session.data.user.email}
                            placeholder={'email'}
                            className="hover:bg-gray-300"
                        />

                        <label className="text-white">
                            Phone Number
                        </label>
                        <input 
                            type="tel"
                            placeholder="Phone Number"
                            value={phone} onChange={ev => setPhone(ev.target.value)}
                            className="hover:bg-gray-300"
                        />

                        <label className="text-white">
                            Street Address
                        </label>
                        <input
                            type="text" 
                            placeholder="Street Address"
                            value={streetAddress} 
                            onChange={ev => setStreetAddress(ev.target.value)}
                            className="hover:bg-gray-300"
                        />

                        <div className="flex gap-2 mb-2">
                            <div>
                                <label className="text-white">
                                    Zip Code
                                </label>
                                <input
                                    type="text" 
                                    placeholder="Postal Code"
                                    value={postalCode} 
                                    onChange={ev => setPostalCode(ev.target.value)}
                                    className="hover:bg-gray-300"
                                />
                            </div>
                            <div>
                                <label className="text-white">
                                    City
                                </label>
                                <input
                                    type="text" 
                                    placeholder="City"
                                    value={city} 
                                    onChange={ev => setCity(ev.target.value)}
                                    className="hover:bg-gray-300"
                                />
                            </div>    
                        </div> 
                        <label className="text-white">
                            District
                        </label>
                        <input
                            type="text" 
                            placeholder="District"
                            value={country} 
                            onChange={ev => setCountry(ev.target.value)}
                            className="hover:bg-gray-300"
                        />
                        <button type="submit" className="mt-4">Save</button>
                    </form>                   
                </div>
            </div>
        </section>
    );
}