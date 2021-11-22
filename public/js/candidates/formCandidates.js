const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const candidatePhone = document.getElementById('phone');
const candidateEmail = document.getElementById('email');
const candidateCity = document.getElementById('city');
const candidateProvince = document.getElementById('province');
const candidateCountry = document.getElementById('country');
const candidatePostalCode = document.getElementById('postal');
const candidateAddress = document.getElementById('address');
const candidateBirthday = document.getElementById('birthday');
const candidatePassword = document.getElementById('password');
const candidatePasswordError = document.getElementById('password-error');
const candidateEmailError = document.getElementById('email-error');
const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const candidatePhoneError = document.getElementById('phone-error');
const candidateCityError = document.getElementById('city-error');
const candidateProvinceError = document.getElementById('province-error');
const candidateCountryError = document.getElementById('country-error');
const candidatePostalCodeError = document.getElementById('postal-error');
const candidateBirthdayError = document.getElementById('birthday-error');
const saveButton = document.getElementById('button-green');
const modalOk = document.getElementById('modal-ok');
const modalOkConfirm = document.getElementById('modal-ok-confirm');
const params = new URLSearchParams(window.location.search);
const errorList = [];

modalOkConfirm.addEventListener('click', () => {
  modalOk.classList.toggle('hide');
  window.location.href = `${window.location.origin}/mindset-2021/public/views/candidates/listCandidates.html`;
});
const openOkModal = (response) => {
  modalOk.classList.remove('hide');
  const modalOkTitle = document.getElementById('modal-ok-title');
  modalOkTitle.textContent = response.msg;
  const modalOkData = document.getElementById('modal-ok-data');
  modalOkData.textContent = `First name: ${response.newCandidate.firstName}. Last name: ${response.newCandidate.lastName}. Email: ${response.newCandidate.email}. Country: ${response.newCandidate.country}. Province: ${response.newCandidate.province}. City: ${response.newCandidate.city}. Postal code: ${response.newCandidate.postalCode}. Address: ${response.newCandidate.address}. Birthday: ${response.newCandidate.birthday}. Phone: ${response.newCandidate.phone}. Password: ${response.newCandidate.password}.`;
};

const getCandidates = () => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/candidates/${params.get('_id')}`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      firstName.value = response.data.firstName;
      lastName.value = response.data.lastName;
      candidateEmail.value = response.data.email;
      candidatePassword.value = response.data.password;
      candidateProvince.value = response.data.province;
      candidateCity.value = response.data.city;
      candidateCountry.value = response.data.country;
      candidatePostalCode.value = response.data.postalCode;
      candidateAddress.value = `${response.data.address.street}  ${response.data.address.number}`;
      candidateBirthday.value = response.data.birthday;
      candidatePhone.value = response.data.phone;
    })
    .catch((err) => {
      console.log(err);
    });
};

const addCandidates = (data) => {
  fetch(
    'https://basd-2021-david-mindset-dev.herokuapp.com/api/candidates',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateCandidates = (data) => {
  fetch(
    `https://basd-2021-david-mindset-dev.herokuapp.com/api/candidates/${params.get('_id')}`,
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const saveCandidates = () => {
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: candidateEmail.value,
    password: candidatePassword.value,
    province: candidateProvince.value,
    city: candidateCity.value,
    country: candidateCountry.value,
    postalCode: candidatePostalCode.value,
    birthday: candidateBirthday.value,
    phone: parseInt(candidatePhone.value, 10),
  };
  if (params.get('_id')) {
    updateCandidates(data);
  } else {
    addCandidates(data);
  }
};

const validateLength = () => {
  if (firstName.value !== undefined) {
    if (!(firstName.value.length >= 2 && firstName.value.length <= 40)) {
      errorList.push('First Name must be between 2 and 40 characters');
      firstName.classList.add('input-error');
      firstNameError.classList.remove('hide');
      firstNameError.textContent = 'First Name must be between 2 and 40 characters.';
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
  if (candidateEmail.value !== undefined) {
    if (!(candidateEmail.value.length >= 5 && candidateEmail.value.length <= 50)) {
      errorList.push('Email must be between 5 and 50 characters');
      candidateEmail.classList.add('input-error');
      candidateEmailError.classList.remove('hide');
      candidateEmailError.textContent = '*Email must be between 5 and 50 characters.';
    }
  }
  if (candidatePassword.value !== undefined) {
    if (!(candidatePassword.value.length >= 8 && candidatePassword.value.length <= 16)) {
      errorList.push('Password must be between 8 and 16 characters');
      candidatePassword.classList.add('input-error');
      candidatePasswordError.classList.remove('hide');
      candidatePasswordError.textContent = '*Password must be between 8 and 16 characters.';
    }
  }
  if (candidatePhone.value !== undefined) {
    if (!(candidatePhone.value.length >= 8 && candidatePhone.value.length <= 9)) {
      errorList.push('Phone number  must be between 8 and 9 characters');
      candidatePhone.classList.add('input-error');
      candidatePhoneError.classList.remove('hide');
      candidatePhoneError.textContent = '*Phone number must be between 8 and 9 characters.';
    }
  }

  if (candidateCity.value !== undefined) {
    if (!(candidateCity.value.length >= 2 && candidateCity.value.length <= 40)) {
      errorList.push('city must be between 2 and 40 characters');
      candidateCity.classList.add('input-error');
      candidateCityError.classList.remove('hide');
      candidateCityError.textContent = '*city must be between 2 and 40 characters.';
    }
  }

  if (candidateProvince.value !== undefined) {
    if (!(candidateProvince.value.length >= 2 && candidateProvince.value.length <= 40)) {
      errorList.push('province must be between 2 and 40 characters');
      candidateProvince.classList.add('input-error');
      candidateProvinceError.classList.remove('hide');
      candidateProvinceError.textContent = '*province must be between 2 and 40 characters.';
    }
  }

  if (candidateCountry.value !== undefined) {
    if (!(candidateCountry.value.length >= 2 && candidateCountry.value.length <= 40)) {
      errorList.push('country must be between 2 and 40 characters');
      candidateCountry.classList.add('input-error');
      candidateCountryError.classList.remove('hide');
      candidateCountryError.textContent = '*country must be between 2 and 40 characters.';
    }
  }
  if (candidatePostalCode.value !== undefined) {
    if (!(candidatePostalCode.value.length >= 1 && candidatePostalCode.value.length <= 5)) {
      errorList.push('Postal code must be between 5 and 5 characters');
      candidatePostalCode.classList.add('input-error');
      candidatePostalCodeError.classList.remove('hide');
      candidatePostalCodeError.textContent = '*Postal code must be between 1 and 5 characters.';
    }
  }
  if (candidateBirthday.value !== undefined) {
    if (!(candidateBirthday.value.length >= 10 && candidateBirthday.value.length <= 10)) {
      errorList.push('Birthday must be between 5 and 5 characters');
      candidateBirthday.classList.add('input-error');
      candidateBirthdayError.classList.remove('hide');
      candidateBirthdayError.textContent = '*Birthday must be 10 characters.';
    }
  }
};

const validateEmailFormat = () => {
  if (candidateEmail.value !== undefined) {
    if (!(candidateEmail.value.split('').indexOf('@') !== -1 && candidateEmail.value.split('').indexOf('.') !== -1)) {
      errorList.push('Email must be an email format');
      candidateEmail.classList.add('input-error');
      candidateEmailError.classList.remove('hide');
      candidateEmailError.textContent = '*Email must be an email format.';
    }
  }
};

const isNotEmpty = () => {
  if (firstName.value === '') {
    errorList.push('First name is required');
  }
  if (lastName.value === '') {
    errorList.push('Last name is required');
  }
  if (candidatePhone.value === '') {
    errorList.push('Phone is required');
  }
  if (candidateEmail.value === '') {
    errorList.push('Email is required');
  }
  if (candidateCity.value === '') {
    errorList.push('City is required');
  }
  if (candidateProvince.value === '') {
    errorList.push('Province is required');
  }
  if (candidateCountry.value === '') {
    errorList.push('Country is required');
  }
  if (candidatePostalCode.value === '') {
    errorList.push('Postal code is required');
  }
  if (candidateAddress.value === '') {
    errorList.push('Address is required');
  }
  if (candidateBirthday.value === '') {
    errorList.push('Birthday is required');
  }
  if (candidatePassword.value === '') {
    errorList.push('Password is required');
  }
};

window.onload = () => {
  if (params.get('_id')) {
    getCandidates();
    saveButton.value = 'UPDATE';
  }
};
saveButton.addEventListener('click', () => {
  validateLength();
  validateEmailFormat();
  isNotEmpty();
  if (errorList.length === 0) {
    saveCandidates();
  }
});
