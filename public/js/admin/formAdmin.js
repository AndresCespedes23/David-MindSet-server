const firstName = document.getElementById("first-name");
const firstNameError = document.getElementById("first-name-error");
const lastName = document.getElementById("last-name");
const lastNameError = document.getElementById("last-name-error");
const email = document.getElementById("email");
const emailError = document.getElementById("email-error");
const password = document.getElementById("password");
const passwordError = document.getElementById("password-error");
const saveButton = document.getElementById("button-green");
const modalOk = document.getElementById("modal-ok");
const modalOkConfirm = document.getElementById("modal-ok-confirm");
const params = new URLSearchParams(window.location.search);
let errorList = [];

modalOkConfirm.addEventListener("click", () => {
  modalOk.classList.toggle("hide");
  window.location.href = `${window.location.origin}/api/views/admin/listAdmin.html`;
});

const openOkModal = (response) => {
  modalOk.classList.remove("hide");
  const modalOkTitle = document.getElementById("modal-ok-title");
  modalOkTitle.textContent = response.msg;
  const modalOkData = document.getElementById("modal-ok-data");
  modalOkData.textContent = `First Name: ${response.data.firstName}. Last Name: ${response.data.lastName}. Email: ${response.data.email}. Password: ${response.data.password}`;
};

const addAdmin = (administrators) => {
  fetch(`${window.location.origin}/api/administrators`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(administrators),
  })
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateAdmin = (administrators) => {
  fetch(`${window.location.origin}/api/administrators/${params.get("_id")}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(administrators),
  })
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const saveAdmin = () => {
  const administrators = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };
  if (params.get("_id")) {
    updateAdmin(administrators);
  } else {
    addAdmin(administrators);
  }
};

// Validations
const validateLength = () => {
  if (firstName.value !== undefined) {
    if (!(firstName.value.length >= 2 && firstName.value.length <= 40)) {
      errorList.push("First Name must be between 2 and 40 characters");
      firstName.classList.add("input-error");
      firstNameError.classList.remove("hide");
      firstNameError.textContent =
        "*First Name must be between 2 and 40 characters.";
    }
  }
  if (lastName.value !== undefined) {
    if (!(lastName.value.length >= 2 && lastName.value.length <= 40)) {
      errorList.push("Last Name must be between 2 and 40 characters");
      lastName.classList.add("input-error");
      lastNameError.classList.remove("hide");
      lastNameError.textContent =
        "*Last Name must be between 2 and 40 characters.";
    }
  }
  if (email.value !== undefined) {
    if (!(email.value.length >= 5 && email.value.length <= 40)) {
      errorList.push("Email must be between 5 and 40 characters");
      email.classList.add("input-error");
      emailError.classList.remove("hide");
      emailError.textContent = "*Email must be between 5 and 40 characters.";
    }
  }
  if (password.value !== undefined) {
    if (!(password.value.length >= 8 && password.value.length <= 16)) {
      errorList.push("Password must be between 8 and 16 characters");
      password.classList.add("input-error");
      passwordError.classList.remove("hide");
      passwordError.textContent =
        "*Password must be between 8 and 16 characters.";
    }
  }
};

const validateFormat = () => {
  if (email.value !== undefined) {
    if (
      !(
        email.value.split("").indexOf("@") !== -1 &&
        email.value.split("").indexOf(".") !== -1
      )
    ) {
      errorList.push("Email must be an email format");
      email.classList.add("input-error");
      emailError.classList.remove("hide");
      emailError.textContent = "*Email must be an email format.";
    }
  }
};

const getAdmin = () => {
  fetch(`${window.location.origin}/api/administrators/${params.get("_id")}`)
    .then((response) => response.json())
    .then((response) => {
      firstName.value = response.data.firstName;
      lastName.value = response.data.lastName;
      email.value = response.data.email;
      password.value = response.data.password;
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = () => {
  if (params.get("_id")) {
    getAdmin();
    const title = document.getElementById("title");
    title.innerText = "Edit Administrator";
    saveButton.value = "UPDATE";
  }
};

saveButton.addEventListener("click", () => {
  errorList = [];
  validateLength();
  validateFormat();
  if (errorList.length === 0) {
    saveAdmin();
  }
});
