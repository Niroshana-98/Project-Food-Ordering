'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContex } from "../AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";

export default function Header(){
    const session = useSession();
    const status = session.status;
    const userData = session.data?.user;
    let userName= userData?.name || userData?.email;
    const {cartProducts} = useContext(CartContex);
    if(userName && userName.includes(' ')){
      userName =userName.split(' ')[0];
    }
    
    return(
        <header className="flex items-center justify-between bg-primary rounded-full h-12">    
        <nav className="flex items-center gap-8 text-secondary font-semibold">
            <Link className="text-secondary font-semibold text-2xl" href={'/'}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BACEMENT CAFE
            </Link>
            <Link className="hover:text-white"href={'/'}>Home</Link>
            <Link className="hover:text-white"href={'/menu'}>Menu</Link>
            <Link className="hover:text-white"href={'/#about'}>About</Link>
            <Link className="hover:text-white"href={'/#contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-100 font-semibold">
          {status == 'authenticated' && (
            <>
              <Link href={'/profile'} className="whitespace-nowrap hover:text-secondary">
                Hello, {userName}
              </Link>
              <button
                onClick={()=> signOut()} 
                className="rounded-full text-white px-8 py-2 hover:text-log border-primary">
                Logout
              </button>
            </>
            
          )}
          {status === 'unauthenticated' && (
            <>
                <Link className="hover:text-secondary" href={'/login'}>Login</Link>
                <Link href={'/register'} className="bg-primary rounded-full text-white px-6 py-2 hover:text-secondary">
                  Register
                </Link>
            </>
          )}
            <Link href={'/cart'} className=" text-bold relative mr-8">
              <ShoppingCart/>
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xm py-1 px-1 rounded-full leading-3">({cartProducts.length})</span>
            </Link>
        </nav>
      </header>
    );
}