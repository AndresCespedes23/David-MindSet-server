/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const candidateSelect = document.getElementById('candidate');
const openPositionSelect = document.getElementById('open-position');
const isActiveInput = document.getElementById('is-active');
const isActiveLiElement = document.getElementById('is-active-entry');
const saveButton = document.getElementById('save-button');
const modalData = document.getElementById('modal-data');
const modalOkConfirm = document.getElementById('modal-ok-confirm');
const modalDataTitle = document.getElementById('modal-data-title');
const modalDataContent = document.getElementById('modal-data-content');
const params = new URLSearchParams(window.location.search);

modalOkConfirm.addEventListener('click', () => {
  modalData.classList.toggle('modal-hide'); // 2) 0 -> 1 (oculta)
  window.location.href = `http://localhost:8000/api/views/applications/list-applications.html` /* 'https://basd-2021-david-mindset-dev.herokuapp.com/api/views/applications/list-applications.html' */;
});

const errorHandler = (response) => {
  // las responses del controller tienen que devolver -> { err }
  modalData.classList.toggle('modal-hide'); // 1a) 1 -> 0 (muestra)
  modalDataTitle.textContent = 'Error';
  modalDataContent.textContent = response;
  throw new Error(response);
};

// popula el dropdown de candidates
const getCandidates = () => {
  fetch(
    `http://localhost:8000/api/candidates` /* 'https://basd-2021-david-mindset-dev.herokuapp.com/api/candidates' */,
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.msg) errorHandler(response.msg);
      response.candidates.forEach((candidates) => {
        const option = document.createElement('option');
        option.innerText = `${candidates.firstName} ${candidates.lastName}`;
        option.value = candidates._id;
        candidateSelect.append(option);
      });
    })
    .catch((err) => console.log(err));
};

// popula el dropdown de open positions
const getOpenPositions = () => {
  fetch(
    `http://localhost:8000/api/open-positions` /* 'https://basd-2021-david-mindset-dev.herokuapp.com/api/open-positions' */,
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.msg) errorHandler(response.msg);
      response.data.forEach((openPosition) => {
        const option = document.createElement('option');
        option.innerText = `${openPosition.jobDescription}`;
        option.value = openPosition._id;
        openPositionSelect.append(option);
      });
    })
    .catch((err) => console.log(err));
};

const openOkModal = (response) => {
  modalData.classList.toggle('modal-hide'); // 1b) 1 -> 0 (muestra)
  modalDataTitle.textContent = response.success;
  modalDataContent.textContent = `Candidate: ${response.application.idCandidate}. Open position: ${response.application.idOpenPosition}.`;
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
    },
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.msg) errorHandler(response.msg);
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateApplication = (data) => {
  fetch(
    `http://localhost:8000/api/applications/${params.get(
      'id',
    )}` /* `https://basd-2021-david-mindset-dev.herokuapp.com/api/applications/${params.get('id')}` */,
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
      if (response.msg) errorHandler(response.msg);
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
      'id',
    )}` /* `https://basd-2021-david-mindset-dev.herokuapp.com/api/applications/${params.get('id')}` */,
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.msg) errorHandler(response.msg);
      // si se trata de editar muy rapido no llega a mostrarse en los dropdown
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
