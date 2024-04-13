import EditableImage from "@/components/layout/EditableImage";

export default function UserForm(){

    const [userName, setUserName] = useState('');
    const [image,setImage]=useState('');
    const[phone,setPhone]=useState('');
    const[streetAddress,setStreetAddress]=useState('');
    const[postalCode,setPostalCode]=useState('');
    const[city,setCity]=useState('');
    const[country,setCountry]=useState('');
    return(
        <div className="flex gap-4">
            <div>
                <div className="p-2 rounded-lg relative max-w-[120px]">
                    <EditableImage link={image} setLink={setImage}/>
                </div>
            </div>
            <form className="grow" onSubmit={handleProfileInfoUpdate}>
                <label className="text-white">
                    Full Name
                </label>
                <input 
                    type="text" 
                    placeholder="First and last name"
                    value={userName} 
                    onChange={ev => setUserName(ev.target.value)}
                    className="hover:bg-gray-300"
                    />

                <label className="text-white">
                    Email
                </label>
                <input
                    type="email" 
                    disabled={true} 
                    value={session.data.user.email}
                    placeholder={'email'}
                    className="hover:bg-gray-300"
                />

                <label className="text-white">
                    Phone Number
                </label>
                <input 
                    type="tel"
                    placeholder="Phone Number"
                    value={phone} onChange={ev => setPhone(ev.target.value)}
                    className="hover:bg-gray-300"
                />

                <label className="text-white">
                    Street Address
                </label>
                <input
                    type="text" 
                    placeholder="Street Address"
                    value={streetAddress} 
                    onChange={ev => setStreetAddress(ev.target.value)}
                    className="hover:bg-gray-300"
                />

                <div className="flex gap-2 mb-2">
                    <div>
                        <label className="text-white">
                            Zip Code
                        </label>
                        <input
                            type="text" 
                            placeholder="Postal Code"
                            value={postalCode} 
                            onChange={ev => setPostalCode(ev.target.value)}
                            className="hover:bg-gray-300"
                        />
                    </div>
                    <div>
                        <label className="text-white">
                            City
                        </label>
                        <input
                            type="text" 
                            placeholder="City"
                            value={city} 
                            onChange={ev => setCity(ev.target.value)}
                            className="hover:bg-gray-300"
                        />
                    </div>    
                </div> 
                <label className="text-white">
                    District
                </label>
                <input
                    type="text" 
                    placeholder="District"
                    value={country} 
                    onChange={ev => setCountry(ev.target.value)}
                    className="hover:bg-gray-300"
                />
                <button type="submit" className="mt-4">Save</button>
            </form>                   
         </div>
    );
}