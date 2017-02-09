export default (value) => (
	value.split(/(?=[A-Z])/).map((part) => (
		part.length > 1 ? part.slice(0, 1).concat(part.slice(1)) : part
	)).join(' ')
);
