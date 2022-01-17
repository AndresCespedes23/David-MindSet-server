const OpenPosition = require('../../models/OpenPosition');

const getAll = (req, res) => {
  OpenPosition.find()
    .populate('idCompany', 'name')
    .populate('idProfile', 'name')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

module.exports = {
  getAll,
};
