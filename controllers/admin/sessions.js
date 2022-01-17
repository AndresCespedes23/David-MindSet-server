const Sessions = require('../../models/Sessions');

const notFoundTxt = 'Session not found with ID:';

const getAll = (req, res) => {
  Sessions.find({ $or: [{ status: 'pending' }, { status: 'done' }] })
    .populate('idPsychologist', 'firstName lastName')
    .populate('idCandidate', 'firstName lastName')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Sessions.findById(id)
    .populate('idPsychologist', 'firstName lastName')
    .populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const cancelOutdatedSessions = async (req, res) => {
  const { id } = req.params;
  try {
    const sessions = await Sessions.find({
      $and: [
        { $or: [{ idPsychologist: id }, { idCandidate: id }] },
        { $or: [{ status: 'pending' }, { status: 'done' }] },
      ],
    });
    if (!sessions.length) return res.status(200).json({ msg: `No sessions found for id: ${id}` });
    await Promise.all(
      sessions.map(async (session) => {
        const newSession = session;
        newSession.status = 'cancelled';
        await Sessions.findByIdAndUpdate(session._id, newSession, { new: true });
      }),
    );
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}`, error: true });
  }
  return res.status(200).json({ msg: 'Session(s) cancelled' });
};

module.exports = {
  getAll,
  getById,
  cancelOutdatedSessions,
};
