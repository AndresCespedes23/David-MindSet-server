/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const candidateSelect = document.getElementById('candidate');
const openPositionSelect = document.getElementById('open-position');
const isActiveInput = document.getElementById('is-active');
const isActiveLiElement = document.getElementById('is-active-entry');
const saveButton = document.getElementById('save-button');
const modalOk = document.getElementById('modal-ok');
const modalOkConfirm = document.getElementById('modal-ok-confirm');
const modalOkTitle = document.getElementById('modal-ok-title');
const modalOkData = document.getElementById('modal-ok-data');
const params = new URLSearchParams(window.location.search);

modalOkConfirm.addEventListener('click', () => {
  modalOk.classList.toggle('modal-hide'); // 2 - de verdadero a falso
  window.location.href = `http://localhost:8000/api/views/applications/list-applications.html` /* 'https://basd-2021-david-mindset-dev.herokuapp.com/api/views/applications/list-applications.html' */;
});

// popula el dropdown de candidates
const getCandidates = () => {
  fetch(
    `http://localhost:8000/api/candidates` /* 'https://basd-2021-david-mindset-dev.herokuapp.com/api/candidates' */
  )
    .then((response) => response.json())
    .then((response) => {
      response.candidates.forEach((candidates) => {
        const option = document.createElement('option');
        option.innerText = `${candidates.firstName} ${candidates.lastName}`;
        option.value = candidates._id;
        candidateSelect.append(option);
      });
    });
};

// popula el dropdown de open positions
const getOpenPositions = () => {
  fetch(
    `http://localhost:8000/api/open-positions` /* 'https://basd-2021-david-mindset-dev.herokuapp.com/api/open-positions' */
  )
    .then((response) => response.json())
    .then((response) => {
      response.data.forEach((openPosition) => {
        const option = document.createElement('option');
        option.innerText = `${openPosition.jobDescription}`;
        option.value = openPosition._id;
        openPositionSelect.append(option);
      });
    });
};

const openOkModal = (response) => {
  modalOk.classList.toggle('modal-hide'); // 1 - de falso a verdadero
  modalOkTitle.textContent = response.msg;
  modalOkData.textContent = `Candidate: ${response.application.idCandidate}. Open position: ${response.application.idOpenPosition}.`;
};

const addApplication = (data) => {
  fetch(
    `http://localhost:8000/api/applications` /* 'https://basd-2021-david-mindset-dev.herokuapp.com/api/applications' */,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateApplication = (data) => {
  fetch(
    `http://localhost:8000/api/applications/${params.get(
      'id'
    )}` /* `https://basd-2021-david-mindset-dev.herokuapp.com/api/applications/${params.get('id')}` */,
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const saveApplication = () => {
  const data = {
    idCandidate: candidateSelect.value,
    idOpenPosition: openPositionSelect.value,
  };
  if (!params.get('id')) return addApplication(data);
  data.isActive = isActiveInput.checked;
  return updateApplication(data);
};

// popula los inputs en caso de edit
const getApplication = () => {
  fetch(
    `http://localhost:8000/api/applications/${params.get(
      'id'
    )}` /* `https://basd-2021-david-mindset-dev.herokuapp.com/api/applications/${params.get('id')}` */
  )
    .then((response) => response.json())
    .then((response) => {
      candidateSelect.value = response.application.idCandidate._id;
      openPositionSelect.value = response.application.idOpenPosition._id;
      isActiveInput.checked = response.application.isActive;
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = () => {
  getOpenPositions();
  getCandidates();
  if (params.get('id')) {
    isActiveLiElement.classList.remove('modal-hide');
    const title = document.getElementById('title');
    title.innerText = 'Edit application';
    saveButton.value = 'UPDATE';
    getApplication();
  }
};

saveButton.addEventListener('click', saveApplication);
