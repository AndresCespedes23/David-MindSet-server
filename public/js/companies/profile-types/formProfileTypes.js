const psychologistSelect = document.getElementById('psychologist');
const candidateSelect = document.getElementById('candidate');
const dateInput = document.getElementById('date');
const dateErrorMsg = document.getElementById('date-error-msg');
const saveButton = document.getElementById('button-green');
const modalOk = document.getElementById('modal-ok');
const modalOkConfirm = document.getElementById('modal-ok-confirm');
const params = new URLSearchParams(window.location.search);
let errorList = [];
let psychologistsArray = [];
let candidatesArray = [];

modalOkConfirm.addEventListener('click', () => {
  modalOk.classList.toggle('hide');
  window.location.href = `${window.location.origin}/api/views/sessions/listProfileTypes.html`;
});

const getProfiles = () => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/profile-types')
    .then((response) => response.json())
    .then((response) => {
      profilesArray = response.profiles;
      response.forEach((profiles) => {
        const option = document.createElement('option');
        option.innerText = `${profiles.name}`;
        option.value = profiles._id;
        psychologistSelect.append(option);
      });
    });
};

const openOkModal = (response) => {
  modalOk.classList.remove('hide');
  const modalOkTitle = document.getElementById('modal-ok-title');
  modalOkTitle.textContent = response.msg;
  const modalOkData = document.getElementById('modal-ok-data');
  modalOkData.textContent = `Psychologist: ${response.name}.`;
};

const addProfile = (data) => {
  fetch(
    'https://basd-2021-david-mindset-dev.herokuapp.com/api/profile-types',
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

const updateProfile = () => {
  fetch(
    `https://basd-2021-david-mindset-dev.herokuapp.com/api/profile-types/${params.get('_id')}`,
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
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

const saveProfile = () => {
  const data = {
    name: psychologistSelect.value,
  };
  if (params.get('_id')) {
    updateProfile(data);
  } else {
    addProfile(data);
  }
};

const isNotEmpty = () => {
  if (psychologistSelect.value === '') {
    errorList.push('Psychologist is required');
  }
  if (candidateSelect.value === '') {
    errorList.push('Candidate is required');
  }
  if (dateInput.value === '') {
    errorList.push('Date is required');
    dateInput.classList.add('input-error');
    dateErrorMsg.classList.remove('hide');
  } else {
    dateInput.classList.remove('input-error');
    dateErrorMsg.classList.add('hide');
  }
};

const getPsychologistName = (id) => {
  const psychologist = psychologistsArray.find((element) => element._id === id);
  return `${psychologist.firstName} ${psychologist.lastName}`;
};

const getCandidateName = (id) => {
  const candidate = candidatesArray.find((element) => element._id === id);
  return `${candidate.firstName} ${candidate.lastName}`;
};

const getSession = () => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/sessions/${params.get('_id')}`)
    .then((response) => response.json())
    .then((response) => {
      psychologistSelect.value = response.data.idPsychologists;
      // Missing Populate
      psychologistSelect.text = getPsychologistName(response.data.idPsychologists);
      candidateSelect.value = response.data.idCandidate;
      // Missing Populate
      candidateSelect.text = getCandidateName(response.data.idCandidate);
      dateInput.value = response.data.date.split('T')[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = () => {
  getPsychologists();
  getCandidates();
  if (params.get('_id')) {
    const title = document.getElementById('title');
    title.innerText = 'Edit Session';
    saveButton.value = 'UPDATE';
    getSession();
  }
};

saveButton.addEventListener('click', () => {
  errorList = [];
  isNotEmpty();
  if (errorList.length === 0) {
    return saveSession();
  }
});
