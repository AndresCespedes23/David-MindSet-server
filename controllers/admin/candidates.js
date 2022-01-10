const Candidates = require('../../models/Candidates');
const Users = require('../../models/Users');

const notFoundText = 'Candidate not found by';

const getAll = (req, res) => {
  Candidates.find()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ msg: `Error: ${error}`, error: true }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Candidates.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundText} ID: ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

// const search = (req, res) => {
//   const queryParam = req.query;
//   const firstName = queryParam.name.toLowerCase() || null;
//   if (!firstName) return res.status(400).json({ msg: 'Missing query param: name', error: true });
//   return Candidates.find({ firstName })
//     .then((data) => {
//       if (data.length === 0) {
//         return res.status(404).json({ msg: `${notFoundText} name: ${firstName}`, error: true });
//       }
//       return res.status(200).json(data);
//     })
//     .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
// };

const edit = (req, res) => {
  const { id } = req.params;
  Candidates.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundText} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Candidate updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    // ¿¿¿¿COMO HAGO PARA AGARRAR PARA SABER SI NO LO ENCUENTRA SIN SER UN ERROR????
    // SALE POR EL CATCH EN VEZ DE DEVOLVERME VACIO
    const candidate = await Candidates.findById(id);
    const { email } = candidate;
    await Candidates.findByIdAndRemove(id);
    await Users.findOneAndRemove({ email });
    return res.status(200).json({ msg: 'Candidate deleted', data: candidate });
  } catch (err) {
    return res.status(500).json({ msg: `Error: ${err}`, error: true });
  }
};
// const remove = (req, res) => {
//   const { id } = req.params;
//   Candidates.findByIdAndRemove(id)
//     .then((data) => {
//       if (!data) return res.status(404).json({ msg: `${notFoundText} ID: ${id}`, error: true });
//       return res.status(200).json({ msg: 'Candidate deleted', data });
//     })
//     .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
// };

module.exports = {
  getAll,
  getById,
  // search,
  edit,
  remove,
};
