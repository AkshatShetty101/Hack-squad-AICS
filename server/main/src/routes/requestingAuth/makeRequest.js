const ReqForm = require('../../models/request_form');
const Person = require('../../models/person');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();

module.exports = (req, res) => {
	Person.find({ designation: 'admin' }, { _id: 1 }, (err, result) => {
		if (err) {
			res.status(400).send({ success: false, message: err });
		} else {
			console.log('here!');
			let promise = new Promise((resolve, reject) => {
				console.log('here!');
				var ct = -1;
				var adminId = '';
				for (let admin of result) {
					console.log('here!' + admin._id);
					ReqForm.count({ admin_id: admin._id, is_closed: false }, (err, data) => {
						if (err) {
							console.log(err);
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
						}
					}).then(()=>{
						resolve(adminId);
					});

				}
			});
			promise.then((id) => {
				console.log('in then!');
				var formData = new ReqForm({
					ra_id: res.locals.user._id,
					admin_id: id,
					data: req.body.data
				});
				formData.save((err) => {
					if (err) {
						res.status(400).send({ success: false, message: err });
					} else {
						//Make event
						myEmitter.emit('RA-REQ-ADMIN', id);
						res.status(200).send({ success: true, message: 'Request added successfully' });
					}
				});
			}).catch((err) => {
				res.status(400).send({ success: false, message: err });
			});
		}
	});
};