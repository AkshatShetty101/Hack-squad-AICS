const ReqForm = require('../../models/request_form');
const Person = require('../../models/person');
const notificationsHelper = require('../../utils/notificationsHelper');

module.exports = (req, res) => {
	Person.find({ designation: 'admin' }, { _id: 1 }, (err, result) => {
		if (err) {
			console.error(err);
			res.status(400).send(responseMessage.FAIL.SOMETHING_WRONG);
		} else {
			console.log('here!');
			let promise = new Promise((resolve, reject) => {
				console.log('here!');
				let ct = -1;
				let adminId = '';
				async.each(result, (admin, callback) => {
					console.log('here!' + admin._id);
					ReqForm.count({ admin_id: admin._id, is_closed: false }, (err, data) => {
						if (err) {
							console.error(err);
							reject(err);
						} else {
							console.log(data);
							if (ct == -1) {
								adminId = admin._id;
								ct = data;
							} else if (ct > data) {
								ct = data;
								adminId = admin._id;
							}
							callback();
						}
					});
				}, (err) => {
					console.log(ct,adminId);
					err ? reject(err) : resolve(adminId);
				});
			});
			promise.then((id) => {
				console.log('in then!');
				console.log(id);
				console.log(res.locals.user._id);
				var formData = new ReqForm({
					ra_id: res.locals.user._id,
					admin_id: id,
					data: req.body.data
				});
				formData.save((err, data) => {
					if (err) {
						console.error(err);
						res.status(400).send(responseMessage.FAIL.SOMETHING_WRONG);
					} else {
						const notifToSend = notificationMessage.ADMIN.RA_MAKE_REQ;
						notifToSend.data = { reqFormId: data._id };
						notificationsHelper.addNotificationToQueue(id, notifToSend);
						res.status(200).send(responseMessage.SUCCESS.SUCCESS);
					}
				});
			}).catch((err) => {
				console.error(err);
				res.status(400).send(responseMessage.FAIL.SOMETHING_WRONG);
			});
		}
	});
};