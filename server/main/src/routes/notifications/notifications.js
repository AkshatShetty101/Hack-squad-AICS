const notificationsHelper = require('../../utils/notificationsHelper');

module.exports = (req, res) => {
	let notifInterval;
	res.sseSetup();
	console.log('Notifications Set');
	activeNotificationSubscribersResponse[res.locals.user._id] = res;
	if (notifInterval) {
		clearInterval(notifInterval);
	}

	console.log(res.locals.user._id);
	notifInterval = setInterval(() => {
		notificationsHelper.getNotificationFromQueue(res.locals.user._id.toString())
			.then((notif) => {
				console.log(notif);
				if (notif) {
					console.log('Sending Notification');
					res.sseSend(notif);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}, 10000);
};