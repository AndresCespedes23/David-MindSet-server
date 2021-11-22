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

const getCandidates = () => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/candidates')
    .then((response) => response.json())
    .then((response) => {
      const tableCandidates = document.getElementById('table-candidates');
      if (response.length === 0) {
        tableCandidates.classList.add('hide');
        const emptyTableMsg = document.getElementById('empty-table-msg');
        emptyTableMsg.classList.remove('hide');
      } else {
        tableCandidates.classList.remove('hide');
        response.candidates.forEach((candidates) => {
          const tr = document.createElement('tr');
          const firstName = document.createElement('td');
          const lastName = document.createElement('td');
          const phone = document.createElement('td');
          const email = document.createElement('td');
          const country = document.createElement('td');
          const province = document.createElement('td');
          const city = document.createElement('td');
          const postalCode = document.createElement('td');
          const address = document.createElement('td');
          const birthday = document.createElement('td');
          const deleteIcon = createDeleteButton(candidates);
          const searchIcon = createSearchButton(candidates);
          const updateIcon = createUpdateButton(candidates);
          firstName.innerText = candidates.firstName;
          lastName.innerText = candidates.lastName;
          phone.innerText = candidates.phone;
          email.innerText = candidates.email;
          country.innerText = candidates.country;
          province.innerText = candidates.province;
          city.innerText = candidates.city;
          postalCode.innerText = candidates.postalCode;
          address.innerText = `${candidates.address.street} ${candidates.address.number}`;
          birthday.innerText = candidates.birthday;
          // eslint-disable-next-line max-len
          tr.append(firstName, lastName, phone, email, country, province, city, postalCode, address, birthday, deleteIcon, searchIcon, updateIcon);
          tableContent.append(tr);
        });
      }
    });
};

window.onload = () => {
  getCandidates();
};