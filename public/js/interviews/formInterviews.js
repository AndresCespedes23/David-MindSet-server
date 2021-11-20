/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
const companySelect = document.getElementById('psychologist');
const candidateSelect = document.getElementById('candidate');
const dateInput = document.getElementById('date');
const statusInput = document.getElementById('status');
const dateErrorMsg = document.getElementById('date-error-msg');
const saveButton = document.getElementById('button-green');
const modalOk = document.getElementById('modal-ok');
const modalOkConfirm = document.getElementById('modal-ok-confirm');
const params = new URLSearchParams(window.location.search);
let errorList = [];

modalOkConfirm.addEventListener('click', () => {
  modalOk.classList.toggle('hide');
  window.location.href = `${window.location.origin}/public/views/interviews/listInterviews.html`;
});

// Busco las empresas para llenar el select
const getCompanies = () => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/companies')
    .then((response) => response.json())
    .then((response) => {
      if (response.data.length > 0) {
        response.data.forEach((company) => {
          const option = document.createElement('option');
          option.innerText = `${company.name}`;
          option.value = company._id;
          companySelect.append(option);
        });
      }
    });
};

// Busco los candidatos para llenar el select
const getCandidates = () => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/candidates')
    .then((response) => response.json())
    .then((response) => {
      response.candidates.forEach((candidate) => {
        const option = document.createElement('option');
        option.innerText = `${candidate.firstName} ${candidate.lastName}`;
        option.value = candidate._id;
        candidateSelect.append(option);
      });
    });
};

const openOkModal = (response) => {
  modalOk.classList.remove('hide');
  const modalOkTitle = document.getElementById('modal-ok-title');
  modalOkTitle.textContent = response.msg;
  const modalOkData = document.getElementById('modal-ok-data');
  modalOkData.textContent = `Company: ${response.data.idCompany}. Candidate: ${response.data.idCandidate}. Date: ${response.data.date}.`;
};

const addInterview = (data) => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/interviews', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateInterview = (data) => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/interviews/${params.get('_id')}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const saveInterview = () => {
  const data = {
    idCompany: companySelect.value,
    idCandidate: candidateSelect.value,
    status: statusInput.value,
    date: dateInput.value,
  };
  if (params.get('_id')) {
    updateInterview(data);
  } else {
    addInterview(data);
  }
};

const getCompanyName = (id) => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/companies/${id}`)
    .then((response) => response.json())
    .then((response) => response.data.name);
};

const getCandidateName = (id) => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/candidates/${id}`)
    .then((response) => response.json())
    .then((response) => response.data.name);
};

const getInterview = () => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/interviews/${params.get('_id')}`)
    .then((response) => response.json())
    .then((response) => {
      companySelect.value = response.data.idCompany;
      // Missing Populate
      companySelect.text = getCompanyName(response.data.idCompany);
      candidateSelect.value = response.data.idCandidate;
      // Missing Populate
      candidateSelect.text = getCandidateName(response.data.idCandidate);
      dateInput.value = response.data.date.split('T')[0];
      statusInput.value = response.data.status;
    })
    .catch((err) => {
      console.log(err);
    });
};

const isNotEmpty = () => {
  if (companySelect.value === '') {
    errorList.push('Company is required');
  }
  if (candidateSelect.value === '') {
    errorList.push('Candidate is required');
  }
  if (dateInput.value === '') {
    errorList.push('Date is required');
    dateInput.classList.add('input-error');
    dateErrorMsg.classList.remove('hide');
  } else {
    dateInput.classList.remove('input-error');
    dateErrorMsg.classList.add('hide');
  }
};

window.onload = () => {
  getCompanies();
  getCandidates();
  if (params.get('_id')) {
    const title = document.getElementById('title');
    title.innerText = 'Edit Session';
    saveButton.value = 'UPDATE';
    getInterview();
  }
};

saveButton.addEventListener('click', () => {
  errorList = [];
  isNotEmpty();
  if (errorList.length === 0) {
    saveInterview();
  }
});
