export default function AddressInputs({addressProps, setAddressProp}){
    const {phone, streetAddress, postalCode, city, country}=addressProps;
    return(
        <>
            <label className="text-white">
                Phone Number
            </label>
            <input 
                type="tel"
                placeholder="Phone Number"
                value={phone} onChange={ev => setAddressProp('phone',ev.target.value)}
                className="hover:bg-gray-300"
            />

            <label className="text-white">
                Street Address
            </label>
            <input
                type="text" 
                placeholder="Street Address"
                value={streetAddress} 
                onChange={ev => setAddressProp('streetAddress',ev.target.value)}
                className="hover:bg-gray-300"
            />

            <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                    <label className="text-white">
                        Zip Code
                    </label>
                    <input
                        type="text" 
                        placeholder="Postal Code"
                        value={postalCode} 
                        onChange={ev => setAddressProp('postalCode',ev.target.value)}
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
                        onChange={ev => setAddressProp('city',ev.target.value)}
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
                onChange={ev => setAddressProp('country',ev.target.value)}
                className="hover:bg-gray-300"
            />
        </>
    );
}