import React from "react";
import '../css/ModalPopup.css'


export const ModalPopup = ({isOpen ,children} ) => {

    return(
        <>
        {isOpen && (
        <div className="modal">
            <div className="modal-wrapped">
               <div className="modal-content">
               <p>Ты действительно хочешь удалить семинар?</p>
               {children}
               </div>
            </div> 
        </div>
         )}
        </>
    )
}
export default ModalPopup