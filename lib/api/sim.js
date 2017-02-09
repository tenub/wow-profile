import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import SimC from '../simc';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.post('/profile', (req, res) => {
	const options = req.body;

	req.checkBody({
		region: {
			isIn: {
				options: ['us', 'eu'],
				errorMessage: 'Region must be "us" or "eu"'
			}
		},
		realm: {
			matches: {
				options: [/[a-z-]+/],
				errorMessage: 'Realm contains non-alpha symbols'
			}
		},
		charName: {
			isAlpha: {
				errorMessage: 'Character name contains non-alpha symbols'
			},
			isLength: {
				options: [{ min: 2, max: 12 }],
				errorMessage: 'Character name must have length 2 to 12'
			}
		}
	});

	return req.getValidationResult()
		.then((result) => {
			if (!result.isEmpty()) {
				return res.status(400).send(result.array());
			}

			return new SimC(options).profile();
		})
		.then((data) => (
			res.set('Content-Type', 'text/plain').send(data)
		))
		.catch((err) => (
			res.status(500).json(err)
		));
});

app.post('/report', (req, res) => {
	const options = req.body;

	req.checkBody({
		region: {
			isIn: {
				options: ['us', 'eu'],
				errorMessage: 'Region must be "us" or "eu"'
			}
		},
		realm: {
			matches: {
				options: [/[a-z-]+/],
				errorMessage: 'Realm contains non-alpha symbols'
			}
		},
		charName: {
			isAlpha: {
				errorMessage: 'Character name contains non-alpha symbols'
			},
			isLength: {
				options: [{ min: 2, max: 12 }],
				errorMessage: 'Character name must have length 2 to 12'
			}
		},
		maxTime: {
			optional: true,
			isInt: {
				options: [{ min: 1, max: 3600 }],
				errorMessage: 'Max time must be between 1 and 3600'
			}
		},
		reportDetails: {
			optional: true,
			isBoolean: {
				errorMessage: 'Report details must be true or false'
			}
		},
		ilevelRaidReport: {
			optional: true,
			isBoolean: {
				errorMessage: 'ilevel raid report must be true or false'
			}
		},
		iterations: {
			optional: true,
			isInt: {
				options: [{ min: 1, max: 100000 }],
				errorMessage: 'Iterations must be between 1 and 100000'
			}
		},
		targetError: {
			optional: true,
			isFloat: {
				options: [{ min: 0.01, max: 0.99 }],
				errorMessage: 'Target error must be between 0.01 and 0.99'
			}
		}
	});

	return req.getValidationResult()
		.then((result) => {
			if (!result.isEmpty()) {
				res.status(400).send(result.array());
				return false;
			}

			return new SimC(options).report();
		})
		.then((data) => (
			data ? res.set('Content-Type', 'application/json').send(data) : null
		))
		.catch((err) => (
			res.status(500).json(err)
		));
});

export default app;
