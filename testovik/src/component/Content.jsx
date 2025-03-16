import React, { useState } from 'react'
import { FaTrashAlt } from "react-icons/fa"
import { RxUpdate } from "react-icons/rx";
import { ModalPopup } from './ModalPopup'
import { ModalUpdateItem } from './ModalUpdateItem'


const Content = ({items=[],  handleDelete, handleSubmit  }) => {
    //console.log(items); //setItems,
  const [itemId, setItemId] = useState();  
   const [itemById , setItemById ] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen]= useState(false);
    
  // console.log('item -content',itemById );

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
            onClick={()=>{setItemId(item.id);
                          takeObject(item.id);}} >
              <label    >
                   <h3> {item.id} .  {item.title}</h3>
                   <p> {item.description} </p>
                   <p> семинар состоится: {item.date}  в {item.time}</p>
                   <img src={item.photo} alt="Фотография" className='image'
                   />
              </label>
              <div>
              <button className='modal-show-button'
                onClick={()=>setModalOpen(true)}  >
                  <FaTrashAlt  tabIndex='0' />
              </button>
              <ModalPopup isOpen={modalOpen} >                    
                    <div className='modal-div'>
                        <button className='noButton' 
                          onClick ={()=> setModalOpen(false)}>
                           НЕТ 
                        </button>
                        <button onClick={DeleteObject}>
                           ДА
                        </button>
                    </div>
              </ModalPopup>
              </div>
              
              <div>
              <button className='modal-show-button update'
               onClick={()=>setModalUpdateOpen(true)} 
                 >
                  <RxUpdate  tabIndex='0' />
              </button>  
              <ModalUpdateItem 
              updateOpen={modalUpdateOpen}
              updateClose={()=> setModalUpdateOpen(false)}
              item   = { itemById   } 
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