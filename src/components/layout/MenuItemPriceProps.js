import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import {useEffect, useState} from "react";

export default function MenuItemPriceProps(){

    const [sizes, setSizes] = useState([]);

    function addSize(){
        setSizes(oldSizes =>{
            return [...oldSizes, {name:'',price:0}];
        });
    }

    function editSize(ev, index, prop){
        const newValue = ev.target.value;
        setSizes(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeSize(indexToRemove){
        setSizes(prev => prev.filter((v,index)=> index !== indexToRemove));
    }

    return(
        <div className="bg-white p-2 rounded-md mb-2">
                    <label>Sizes</label>
                    {sizes?.length > 0 && sizes.map((size,index) => (
                        <div className="flex items-end gap-2" key={index}>
                            <div>
                                <label>Size Name</label>
                                <input type="text"
                                        placeholder="Size Name" 
                                        value={size.name}
                                        onChange={ev => editSize(ev, index, 'name')}/>
                            </div>
                            <div>
                                <label>Extra Price</label>
                                <input type="text"
                                       placeholder="Extra Price" 
                                       value={size.price}
                                       onChange={ev => editSize(ev, index, 'price')}/>
                            </div>
                            <div>
                                <button type="button"
                                        onClick={() => removeSize(index)}
                                        className="bg-white mb-2 px-2">
                                            <Trash/>
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                     type="button"
                     onClick={addSize}
                     className="bg-secondary text-white flex items-center justify-center">
                        <Plus className="w-5 h-5"/>
                        <span className="ml-2">Add Item Size</span>
                    </button>
                </div>
    );
}