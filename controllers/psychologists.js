let psyList = require("../data/psychologists");
const fs = require("fs");
const path = require("path");

const validate = (object) => {
	for (let key in object) {
		if (object[key] === undefined) {
			return false;
		}
	}
	return true;
};

const getLastId = (collection) => {
	let larger = 0;
	collection.forEach((element) => {
		if (element.id > larger) {
			larger = element.id;
		}
	});
	return larger;
};

const getAll = (req, res) => {
	res.json(psyList);
};

const getById = (req, res) => {
	const id = parseInt(req.params.id);
	const psyFound = psyList.find((psy) => psy.id === id);
	if (!psyFound) {
		return res.status(404).json({ message: `Psychologist not found with id: ${id}` });
	}
	res.json(psyFound);
};

const getByName = (req, res) => {
	const psyFound = psyList.filter(
		(psy) => psy.firstName === req.query.firstName && psy.lastName === req.query.lastName
	);
	if (psyFound.length <= 0) {
		return res.status(404).json({
			message: `Psychologist not found with name: ${psyFound.firstName} ${psyFound.lastName}`,
		});
	}
	res.json(psyFound);
};

const add = (req, res) => {
	const newPsy = {
		id: getLastId(psyList) + 1,
		firstName: req.query.firstName,
		lastName: req.query.lastName,
		email: req.query.email,
		pictureUrl: req.query.pictureUrl,
		isActive: req.query.isActive,
		password: req.query.password,
		turns: [],
	};
	if (!validate(newPsy)) {
		return res.status(400).json({ message: "Missing parameters" });
	}
	psyList.push(newPsy);
	fs.writeFile(path.join(__dirname, "../data/psychologists.json"), JSON.stringify(psyList), (err) => {
		if (err) {
			return res.status(500).json({ message: "Error adding Psy" });
		}
		res.json({ message: "Psychologist added successfully", psy: newPsy });
	});
};

const edit = (req, res) => {
	const id = parseInt(req.params.id);
	const psyFound = psyList.find((psy) => psy.id === id);
	if (!psyFound) {
		return res.status(404).json({ message: `Psychologist not found with id ${id}` });
	}
	psyList = psyList.map((psy) => {
		if (psy.id === id) {
			psy.firstName = req.query.firstName || psy.firstName;
			psy.lastName = req.query.lastName || psy.lastName;
			psy.email = req.query.email || psy.email;
			psy.pictureUrl = req.query.pictureUrl || psy.pictureUrl;
			psy.isActive = req.query.isActive || psy.isActive;
			psy.password = req.query.password || psy.password;
			psy.turns = [];
		}
		return psy;
	});
	fs.writeFile(path.join(__dirname, "../data/psychologists.json"), JSON.stringify(psyList), (err) => {
		if (err) {
			return res.status(500).json({ message: "Error editing psychologist" });
		}
		res.json({ message: "Psychologist edited successfully", psyFound });
	});
};

const remove = (req, res) => {
	const id = parseInt(req.params.id);
	const psyFound = psyList.find((psy) => psy.id === id);
	if (!psyFound) {
		return res.status(404).json({ message: `Psychologist not found with id ${id}` });
	}
	psyList = psyList.filter((psy) => psy.id !== id);
	fs.writeFile(path.join(__dirname, "../data/psychologists.json"), JSON.stringify(psyList), (err) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: "Error deleting psychologist" });
		}
		res.json({ message: "Psychologist deleted", psy: psyFound });
	});
};

module.exports = {
	getAll: getAll,
	getById: getById,
	getByName: getByName,
	add: add,
	edit: edit,
	remove: remove,
};
