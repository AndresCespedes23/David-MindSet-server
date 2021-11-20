const deleteButtons = document.querySelectorAll('.delete-button');
const cancelButton = document.getElementById('cancel-button');
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

const deleteSession = (_id) => {
  fetch(
    `https://basd-2021-david-mindset-dev.herokuapp.com/api/profile-types/${_id}`,
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
      getProfiles();
    })
    .catch((err) => {
      console.log(err);
    });
};

const openDeleteModal = (profile) => {
  const dataModal = document.getElementById('data-modal');
  dataModal.textContent = `Profile Types: ${profile._id}. Name: ${profile.name}.`;
  modal.classList.remove('hide');
  confirmDeleteButton.onclick = () => deleteSession(profile._id);
};

const createDeleteButton = (profile) => {
  const buttonDelete = document.createElement('button');
  buttonDelete.setAttribute('class', 'delete-button');
  const deleteLogo = document.createElement('span');
  deleteLogo.classList.add('material-icons-outlined');
  deleteLogo.textContent = 'clear';
  buttonDelete.innerHTML = deleteLogo.outerHTML;
  buttonDelete.addEventListener('click', () => {
    openDeleteModal(profile);
  });
  return buttonDelete;
};

const createSearchButton = (profile) => {
  const buttonSearch = document.createElement('button');
  const searchLogo = document.createElement('span');
  searchLogo.classList.add('material-icons-outlined');
  searchLogo.textContent = 'search';
  buttonSearch.setAttribute('id', profile._id);
  buttonSearch.innerHTML = searchLogo.outerHTML;
  return buttonSearch;
};

const openUpdateSession = (profile) => {
  window.location.href = `${window.location.origin}api/views/profile-types/formProfileTypes.html?_id=${profile._id}`;
};

const createUpdateButton = (profile) => {
  const buttonUpdate = document.createElement('button');
  const updateLogo = document.createElement('span');
  updateLogo.classList.add('material-icons-outlined');
  updateLogo.textContent = 'edit';
  buttonUpdate.innerHTML = updateLogo.outerHTML;
  buttonUpdate.addEventListener('click', () => {
    openUpdateSession(profile);
  });
  return buttonUpdate;
};

const getProfiles = () => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/profile-types')
    .then((response) => response.json())
    .then((response) => {
      const tableProfile = document.getElementById('table-profile');
      if (response.length === 0) {
        tableProfile.classList.add('hide');
        const emptyTableMsg = document.getElementById('empty-table-msg');
        emptyTableMsg.classList.remove('hide');
      } else {
        tableProfile.classList.remove('hide');
        response.forEach((profile) => {
          const tr = document.createElement('tr');
          const profilesId = document.createElement('td');
          const name = document.createElement('td');
          const deleteIcon = createDeleteButton(profile);
          const searchIcon = createSearchButton(profile);
          const updateIcon = createUpdateButton(profile);
          profilesId.innerText = profile._id;
          name.innerText = profile.name;
          tr.append(profilesId, name, deleteIcon, searchIcon, updateIcon);
          tableContent.append(tr);
        });
      }
    });
};

window.onload = () => {
  getProfiles();
};
