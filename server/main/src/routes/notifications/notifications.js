const notificationsHelper = require('../../utils/notificationsHelper');

module.exports = (req, res) => {
	console.log('her1e');
	let notifInterval;
	res.sseSetup();
	activeNotificationSubscribersResponse[res.locals.user._id] = res;
	if (notifInterval) {
		clearInterval(notifInterval);
	}

	console.log(res.locals.user._id);
	notifInterval = setInterval(() => {
		console.log('here');
		notificationsHelper.getNotificationFromQueue(res.locals.user._id.toString())
			.then((notif) => {
				console.log(notif);
				if (notif) {
					res.sseSend(notif);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}, 10000);
};