const nameProfile = document.getElementById('name');
const nameProfileError = document.getElementById('name-error');
const saveButton = document.getElementById('button-green');
const modalOk = document.getElementById('modal-ok');
const modalOkConfirm = document.getElementById('modal-ok-confirm');
const params = new URLSearchParams(window.location.search);
let errorList = [];

modalOkConfirm.addEventListener('click', () => {
  modalOk.classList.toggle('hide');
  window.location.href = `${window.location.origin}/api/views/profile-types/listProfileTypes.html`;
});

// Modal that shows success message
const openOkModal = (response) => {
  modalOk.classList.remove('hide');
  const modalOkTitle = document.getElementById('modal-ok-title');
  modalOkTitle.textContent = response.msg;
  const modalOkData = document.getElementById('modal-ok-data');
  modalOkData.textContent = `Name: ${response.name}.`;
};

const addProfile = (profile) => {
  fetch(`${window.location.origin}/api/profile-types`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  })
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateProfile = (profile) => {
  fetch(`${window.location.origin}/api/profile-types/${params.get('_id')}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
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
const saveProfile = () => {
  const profileTypes = {
    name: nameProfile.value,
  };
  if (params.get('_id')) {
    updateProfile(profileTypes);
  } else {
    addProfile(profileTypes);
  }
};

// Validations
const validateLength = () => {
  if (nameProfile.value !== undefined) {
    if (!(nameProfile.value.length >= 3 && nameProfile.value.length <= 50)) {
      errorList.push('Name must be between 2 and 30 characters');
      nameProfile.classList.add('input-error');
      nameProfileError.classList.remove('hide');
      nameProfileError.textContent = '*Name must be between 2 and 30 characters.';
    }
  }
};

const numbers = /^[0-9]*$/;

const validateFormat = () => {
  if (nameProfile.value !== undefined) {
    if (nameProfile.value.match(numbers)) {
      errorList.push('Only letters, please');
      nameProfile.classList.add('input-error');
      nameProfileError.classList.remove('hide');
      nameProfileError.textContent = '*Only letters, please.';
    }
  }
};

// Search profiles so that when I edit, it shows me the data of the profiles
const getProfile = () => {
  fetch(`${window.location.origin}/api/profile-types/${params.get('_id')}`)
    .then((response) => response.json())
    .then((response) => {
      nameProfile.value = response.data.name;
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = () => {
  if (params.get('_id')) {
    getProfile();
    const title = document.getElementById('title');
    title.innerText = 'Edit Profile';
    saveButton.value = 'UPDATE';
  }
};

// Pass all validations then save the profile
saveButton.addEventListener('click', () => {
  errorList = [];
  validateLength();
  validateFormat();
  if (errorList.length === 0) {
    saveProfile();
  }
});
