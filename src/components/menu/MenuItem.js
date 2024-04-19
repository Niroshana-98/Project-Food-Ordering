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
                <div className="fixed inset-0 flex  items-center justify-center z-50">
                    <div className="absolute inset-0 p-2 bg-black opacity-80 " />
                    <div className="my-8 relative bg-secondary p-4 rounded-lg z-50 max-w-md overflow-y-auto"
                        style={{maxHeight: 'calc(100vh - 100px)',overflowY: 'scroll', scrollbarWidth: 'none', '-ms-overflow-style': 'none'}}>
                        <Image
                         src={image} 
                         alt={name} 
                         width={300} height={300}
                         className="mx-auto" />
                        <h2 className="text-lg font-bold text-center">{name}</h2>
                        <p className="text-sm text-center mb-2">{description}</p>
                        {sizes?.length >0 && (
                            <div className="py-2">
                                <h3 className="text-center">Pick Your Size</h3>
                                {sizes.map(size => (
                                    <label key={size._id} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                                        <input type="radio" name="size"/>
                                        <label htmlFor="size1" className="text-white">
                                            {size.name } LKR {basePrice + size.price}
                                        </label>
                                    </label>
                                ))}
                            </div>
                        )}
                        {extraIngredientPrices?.length > 0 &&(
                            <div className="py-2">
                                <h3 className="text-center">Pick Your Size</h3>
                                {extraIngredientPrices.map(extraThing => (
                                    <label key={extraThing._id} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                                        <input type="checkbox" name={extraThing.name}/>
                                        <label htmlFor="size1" className="text-white">
                                            {extraThing.name } +LKR {extraThing.price}
                                        </label>
                                    </label>
                                ))}
                            </div>
                        )}
                        <button className="primary border-primary text-white" type="button">Add to Cart Selected Price</button>
                    </div>
              </div>
            )}
            <MenuItemTile 
                onAddToCart={handleAddToCartButtonClick} 
                {...menuItem}/>
        </>
    );
}