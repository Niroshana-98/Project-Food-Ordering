'use client';
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import { useEffect, useState } from "react";

export default function UsersPage(){

    const [users, setUsers] = useState([]);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/users').then(response =>{
            response.json().then(users => {
                setUsers(users);
            });
        })
    }, []);

if(loading){
    return 'Loading User Info...';
}

if(!data.admin){
    return 'Not an Admin';
}

    return(
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                {users.length > 0 && users.map((user, index) => (
                    <div key={index} className="bg-white rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                        <div>
                            <span>{user.name}</span>
                            <span>{user.email}</span>
                        </div>
                        <div>
                            <button>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}