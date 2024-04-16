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
        Welcome to Bacement Cafe. At Bacement Cafe, we believe that dining is not just about food; it’s an experience. Nestled in the heart of Galle, our restaurant combines flavors with warm hospitality. Whether you’re celebrating a special occasion or simply enjoying a meal with loved ones, we invite you to savor every moment with us.
        </p>
        <p>
        Founded in 2015, Bacement Cafe has been a culinary destination for locals and tourists alike. Our journey began with a passion for Comfort Food. Over the years, we’ve evolved, but our commitment to quality ingredients, impeccable service, and a welcoming ambiance remains unwavering.
        </p>
        <p>
        Our mission is simple - to create memorable dining experiences. From our carefully curated menu to our thoughtfully designed space, every detail reflects our dedication to excellence. We strive to be more than just a restaurant; we want to be a part of your cherished memories.
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

