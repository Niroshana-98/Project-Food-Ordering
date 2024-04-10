import Trash from "../icons/Trash";
import Plus from "../icons/Plus";

export default function MenuItemPriceProps({name,addLabel,props,setProps}){

    function addProp(){
        setProps(oldProps =>{
            return [...oldProps, {name:'',price:0}];
        });
    }

    function editProp(ev, index, prop){
        const newValue = ev.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeProp(indexToRemove){
        setProps(prev => prev.filter((v,index)=> index !== indexToRemove));
    }

    return(
        <div className="bg-white p-2 rounded-md mb-2">
                    <div className="flex gap-1">
                        <div>
                            <button 
                                className="inline-flex p-1" 
                                type="button">
                                    Toggle
                            </button>
                        </div>
                        <h3 className="grow text-gray-700">{name}</h3>
                    </div>
                    {props?.length > 0 && props.map((size,index) => (
                        <div className="flex items-end gap-2" key={index}>
                            <div>
                                <label>Name</label>
                                <input type="text"
                                        placeholder="Size Name" 
                                        value={size.name}
                                        onChange={ev => editProp(ev, index, 'name')}/>
                            </div>
                            <div>
                                <label>Extra Price</label>
                                <input type="text"
                                       placeholder="Extra Price" 
                                       value={size.price}
                                       onChange={ev => editProp(ev, index, 'price')}/>
                            </div>
                            <div>
                                <button type="button"
                                        onClick={() => removeProp(index)}
                                        className="bg-white mb-2 px-2">
                                            <Trash/>
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                     type="button"
                     onClick={addProp}
                     className="bg-secondary text-white flex items-center justify-center">
                        <Plus className="w-5 h-5"/>
                        <span className="ml-2">{addLabel}</span>
                    </button>
                </div>
    );
}