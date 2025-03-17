import React, { useRef, useState, useEffect } from "react";
import '../css/ModalPopup.css';
import { validateForm } from '../service/Validation'; // Импорт функций валидации

export const ModalUpdateItem = ({ updateOpen, item, updateClose, handleSubmit }) => {
  const inputRef = useRef();
  const [itemId, setItemId] = useState(item?.id || '');
  const [itemTitle, setItemTitle] = useState(item?.title || '');
  const [itemDescription, setItemDescription] = useState(item?.description || '');
  const [itemDate, setItemDate] = useState(item?.date || '');
  const [itemTime, setItemTime] = useState(item?.time || '');
  const [itemPhoto, setItemPhoto] = useState(item?.photo || '');
  const [errors, setErrors] = useState({
    title: '', description: '', date: '', time: '', photo: "",
  });
 
  // Автоматическая фокусировка на инпуте и обновление состояний
  useEffect(() => {
    if (updateOpen && inputRef) {
      inputRef.current.focus();
    } 
    setItemId(item?.id);
    setItemTitle(item?.title || '');
    setItemDescription(item?.description || '');
    setItemDate(item?.date || '');
    setItemTime(item?.time || '');
    setItemPhoto(item?.photo || '');
  }, [updateOpen, item]);

  // Обработка отправки формы
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Проверяем валидацию
    const { isValid, errors: validationErrors} = validateForm(
      itemTitle, 
      itemDescription, 
      itemDate, 
      itemTime,
      itemPhoto);
    setErrors(validationErrors);

    if (!isValid) {
      return; // Если валидация не прошла, форма не отправляется
    }

    // Создаем обновленный объект
    const updatedItem = {
      ...item,
      id: itemId,
      title: itemTitle,
      description: itemDescription,
      date: itemDate,
      time: itemTime,
      photo: itemPhoto,
    };
    console.log(updatedItem,'updatedItem')
    try {
      await handleSubmit(updatedItem); // Дождитесь завершения handleSubmit
      updateClose(); // Закрываем модальное окно только после успешной отправки
    } catch (error) {
      console.error("Ошибка при обновлении элемента:", error);
    }
  };

  return (
    <>
      {updateOpen && item && (
        <div className="modal">
          <div className="modal-wrapped">
            <div className="modal-content">
              <form id="updateItem" className='updateForm' onSubmit={handleFormSubmit}>
                <button className='noButton' onClick={() => updateClose(false)}>
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
                    id={item.title}
                    placeholder='изменить название'
                    required
                    value={itemTitle}
                    onChange={(e) => { setItemTitle(e.target.value); setItemId(item.id); }}
                  />
                  <p>{errors.title && <span className="error show">{errors.title}</span>}</p>
                </div>

                {/* Поле "Описание" */}
                <div className='form-control'>
                  <label>Описание</label>
                  <input
                    type="text"
                    id={item.description}
                    placeholder='описание'
                    required
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                  />
                  <p>{errors.description && <span className="error show">{errors.description}</span>}</p>
                </div>

                {/* Поле "Дата" */}
                <div className='form-control'>
                  <label>Дата</label>
                  <input
                    type="text"
                    id={item.date}
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
                    id={item.time}
                    placeholder='время (HH:MM)'
                    required
                    value={itemTime}
                    onChange={(e) => setItemTime(e.target.value)}
                  />
                  <p>{errors.time && <span className="error show">{errors.time}</span>}</p>
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
                  <p>{errors.photo && <span className="error show">{errors.photo}</span>}</p>
                </div>
                {/* Кнопка отправки */}
                <div className='modal-div'>
                  <button type='submit' aria-label='update item'>
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