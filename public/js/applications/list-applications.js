/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const deleteButtons = document.querySelectorAll('.delete-button');
const cancelButton = document.getElementById('cancel-button');
const modal = document.getElementById('modal');
const confirmDeleteButton = document.getElementById('confirm-delete-button');
const tableContent = document.getElementById('table-content');

deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modal.classList.toggle('modal-hide');
  });
});

cancelButton.addEventListener('click', () => {
  modal.classList.toggle('modal-hide');
});

const deleteApplication = (ApplicationId) => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/applications/${ApplicationId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(() => {
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
  dataModal.textContent = `Open position: ${application.idOpenPosition}. Candidate: ${application.idCandidate}. Active status: ${application.isActive}.`;
  modal.classList.remove('modal-hide');
  confirmDeleteButton.onclick = () => deleteApplication(application._id);
};

const openUpdateSession = (application) => {
  window.location.href = `${window.location.origin}/public/views/applications/form-applications.html?_id=${application._id}`;
};

const createDeleteButton = (application) => {
  const buttonDelete = document.createElement('button');
  buttonDelete.setAttribute('class', 'delete-button');
  const deleteLogo = document.createElement('span');
  deleteLogo.classList.add('material-icons-outlined');
  deleteLogo.textContent = 'clear';
  buttonDelete.innerHTML = deleteLogo.outerHTML;
  buttonDelete.addEventListener('click', () => {
    openDeleteModal(application);
  });
  return buttonDelete;
};

const createSearchButton = (session) => {
  const buttonSearch = document.createElement('button');
  const searchLogo = document.createElement('span');
  searchLogo.classList.add('material-icons-outlined');
  searchLogo.textContent = 'search';
  buttonSearch.setAttribute('id', session._id);
  buttonSearch.innerHTML = searchLogo.outerHTML;
  return buttonSearch;
};

const createUpdateButton = (session) => {
  const buttonUpdate = document.createElement('button');
  const updateLogo = document.createElement('span');
  updateLogo.classList.add('material-icons-outlined');
  updateLogo.textContent = 'edit';
  buttonUpdate.innerHTML = updateLogo.outerHTML;
  buttonUpdate.addEventListener('click', () => {
    openUpdateSession(session);
  });
  return buttonUpdate;
};

const getApplications = () => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/applications')
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
          const candidate = document.createElement('td');
          const isActiveTableElement = document.createElement('td');
          const isActive = document.createElement('input');
          isActive.type = 'checkbox';
          isActiveTableElement.appendChild(isActive);
          const deleteIcon = createDeleteButton(application);
          const searchIcon = createSearchButton(application);
          const updateIcon = createUpdateButton(application);
          openPosition.innerText = application.idOpenPosition;
          candidate.innerText = application.idCandidate;
          isActive.checked = application.isActive;
          tr.append(
            openPosition,
            candidate,
            isActiveTableElement,
            deleteIcon,
            searchIcon,
            updateIcon
          );
          tableContent.append(tr);
        });
      }
    });
};

window.onload = () => {
  getApplications();
};
