'use client'; 
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";

export default function EditUserPage(){
    const {loading, data} = useProfile();

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
                User Info Form
            </div>
        </section>
    );
}