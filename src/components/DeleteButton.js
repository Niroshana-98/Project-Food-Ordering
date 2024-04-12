import { useState } from "react";

export default function DeleteButton({label, onDelete}){
    const[showConfirm, setShowConfirm] = useState(false);

    if(showConfirm){
        return(
            <div>
                <div className="text-white mb-2">Are You Sure You Want To Delete This?</div>
                <div className="flex gap-2">
                    <button
                     type="button" 
                     className="bg-white" 
                     onClick={() => setShowConfirm(false)}>
                        Cancel
                    </button>
                    <button
                     type="button"
                     onClick={onDelete} 
                     className="primary border-redB">
                        Yes, Delete!
                    </button>
                </div>
            </div>
           
        );
    }
    return(
        <button type="button" className="bg-white" onClick={() => setShowConfirm(true)}>
            {label}
        </button>
    );
}