import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
      <SectionHeaders 
          subHeader={'Our Story'}
          mainHeader={'About us'}
      />
      <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
        <p>
          Pizza Hut, a subsidiary of Yum! Brands,world is the largest pizza company and home of Pan Pizza. Pizza Hut began 60 years ago in Wichita, Kansas, and today is an iconic global brand that delivers more pizza, pasta and wings than any other restaurant in the world.
        </p>
        <p>
          Pizza Hut, a subsidiary of Yum! Brands,world is the largest pizza company and home of Pan Pizza. Pizza Hut began 60 years ago in Wichita, Kansas, and today is an iconic global brand that delivers more pizza, pasta and wings than any other restaurant in the world.
        </p>
        <p>
          Pizza Hut, a subsidiary of Yum! Brands,world is the largest pizza company and home of Pan Pizza. Pizza Hut began 60 years ago in Wichita, Kansas, and today is an iconic global brand that delivers more pizza, pasta and wings than any other restaurant in the world.
        </p>
      </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders 
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact Us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+94763903736">
            +94 76 390 3736
          </a>
        </div>       
      </section>
    </>
  );
}
