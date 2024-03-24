export default function MenuItem(){
    return(
        <div className="bg-secondary p-4 rounded-lg text-center group hover:bg-primary hover:shadow-md hover-shadow-black/25 transition-all">
            <div className="text-center">
            <img src="/pizza.png" className="max-h-auto max-h-24 block mx-auto transition-transform duration-300 ease-in-out transform hover:scale-125" alt="pizza"/>
            </div>    
            <h4 className="font-semibold text-xl my-3 text-gray-200">Pizza</h4>
            <p className="text-white text-sm hover:text-secondary hover:font-bold">
                It is a type of pizza that is typically topped with pepperoni, a type of cured sausage.
            </p>
            <button className="mt-4 bg-primary text-white rounded-full px-8 py-2 hover:bg-secondary hover:text-primary border-primary">
                Add to cart $12
            </button>
        </div>
    );
}