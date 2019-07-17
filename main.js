//поочерёдно скрываемые и отображаемые блоки
const firstForm = document.getElementById("firstForm");
const secondForm = document.getElementById("secondForm");
const resultDiv = document.getElementById("resultDiv");
const thankYouMessage = document.getElementById("thankYouMessage");
//инпуты и селекты из первой и второй формы
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const login = document.getElementById("login");
const email = document.getElementById("email");
const company = document.getElementById("company");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const departmentSelect = document.getElementById("departmentSelect");
const vacancySelect = document.getElementById("vacancySelect");
//блоки вывода результатов
const resultName = document.getElementById("resultName");
const resultLogin = document.getElementById("resultLogin");
const resultEmail = document.getElementById("resultEmail");
const resultCompany = document.getElementById("resultCompany");
const resultDepartment = document.getElementById("resultDepartment");
const resultVacancy = document.getElementById("resultVacancy");
//JSON из задания
const selectOptions = `{
  "departments": {
    "Sales": [
      "Sales Manager",
      "Account Manager"
    ],
    "Marketing": [
      "Creative Manager",
      "Marketing Coordinator",
      "Content Writer"
    ],
    "Technology": [
      "Project Manager",
      "Software Developer",
      "PHP programmer",
      "Front End",
      "Quality Assurance"
    ]
  }
}`;
//блоки вывода ошибок валидации
const firstNameMessage = document.getElementById("firstNameError");
const lastNameMessage = document.getElementById("lastNameError");
const loginMessage = document.getElementById("loginError");
const emailMessage = document.getElementById("emailError");
const passwordMessage = document.getElementById("passwordError");
const confirmPasswordMessage = document.getElementById("confirmPasswordError");
const departmentSelectMessage = document.getElementById("departmentError");
const vacancySelectMessage = document.getElementById("vacancyError");
//ошибки валидации
let firstNameErrors, lastNameErrors, loginErrors, emailErrors, passwordErrors, confirmPasswordErrors, departmentErrors, vacancyErrors;
//регулярные выражения, используемые при валидации
const lettersOnlyRegEx = /^[a-zA-Z]+$/;
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const containNumberRegEx = /\d/;
const containUppercaseRegEx = /[A-Z]/;
const containLowercaseRegEx = /[a-z]/;
const containSpecialCharacterRegEx = /[!@#$ %^&*~]/;

//**************FIRST STEP**********************************/

function firstStepSubmitHandler (event) {
  event.preventDefault();
  if(isFirstFormValid()) {
    //очищаю блоки вывода ошибок валидации
    firstNameMessage.innerHTML = null;
    lastNameMessage.innerHTML = null;
    loginMessage.innerHTML = null;
    emailMessage.innerHTML = null;
    passwordMessage.innerHTML = null;
    confirmPasswordMessage.innerHTML = null;
    
    //скрываю первую форму, отображаю вторую
    firstForm.classList.toggle("hidden");
    secondForm.classList.toggle("hidden");
  } else { 
    firstFormDisplayErrors(); //вывожу ошибки валидации
  }
}

function isFirstFormValid() {
  if (!firstName.value) {
    firstNameErrors = "This field is required";
  } else {
    if (!firstName.value.match(lettersOnlyRegEx)) {
      firstNameErrors = "Use letters only";
    } else {
      firstNameErrors = null;
    }
  }

  if (!lastName.value) {
    lastNameErrors = "This field is required";
  } else {
    if (!lastName.value.match(lettersOnlyRegEx)) {
      lastNameErrors = "Use letters only";
    } else {
      lastNameErrors = null;
    }
  }

  if (!login.value) {
    loginErrors = "This field is required";
  } else {
    loginErrors = null;
  }

  if (!email.value) {
    emailErrors = "This field is required";
  } else {
    if (!email.value.match(emailRegEx)) {
      emailErrors = "Invalid email";
    } else {
      emailErrors = null;
    }
  }

  if (!password.value) {
    passwordErrors = "This field is required";
  } else {
    if (
      !(
        password.value.match(containNumberRegEx) &&
        password.value.match(containUppercaseRegEx) &&
        password.value.match(containLowercaseRegEx) &&
        password.value.match(containSpecialCharacterRegEx)
      )
    ) {
      passwordErrors =
        "Reqired at least one number (0-9), uppercase and lowercase letters (a-Z) and at keast one special character(!@#$%^&*~)";
    } else {
      passwordErrors = null;
    }
  }

  if (!confirmPassword.value) {
    confirmPasswordErrors = "This field is required";
  } else {
    if (confirmPassword.value !== password.value) {
      confirmPasswordErrors = "Must be equal to password";
    } else {
      confirmPasswordErrors = null;
    }
  }
  
  return (
    firstNameErrors ||
    lastNameErrors ||
    emailErrors ||
    passwordErrors ||
    confirmPasswordErrors
  ) ? false : true;
}

function firstFormDisplayErrors() {
  firstNameMessage.innerHTML = firstNameErrors;
  lastNameMessage.innerHTML = lastNameErrors;
  loginMessage.innerHTML = loginErrors;
  emailMessage.innerHTML = emailErrors;
  passwordMessage.innerHTML = passwordErrors;
  confirmPasswordMessage.innerHTML = confirmPasswordErrors;
}

//**************SECOND STEP**********************************/

function secondStepSubmitHandler(event) {
  event.preventDefault();
  if (isSecondFormValid()) {
    //очищаю блоки вывода ошибок валидации
    departmentSelectMessage.innerHTML = null;
    vacancySelectMessage.innerHTML = null;
    //вывожу результаты заполнен6ия форм
    resultName.innerHTML = `${firstName.value} ${lastName.value}`;
    resultLogin.innerHTML = login.value;
    resultEmail.innerHTML = email.value;
    resultCompany.innerHTML = company.value;
    resultDepartment.innerHTML = departmentSelect.value;
    resultVacancy.innerHTML = vacancySelect.value;    
    //скрываю вторую форму, отображаю третий блок
    secondForm.classList.toggle("hidden");
    resultDiv.classList.toggle("hidden");
  } else {
    secondFormDisplayErrors(); //вывожу ошибки валидации
  }
}
//добавление опций в селект departments
function addDepartmentOptions() {
  const departments = Object.keys(JSON.parse(selectOptions).departments);
  departments.forEach(department => {
    departmentSelect.innerHTML += `<option value="${department}">${department}</option>`;
  })
}
//добавление опций в селект vacancy
function addVacancyOptions(event) {
  vacancySelect.disabled = false;
  vacancySelect.innerHTML = '<option value="" disabled selected>Vacancy</option>';
  const vacancyes = JSON.parse(selectOptions).departments[event.target.value];
  vacancyes.forEach(vacancy => {
    vacancySelect.innerHTML += `<option value="${vacancy}">${vacancy}</option>`;
  });
}

function isSecondFormValid() {
  if (!departmentSelect.value) {
    departmentErrors = "This field is required";
  } else {
    departmentErrors = null;
  };

  if (!vacancySelect.value) {
    vacancyErrors = "This field is required";
  } else {
    vacancyErrors = null;
  };
  return departmentErrors || vacancyErrors ? false : true;
}

function secondFormDisplayErrors() {
  departmentSelectMessage.innerHTML = departmentErrors;  
  vacancySelectMessage.innerHTML = vacancyErrors;
};

//**************THIRD STEP**********************************/

function editCLickHandler(event) {
  event.preventDefault();
  //скрываю третий блок, отображаю первую форму
  resultDiv.classList.toggle("hidden");
  firstForm.classList.toggle("hidden");
}

function sendClickHandler(event) {
  event.preventDefault();
  const userData = {
    firstName:  firstName.value,
    lastName: lastName.value ,
    login:  login.value,
    email:  email.value,
    company: company.value,
    departmentSelec:  departmentSelect.value,
    vacancySelect:  vacancySelect.value
  };
  //сохраняю данные в localStorage
  localStorage.setItem("userData", JSON.stringify(userData));
  //очищаю форму
  firstName.value = lastName.value = login.value = email.value = company.value = departmentSelect.value = vacancySelect.value = undefined;
  //скрываю третий блок, отображаю thankYouMessage
  resultDiv.classList.toggle("hidden");
  thankYouMessage.classList.toggle("hidden");  
}

departmentSelect.addEventListener("change", addVacancyOptions);
addDepartmentOptions();
