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
  window.location.href = `${window.location.origin}/api/views/sessions/listSessions.html`;
});

const getPsychologists = () => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/psychologists')
    .then((response) => response.json())
    .then((response) => {
      psychologistsArray = response.psychologists;
      response.psychologists.forEach((psychologist) => {
        const option = document.createElement('option');
        option.innerText = `${psychologist.firstName} ${psychologist.lastName}`;
        option.value = psychologist._id;
        psychologistSelect.append(option);
      });
    });
};

const getCandidates = () => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/candidates')
    .then((response) => response.json())
    .then((response) => {
      candidatesArray = response.candidates;
      response.candidates.forEach((candidate) => {
        const option = document.createElement('option');
        option.innerText = `${candidate.firstName} ${candidate.lastName}`;
        option.value = candidate._id;
        candidateSelect.append(option);
      });
    });
};

const openOkModal = (response) => {
  modalOk.classList.remove('hide');
  const modalOkTitle = document.getElementById('modal-ok-title');
  modalOkTitle.textContent = response.msg;
  const modalOkData = document.getElementById('modal-ok-data');
  modalOkData.textContent = `Psychologist: ${response.data.idPsychologists}. Candidate: ${response.data.idCandidate}. Date: ${response.data.date}.`;
};

const addSession = (data) => {
  fetch(
    'https://basd-2021-david-mindset-dev.herokuapp.com/api/sessions',
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

const updateSession = (data) => {
  fetch(
    `https://basd-2021-david-mindset-dev.herokuapp.com/api/sessions/${params.get('_id')}`,
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

const saveSession = () => {
  const data = {
    idPsychologists: psychologistSelect.value,
    idCandidate: candidateSelect.value,
    date: dateInput.value,
  };
  if (params.get('_id')) {
    updateSession(data);
  } else {
    addSession(data);
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
