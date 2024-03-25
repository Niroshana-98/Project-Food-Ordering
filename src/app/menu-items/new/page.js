import {useProfile} from "@components/UseProfile";
import { data } from "autoprefixer";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";


export default function NewMenuItemPage(){
    
    const [image, setImage] = useState('');
    const [name,setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice,setBasePrice] = useState('');
    const {loading, data} = useProfile();

    async function handleFormSubmit(ev){
        ev.preventDefault();
        const data ={image,name,description,basePrice,};
        const savingPromise = new Promise(async(resolve, reject)=>{
            const response = await fetch('/api/menu-items',{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            });
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingPromise,{
            loading:'Saving...',
            success:'Saved',
            error:'Error',
        });
        
    }

    if(loading){
        return <p className="text-white">Loading User Info...</p>
    }

    if(!data.admin){
        return <p>Not an Admin</p>
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
                <div
                 className="grid items-start gap-4" 
                 style={{gridTemplateColumns:'.3fr .7fr'}}>
                    <div>
                        <EditableImage link={image} setLink={setImage}/>
                    </div>
                    <div className="grow">
                        <label className="text-white">Item Name</label>
                        <input
                         type="text"
                         value={name}
                         onChange={ev => setName(ev.target.value)}
                        />
                        <label className="text-white">Description</label>
                        <input
                         type="text"
                         value={description}
                         onChange={ev => setDescription(ev.target.value)}
                        />
                        <label className="text-white">Price</label>
                        <input
                         type="text"
                         value={basePrice}
                         onChange={ev => setBasePrice(ev.target.value)}
                        />
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        </section>
    );
}