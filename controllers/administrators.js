const fs = require('fs');
let adminData = require('../data/administrators.json');

const calculateLarge = group => {
    let large = 0;
    group.forEach(element => {
      if (element.id > large) {
        large = element.id;
      }
    });
    return large;
};

const validate = (entity) => {
    for (let key in entity) {
      if (entity[key] === undefined) {
        return false;
      }
    }
    return true;
};

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
        id: calculateLarge(adminData) +1,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        email: req.query.email,
        password: req.query.password,
        isActive: req.query.isActive
    }

    if (validate(newAdmin)) {
        adminData.push(newAdmin)
        fs.writeFile("./data/administrators.json", JSON.stringify(adminData), err => {
            if (err) { 
                res.status(500).json({ msg: "Error adding administrator" }) 
            }
        });
        res.json({ msg: "Administrator succesfully added", newAdmin })
    } else {
        res.status(400).json({ msg: "Some parameters are missing" })
    }
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