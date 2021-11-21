const fullName = document.getElementById('fullname');
const fullNameError = document.getElementById('first-name-error');
const email = document.getElementById('email');
const emailError = document.getElementById('email-error');
const phoneNumber = document.getElementById('phone');
const phoneNumberError = document.getElementById('phone-error');
const address = document.getElementById('address');
const addressError = document.getElementById('address-error');
const city = document.getElementById('city');
const cityError = document.getElementById('city-error');
const zipCode = document.getElementById('zip');
const zipCodeError = document.getElementById('zip-error');
const saveButton = document.getElementById('button-green');
const modalOk = document.getElementById('modal-ok');
const modalOkConfirm = document.getElementById('modal-ok-confirm');
const params = new URLSearchParams(window.location.search);
let errorList = [];

modalOkConfirm.addEventListener('click', () => {
  modalOk.classList.toggle('hide');
  window.location.href = `${window.location.origin}/public/views/companies/listCompanies.html`;
});

// Modal that shows success message
const openOkModal = (response) => {
  modalOk.classList.remove('hide');
  const modalOkTitle = document.getElementById('modal-ok-title');
  modalOkTitle.textContent = response.message;
  const modalOkData = document.getElementById('modal-ok-data');
  modalOkData.textContent = `Name: ${response.Company.name}. Email: ${response.Company.email}. address: ${response.Company.address}.`;
};

const addCompany = (companies) => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/companies', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(companies),
  })
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateCompany = (companies) => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/companies/${params.get('_id')}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(companies),
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
const saveCompany = () => {
  const companies = {
    name: 'dsadasdsa',
    email: 'dsdasdsa@das.com',
    phone: 123456789,
    address: 'dasdasdas',
    city: 'dadasdsa',
    province: 'fsdfsdfsd',
    country: 'fsdfsdfsd',
    zipCode: 12345678,
    contactFullName: 'fsdfsdfsd',
    contactPhone: 123456789,
  };
  if (params.get('_id')) {
    updateCompany(companies);
  } else {
    addCompany(companies);
  }
};

// Validations
const validateLength = () => {
  if (fullName.value !== undefined) {
    if (!(fullName.value.length >= 2 && fullName.value.length <= 40)) {
      errorList.push('First Name must be between 2 and 40 characters');
      fullName.classList.add('input-error');
      fullNameError.classList.remove('hide');
      fullNameError.textContent = '*First Name must be between 2 and 40 characters.';
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
const getCompany = () => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/companies/${params.get('_id')}`)
    .then((response) => response.json())
    .then((response) => {
      fullName.value = response.name || '';
      address.value = response.address || '';
      email.value = response.email || '';
      phoneNumber.value = response.phone || '';
      city.value = response.city || '';
      zipCode.value = response.zip || '';
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = () => {
  if (params.get('_id')) {
    getCompany();
    const title = document.getElementById('title');
    title.innerText = 'Edit Company';
    saveButton.value = 'UPDATE';
  }
};

// If there are no errors, save the psychologist
saveButton.addEventListener('click', () => {
  errorList = [];
  validateLength();
  validateFormat();
  if (errorList.length === 0) {
    saveCompany();
  }
});
