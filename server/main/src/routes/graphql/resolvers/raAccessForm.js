var { GraphQLString } = require('graphql');
const { default: ReqAuth } = require('../../../models/requesting_authority');

module.exports = {
	type: 'Json',
	description: 'Array of access_form objects',
	args: {
		access_form_id: GraphQLString
	},
	resolve: (source, { access_form_id }, { req, res }, info) => {
		return new Promise((resolve, reject) => {
			const query = { _id: res.locals.user.id };
			if (access_form_id) {
				query['access_form.$._id'] = access_form_id;
			}
			console.log('query_ra:', query);
			ReqAuth.findById(query, (err, data) => {
				console.log('data:', data);
				let result = data.access_form;
				return err ? reject(err) : resolve(result);
			});
		});
	}
};