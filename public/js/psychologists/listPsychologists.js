/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
const deleteButtons = document.querySelectorAll('.delete-button');
const cancelButton = document.getElementById('cancel-button');
const modal = document.getElementById('modal');
const confirmDeleteButton = document.getElementById('confirm-delete-button');
const tableContent = document.getElementById('table-content');

// Event to open modal to confirm remove
deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modal.classList.toggle('hide');
  });
});

// Event to close the modal to confirm remove
cancelButton.addEventListener('click', () => {
  modal.classList.toggle('hide');
});

const deletePsychologist = (psychologistId) => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/psychologists/${psychologistId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(() => {
      modal.classList.add('hide');
      while (tableContent.hasChildNodes()) {
        tableContent.removeChild(tableContent.firstChild);
      }
      getPsychologists();
    })
    .catch((error) => console.log(error));
};

// Modal to confirm remove
const openDeleteModal = (psychologists) => {
  const dataModal = document.getElementById('data-modal');
  dataModal.textContent = `First Name: ${psychologists.firstName}, Last Name: ${psychologists.lastName}, Email: ${psychologists.email}, Password: ${psychologists.password}, Picture: ${psychologists.pictureUrl}, Turns: ${psychologists.turns}`;
  modal.classList.remove('hide');
  confirmDeleteButton.onclick = () => deletePsychologist(psychologists._id);
};

// Function that creates the remove button of each table row
const createDeleteButton = (psychologists) => {
  const buttonDelete = document.createElement('button');
  buttonDelete.setAttribute('class', 'delete-button');
  const deleteLogo = document.createElement('span');
  deleteLogo.classList.add('material-icons-outlined');
  deleteLogo.textContent = 'clear';
  buttonDelete.innerHTML = deleteLogo.outerHTML;
  buttonDelete.addEventListener('click', () => {
    openDeleteModal(psychologists);
  });
  return buttonDelete;
};

// Function to go into the edit form
const openUpdatePsychologist = (psychologist) => {
  window.location.href = `${window.location.origin}/mindset-2021/public/views/psychologists/formPsychologists.html?_id=${psychologist._id}`;
};

// Function that creates the edit button of each table row
const createUpdateButton = (psychologist) => {
  const buttonUpdate = document.createElement('button');
  const updateLogo = document.createElement('span');
  updateLogo.classList.add('material-icons-outlined');
  updateLogo.textContent = 'edit';
  buttonUpdate.innerHTML = updateLogo.outerHTML;
  buttonUpdate.addEventListener('click', () => {
    openUpdatePsychologist(psychologist);
  });
  return buttonUpdate;
};

// Function that obtains the psychologists and then fill the table
const getPsychologists = () => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/psychologists')
    .then((response) => response.json())
    .then((response) => {
      if (response.length === 0) {
        const noPsychologists = document.createElement('h2');
        noPsychologists.innerText = 'No psychologists found';
        tableContent.appendChild(noPsychologists);
      } else {
        response.psychologists.forEach((psychologist) => {
          const tr = document.createElement('tr');
          const tdFirstName = document.createElement('td');
          const tdLastName = document.createElement('td');
          const tdEmail = document.createElement('td');
          const tdPassword = document.createElement('td');
          const tdPictureUrl = document.createElement('td');
          const tdTurns = document.createElement('td');
          const deleteButton = createDeleteButton(psychologist);
          const updateButton = createUpdateButton(psychologist);
          tdFirstName.innerText = psychologist.firstName;
          tdLastName.innerText = psychologist.lastName;
          tdEmail.innerText = psychologist.email;
          tdPassword.innerText = psychologist.password;
          tdPictureUrl.innerText = psychologist.tdPictureUrl;
          tdTurns.innerText = psychologist.turns;
          tr.append(
            tdFirstName,
            tdLastName,
            tdEmail,
            tdPassword,
            tdPictureUrl,
            tdTurns,
            deleteButton,
            updateButton,
          );
          tableContent.append(tr);
        });
      }
    })
    .catch((error) => console.log(error));
};

window.onload = () => {
  getPsychologists();
};
