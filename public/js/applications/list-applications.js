/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const cancelButtonModal = document.getElementById('cancel-button');
const modalDelete = document.getElementById('modal-delete');
const modalDeleteContent = document.getElementById('modal-delete-content');
const modalDeleteConfirm = document.getElementById('modal-delete-confirm');
const tableContent = document.getElementById('table-content');
const modalData = document.getElementById('modal-data');
const modalDataConfirm = document.getElementById('modal-data-confirm');
const modalDataContent = document.getElementById('modal-data-content');

modalDataConfirm.onclick = () => modalData.classList.toggle('modal-hide'); // 2) 0 -> 1 (oculta)

const errorHandler = (response) => {
  // las responses de error tienen que devolver -> { msg }
  modalData.classList.toggle('modal-hide');
  if (response.msg) modalDataContent.textContent = response;
  else modalDataContent.textContent = `${response.name}: ${response.message}`;
};

const deleteApplication = (applicationId) => {
  fetch(
    `http://localhost:8000/api/applications/${applicationId}` /* `https://basd-2021-david-mindset-dev.herokuapp.com/api/applications/${ApplicationId} `*/,
    {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then((response) => response.json())
    .then((response) => {
      modalDelete.classList.toggle('modal-hide'); // 2b) 0 -> 1 (oculta)
      if (response.msg) throw new Error(response.msg);
      // Set table empty
      while (tableContent.hasChildNodes()) {
        tableContent.removeChild(tableContent.firstChild);
      }
      getApplications();
      modalData.classList.toggle('modal-hide'); // 1) 1 -> 0 (muestra)
      modalDataContent.textContent = 'Application deleted successfully';
    })
    .catch((err) => errorHandler(err));
};

cancelButtonModal.addEventListener('click', () => {
  modalDelete.classList.toggle('modal-hide'); // 2a) 0 -> 1 (oculta)
});

const openDeleteModal = (application) => {
  modalDeleteContent.textContent = `Open position: ${application.idOpenPosition._id}. Candidate: ${application.idCandidate._id}. Active status: ${application.isActive}.`;
  modalDelete.classList.toggle('modal-hide'); // 1) 1 -> 0 (muestra)
  modalDeleteConfirm.onclick = () => deleteApplication(application._id);
  // onclick tiene que ser una declaración de funcion, no una llamada
};

// table delete buttons
const createDeleteButton = (application) => {
  const buttonDelete = document.createElement('button');
  const deleteLogo = document.createElement('span');
  deleteLogo.classList.add('material-icons-outlined');
  deleteLogo.textContent = 'clear'; // selects the appropiate icon through text
  buttonDelete.innerHTML = deleteLogo.outerHTML;
  buttonDelete.setAttribute('class', 'delete-button');
  buttonDelete.addEventListener('click', () => {
    openDeleteModal(application);
  });
  return buttonDelete;
};

const createEditButton = (application) => {
  const buttonUpdate = document.createElement('button');
  const updateLogo = document.createElement('span');
  updateLogo.classList.add('material-icons-outlined');
  updateLogo.textContent = 'edit'; // selects the appropiate icon through text
  buttonUpdate.innerHTML = updateLogo.outerHTML;
  buttonUpdate.addEventListener('click', () => {
    window.location.href = `http://localhost:8000/api/views/applications/form-applications.html?id=${application._id}` /* `${window.location.origin}/public/views/applications/form-applications.html?_id=${application._id}` */;
  });
  return buttonUpdate;
};

const getApplications = () => {
  fetch(
    `http://localhost:8000/api/applications` /* 'https://basd-2021-david-mindset-dev.herokuapp.com/api/applications' */,
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.msg) throw new Error(response.msg);
      const tableApplication = document.getElementById('table-application');
      if (response.applications.length === 0) {
        tableApplication.classList.add('modal-hide');
        const emptyTableMsg = document.getElementById('empty-table-msg');
        emptyTableMsg.classList.remove('modal-hide');
      } else {
        tableApplication.classList.remove('modal-hide');
        response.applications.forEach((application) => {
          const tr = document.createElement('tr');
          const openPosition = document.createElement('td');
          openPosition.innerText = application.idOpenPosition._id;
          openPosition.title = application.idOpenPosition.jobDescription;
          const candidate = document.createElement('td');
          candidate.innerText = application.idCandidate._id;
          candidate.title = `${application.idCandidate.firstName} ${application.idCandidate.lastName}`;
          const isActiveTableElement = document.createElement('td');
          const isActive = document.createElement('input');
          isActive.type = 'checkbox';
          isActive.checked = application.isActive;
          isActive.disabled = 'disabled';
          isActiveTableElement.appendChild(isActive);
          const deleteIcon = createDeleteButton(application);
          const updateIcon = createEditButton(application);
          tr.append(candidate, openPosition, isActiveTableElement, deleteIcon, updateIcon);
          tableContent.append(tr);
        });
      }
    })
    .catch((err) => errorHandler(err));
};

window.onload = () => {
  getApplications();
};
