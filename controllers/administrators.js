const fs = require('fs');
let adminData = require('../data/administrators.json');

const getAll = (req, res) => {
    res.json(adminData) 
};

const getById = (req, res) => {
    const foundId = adminData.some(administrator => administrator.id === parseInt(req.params.id));
    if (foundId) {
        res.json(adminData.filter(administrator => administrator.id === parseInt(req.params.id)))
    }   else {
        res.status(404).json({ msg: `No administrator with the id of ${req.params.id} founded` })
    }
};

const getByName = (req, res) => {
    const foundName = adminData.some(administrator => administrator.firstName === (req.params.name));
    if (foundName) {
        res.json(adminData.filter(administrator => administrator.firstName === (req.params.name)))
    }   else {
        res.status(404).json({ msg: `No administrator with the first name of ${req.params.name} founded` })
    }
};

const add = (req, res) => {
    const newAdmin = {
        id: req.query.id,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        email: req.query.email,
        password: req.query.password,
        isActive: req.query.isActive
    }

    adminData.push(newAdmin)
    fs.writeFile("./data/administrators.json", JSON.stringify(adminData), err => {
        if (err) { res.status(500) }
      })
    res.json(newAdmin)
};

const edit = (req, res) => {
    const editAdmin = adminData.some(administrator => administrator.id === parseInt(req.params.id));

    if (editAdmin) {
        const updAdmin = req.query;
        adminData.forEach(administrator => {
            if (administrator.id === parseInt(req.params.id)) {
                administrator.firstName = updAdmin.firstName ? updAdmin.firstName : administrator.firstName;
                administrator.lastName = updAdmin.lastName ? updAdmin.lastName : administrator.lastName;
                administrator.email = updAdmin.email ? updAdmin.email : administrator.email;
                administrator.password = updAdmin.password ? updAdmin.password : administrator.password;
                administrator.isActive = updAdmin.isActive ? updAdmin.isActive : administrator.isActive;

                fs.writeFile('./data/administrators.json', JSON.stringify(adminData), (err) => {
                    if (err) {
                      res.status(500).json({ message: "Error editing administrator" });
                    }
                  });

                res.json({ msg: "Administrator updated", administrator })
            }
        })
    } else {
        res.status(404).json({ msg: `No administrator with the id of ${req.params.id} founded` })
    }
};

const remove = (req, res) => {
    const foundIdDeleted = adminData.some(administrator => administrator.id === parseInt(req.params.id));

    if (foundIdDeleted) {
        const newAdmins = adminData.filter((administrator) => administrator.id !== parseInt(req.params.id));
        fs.writeFile('./data/administrators.json', JSON.stringify(newAdmins), (err) => {
            if (err) {
              console.log(err);
              res.status(500).json({ msg: "Error removing administrator" });
            }
        });
        res.json({ msg: "Administrator removed" });
    }   else {
        res.status(404).json({ msg: `No administrator with the id of ${req.params.id} founded` })
    }
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove
};