const psychologistSelect = document.getElementById('psychologist');
const candidateSelect = document.getElementById('candidate');
const dateInput = document.getElementById('date');
const dateErrorMsg = document.getElementById('date-error-msg');
const saveButton = document.getElementById('button-green');
const modalOk = document.getElementById('modal-ok');
const modalOkConfirm = document.getElementById('modal-ok-confirm');
const params = new URLSearchParams(window.location.search);
let errorList = [];

modalOkConfirm.addEventListener('click', () => {
  modalOk.classList.toggle('hide');
  window.location.href = `${window.location.origin}/api/views/sessions/listSessions.html`;
});

dateInput.addEventListener('blur', () => {
  if (dateInput.value === '') {
    dateInput.classList.add('input-error');
    dateErrorMsg.classList.remove('hide');
  }
});

dateInput.addEventListener('focus', () => {
  dateInput.classList.remove('input-error');
  dateErrorMsg.classList.add('hide');
});

const getPsychologists = () => {
  fetch(`${window.location.origin}/api/psychologists`)
    .then((response) => response.json())
    .then((response) => {
      response.psychologists.forEach((psychologist) => {
        const option = document.createElement('option');
        option.innerText = `${psychologist.firstName} ${psychologist.lastName}`;
        option.value = psychologist._id;
        psychologistSelect.append(option);
      });
    });
};

const getCandidates = () => {
  fetch(`${window.location.origin}/api/candidates`)
    .then((response) => response.json())
    .then((response) => {
      response.candidates.forEach((candidate) => {
        const option = document.createElement('option');
        option.innerText = `${candidate.firstName} ${candidate.lastName}`;
        option.value = candidate._id;
        candidateSelect.append(option);
      });
    });
};

const openOkModal = (response, mode) => {
  modalOk.classList.remove('hide');
  const modalOkTitle = document.getElementById('modal-ok-title');
  modalOkTitle.textContent = response.msg;
  const modalOkData = document.getElementById('modal-ok-data');
  if (mode === 'edit') {
    modalOkData.textContent = `Psychologist: ${response.data.idPsychologists.firstName} ${response.data.idPsychologists.lastName}.
    Candidate: ${response.data.idCandidate.firstName} ${response.data.idCandidate.lastName}.
    Date: ${response.data.date.split('T')[0]}.`;
  }
};

const addSession = (data) => {
  fetch(
    `${window.location.origin}/api/sessions`,
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
      openOkModal(response, 'add');
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateSession = (data) => {
  fetch(
    `${window.location.origin}/api/sessions/${params.get('_id')}`,
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
      openOkModal(response, 'edit');
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

const getSession = () => {
  fetch(`${window.location.origin}/api/sessions/${params.get('_id')}`)
    .then((response) => response.json())
    .then((response) => {
      psychologistSelect.value = response.data.idPsychologists._id;
      psychologistSelect.text = `${response.data.idPsychologists.firstName} ${response.data.idPsychologists.lastName}`;
      candidateSelect.value = response.data.idCandidate._id;
      candidateSelect.text = `${response.data.idCandidate.firstName} ${response.data.idCandidate.lastName}`;
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
