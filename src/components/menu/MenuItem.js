export default function MenuItem({image,name,description,basePrice,sizes,extraIngredientPrices}){
    return(
        <div className="bg-secondary p-4 rounded-lg text-center text-gray-200 group
         hover:bg-primary hover:shadow-md hover-shadow-black/25 transition-all hover:text-black
         flex flex-col justify-between">
            <div className="text-center">
            <img src={image} className="max-h-auto max-h-24 block mx-auto transition-transform duration-300 ease-in-out transform group-hover:scale-125" alt="pizza"/>
            </div>    
            <h4 className="font-semibold text-xl my-3">{name}</h4>
            <p className="text-white text-sm hover:font-bold line-clamp-3">
                {description}
            </p>
            <button
             onClick={() => {}}
             className="text-white mt-auto bg-primary  rounded-full px-8 py-2
           border-primary group-hover:bg-secondary group-hover:text-primary">
                Add to Cart LKR {basePrice}
            </button>
        </div>
    );
}