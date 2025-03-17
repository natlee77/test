
import React  from 'react'
 
export const DeleteForm = ({setModalOpen,DeleteObject}) =>{

    return (
        <>
        <div>
        <p>Ты действительно хочешь удалить семинар?</p>               
                        <div className='modal-div'>
                            <button className='noButton' 
                              onClick ={()=> setModalOpen(false) }>
                               НЕТ 
                            </button>
                            <button onClick={DeleteObject}>
                               ДА
                            </button>
                        </div>
        </div>
        </>
        )
}
  export default DeleteForm;






