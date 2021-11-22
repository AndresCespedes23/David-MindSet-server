const companyField = document.getElementById('companyName');
const startDateField = document.getElementById('startDate');
const endDateField = document.getElementById('endDate');
const descriptionField = document.getElementById('description');
const params = new URLSearchParams(window.location.search);
const saveButton = document.getElementById('button-green');
let errorList = [];

const getOpenPosition = () => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/open-positions/${params.get('_id')}`)
    .then((response) => response.json())
    .then((response) => {
      companyField.value = response.data.idCompany;
      startDateField.value = response.data.startDate;
      endDateField.value = response.data.endDate;
      descriptionField.value = response.data.jobDescription;
    })
    .catch((err) => {
      console.log(err);
    });
};

const addOpenPosition = (data) => {
  fetch(
    'https://basd-2021-david-mindset-dev.herokuapp.com/api/open-positions/',
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
    `https://basd-2021-david-mindset-dev.herokuapp.com/api/open-positions/${params.get('_id')}`,
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
    idCompany: companyField.value,
    startDate: startDateField.value,
    endDate: endDateField.value,
    jobDescription: descriptionField.value,
  };
  if (params.get('_id')) {
    console.log(data)
    updateOpenPosition(data);
  } else {
    addOpenPosition(data);
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
