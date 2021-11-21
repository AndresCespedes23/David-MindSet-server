const firstName = document.getElementById('firstName'),
      lastName = document.getElementById('lastName'),
      email = document.getElementById('email'),
      password = document.getElementById('password'),
      age = document.getElementById('age'),
      phoneNumber = document.getElementById('phone'),
      address = document.getElementById('address'),
      city = document.getElementById('city'),
      zipCode = document.getElementById('zip'),
      id = document.getElementById('idNumber'),
      submit = document.getElementById('button-green'),
      modalOk = document.getElementById('modal-ok'),
      modalOkTitle = document.getElementById('modal-ok-title'),
      modalOkData = document.getElementById('modal-ok-data'),
      params = new URLSearchParams(window.location.search);

// Función para obtener las sesiones y luego llenar la tabla
const getSessions = () => {
    fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/administrator')
    .then((response) => response.json())
    .then((response) => {
        const tableSession = document.getElementById('table-session');
        if (response.data.length === 0) {
            tableSession.classList.add('hide');
        } else {
            tableSession.classList.remove('hide');
            response.data.forEach((administrator) => {
                const tr = document.createElement('tr');
                const tdCompany = document.createElement('td');
                const tdCandidate = document.createElement('td');
                const tdDate = document.createElement('td');
                const deleteIcon = createDeleteButton(administrator);
                const updateIcon = createUpdateButton(administrator);
                tdCompany.innerText = administrator.idCompany.name;
                tdCandidate.innerText = `${administrator.idCandidate.firstName || ''} ${administrator.idCandidate.lastName || ''}`;
                tdDate.innerText = administrator.date.split('T')[0];
                tr.append(tdCompany, tdCandidate, tdDate, deleteIcon, updateIcon);
                tableContent.append(tr);
            });
        };
    });
};
  
window.onload = () => {
    getSessions();
};

modalOkConfirm.addEventListener('click', () => {
    modalOk.classList.toggle('hide');
    window.location.href = `${window.location.origin}/public/views/sessions/list-psychologists.html`;
    // por que no tengo una carpeta sessions dentro de views??????????
});

const openOkModal = (response) => {
    modalOk.classList.remove('hide');
    modalOkTitle.textContent = response.msg;
    modalOkData.textContent = `First Name: ${response.data.firstName}. Last Name: ${response.data.lastName}. Email: ${response.data.email}. Password: ${response.data.password}. Age: ${response.data.age}. Phone Number: ${response.data.phoneNumber}. Addres: ${response.data.address}. City: ${response.data.city}. Zip Code: ${response.data.zipCode}`;
};

const addNewAdmin = (administrators) => {
    fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/psychologists',
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(administrators),
        },
    )
    .then((response) => response.json())
    .then((response) => {
        openOkModal(response);
    })
      .catch((err) => {
        console.log(err);
    });
};

const saveNewAdmin = () => {
    const newAdmin = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        age: age.value,
        phoneNumber: phoneNumber.value,
        addres: address.value,
        city: city.value,
        zipCode: zipCode.value,
        id: id.value
    };
    if (params.get('_id')) {
        updateAdmin(newAdmin);
    } else {
        addAdmin(newAdmin);
    }
};