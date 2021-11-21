/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const cancelButtonModal = document.getElementById('cancel-button');
const modal = document.getElementById('modal');
const dataModal = document.getElementById('data-modal');
const confirmDeleteButtonModal = document.getElementById('confirm-delete-button');
const tableContent = document.getElementById('table-content');

const deleteApplication = (applicationId) => {
  fetch(
    `http://localhost:8000/api/applications/${applicationId}` /* `https://basd-2021-david-mindset-dev.herokuapp.com/api/applications/${ApplicationId} `*/,
    {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  )
    .then((response) => {
      if (response.status !== 404) response.json();
      else {
        dataModal.textContent = 'User not found';
        confirmDeleteButtonModal.onclick = () => modal.classList.toggle('modal-hide'); // 2a) 0 -> 1 (oculta)
        throw new Error('User not found');
      }
    })
    .then(() => {
      modal.classList.toggle('modal-hide'); // 2b) 0 -> 1 (oculta)
      // Set table empty
      while (tableContent.hasChildNodes()) {
        tableContent.removeChild(tableContent.firstChild);
      }
      getApplications();
    })
    .catch((err) => console.log(err));
};

cancelButtonModal.addEventListener('click', () => {
  modal.classList.toggle('modal-hide'); // 2a) 0 -> 1 (oculta)
});

const openDeleteModal = (application) => {
  console.log(confirmDeleteButtonModal);
  dataModal.textContent = `Open position: ${application.idOpenPosition._id}. Candidate: ${application.idCandidate._id}. Active status: ${application.isActive}.`;
  modal.classList.toggle('modal-hide'); // 1) 1 -> 0 (muestra)
  confirmDeleteButtonModal.onclick = () => deleteApplication(application._id); //tiene que ser una declaración, no una llamada
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
          openPosition.title = application._id /* application.idOpenPosition.jobDescription */;
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
