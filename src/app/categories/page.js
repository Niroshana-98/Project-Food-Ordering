'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import {useProfile} from "@/components/UseProfile";
import toast from "react-hot-toast";

export default function CategoriesPage(){

    const [categoryName,setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const {loading:profileLoading,data:profileData} = useProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(()=> {
        fetchCategories();
    }, []);

    function fetchCategories(){
        fetch('/api/categories').then(res=>{
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            res.json().then(categories => {
                setCategories(categories);
            }).catch(error => {
                console.error('Error parsing JSON:', error);
            });
        }).catch(error => {
            console.error('Network error:', error);
        });
    }
    
    

    async function handleCategorySubmit(ev){
        ev.preventDefault();
        const creationPromise = new Promise(async(resolve,reject)=>{
            const data = {name:categoryName};
            if(editedCategory){
                data._id = editedCategory._id;
            }

            const response = await fetch('/api/categories',{
                method: editedCategory ? 'PUT':'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if(response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(creationPromise,{
            loading: editedCategory
                        ?'Updating Category...'
                        :'Creating New Category...',
            success: editedCategory?'Category Updated':'Category Created',
            error: 'Action Unsuccessfully !',
        });
        
    }

    if(profileLoading){
        return <p className="text-white">Loading User Info...</p>;
    }

    if(!profileData.admin){
        return <p className="text-white">Not an Admin</p>;
    }
    return(
        <section className="mt-8 max-w-md mx-auto text-white">
            <UserTabs isAdmin={true}/>
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label className="text-white">
                            {editedCategory ? 'Update Category' : 'New Category Name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text"
                                value={categoryName}
                                onChange={ev => setCategoryName(ev.target.value)}
                        />
                    </div>
                    <div className="pb-2">
                        <button className="border border-primary hover:text-secondary" type="submit">
                            {editedCategory ? 'Update': 'Create'}
                        </button>
                    </div>
                </div>    
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-100 mb-1">Edit Category:</h2>
                {categories?.length > 0 && categories.map( c => (
                    <button
                     onClick={() => {
                        setEditedCategory(c);
                        setCategoryName(c.name);
                    }}
                     key={c.id} 
                     className="bg-gray-200 text-black rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-2 hover:bg-gray-500">
                        <span>{c.name}</span>    
                    </button>
                ))}
            </div>
        </section>
    );
}