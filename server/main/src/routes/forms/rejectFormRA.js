var Form = require('../../models/form');

module.exports = (req, res, next) => {
    Form.findById(req.body.formId, { created_by: 1 }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(400).json(responseMessage.FAIL.SOMETHING_WRONG);
        } else {
            if (result) {
                res.locals.admin_id = result.created_by;
                next();
            } else {
                res.status(400).json(responseMessage.FAIL.FORM.NOT_EXISTS);
            }
        }

    });
};