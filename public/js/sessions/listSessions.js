const deleteButtons = document.querySelectorAll('.delete-button');
const cancelButton = document.getElementById('cancel-button');
const addButton = document.getElementById('button-green');
const modal = document.getElementById('modal');
const confirmDeleteButton = document.getElementById('confirm-delete-button');
const tableContent = document.getElementById('table-content');

deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modal.classList.toggle('hide');
  });
});

cancelButton.addEventListener('click', () => {
  modal.classList.toggle('hide');
});

addButton.addEventListener('click', () => {
  window.location.href = `${window.location.origin}/api/views/sessions/formSessions.html`;
});

const deleteSession = (sessionID) => {
  fetch(
    `${window.location.origin}/api/sessions/${sessionID}`,
    {
      method: 'DELETE',
    },
  )
    .then((response) => response.json())
    .then(() => {
      modal.classList.add('hide');
      // Set table empty
      while (tableContent.hasChildNodes()) {
        tableContent.removeChild(tableContent.firstChild);
      }
      getSessions();
    })
    .catch((err) => {
      console.log(err);
    });
};

const openDeleteModal = (session) => {
  const dataModal = document.getElementById('data-modal');
  dataModal.textContent = `Psychologist: ${session.idPsychologists.firstName} ${session.idPsychologists.lastName}.
  Candidate: ${session.idCandidate.firstName} ${session.idCandidate.lastName}.
  Date: ${session.date.split('T')[0]}.`;
  modal.classList.remove('hide');
  confirmDeleteButton.onclick = () => deleteSession(session._id);
};

const createDeleteButton = (session) => {
  const buttonDelete = document.createElement('button');
  buttonDelete.setAttribute('class', 'delete-button');
  const deleteLogo = document.createElement('span');
  deleteLogo.classList.add('material-icons-outlined');
  deleteLogo.textContent = 'clear';
  buttonDelete.innerHTML = deleteLogo.outerHTML;
  buttonDelete.addEventListener('click', () => {
    openDeleteModal(session);
  });
  return buttonDelete;
};

const openUpdateSession = (session) => {
  window.location.href = `${window.location.origin}/api/views/sessions/formSessions.html?_id=${session._id}`;
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

const getSessions = () => {
  fetch(`${window.location.origin}/api/sessions`)
    .then((response) => response.json())
    .then((response) => {
      const tableSession = document.getElementById('table-session');
      if (response.data.length === 0) {
        tableSession.classList.add('hide');
        const emptyTableMsg = document.getElementById('empty-table-msg');
        emptyTableMsg.classList.remove('hide');
      } else {
        tableSession.classList.remove('hide');
        response.data.forEach((session) => {
          if (session.idPsychologists && session.idCandidate) {
            const tr = document.createElement('tr');
            const psychologist = document.createElement('td');
            const candidate = document.createElement('td');
            const date = document.createElement('td');
            const deleteIcon = createDeleteButton(session);
            const updateIcon = createUpdateButton(session);
            psychologist.innerText = `${session.idPsychologists.firstName} ${session.idPsychologists.lastName}`;
            candidate.innerText = `${session.idCandidate.firstName} ${session.idCandidate.lastName}`;
            date.innerText = session.date.split('T')[0];
            tr.append(psychologist, candidate, date, deleteIcon, updateIcon);
            tableContent.append(tr);
          }
        });
      }
    });
};

window.onload = () => {
  getSessions();
};
