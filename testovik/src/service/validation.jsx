// Функция для проверки корректности даты
export const isValidDate = (day, month, year) => {
  const date = new Date(year, month - 1, day); // Месяц в JavaScript начинается с 0
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

// Функция для проверки корректности времени
export const isValidTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
};

// Функция для проверки корректности URL
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// Функция валидации формы
export const validateForm = (title, description, date, time, photo) => {
  const newErrors = {
    title: '',
    description: '',
    date: '',
    time: '',
    photo: '',
  };

  let isValid = true;

  // Проверка названия
  if (!title.trim()) {
    newErrors.title = 'Название обязательно для заполнения';
    isValid = false;
  }

  // Проверка описания
  if (!description.trim()) {
    newErrors.description = 'Описание обязательно для заполнения';
    isValid = false;
  }

  // Проверка даты (формат DD.MM.YYYY)
  const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!date.trim()) {
    newErrors.date = 'Дата обязательна для заполнения';
    isValid = false;
  } else if (!dateRegex.test(date)) {
    newErrors.date = 'Дата должна быть в формате DD.MM.YYYY';
    isValid = false;
  } else {
    const [day, month, year] = date.split('.').map(Number);
    if (!isValidDate(day, month, year)) {
      newErrors.date = 'Некорректная дата';
      isValid = false;
    }
  }

  // Проверка времени (формат HH:MM)
  const timeRegex = /^\d{2}:\d{2}$/;
  if (!time.trim()) {
    newErrors.time = 'Время обязательно для заполнения';
    isValid = false;
  } else if (!timeRegex.test(time)) {
    newErrors.time = 'Время должно быть в формате HH:MM';
    isValid = false;
  } else if (!isValidTime(time)) {
    newErrors.time = 'Некорректное время';
    isValid = false;
  }

  // Проверка URL фотографии
  if (!photo.trim()) {
    newErrors.photo = 'URL обязательно для заполнения';
    isValid = false;
  } else if (!isValidUrl(photo)) {
    newErrors.photo = 'Некорректный URL';
    isValid = false;
  }

  return { isValid, errors: newErrors }; // Возвращаем результат валидации и ошибки
};