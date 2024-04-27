'use client';
import {CartContex, cartProductPrice} from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";

export default function CartPage(){
    const {cartProducts, removeCartProduct} = useContext(CartContex);
    const [address, setAddress] = useState({});
    const {data:profileData} = useProfile();

    useEffect(() => {
        if(profileData?.city){
            const {phone, streetAddress, city, postalCode, country} = profileData;
            const addressFromProfile = {
                phone,
                streetAddress,
                city,
                postalCode,
                country
            };
            setAddress(addressFromProfile);
        }
    }, [profileData]);

    let total =0;
    for(const p of cartProducts){
        total += cartProductPrice(p);
    }
    function handleAddressChange(propName,value){
        setAddress(prevAddress =>({...prevAddress,[propName]:value}));
    }
    return(
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart"/>
            </div>
            <div className="mt-4 grid gap-4 grid-cols-2">
                <div className="text-white">
                    {cartProducts?.length > 0 && (
                        <div>No Products in Your Shopping Cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product,index) => (
                        <div key={product.id} className="text-white flex items-center gap-4 mb-2 border-b py-2">
                            <div className="w-24">
                                <Image width={240} height={240} src={product.image} alt={product.name}/>
                            </div>
                            <div className="grow">
                                <h3 className="font-semibold">
                                    {product.name}
                                </h3>
                                {product.size && (
                                    <div className="text-sm text-gray-300">
                                        Size: <span>{product.size.name}</span>
                                    </div>
                                )}
                                {product.extras?.length > 0 && (
                                    <div className="text-sm text-gray-300">
                                        {product.extras.map(extra =>(
                                            <div key={extra.id}>
                                                {extra.name} LKR {extra.price}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-lg font-semibold">
                                LKR {cartProductPrice(product)}
                            </div>
                            <div className="ml-2">
                                <button
                                 className="text-white p-2"
                                 type="button"
                                 onClick={() => removeCartProduct(index)}>
                                    <Trash/>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="py-4 text-right pr-16">
                        <span className="text-gray-300">
                            Subtotal:
                        </span>
                        <span className="text-lg font-semibold pl-2">
                            LKR {total}.00
                        </span>
                    </div>
                </div>
                <div className="bg-gray-900 text-white p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form>
                        <AddressInputs
                         addressProps={{address}}
                         setAddressProp={handleAddressChange}/>
                        <button type="submit">Pay LKR {total}.00</button>
                    </form>
                </div>
            </div>
        </section>
    );
}