const deleteButton = document.querySelectorAll('#delete-button');
const cancelButton = document.getElementById('cancel-button');
const modal = document.getElementById('modal');
const tableContent = document.getElementById('table-content');
const confirmDeleteButton = document.getElementById('modal-ok');

deleteButton.forEach((button) => {
  button.addEventListener('click', () => {
    modal.classList.toggle('modal-hide');
  });
});

cancelButton.addEventListener('click', () => {
  modal.classList.toggle('modal-hide');
});

const getOpenPositions = () => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/open-positions/')
    .then((response) => response.json())
    .then((response) => {
      if (response.length === 0) {
        const noOpenPos = document.createElement('h2');
        noOpenPos.innerText = 'No open positions found';
        tableContent.appendChild(noOpenPos);
      } else {
        response.data.forEach((data) => {
          const tr = document.createElement('tr');
          const tdCompany = document.createElement('td');
          const tdStartDate = document.createElement('td');
          const tdEndDate = document.createElement('td');
          const tdDescription = document.createElement('td');
          tdCompany.innerText = data.idCompany;
          tdStartDate.innerText = data.startDate;
          tdEndDate.innerText = data.endDate;
          tdDescription.innerText = data.jobDescription;
          const deleteBtn = createDeleteButton(data);
          const updateBtn = createUpdateButton(data);
          tr.append(tdCompany, tdStartDate, tdEndDate, tdDescription, updateBtn, deleteBtn);
          tableContent.append(tr);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const deletePosition = (positionID) => {
  fetch(
    `https://basd-2021-david-mindset-dev.herokuapp.com/api/open-positions/${positionID}`,
    {
      method: 'DELETE',
    },
  )
    .then((response) => response.json())
    .then(() => {
      modal.classList.add('modal-hide');
      // Set table empty
      while (tableContent.hasChildNodes()) {
        tableContent.removeChild(tableContent.firstChild);
      }
      getOpenPositions();
    })
    .catch((err) => console.log(err));
};

const openDeleteModal = (openPosition) => {
  const dataModal = document.getElementById('data-inner');
  dataModal.textContent = `Company: ${openPosition.idCompany}`;
  modal.classList.remove('modal-hide');
  confirmDeleteButton.onclick = () => deletePosition(openPosition._id);
};

const createDeleteButton = (openPosition) => {
  const buttonDelete = document.createElement('button');
  buttonDelete.setAttribute('class', 'delete-button');
  const deleteLogo = document.createElement('span');
  deleteLogo.classList.add('material-icons-outlined');
  deleteLogo.textContent = 'clear';
  buttonDelete.innerHTML = deleteLogo.outerHTML;
  buttonDelete.addEventListener('click', () => {
    openDeleteModal(openPosition);
  });
  return buttonDelete;
};

const openUpdateOpenPosition = (openPosition) => {
  window.location.href = `${window.location.origin}/api/views/open-positions/formOpenPositions.html?_id=${openPosition._id}`;
};

const createUpdateButton = (openPosition) => {
  const buttonUpdate = document.createElement('button');
  const updateLogo = document.createElement('span');
  updateLogo.classList.add('material-icons-outlined');
  updateLogo.textContent = 'edit';
  buttonUpdate.innerHTML = updateLogo.outerHTML;
  buttonUpdate.addEventListener('click', () => {
    openUpdateOpenPosition(openPosition);
  });
  return buttonUpdate;
};

window.onload = () => {
  getOpenPositions();
};
