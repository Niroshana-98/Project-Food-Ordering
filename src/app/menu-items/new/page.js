'use client';
import {useProfile} from "@/components/UseProfile";
import { data } from "autoprefixer";
import { useState } from "react";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";
import {redirect} from "next/navigation";


export default function NewMenuItemPage(){
    
    const [image, setImage] = useState('');
    const [name,setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice,setBasePrice] = useState('');
    const [redirectToItems, setRedirectToItems]=useState(false);
    const {loading, data} = useProfile();

    async function handleFormSubmit(ev){
        ev.preventDefault();
        const data ={image,name,description,basePrice,};
        const savingPromise = new Promise(async(resolve, reject)=>{
            const response = await fetch('/api/menu-items',{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            });
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingPromise,{
            loading:'Saving...',
            success:'Saved',
            error:'Error',
        });

        setRedirectToItems(true);
        
    }
    if(redirectToItems){
        return redirect('/menu-items');
    }

    if(loading){
        return <p className="text-white">Loading User Info...</p>
    }

    if(!data.admin){
        return <p>Not an Admin</p>
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left/>
                    <span>Show All Menu Items</span>
                </Link>
            </div>
            <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
                <div
                 className="grid items-start gap-4" 
                 style={{gridTemplateColumns:'.3fr .7fr'}}>
                    <div>
                        <EditableImage link={image} setLink={setImage}/>
                    </div>
                    <div className="grow">
                        <label className="text-white">Item Name</label>
                        <input
                         type="text"
                         value={name}
                         onChange={ev => setName(ev.target.value)}
                        />
                        <label className="text-white">Description</label>
                        <input
                         type="text"
                         value={description}
                         onChange={ev => setDescription(ev.target.value)}
                        />
                        <label className="text-white">Price</label>
                        <input
                         type="text"
                         value={basePrice}
                         onChange={ev => setBasePrice(ev.target.value)}
                        />
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        </section>
    );
}