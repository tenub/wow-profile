import express from 'express';
import expressValidator from 'express-validator';
import WoWCommunityAPI from 'wow-community';

const app = express();
const wow = new WoWCommunityAPI({ apiKey: process.env.BATTLE_API_KEY });

app.use(expressValidator({
	customSanitizers: {
		slug: (value) => (
			value.trim().toLowerCase().replace(/\s+/g, '-')
		)
	}
}));

app.get('/character/:realmName/:charName', (req, res) => {
	req.sanitizeParams('realmName').slug();
	req.sanitizeParams('charName').slug();
	req.checkParams('realmName', 'Invalid realm name').notEmpty().isAlpha();
	req.checkParams('charName', 'Invalid character name').notEmpty().isAlpha();

	const { realmName, charName } = req.params;

	return wow.character(realmName, charName, req.query)
		.then((data) => (
			res.json(data)
		))
		.catch(({ statusCode = 500, name, message }) => (
			res.status(statusCode).json({ name, message })
		));
});

app.get('/realm/:realmName?', (req, res) => {
	req.sanitizeParams('realmName').slug();
	req.checkParams('realmName', 'Invalid realm name').notEmpty().isAlpha();

	const { realmName } = req.params;

	return wow.realm(realmName, req.query)
		.then((data) => (
			res.json(data)
		))
		.catch(({ statusCode = 500, name, message }) => (
			res.status(statusCode).json({ name, message })
		));
});

app.get('/data/:dataType', (req, res) => {
	req.checkParams('dataType', 'Invalid data type').notEmpty().isAlpha();

	const { dataType } = req.params;

	return wow.data(dataType, req.query)
		.then((data) => (
			res.json(data)
		))
		.catch(({ statusCode = 500, name, message }) => (
			res.status(statusCode).json({ name, message })
		));
});

export default app;

