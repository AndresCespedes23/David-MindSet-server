/* eslint-disable no-underscore-dangle */
const firstName = document.getElementById('first-name');
const firstNameError = document.getElementById('first-name-error');
const lastName = document.getElementById('last-name');
const lastNameError = document.getElementById('last-name-error');
const email = document.getElementById('email');
const emailError = document.getElementById('email-error');
const password = document.getElementById('password');
const passwordError = document.getElementById('password-error');
const pictureUrl = document.getElementById('picture');
const turns = document.getElementById('turns');
const saveButton = document.getElementById('button-green');
const modalOk = document.getElementById('modal-ok');
const modalOkConfirm = document.getElementById('modal-ok-confirm');
const params = new URLSearchParams(window.location.search);
let errorList = [];

modalOkConfirm.addEventListener('click', () => {
  modalOk.classList.toggle('hide');
  window.location.href = `${window.location.origin}/api/views/psychologists/listPsychologists.html`;
});

// Modal that shows success message
const openOkModal = (response) => {
  modalOk.classList.remove('hide');
  const modalOkTitle = document.getElementById('modal-ok-title');
  modalOkTitle.textContent = response.msg;
  const modalOkData = document.getElementById('modal-ok-data');
  modalOkData.textContent = `First Name: ${response.psychologist.firstName}. Last Name: ${response.psychologist.lastName}. Email: ${response.psychologist.email}. Password: ${response.psychologist.password}. Picture: ${response.psychologist.pictureUrl}. Turns: ${response.psychologist.turns || ' '}.`;
};

const addPsychologist = (psychologists) => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/psychologists', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(psychologists),
  })
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updatePsychologist = (psychologists) => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/psychologists/${params.get('_id')}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(psychologists),
  })
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Function that creates an object with the formulary data and decides between add or edit
const savePsychologist = () => {
  const psychologists = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    picture: pictureUrl.value,
    turns: turns.value || [],
  };
  if (params.get('_id')) {
    updatePsychologist(psychologists);
  } else {
    addPsychologist(psychologists);
  }
};

// Validations
const validateLength = () => {
  if (firstName.value !== undefined) {
    if (!(firstName.value.length >= 2 && firstName.value.length <= 40)) {
      errorList.push('First Name must be between 2 and 40 characters');
      firstName.classList.add('input-error');
      firstNameError.classList.remove('hide');
      firstNameError.textContent = '*First Name must be between 2 and 40 characters.';
    }
  }
  if (lastName.value !== undefined) {
    if (!(lastName.value.length >= 2 && lastName.value.length <= 40)) {
      errorList.push('Last Name must be between 2 and 40 characters');
      lastName.classList.add('input-error');
      lastNameError.classList.remove('hide');
      lastNameError.textContent = '*Last Name must be between 2 and 40 characters.';
    }
  }
  if (email.value !== undefined) {
    if (!(email.value.length >= 5 && email.value.length <= 50)) {
      errorList.push('Email must be between 5 and 50 characters');
      email.classList.add('input-error');
      emailError.classList.remove('hide');
      emailError.textContent = '*Email must be between 5 and 50 characters.';
    }
  }
  if (password.value !== undefined) {
    if (!(password.value.length >= 8 && password.value.length <= 16)) {
      errorList.push('Password must be between 8 and 16 characters');
      password.classList.add('input-error');
      passwordError.classList.remove('hide');
      passwordError.textContent = '*Password must be between 8 and 16 characters.';
    }
  }
};

const validateFormat = () => {
  if (email.value !== undefined) {
    if (!(email.value.split('').indexOf('@') !== -1 && email.value.split('').indexOf('.') !== -1)) {
      errorList.push('Email must be an email format');
      email.classList.add('input-error');
      emailError.classList.remove('hide');
      emailError.textContent = '*Email must be an email format.';
    }
  }
};

// Search psychologist so that when I edit, it shows me the data of the psychologist
const getPsychologist = () => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/psychologists/${params.get('_id')}`)
    .then((response) => response.json())
    .then((response) => {
      firstName.value = response.psychologist.firstName;
      lastName.value = response.psychologist.lastName;
      email.value = response.psychologist.email;
      password.value = response.psychologist.password;
      pictureUrl.value = response.psychologist.pictureUrl;
      turns.value = response.psychologist.turns;
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = () => {
  if (params.get('_id')) {
    getPsychologist();
    const title = document.getElementById('title');
    title.innerText = 'Edit Psychologist';
    saveButton.value = 'UPDATE';
  }
};

// If there are no errors, save the psychologist
saveButton.addEventListener('click', () => {
  errorList = [];
  validateLength();
  validateFormat();
  if (errorList.length === 0) {
    savePsychologist();
  }
});
