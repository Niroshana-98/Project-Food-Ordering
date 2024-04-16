'use client';
import Image from "next/image";
import Right from "../icons/Right";
import React from "react";
import Slideshow from "../Slideshow";

const images = [
    {
        src: '/slide1.jpg',
      },
      {
        src: '/slide2.jpg',
      },
      {
        src: '/pizza2.jpg',
      },
  ];

export default function hero(){
    return(
        <section className="hero mt-4 mb-48">
            <div className="py-12">
                <h1 className="text-4xl font-semibold text-white">
                    Life is<br/> 
                    Tastier with a<br/>
                    Side of&nbsp; 
                    <span className="text-primary">
                        FOOD
                    </span>
                </h1>
                <p className="my-6 text-white text-sm">
                    Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
                </p>
                <div className="flex gap-4 text-sm">
                    <button className="flex justify-center bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full hover:text-secondary border-primary">
                        Order Now
                        <Right />
                    </button>
                    <button className="flex items-center border-0 gap-2 py-2 text-white font-semibold hover:text-primary">
                        Lern More
                        <Right />
                    </button>
                </div>
            </div>
            <div className="relative">
                {/*<Image src={'/pizza2.jpg'} layout={'fill'} objectFit={'contain'} alt={'coffe'} />*/}
                <Slideshow images={images}/>
            </div>
            
        </section>
    );
}
 // }
 //export default hero;