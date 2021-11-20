/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const candidateSelect = document.getElementById('candidate');
const openPositionSelect = document.getElementById('open-position');
const isActiveInput = document.getElementById('is-active');
const saveButton = document.getElementById('save-button');
const modalOk = document.getElementById('modal-ok');
const modalOkConfirm = document.getElementById('modal-ok-confirm');
const modalOkTitle = document.getElementById('modal-ok-title');
const modalOkData = document.getElementById('modal-ok-data');
const params = new URLSearchParams(window.location.search);
let candidatesArray = [];
let openPositionsArray = [];

modalOkConfirm.addEventListener('click', () => {
  modalOk.classList.toggle('modal-hide'); // 2 - de verdadero a falso
  window.location.href = `http://localhost:8000/api/views/applications/list-applications.html` /* 'https://basd-2021-david-mindset-dev.herokuapp.com/api/views/applications/list-applications.html' */;
});

// popula el dropdown de candidates
const getCandidates = () => {
  fetch(
    `http://localhost:8000/api/candidates` /* 'https://basd-2021-david-mindset-dev.herokuapp.com/api/candidates' */
  )
    .then((response) => response.json())
    .then((response) => {
      candidatesArray = response.candidates;
      response.candidates.forEach((candidates) => {
        const option = document.createElement('option');
        option.innerText = `${candidates.firstName} ${candidates.lastName}`;
        option.value = candidates._id;
        candidateSelect.append(option);
      });
    });
};

// popula el dropdown de open positions
const getOpenPositions = () => {
  fetch(
    `http://localhost:8000/api/open-positions` /* 'https://basd-2021-david-mindset-dev.herokuapp.com/api/open-positions' */
  )
    .then((response) => response.json())
    .then((response) => {
      openPositionsArray = response.data;
      response.data.forEach((openPosition) => {
        const option = document.createElement('option');
        option.innerText = `${openPosition.jobDescription}`;
        option.value = openPosition._id;
        openPositionSelect.append(option);
      });
    });
};

const openOkModal = (response) => {
  modalOk.classList.toggle('modal-hide'); // 1 - de falso a verdadero
  modalOkTitle.textContent = response.msg;
  modalOkData.textContent = `Candidate: ${response.data.idCandidate}. Open position: ${response.data.idOpenPosition}.`;
};

const addApplication = (data) => {
  fetch(
    `http://localhost:8000/api/applications` /* 'https://basd-2021-david-mindset-dev.herokuapp.com/api/applications' */,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateApplication = (data) => {
  fetch(
    `http://localhost:8000/api/applications/${params.get(
      'id'
    )}` /* `https://basd-2021-david-mindset-dev.herokuapp.com/api/applications/${params.get('id')}` */,
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      openOkModal(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
const saveApplication = () => {
  const data = {
    idCandidate: candidateSelect.value,
    idOpenPosition: openPositionSelect.value,
  };
  if (!params.get('id')) return addApplication(data);
  return updateApplication(data);
};

const getOpenPositionName = (id) => {
  const openPositions = openPositionsArray.find((element) => element._id === id);
  return `${openPositions.name}`;
};

const getCandidateName = (id) => {
  const candidate = candidatesArray.find((element) => element._id === id);
  return `${candidate.firstName} ${candidate.lastName}`;
};

// popula los inputs
const getApplication = () => {
  fetch(
    `http://localhost:8000/api/applications/${params.get(
      'id'
    )}` /* `https://basd-2021-david-mindset-dev.herokuapp.com/api/applications/${params.get('id')}` */
  )
    .then((response) => response.json())
    .then((response) => {
      candidateSelect.value = response.data.idCandidate;
      candidateSelect.text = getCandidateName(response.data.idCandidate);
      openPositionSelect.value = response.data.idOpenPosition;
      candidateSelect.text = getOpenPositionName(response.data.idOpenPosition);
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = () => {
  getOpenPositions();
  getCandidates();
  if (params.get('id')) {
    const title = document.getElementById('title');
    title.innerText = 'Edit application';
    saveButton.value = 'UPDATE';
    getApplication();
  }
};

saveButton.addEventListener('click', saveApplication);

/* // const navButton = document.getElementById('clientsNav');
// navButton.classList.add('activePage');

const idCandidateInput = document.getElementById('id-candidate');
const idOpenPositionInput = document.getElementById('id-open-position');
const form = document.getElementById('form');
const saveButton = document.getElementById('save-app');
// const errorMessage = document.getElementById('error_massage');

// guarda todos los params incluidos en la pagina actual
const params = new URLSearchParams(window.location.search);
saveButton.disabled = params.get('id');

//quitar error de validacion
const onFocusInput = () => {
  errorMessage.innerText = '';
};

idCompany.onfocus = onFocusInput;
idOpenPosition.onfocus = onFocusInput;


let url;
const options = {};

// se ejecuta al cargar la pagina y si se le pasa un ID por param.
//  Es un get para hacer la primer parte del edit y llenar los inputs con la info del id requerido
if (!params.get('id')) {
  options.method = 'POST';
  url = `http://localhost:8000/api/companies`;
} else {
  options.method = 'PUT'; // si se le pasa un id, hace edit
  url = `http://localhost:8000/api/companies/${params.get('id')}`;
  // http://127.0.0.1:8000/api/applications/618f5293f2412e289d0b409a

  // llama a getById segun el ID que se le agregó como param
  // origin is the main page
  fetch(url)
    .then((response) => {
      // si es distinto a 200 y 201, retorna la respuesta en json y luego tira error
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    })
    .then((response) => {
      idCandidateInput.value = response.name;
      idOpenPositionInput.value = response.email;
      saveButton.disabled = false;
    })
    .catch((error) => {
      console.log(error);
      // errorMessage.innerText = error;
    });
}

// se ejecuta al apretar submit
form.onsubmit = (event) => {
  // evita que se envíe a través del submit común de los html forms
  event.preventDefault();
  saveButton.disabled = true;
  // objeto con header y body
  options.headers = {
    'Content-Type': 'application/json',
  };
  options.body = JSON.stringify({
    name: idCandidateInput.value,
    email: idOpenPositionInput.value,
  });

  fetch(url, options)
    // http://127.0.0.1:8000/api/companies/618f5293f2412e289d0b409a
    .then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    })
    .then((response) => {
      console.log(response);
      // window.location.href = `http://localhost:8000/views/applications/list-applications.html`;
    })
    .catch((error) => {
      console.log(error);
      // errorMessage.innerText = error;
    })
    .finally(() => {
      saveButton.disabled = false;
    });
};

 */
