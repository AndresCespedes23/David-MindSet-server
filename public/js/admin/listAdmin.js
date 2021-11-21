const deleteButtons = document.querySelectorAll(".delete-button");
const cancelButton = document.getElementById("cancel-button");
const modal = document.getElementById("modal");
const confirmDeleteButton = document.getElementById("confirm-delete-button");
const tableContent = document.getElementById("table-content");

deleteButtons.forEach((button) => {
  button.addEventListener("click", () => modal.classList.toggle("hide"));
});

cancelButton.addEventListener("click", () => modal.classList.toggle("hide"));

const deleteAdmin = (adminId) => {
  fetch(
    `https://basd-2021-david-mindset-dev.herokuapp.com/api/administrators/${adminId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then(() => {
      modal.classList.add("hide");
      while (tableContent.hasChildNodes()) {
        tableContent.removeChild(tableContent.firstChild);
      }
      getAdmins();
    })
    .catch((error) => console.log(error));
};

const openDeleteModal = (administrators) => {
  const dataModal = document.getElementById("data-modal");
  dataModal.textContent = `First Name: ${administrators.firstName} \n, Last Name: ${administrators.lastName} \n, Email: ${administrators.email} \n, Password: ${administrators.password}`;
  modal.classList.remove("hide");
  confirmDeleteButton.onclick = () => deleteAdmin(administrators._id);
};

const createDeleteButton = (administrators) => {
  const buttonDelete = document.createElement("button");
  buttonDelete.setAttribute("class", "delete-button");
  const deleteLogo = document.createElement("span");
  deleteLogo.classList.add("material-icons-outlined");
  deleteLogo.textContent = "clear";
  buttonDelete.innerHTML = deleteLogo.outerHTML;
  buttonDelete.addEventListener("click", () => {
    openDeleteModal(administrators);
  });
  return buttonDelete;
};

const openUpdateAdmin = (administrator) => {
  window.location.href = `${window.location.origin}/api/views/admin/formAdmin.html?_id=${administrator._id}`;
};

const createUpdateButton = (administrator) => {
  const buttonUpdate = document.createElement("button");
  const updateLogo = document.createElement("span");
  updateLogo.classList.add("material-icons-outlined");
  updateLogo.textContent = "edit";
  buttonUpdate.innerHTML = updateLogo.outerHTML;
  buttonUpdate.addEventListener("click", () => {
    openUpdateAdmin(administrator);
  });
  return buttonUpdate;
};

const getAdmins = () => {
  fetch("https://basd-2021-david-mindset-dev.herokuapp.com/api/administrators")
    .then((response) => response.json())
    .then((response) => {
      if (response.length === 0) {
        const noadministrators = document.createElement("h2");
        noadministrators.innerText = "No administrators found";
        tableContent.appendChild(noadministrators);
      } else {
        response.data.forEach((administrator) => {
          const tr = document.createElement("tr");
          const tdFirstName = document.createElement("td");
          const tdLastName = document.createElement("td");
          const tdEmail = document.createElement("td");
          const tdPassword = document.createElement("td");
          const deleteButton = createDeleteButton(administrator);
          const updateButton = createUpdateButton(administrator);
          tdFirstName.innerText = administrator.firstName;
          tdLastName.innerText = administrator.lastName;
          tdEmail.innerText = administrator.email;
          tdPassword.innerText = administrator.password;
          tr.append(
            tdFirstName,
            tdLastName,
            tdEmail,
            tdPassword,
            deleteButton,
            updateButton
          );
          tableContent.append(tr);
        });
      }
    })
    .catch((error) => console.log(error));
};

window.onload = () => {
  getAdmins();
};
