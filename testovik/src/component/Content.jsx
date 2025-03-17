import React, { useState } from 'react'
import { FaTrashAlt } from "react-icons/fa"
import { RxUpdate } from "react-icons/rx";
import { ModalPopup } from './ModalPopup'
import { ModalUpdateItem } from './ModalUpdateItem'
import { DeleteForm } from './DeleteForm'

const Content = ({items=[],  handleDelete, handleSubmit  }) => {
  
  const [itemId, setItemId] = useState('');  
  const [itemById , setItemById ] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen]= useState(false);
    
   
  //удалить  элемент массива 
  function DeleteObject() {
    if (itemId) {
      handleDelete(itemId);
      setModalOpen(false);
    }
  }
  //сохранить  элемент массива
  function takeObject(id) {    
    if (id) {
    const item = items.find(item => item.id === id);    
    setItemById(item);  
  } 
  }
     
  return (
    <>
      {items.length ? (
        <ul>
          {items.map(item => (
            <li className='item' key={item.id} 
            onClick={()=>{setItemId(item.id )}} >
              <label    >
                   <h3> {item.id} .  {item.title}</h3>
                   <p> {item.description} </p>
                   <p> семинар состоится: {item.date}  в {item.time}</p>
                   <img src={item.photo} alt="Фотография" className='image'
                   />
              </label>


              <div>
              <button onClick={()=>setModalOpen(true)} className='modal-show-button'><FaTrashAlt tabIndex='0'/></button>
                <ModalPopup isOpen={modalOpen}
                  setModalOpen ={setModalOpen} >     
                   <DeleteForm 
                    setModalOpen ={setModalOpen} 
                    DeleteObject ={DeleteObject}  
                   />
              </ModalPopup>
              </div>
               
 
               <div>
              <button className='modal-show-button update'
               onClick={()=>{setModalUpdateOpen(true);
                             takeObject(item.id)}}   ><RxUpdate  tabIndex='0'/>
              </button> 
                <ModalUpdateItem 
                   updateOpen={modalUpdateOpen}
                   updateClose={()=> setModalUpdateOpen(false)}
                   item   = { itemById } 
                   handleSubmit={handleSubmit}
              /> 
              </div>  
            </li>
          ))}
        </ul>
      ) : (
        <p className='noText' >
          Your list is Empty!
        </p>
      )
        
      }
    </>
  )
}

export default Content