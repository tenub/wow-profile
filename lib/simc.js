import path from 'path';
import Promise from 'bluebird';

import { spawnAsync, readFileAsync } from './async';

function execSim(filepath, args) {
	return new Promise((resolve, reject) => (
		spawnAsync('simc', args)
			.then(() => (
				readFileAsync(filepath)
			))
			.then((data) => (
				resolve(data.toString())
			))
			.catch((err) => (
				reject(err)
			))
	));
}

class SimC {
	constructor(options) {
		this.options = Object.assign({
			maxTime: 300,
			reportDetails: 0,
			ilevelRaidReport: 1,
			iterations: 1000,
			targetError: 0.2
		}, options);
	}

	profile() {
		const confPath = path.resolve(__dirname, '..', 'data', 'profiles', `${this.options.region}_${this.options.realm}_${this.options.charName}.simc`);
		return execSim(confPath, [
			`armory=${this.options.region},${this.options.realm},${this.options.charName}`,
			`save=${confPath}`
		]);
	}

	report() {
		const confPath = path.resolve(__dirname, '..', 'data', 'profiles', `${this.options.region}_${this.options.realm}_${this.options.charName}.simc`);
		const jsonPath = path.resolve(__dirname, '..', 'data', 'reports', `${this.options.region}_${this.options.realm}_${this.options.charName}.json`);
		return execSim(jsonPath, [
			confPath,
			`json=${jsonPath}`,
			`max_time=${this.options.maxTime}`,
			`report_details=${this.options.reportDetails}`,
			`ilevel_raid_report=${this.options.ilevelRaidReport}`,
			`iterations=${this.options.iterations}`,
			`target_error=${this.options.targetError}`
		]);
	}
}

export default SimC;
