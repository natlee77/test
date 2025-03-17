

// Функция для проверки корректности даты
export const isValidDate = (day, month, year) => {
    const date = new Date(year, month - 1, day); // Месяц в JavaScript начинается с 0
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };
  
  // Функция валидации формы
  export const validateForm = (itemTitle, itemDescription, itemDate, itemTime) => {
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
  
    return { isValid, errors: newErrors }; // Возвращаем результат валидации и ошибки
  };