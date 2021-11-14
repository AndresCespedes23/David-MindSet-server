const Administrators = require('../models/Administrators'); // insted of re-write json we reach /models/Administrators where is the conection with Moongose and it's Schema

const getAll = (req, res) => {
  Administrators.find() // find() is from Moongose documentation
    .then((administrators) => res.json({ administrators }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Administrators.findById(id)
    .then((administrators) => {
      if (!administrators) {
        return res.status(404).json({ msg: `Administrators not found by ID: ${id}` });
      }
      return res.json({ administrators });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getByName = (req, res) => {
  const { name } = req.params;
  Administrators.find({ firstName: name.toLowerCase() })
    .then((administrators) => {
      if (administrators.length === 0) {
        return res.status(404).json({ msg: `Administrators not found by name: ${name}` });
      }
      return res.json({ administrators });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const add = (req, res) => {
  const newAdministrator = new Administrators({
    firstName: req.body.firstName.toLowerCase(),
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    isActive: true,
  });
  newAdministrator
    .save()
    .then((data) => res.json({ msg: 'Administrator created', data }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const edit = (req, res) => {
  const { id } = req.params;
  req.body.firstName = req.body.firstName.toLowerCase();
  Administrators.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `Administrator not fund by ID: ${id}` });
      }
      return res.json({ msg: 'Administrator updated', data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

/*
const edit = (req, res) => {
    const editAdmin = adminData.find(administrator => administrator.id === parseInt(req.params.id));
    if (!editAdmin) {
        return res.status(404).json({ message: `No administrator with the id of ${req.params.id} founded` });
    }
    adminData = adminData.map(administrator => {
        if (administrator.id === parseInt(req.params.id)) {
            administrator.firstName = req.query.firstName || administrator.firstName;
            administrator.lastName = req.query.lastName || administrator.lastName;
            administrator.email = req.query.email || administrator.email;
            administrator.password = req.query.password || administrator.password;
            administrator.isActive = req.query.isActive || administrator.isActive;
        }
        return administrator;
    });
    fs.writeFile(path.join(__dirname, '../data/administrators.json'), JSON.stringify(adminData), (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error editing administrator' });
        }
        res.json({ message: 'Administrator updated', editAdmin });
    });
};

const remove = (req, res) => {
    const foundIdDeleted = adminData.find(administrator => administrator.id === parseInt(req.params.id));
    if (!foundIdDeleted) {
        return res.status(404).json({ message: `No administrator with the id of ${req.params.id} founded` });
    }
    adminData = adminData.filter(administrator => administrator.id !== parseInt(req.params.id));
    fs.writeFile(path.join(__dirname, '../data/administrators.json'), JSON.stringify(adminData), (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error removing administrator' });
        }
        res.json({ message: 'Administrator removed' });
    });
};
*/
module.exports = {
  getAll,
  getById,
  getByName,
  add,
  edit,
  // remove,
};
