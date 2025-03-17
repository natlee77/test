import React from "react";
import '../css/ModalPopup.css'
import { IoMdClose } from "react-icons/io";

export const ModalPopup = ({isOpen ,setModalOpen ,children} ) => {

    return(
        <>
        {isOpen && (
        <div className="modal">           
            <div className="modal-wrapped">
               <div className="modal-content">   
               <button className="modal-close-button"
                 onClick={()=>{setModalOpen(false)}}>
                 <IoMdClose />
                 </button>     
               {children}
               </div>
            </div> 
        </div>
         )}
        </>
    )
}
export default ModalPopup