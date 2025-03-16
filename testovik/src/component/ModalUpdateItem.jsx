import React, { useRef, useState, useEffect } from "react";
import '../css/ModalPopup.css';

export const ModalUpdateItem = ({ updateOpen, item, updateClose, handleSubmit }) => {
  const inputRef = useRef();
  const [itemId, setItemId] = useState(item?.id || '');
  const [itemTitle, setItemTitle] = useState(item?.title || '');
  const [itemDescription, setItemDescription] = useState(item?.description || '');
  const [itemDate, setItemDate] = useState(item?.date || '');
  const [itemTime, setItemTime] = useState(item?.time || '');
  const [itemPhoto, setItemPhoto] = useState(item?.photo || '');
  // const [updateddItem, setUpdateddItem] = useState({
  //   title: "", description: "",date: "", time: "",photo: "",});
  const [errors, setErrors] = useState({
    title: '', description: '', date: '', time: '', photo: "",});

  // Автоматическая фокусировка на инпуте и обновление состояний
  useEffect(() => {
    if (updateOpen  ) {
      // inputRef.current.focus();
    }
 
    // console.log('useffect', item)
    setItemId(item?.id)
    setItemTitle(item?.title || '');
    setItemDescription(item?.description || '');
    setItemDate(item?.date || '');
    setItemTime(item?.time || '');
    setItemPhoto(item?.photo || '')
  }, [updateOpen, item]);

  // Функция для проверки корректности даты
  const isValidDate = (day, month, year) => {
    const date = new Date(year, month - 1, day); // Месяц в JavaScript начинается с 0
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  // Функция валидации
  const validateForm = () => {
    const newErrors = {
      title: '',
      description: '',
      date: '',
      time: '',
      photo: '',
    };

    let isValid = true;

    // Проверка названия
    if (!itemTitle.trim()) {
      newErrors.title = 'Название обязательно для заполнения';
      isValid = false;
    }

    // Проверка описания
    if (!itemDescription.trim()) {
      newErrors.description = 'Описание обязательно для заполнения';
      isValid = false;
    }

    // Проверка даты (формат DD.MM.YYYY)
    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!itemDate.trim()) {
      newErrors.date = 'Дата обязательна для заполнения';
      isValid = false;
    } else if (!dateRegex.test(itemDate)) {
      newErrors.date = 'Дата должна быть в формате DD.MM.YYYY';
      isValid = false;
    } else {
      const [day, month, year] = itemDate.split('.').map(Number);
      if (!isValidDate(day, month, year)) {
        newErrors.date = 'Некорректная дата';
        isValid = false;
      }
    }

    // Проверка времени (формат HH:MM)
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!itemTime.trim()) {
      newErrors.time = 'Время обязательно для заполнения';
      isValid = false;
    } else if (!timeRegex.test(itemTime)) {
      newErrors.time = 'Время должно быть в формате HH:MM';
      isValid = false;
    }

    setErrors(newErrors); // Устанавливаем ошибки
    return isValid; // Возвращаем результат валидации
  };

  // Обработка отправки формы
  const handleFormSubmit =async (e) => {
    e.preventDefault();
    // Проверяем валидацию
    if (!validateForm()) {
      return; // Если валидация не прошла, форма не отправляется
    }
    // Создаем обновленный объект
    const updatedItem = {
      ...item,
      id:itemId,
      title: itemTitle,
      description: itemDescription,
      date: itemDate,
      time: itemTime,
      photo:itemPhoto,
    };
    
  //  setUpdateddItem(updatedItem) ;
    // console.log('updateddItem',updateddItem)
    try {
      await handleSubmit(item.id, updatedItem); // Дождитесь завершения handleSubmit
      updateClose(); // Закрываем модальное окно только после успешной отправки
    } catch (error) {
      console.error("Ошибка при обновлении элемента:", error);
    }
  };
   
  return (
    <>
      {updateOpen &&  item  &&(
        <div className="modal">
          <div className="modal-wrapped">
            <div className="modal-content">
              <form id="updateItem" key={item.id} className='updateForm' onSubmit={handleFormSubmit}>
                <button  className='noButton'
                          onClick ={()=> updateClose(false)}>
                          X
                        </button>   
                <h3>Редактирование семинара</h3>

                {/* Поле "Название" */}
                <div className='form-control'>
                  <label>Название</label>
                  <input
                    type="text"
                    autoFocus
                    ref={inputRef}
                    id='updateTitle'
                    placeholder='изменить название'
                    required
                    value={itemTitle}
                    onChange={(e) => {setItemTitle(e.target.value)
                                     setItemId(item.id)}
                    }
                  />
                 <p> {errors.title && <span className="error show">{errors.title}</span>}</p>
                </div>

                {/* Поле "Описание" */}
                <div className='form-control'>
                  <label>Описание</label>
                  <input
                    type="text"
                    id='updateDescription'
                    placeholder='описание'
                    required
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                  />
                 <p> {errors.description && <span className="error show">{errors.description}</span>}</p>
                </div>

                {/* Поле "Дата" */}
                <div className='form-control'>
                  <label>Дата</label>
                  <input
                    type="text"
                    id='updateDate'
                    placeholder='дата (DD.MM.YYYY)'
                    required
                    value={itemDate}
                    onChange={(e) => setItemDate(e.target.value)}
                  />
                  <p>{errors.date && <span className="error show">{errors.date}</span>}</p>
                </div>

                {/* Поле "Время" */}
                <div className='form-control'>
                  <label>Время</label>
                  <input
                    type="text"
                    id='updateTime'
                    placeholder='время (HH:MM)'
                    required
                    value={itemTime}
                    onChange={(e) => setItemTime(e.target.value)}
                  />
                 <p> {errors.time && <span className="error show">{errors.time}</span>}</p>
                </div>

                <div className='form-control'>
                  <label>Фото</label>
                  <input
                    type="text"
                    autoFocus
                    ref={inputRef}
                    id='updatePhoto'
                    placeholder='изменить URL'
                    required
                    value={itemPhoto}
                    onChange={(e) => setItemPhoto(e.target.value)}
                  />
                 <p> {errors.photo && <span className="error show">{errors.photo}</span>}</p>
                </div>
                {/* Кнопка отправки */}
                <div className='modal-div'>
                         
                        <button type='submit' aria-label='update item' >
                          ИЗМЕНИТЬ
                        </button>
                    </div>
               
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalUpdateItem;