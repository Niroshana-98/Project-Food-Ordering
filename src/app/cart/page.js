'use client';
import {CartContex, cartProductPrice} from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext } from "react";

export default function CartPage(){
    const {cartProducts} = useContext(CartContex);
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
                    {cartProducts?.length > 0 && cartProducts.map(product => (
                        <div key={product.id} className="text-white flex items-center gap-4 mb-2 border-b py-2">
                            <div className="w-24">
                                <Image width={240} height={240} src={product.image} alt={product.name}/>
                            </div>
                            <div>
                                <h3>
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
                        </div>
                    ))}
                </div>
                <div>right</div>
            </div>
        </section>
    );
}