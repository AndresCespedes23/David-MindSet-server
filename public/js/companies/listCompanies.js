/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
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

const deleteCompany = (companyId) => {
  fetch(`${window.location.origin}/api/companies/${companyId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(() => {
      modal.classList.add('hide');
      while (tableContent.hasChildNodes()) {
        tableContent.removeChild(tableContent.firstChild);
      }
      getCompanies();
    })
    .catch((error) => console.log(error));
};

// Modal to confirm remove
const openDeleteModal = (companies) => {
  const dataModal = document.getElementById('data-modal');
  dataModal.textContent = `Name: ${companies.name}, Email: ${companies.email}, Address: ${companies.address}`;
  modal.classList.remove('hide');
  confirmDeleteButton.onclick = () => deleteCompany(companies._id);
};

// Function that creates the remove button of each table row
const createDeleteButton = (companies) => {
  const buttonDelete = document.createElement('button');
  buttonDelete.setAttribute('class', 'delete-button');
  const deleteLogo = document.createElement('span');
  deleteLogo.classList.add('material-icons-outlined');
  deleteLogo.textContent = 'clear';
  buttonDelete.innerHTML = deleteLogo.outerHTML;
  buttonDelete.addEventListener('click', () => {
    openDeleteModal(companies);
  });
  return buttonDelete;
};

// Function to go into the edit form
const openUpdatePsychologist = (companies) => {
  window.location.href = `${window.location.origin}/api/views/companies/formCompanies.html?_id=${companies._id}`;
};

// Function that creates the edit button of each table row
const createUpdateButton = (companies) => {
  const buttonUpdate = document.createElement('button');
  const updateLogo = document.createElement('span');
  updateLogo.classList.add('material-icons-outlined');
  updateLogo.textContent = 'edit';
  buttonUpdate.innerHTML = updateLogo.outerHTML;
  buttonUpdate.addEventListener('click', () => {
    openUpdatePsychologist(companies);
  });
  return buttonUpdate;
};

// Function that obtains the psychologists and then fill the table
const getCompanies = () => {
  fetch(`${window.location.origin}/api/companies`)
    .then((response) => response.json())
    .then((response) => {
      if (response.length === 0) {
        const noCompanies = document.createElement('h2');
        noCompanies.innerText = 'No psychologists found';
        tableContent.appendChild(noCompanies);
      } else {
        response.data.forEach((company) => {
          const tr = document.createElement('tr');
          const tdName = document.createElement('td');
          const tdEmail = document.createElement('td');
          const tdAddress = document.createElement('td');
          const deleteButton = createDeleteButton(company);
          const updateButton = createUpdateButton(company);
          tdName.innerText = company.name;
          tdEmail.innerText = company.email;
          tdAddress.innerText = company.address;
          tr.append(
            tdName,
            tdEmail,
            tdAddress,
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
  getCompanies();
};
