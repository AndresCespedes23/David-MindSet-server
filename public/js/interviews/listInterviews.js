/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
const deleteButtons = document.querySelectorAll('.delete-button');
const cancelButton = document.getElementById('cancel-button');
const modal = document.getElementById('modal');
const confirmDeleteButton = document.getElementById('confirm-delete-button');
const tableContent = document.getElementById('table-content');

// Evento para abrir el modal de confirmación de borrado
deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modal.classList.toggle('hide');
  });
});

// Evento para cerrar el modal de confirmación de borrado
cancelButton.addEventListener('click', () => {
  modal.classList.toggle('hide');
});

const deleteSession = (interviewId) => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/interviews/${interviewId}`, {
    method: 'DELETE',
  })
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

// Modal de confirmación de borrado
const openDeleteModal = (interview) => {
  const dataModal = document.getElementById('data-modal');
  dataModal.textContent = `Company: ${interview.idCompany.name}. Candidate: ${interview.idCandidate.firstName} ${
    interview.idCandidate.lastName
  }. Date: ${interview.date.split('T')[0]}.`;
  modal.classList.remove('hide');
  confirmDeleteButton.onclick = () => deleteSession(interview._id);
};

// Función para crear el botón de borrar que se agregan a cada fila de la tabla
const createDeleteButton = (interview) => {
  const buttonDelete = document.createElement('button');
  buttonDelete.setAttribute('class', 'delete-button');
  const deleteLogo = document.createElement('span');
  deleteLogo.classList.add('material-icons-outlined');
  deleteLogo.textContent = 'clear';
  buttonDelete.innerHTML = deleteLogo.outerHTML;
  buttonDelete.addEventListener('click', () => {
    openDeleteModal(interview);
  });
  return buttonDelete;
};

// Función para ir al form de edición
const openUpdateSession = (interview) => {
  window.location.href = `${window.location.origin}/api/views/interviews/formInterviews.html?_id=${interview._id}`;
};

// Función para crear el botón de editar que se agregan a cada fila de la tabla
const createUpdateButton = (interview) => {
  const buttonUpdate = document.createElement('button');
  const updateLogo = document.createElement('span');
  updateLogo.classList.add('material-icons-outlined');
  updateLogo.textContent = 'edit';
  buttonUpdate.innerHTML = updateLogo.outerHTML;
  buttonUpdate.addEventListener('click', () => {
    openUpdateSession(interview);
  });
  return buttonUpdate;
};

// Función para obtener las sesiones y luego llenar la tabla
const getSessions = () => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/interviews')
    .then((response) => response.json())
    .then((response) => {
      const tableSession = document.getElementById('table-session');
      if (response.data.length === 0) {
        tableSession.classList.add('hide');
      } else {
        tableSession.classList.remove('hide');
        response.data.forEach((interviews) => {
          const tr = document.createElement('tr');
          const tdCompany = document.createElement('td');
          const tdCandidate = document.createElement('td');
          const tdDate = document.createElement('td');
          const deleteIcon = createDeleteButton(interviews);
          const updateIcon = createUpdateButton(interviews);
          tdCompany.innerText = interviews.idCompany.name || '';
          tdCandidate.innerText = `${interviews.idCandidate.firstName || ''} ${interviews.idCandidate.lastName || ''}`;
          tdDate.innerText = interviews.date.split('T')[0];
          tr.append(tdCompany, tdCandidate, tdDate, deleteIcon, updateIcon);
          tableContent.append(tr);
        });
      }
    });
};

window.onload = () => {
  getSessions();
};
