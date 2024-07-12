'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage(){

    const [categories, setCategories] =useState([]);
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() =>{
        fetch('/api/categories').then (res =>{
            res.json().then(categories => setCategories(categories))
        });
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => setMenuItems(menuItems));
        });
    }, []);

    return (
        <section className="mt-8 text-white ">
            {categories?.length > 0 && categories.map((c, index) => (
                <div key={c._id}>
                    <div className="text-center">
                        <SectionHeaders mainHeader={c.name}/>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4 mt-6 mb-12">
                        {menuItems.filter(item => item.category === c._id).map((item, index) =>(
                            <MenuItem key={item._id} {...item}/>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}