const fullName = document.getElementById('fullname');
const fullNameError = document.getElementById('fullname-error');
const email = document.getElementById('email');
const emailError = document.getElementById('email-error');
const phoneNumber = document.getElementById('phone');
const phoneNumberError = document.getElementById('phone-error');
const address = document.getElementById('address');
const addressError = document.getElementById('address-error');
const city = document.getElementById('city');
const cityError = document.getElementById('city-error');
const province = document.getElementById('province');
const provinceError = document.getElementById('province-error');
const country = document.getElementById('country');
const countryError = document.getElementById('country-error');
const zipCode = document.getElementById('zip');
const zipCodeError = document.getElementById('zip-error');
const contactFullName = document.getElementById('contactFullName');
const contactFullNameError = document.getElementById('contactFullName-error');
const contactPhone = document.getElementById('contactPhone');
const contactPhoneError = document.getElementById('contactPhone-error');
const saveButton = document.getElementById('button-green');
const modalOk = document.getElementById('modal-ok');
const modalOkConfirm = document.getElementById('modal-ok-confirm');
const params = new URLSearchParams(window.location.search);
let errorList = [];

modalOkConfirm.addEventListener('click', () => {
  modalOk.classList.toggle('hide');
  window.location.href = `${window.location.origin}/api/views/companies/listCompanies.html`;
});

// Modal that shows success message
const openOkModal = (response) => {
  modalOk.classList.remove('hide');
  const modalOkTitle = document.getElementById('modal-ok-title');
  modalOkTitle.textContent = response.msg;
  const modalOkData = document.getElementById('modal-ok-data');
  modalOkData.textContent = `Name: ${response.Company.name}. Email: ${response.Company.email}. address: ${response.Company.address}.`;
};

const addCompany = (companies) => {
  fetch(`${window.location.origin}/api/companies`, {
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
  fetch(`${window.location.origin}/api/companies/${params.get('_id')}`, {
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
    name: fullName.value,
    email: email.value,
    phone: parseInt(phoneNumber.value, 10),
    address: address.value,
    city: city.value,
    province: province.value,
    country: country.value,
    zipCode: parseInt(zipCode.value, 10),
    contactFullName: contactFullName.value,
    contactPhone: parseInt(contactPhone.value, 10),
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

  if (zipCode.value !== undefined) {
    if (!(zipCode.value.length >= 1 && zipCode.value.length <= 5)) {
      errorList.push('Zip code must be between 5 and 5 characters');
      zipCode.classList.add('input-error');
      zipCodeError.classList.remove('hide');
      zipCodeError.textContent = '*Zip code must be between 1 and 5 characters.';
    }
  }

  if (address.value !== undefined) {
    if (!(address.value.length >= 2 && address.value.length <= 40)) {
      errorList.push('address must be between 2 and 40 characters');
      address.classList.add('input-error');
      addressError.classList.remove('hide');
      addressError.textContent = 'address must be between 2 and 40 characters.';
    }
  }

  if (phoneNumber.value !== undefined) {
    if (!(phoneNumber.value.length >= 8 && phoneNumber.value.length <= 9)) {
      errorList.push('Phone number  must be between 8 and 9 characters');
      phoneNumber.classList.add('input-error');
      phoneNumberError.classList.remove('hide');
      phoneNumberError.textContent = '*Phone number must be between 8 and 9 characters.';
    }
  }

  if (city.value !== undefined) {
    if (!(city.value.length >= 2 && city.value.length <= 40)) {
      errorList.push('city must be between 2 and 40 characters');
      city.classList.add('input-error');
      cityError.classList.remove('hide');
      cityError.textContent = '*city must be between 2 and 40 characters.';
    }
  }

  if (province.value !== undefined) {
    if (!(province.value.length >= 2 && province.value.length <= 40)) {
      errorList.push('province must be between 2 and 40 characters');
      province.classList.add('input-error');
      provinceError.classList.remove('hide');
      provinceError.textContent = '*province must be between 2 and 40 characters.';
    }
  }

  if (country.value !== undefined) {
    if (!(country.value.length >= 2 && country.value.length <= 40)) {
      errorList.push('country must be between 2 and 40 characters');
      country.classList.add('input-error');
      countryError.classList.remove('hide');
      countryError.textContent = '*country must be between 2 and 40 characters.';
    }
  }

  if (contactFullName.value !== undefined) {
    if (!(contactFullName.value.length >= 2 && contactFullName.value.length <= 40)) {
      errorList.push('contact name must be between 2 and 40 characters');
      contactFullName.classList.add('input-error');
      contactFullNameError.classList.remove('hide');
      contactFullNameError.textContent = '*contact name must be between 2 and 40 characters.';
    }
  }
  if (contactPhone.value !== undefined) {
    if (!(contactPhone.value.length >= 8 && contactPhone.value.length <= 9)) {
      errorList.push('contact phone must be between 8 and 9 characters');
      contactPhone.classList.add('input-error');
      contactPhoneError.classList.remove('hide');
      contactPhoneError.textContent = '*contact phone must be between 8 and 9 characters.';
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
  fetch(`${window.location.origin}/api/companies/${params.get('_id')}`)
    .then((response) => response.json())
    .then((response) => {
      fullName.value = response.name || '';
      address.value = response.address || '';
      email.value = response.email || '';
      phoneNumber.value = response.phone || '';
      city.value = response.city || '';
      zipCode.value = response.zipCode || '';
      province.value = response.province || '';
      country.value = response.country || '';
      contactFullName.value = response.contactFullName || '';
      contactPhone.value = response.contactPhone || '';
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
