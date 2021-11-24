/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const candidateSelect = document.getElementById('candidate');
const openPositionSelect = document.getElementById('open-position');
const isActiveInput = document.getElementById('is-active');
const isActiveLiElement = document.getElementById('is-active-entry');
const saveButton = document.getElementById('save-button');
const modalData = document.getElementById('modal-data');
const modalDataTitle = document.getElementById('modal-data-title');
const modalDataContent = document.getElementById('modal-data-content');
const modalOkConfirm = document.getElementById('modal-ok-confirm');
const params = new URLSearchParams(window.location.search);
const { origin } = window.location;

modalOkConfirm.addEventListener('click', () => {
  modalData.classList.toggle('modal-hide'); // 2) 0 -> 1 (oculta)
  window.location.href = `${origin}/api/views/applications/listApplications.html`; // redirects to list
});

const errorHandler = (response) => {
  // las responses del controller tienen que devolver -> { err }
  modalData.classList.toggle('modal-hide'); // 1a) 1 -> 0 (muestra)
  modalDataTitle.textContent = 'Error';
  if (response.msg) modalDataContent.textContent = response;
  else modalDataContent.textContent = `${response.name}: ${response.message}`;
};

// popula el dropdown de candidates
const getCandidates = () => {
  fetch(`${origin}/api/candidates`)
    .then((response) => response.json())
    .then((response) => {
      if (response.msg) throw new Error(response.msg);
      response.candidates.forEach((candidates) => {
        const option = document.createElement('option');
        option.innerText = `${candidates.firstName} ${candidates.lastName}`;
        option.value = candidates._id;
        candidateSelect.append(option);
      });
    })
    .catch((err) => errorHandler(err));
};

// popula el dropdown de open positions
const getOpenPositions = () => {
  fetch(`${origin}/api/open-positions`)
    .then((response) => response.json())
    .then((response) => {
      if (response.msg) throw new Error(response.msg);
      response.data.forEach((openPosition) => {
        const option = document.createElement('option');
        option.innerText = `${openPosition.jobDescription}`;
        option.value = openPosition._id;
        openPositionSelect.append(option);
      });
    })
    .catch((err) => errorHandler(err));
};

const openOkModal = (response) => {
  modalData.classList.toggle('modal-hide'); // 1b) 1 -> 0 (muestra)
  modalDataTitle.textContent = response.success;
  modalDataContent.textContent = `Candidate: ${response.application.idCandidate}. Open position: ${response.application.idOpenPosition}.`;
};

const addApplication = (data) => {
  fetch(`${origin}/api/applications`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.msg) throw new Error(response.msg);
      openOkModal(response);
    })
    .catch((err) => errorHandler(err));
};

const updateApplication = (data) => {
  fetch(`${origin}/api/applications/${params.get('id')}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.msg) throw new Error(response.msg);
      openOkModal(response);
    })
    .catch((err) => errorHandler(err));
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
  fetch(`${origin}/api/applications/${params.get('id')}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((response) => {
      if (response.msg) throw new Error(response.msg);
      // si se trata de editar muy rapido no llega a mostrarse en los dropdown
      candidateSelect.value = response.application.idCandidate._id;
      openPositionSelect.value = response.application.idOpenPosition._id;
      isActiveInput.checked = response.application.isActive;
    })
    .catch((err) => errorHandler(err));
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
