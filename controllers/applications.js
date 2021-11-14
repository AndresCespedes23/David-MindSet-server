const Applications = require('../models/Applications');

const getAll = (req, res) => {
    Applications.find()
        .then((applications) => {
            return res.json({applications})
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
};

const getByPosition = (req, res) => {
    const { id } = req.params;
    Applications.find({ idOpenPosition: id })
    .then((data) => {
        if (data.length === 0) {
            return res.status(404).json({ msg: `Position not found by Position ID: ${id}` });
        }
        return res.json ({ data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getByCandidate = (req, res) => {
    const { id } = req.params;
    Applications.find({ idCandidate: id })
    .then((data) => {
        if (data.length === 0) {
            return res.status(404).json({ msg: `Candidate not found by Candidate ID: ${id}` });
        }
        return res.json ({ data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};




const add = (req, res) => {
    const newApplication = new Applications({
      idOpenPosition: req.body.idOpenPosition,
      idCandidate: req.body.idCandidate,
      isActive: true,
    });
    newApplication
      .save()
      .then((data) => res.json({ msg: 'Application added', data }))
      .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
  };

const edit = (req, res) => {
  const { id } = req.params;
  Applications.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `Application not found by ID: ${id}` });
      }
      return res.json({ msg: 'Appication updated', data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};
/*
const remove = (req, res) => {
    const id = parseInt(req.params.id);
    let remObj = applications.find((applications) => applications.id === id);
    if (remObj === null) {
        return res.status(400).json({ message: `no application with id: ${id}` });
    }
    const newList = applications.filter((applications) => applications.id !== id);
    fs.writeFile(path.join(__dirname, '../data/applications.json'), JSON.stringify(applications), (err) => {
        if (err) {
            return res.status(500).json({ message: 'error deleting application' }) 
        };
        res.json({ message: 'Application deleted' });
    });
};*/

module.exports = {
    getAll,
    //getById: getById,
    getByPosition,
    getByCandidate,
    add,
    edit,
   // remove: remove
};
