'use client'; 
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUserPage(){
    const {loading, data} = useProfile();
    const [user, setUser] = useState(null);
    const{id} = useParams();

    useEffect(() =>{
        fetch('/api/users').then(res =>{
            res.json().then(users =>{
                const user = users.find(u => u._id === id);
                setUser(user);
            });
        })
    },[]);

    function handleSaveButtonClick(ev, data){
        ev.preventDefault();
        fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...data, _id:id}),
        })
    }

    if(loading){
        return 'Loading User Profile...';
    }
    if(!data.admin){
        return 'Not an Admin';
    }
    return(
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true}/>
            <div className="mt-8 text-white">
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    );
}