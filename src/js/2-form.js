const refs = {
  form: document.querySelector('.feedback-form'),
};
// console.log(refs);

let formData = {
  email: '',
  message: '',
};

// вызываем сразу шаг 2, перед шагом 1
fieldForm();

// шаг 1: чекаем данные, сохраняем в обьект и выносим в LS
function onFormFieldChange({ target: formFieldEl }) {
  // куда пишем
  const formFieldName = formFieldEl.name;
  // что пишем
  const formFieldValue = formFieldEl.value.trim();
  // сохраняем в обьект
  formData[formFieldName] = formFieldValue;
  // сохраняеем обьект в LS (задаем название и переводим обьект в строчку)
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// шаг 2: если есть данные в LS то выводим в input
function fieldForm() {
  // считать данные LS
  try {
    const formDataLS = JSON.parse(localStorage.getItem('feedback-form-state'));
    // проверить есть ли данные в LS
    if (formDataLS === null) {
      return;
    }
    // делаю этот обьект не пустым если даныне уже были записаны до LS
    formData = formDataLS;
    // выносим данные в input c помощью перебора Object.keys()
    const formDataLsKeys = Object.keys(formDataLS);
    // записываем значение по ключу, которое берем из refs.form.lements в input
    formDataLsKeys.forEach(key => {
      refs.form.elements[key].value = formDataLS[key];
    });
  } catch (error) {
    console.log(error);
  }
}

// шаг 3: проверка на то что все поля заполнены и чистка формы и LS после submit
function onFormSubmit(event) {
  event.preventDefault();
  // собираем масыв всего что юзер ввёл
  const formDataValues = Object.values(formData);
  // проверка на пустые строчки
  if (formDataValues.includes('')) {
    alert('Fill please all fields');
    return;
  }
  // выводим обьект к консоли
  console.log(formData);
  // динамический сброс всех ключей обьекта
  Object.keys(formData).forEach(key => (formData[key] = ''));
  console.log(formData);
  // чистим LS
  localStorage.removeItem('feedback-form-state');
  // чистим форму
  refs.form.reset();
}

refs.form.addEventListener('input', onFormFieldChange);
refs.form.addEventListener('submit', onFormSubmit);
