// Declaring constants
const Form = require('../../models/form');
const ReqForm = require('../../models/request_form');

module.exports = (req, res, next) => {
    // Setting new form data
    if (req.body.formId && res.locals.requestId) {
        const data = {
            form: {
                form_id: req.body.formId,
                is_approved: true
            },
            is_closed: true
        };
        console.log(res.locals.requestId);
        ReqForm.findByIdAndUpdate(res.locals.requestId, { $set: data }, { new: true }, (err, result) => {
            if (err) {
                console.error(err);
                res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
            } else {
                // Added to DB successfully
                // Now passing control to blockchain
                Form.findByIdAndUpdate(req.body.formId, { $set: { is_completed: true } }, (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
                    } else {
                        console.log(result);
                        if (result) {
                            res.locals.other_id = res.locals.user._id;
                            console.log('Set form status as completed!');
                            next();
                        } else {
                            res.status(400).json(responseMessage.FAIL.FORM.NOT_EXISTS);
                        }
                    }
                });
            }
        });
    } else {
        res.status(400).json(responseMessage.FAIL.INC_INV_DATA);
    }
};