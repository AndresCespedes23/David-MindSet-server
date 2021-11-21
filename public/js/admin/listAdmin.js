const deleteButtons = document.querySelectorAll('.delete-button'),
      cancelButton = document.getElementById('cancel-button'),
      modal = document.getElementById('modal'),
      confirmDeleteButton = document.getElementById('confirm-delete-button'),
      tableContent = document.getElementById('table-content'),
      dataModal = document.getElementById('data-modal');

deleteButtons.forEach((button) => {
    button.addEventListener('click', () => modal.classList.toggle('hide'));
});

cancelButton.addEventListener('click', () => modal.classList.toggle('hide'));

const getSessions = () => {
    fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/administrator')
    .then((response) => response.json())
    .then((response) => {
        const tableSession = document.getElementById('table-session');
        if (response.data.length === 0) {
            tableSession.classList.add('hide');
            const emptyTableMsg = document.getElementById('empty-table-msg');
            emptyTableMsg.classList.remove('hide');
        } else {
            tableSession.classList.remove('hide');
            response.data.forEach((administrator) => {
                const tr = document.createElement('tr');
                const tdCompany = document.createElement('td');
                const tdCandidate = document.createElement('td');
                const tdDate = document.createElement('td');
                const deleteIcon = createDeleteButton(administrator);
                const updateIcon = createUpdateButton(administrator);
                tdCompany.innerText = interviews.idCompany;
                tdCandidate.innerText = interviews.idCandidate;
                tdDate.innerText = interviews.date;
                tr.append(tdCompany, tdCandidate, tdDate, deleteIcon, updateIcon);
                tableContent.append(tr);
          });
        }
      });
  };

const deleteSession = (adminId) => {
    fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/administrator/${adminId}`, {
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

let openDeleteModal = (interview) => {
    dataModal.textContent = `Adminstrator: ${administrator.idNumber}`;
    modal.classList.remove('hide');
    confirmDeleteButton.onclick = () => deleteSession(administrator._id);
};

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

const openUpdateSession = (interview) => {
  window.location.href = `${window.location.origin}/public/views/interviews/formInterviews.html?_id=${interview._id}`;
};

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

window.onload = () => {
  getSessions();
};