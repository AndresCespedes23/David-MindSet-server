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

window.onload = () => {
  if (params.get('_id')) {
    getCandidates();
    saveButton.value = 'UPDATE';
  }
};
saveButton.addEventListener('click', () => {

});
