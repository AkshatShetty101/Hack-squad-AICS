const rand = function () {
	return Math.random().toString(36).substr(2); // remove `0.`
};

const token = function (type) {
	if (type === 'auth') {
		return rand() + rand(); // to make it longer
	} else if (type === 'id') {
		return rand();
	}

};


function getAuthToken() {
	return token('auth');
}

function getUserIdentifier() {
	return token('id');
}

module.exports = {
	getAuthToken: getAuthToken,
	getUserIdentifier: getUserIdentifier
};
