import { useContext, useState } from "react";
import { CartContex } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image";

export default function MenuItem(menuItem){

    const{image,name,description,basePrice,sizes,extraIngredientPrices} = menuItem;
    const [showPopup, setShowPopup] =useState(false);

    const {addToCart} = useContext(CartContex);
    function handleAddToCartButtonClick(){
        if(sizes.length === 0 && extraIngredientPrices.length === 0){
            addToCart(menuItem);
            toast.success('Added to Cart !');
        }else{
            setShowPopup(true);
        }
    }

    return(
        <>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-80" />
                    <div className="relative bg-secondary p-4 rounded-lg z-50 max-w-md">
                        <Image
                         src={image} 
                         alt={name} 
                         width={300} height={300}
                         className="mx-auto" />
                        <h2 className="text-lg font-bold text-center">{name}</h2>
                        <p className="text-sm text-center mb-2">{description}</p>
                        {sizes?.length >0 && (
                            <div className="p-2">
                                <h3>Pick Your Size</h3>
                                {sizes.map(size => (
                                    <label key={size._id} className="block py-1 border">
                                        <input type="radio"/>{size.name} LKR {basePrice + size.price}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
              </div>
            )}
            <MenuItemTile 
                onAddToCart={handleAddToCartButtonClick} 
                {...menuItem}/>
        </>
    );
}