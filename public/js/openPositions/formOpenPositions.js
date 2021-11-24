const companiesSelect = document.getElementById('companyName');
const startDateField = document.getElementById('startDate');
const endDateField = document.getElementById('endDate');
const descriptionField = document.getElementById('description');
const params = new URLSearchParams(window.location.search);
const saveButton = document.getElementById('button-green');
let errorList = [];

const getOpenPosition = () => {
  fetch(`${window.location.origin}/api/open-positions/${params.get('_id')}`)
    .then((response) => response.json())
    .then((response) => {
      companyField.value = response.data.idCompany.name;
      startDateField.value = response.data.startDate.split('T')[0];
      endDateField.value = response.data.endDate.split('T')[0];
      descriptionField.value = response.data.jobDescription;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCompanies = () => {
  fetch(`${origin}/api/companies`)
    .then((response) => response.json())
    .then((response) => {
      if (response.msg) throw new Error(response.msg);
      response.companies.forEach((companies) => {
        const option = document.createElement('option');
        option.innerText = `${companies.name}`;
        option.value = companies._id;
        companiesSelect.append(option);
      });
    })
    .catch((err) => console.log(err));
};

const addOpenPosition = (data) => {
  fetch(
    `${window.location.origin}/api/open-positions/`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

const updateOpenPosition = (data) => {
  fetch(
    `${window.location.origin}/api/open-positions/${params.get('_id')}`,
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

const saveOpenPosition = () => {
  const data = {
    idCompany: companyField.popoulate(),
    startDate: startDateField.value,
    endDate: endDateField.value,
    jobDescription: descriptionField.value,
  };
  if (params.get('_id')) {
    console.log(data)
    updateOpenPosition(data);
    window.location.href = `${window.location.origin}/api/views/open-positions/listOpenPositions.html`;
  } else {
    addOpenPosition(data);
    window.location.href = `${window.location.origin}/api/views/open-positions/listOpenPositions.html`;
  }
};

const isNotEmpty = () => {
  if (companyField.value === '') {
    errorList.push('Company is required');
  }
  if (startDateField.value === '') {
    errorList.push('Start date is required');
  }
  if (descriptionField.value === '') {
    errorList.push('Job description is required');
  }
};

window.onload = () => {
  getCompanies();
  if (params.get('_id')) {
    getOpenPosition();
  }
};

saveButton.addEventListener('click', () => {
  errorList = [];
  isNotEmpty();
  if (errorList.length === 0) {
    return saveOpenPosition();
  }
});
