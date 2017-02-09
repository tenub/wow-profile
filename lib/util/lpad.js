export default (number, width = 2, padder = '0') => {
	const n = String(number);
	const p = String(padder);
	return (p.repeat(width) + n).slice(n.length);
};
