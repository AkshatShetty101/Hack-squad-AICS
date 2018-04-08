const ReqForm = require('../../models/request_form');
const Person = require('../../models/person');
const notificationsHelper = require('../../utils/notificationsHelper');
const mailerHelper = require('../../utils/mailerHelper');

module.exports = (req, res) => {
	if (req.body.data) {
		Person.find({ designation: 'admin' }, (err, result) => {
			if (err) {
				console.error(err);
				res.status(400).send(responseMessage.FAIL.SOMETHING_WRONG);
			} else {
				let promise = new Promise((resolve, reject) => {
					let ct = -1;
					let adminObj;
					async.each(result, (admin, callback) => {
						ReqForm.count({ admin_id: admin._id, is_closed: false }, (err, data) => {
							if (err) {
								console.error(err);
								reject(err);
							} else {
								if (ct === -1) {
									adminObj = admin;
									ct = data;
								} else if (ct > data) {
									ct = data;
									adminObj = admin;
								}
								callback();
							}
						});
					}, (err) => {
						console.error(err);
						err ? reject(err) : resolve(adminObj);
					});
				});
				promise.then((admin) => {
					const formData = new ReqForm({
						ra_id: res.locals.user._id,
						admin_id: '5ab9e461fb8efa268477780a',//admin._id
						data: req.body.data
					});
					formData.save((err, data) => {
						if (err) {
							console.error(err);
							res.status(400).send(responseMessage.FAIL.SOMETHING_WRONG);
						} else {
							let notifToSend = notificationMessage.ADMIN.RA_MAKE_REQ;
							notifToSend.data = { reqFormId: data._id.toString(), causerId: res.locals.user._id.toString() };
							notificationsHelper.addNotificationToQueue(admin._id.toString(), notifToSend);
							let mailToSend = mailerHelper.mailData(`
							${admin.name.firstName} ${admin.name.lastName} <${admin.email}>`,
							'A new request has been made', '',
							`Hey <b>${admin.name.firstName}</b>,<br/>
							<br/>
							<p>A new request has been made and assigned to you. Request_Id: <i>${data._id.toString()}</i></p>
							<br/>
							Thanks,<br/>
							AICS MeitY Team`);
							mailerHelper.sendMail(mailToSend);
							let messageToSend = responseMessage.SUCCESS.SUCCESS;
							messageToSend.reqFormId = data._id.toString();
							res.status(200).json(messageToSend);
						}
					});
				}).catch((err) => {
					console.error(err);
					res.status(400).send(responseMessage.FAIL.SOMETHING_WRONG);
				});
			}
		});
	} else {
		res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
	}
};