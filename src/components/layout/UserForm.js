'use client';
import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import { useProfile } from "../UseProfile";

export default function UserForm({user,onSave}){

    const [userName, setUserName] = useState(user?.name ||'');
    const [image,setImage]=useState(user?.image ||'');
    const [phone,setPhone]=useState(user?.phone ||'');
    const [streetAddress,setStreetAddress]=useState(user?.streetAddress ||'');
    const [postalCode,setPostalCode]=useState(user?.postalCode ||'');
    const [city,setCity]=useState(user?.city ||'');
    const [country,setCountry]=useState(user?.country ||'');
    const [admin, setAdmin] = useState(user?.admin || false);
    const {data:loggedInUserData} =useProfile();
    return(
        <div className="flex gap-4">
            <div>
                <div className="p-2 rounded-lg relative max-w-[120px]">
                    <EditableImage link={image} setLink={setImage}/>
                </div>
            </div>
            <form
             className="grow" 
             onSubmit={ev =>
                onSave(ev,{
                    name:userName,image,phone,admin,streetAddress,postalCode,city,country,
                })
             }>
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
                    value={user.email}
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

                <div className="grid grid-cols-2 gap-2 mb-2">
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
                {loggedInUserData.admin &&(
                    <div>
                        <label className="text-white p-2 inline-flex items-center gap-2 mb-2"
                        htmlFor="adminCb">
                            <input
                            id="adminCb" type="checkbox" className="" value={'1'}
                            checked={admin}
                            onClick={ev => setAdmin(ev.target.checked)}/>
                            <span>Admin</span>
                        </label>
                    </div>
                )}                
                <button type="submit" className="mt-4">Save</button>
            </form>                   
         </div>
    );
}