/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const cancelButton = document.getElementById('cancel-button');
const modal = document.getElementById('modal');
const confirmDeleteButton = document.getElementById('confirm-delete-button');
const tableContent = document.getElementById('table-content');

cancelButton.addEventListener('click', () => {
  modal.classList.toggle('modal-hide');
});

const deleteApplication = (ApplicationId) => {
  fetch(
    `http://localhost:8000/api/applications/${ApplicationId}` /* `https://basd-2021-david-mindset-dev.herokuapp.com/api/applications/${ApplicationId} `*/,
    {
      method: 'DELETE',
    }
  )
    .then((response) => response.json())
    .then(() => {
      console.log(tableContent);
      modal.classList.add('modal-hide');
      // Set table empty
      while (tableContent.hasChildNodes()) {
        tableContent.removeChild(tableContent.firstChild);
      }
      getApplications();
    })
    .catch((err) => {
      console.log(err);
    });
};

const openDeleteModal = (application) => {
  const dataModal = document.getElementById('data-modal');
  dataModal.textContent = `Open position: ${application.idOpenPosition._id}. Candidate: ${application.idCandidate._id}. Active status: ${application.isActive}.`;
  modal.classList.remove('modal-hide');
  confirmDeleteButton.addEventListener('click', () => deleteApplication(application._id));
};

// table delete buttons
const createDeleteButton = (application) => {
  const buttonDelete = document.createElement('button');
  buttonDelete.setAttribute('class', 'delete-button');
  buttonDelete.addEventListener('click', () => {
    modal.classList.toggle('modal-hide');
  });
  const deleteLogo = document.createElement('span');
  deleteLogo.classList.add('material-icons-outlined');
  deleteLogo.textContent = 'clear';
  buttonDelete.innerHTML = deleteLogo.outerHTML;
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
    `http://localhost:8000/api/applications` /* 'https://basd-2021-david-mindset-dev.herokuapp.com/api/applications' */
  )
    .then((response) => response.json())
    .then((response) => {
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
    });
};

window.onload = () => {
  getApplications();
};
