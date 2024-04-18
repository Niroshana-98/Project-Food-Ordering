'use client';
import {SessionProvider} from "next-auth/react";
import { createContext, useState } from "react";

const CartContex = createContext({});

export function AppProvider({children}){
    const [cartProducts, setCartProducts] = useState([]);
    function addToCart(product, size=null, extras=[]){
        setCartProducts(prevProducts => {
            const cartProduct =  {...product, size, extras};
            const newProducts = [...prevProducts, cartProduct];
            return newProducts;
        });
    }
    return(
        <SessionProvider>
            <CartContex.Provider value={{
                cartProducts,setCartProducts,
            }}>
                {children}
            </CartContex.Provider>
        </SessionProvider>
    );
}