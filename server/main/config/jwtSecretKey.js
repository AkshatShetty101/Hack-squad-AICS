const generateRandomString = () => { return Math.random().toString(36).substr(2); }

module.exports = {
	"secret": generateRandomString() + generateRandomString() + generateRandomString()
}