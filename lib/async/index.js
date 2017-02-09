import Promise from 'bluebird';

const spawnAsync = Promise.promisify(require('child_process').spawn);
const readFileAsync = Promise.promisify(require('fs').readFile);

export { spawnAsync, readFileAsync };
