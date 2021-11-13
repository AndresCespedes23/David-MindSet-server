const Administrators = require('../models/Administrators'); // insted of re-write json we reach /models/Administrators where is the conection with Moongose and it's Schema

const getAll = (req, res) => {
  Administrators.find() // find() is from Moongose documentation
    .then((administrators) => res.json({ administrators }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

/*

const getAll = (req, res) => {
    res.json(adminData);
};

const getById = (req, res) => {
    const foundId = adminData.find(administrator => administrator.id === parseInt(req.params.id));
    if (!foundId) {
        return res.status(404).json({ message: `No administrator with the id of ${req.params.id} founded` });
    }
    res.json(foundId);
};

const getByName = (req, res) => {
    const foundName = adminData.filter(administrator => administrator.firstName === (req.params.name));
    if (foundName.length <= 0) {
        return res.status(404).json({ message: `No administrator with the first name of ${req.params.name} founded` });
    }
    res.json(foundName);
};

const add = (req, res) => {
    const newAdmin = {
        id: getLastId(adminData) +1,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        email: req.query.email,
        password: req.query.password,
        isActive: req.query.isActive
    };
    if (!validate(newAdmin)) {
        return res.status(400).json({ message: 'Some parameters are missing' });
    }
    adminData.push(newAdmin);
    fs.writeFile(path.join(__dirname, '../data/administrators.json'), JSON.stringify(adminData), err => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error adding administrator' });
        }
        res.json({ message: 'Administrator successfully added', administrator: newAdmin });
    });
};

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
  // getById,
  // getByName,
  // add,
  // edit,
  // remove,
};
