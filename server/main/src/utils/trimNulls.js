const trim_nulls = (data) => {
	let y;
	for (const x in data) {
		y = data[x];
		// console.log("Inside!:" + JSON.stringify(y).charAt(3));
		if (JSON.stringify(y).charAt(2) == '$' && JSON.stringify(y).charAt(9) != '"')
			continue;
		if (y === 'null' || y === null || JSON.stringify(y) == '{"$in":[""]}' || y === '' || typeof y === 'undefined' || (y instanceof Object && Object.keys(y).length == 0)) {
			console.log(data[x]);
			delete data[x];
			console.log(data);
		}
		if (y instanceof Object && JSON.stringify(y).charAt(2) != '$') 
			y = trim_nulls(y);
		console.log(data);
	}
	return data;
};

module.exports = trim_nulls;