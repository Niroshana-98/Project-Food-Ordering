'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useState } from "react";
import Link from "next/link";
import Right from "@/components/icons/Right";

export default function MenuItemsPage(){

    const {loading, data} = useProfile();
    if(loading){
        return <p className="text-white">Loading User Data</p>;
    }

    if(!data.admin){
        return <p className="text-white">Not an Admin</p>;
    }
    return(
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <Link
                 className="button flex" 
                 href={'/menu-items/new'}>
                    Create New Menu Items
                    <Right/>
                </Link>
            </div>
            
        </section>
    );
}