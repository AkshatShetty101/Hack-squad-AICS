const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose, convertSchemaToGraphQL } = require('graphql-compose-mongoose');
const { default: ReqAuth, secondary: accessFormSchema } = require('../../../models/requesting_authority');

const customOptions = {};
const reqAuthTC = composeWithMongoose(ReqAuth, customOptions).removeField('password');

convertSchemaToGraphQL(accessFormSchema, 'participantData', schemaComposer);

// const add_idToArgs = (resolvers) => {
// 	Object.keys(resolvers).forEach((k) => {
// 		resolvers[k] = resolvers[k].wrapResolve(next => rp => {
// 			// rp = resolveParams = { source, args, context, info }
// 			if (rp.context.res.locals.user) {
// 				rp.args._id = rp.context.res.locals.user;
// 				next(rp);
// 			} else {
// 				throw new Error('[GraphQL] _id does not exist');
// 			}
// 		});
// 		return resolvers;
// 	});
// };

schemaComposer.rootQuery().addFields({
	raById: reqAuthTC.getResolver('findById'),
	raByIds: reqAuthTC.getResolver('findByIds'),
	raOne: reqAuthTC.getResolver('findOne'),
	raMany: reqAuthTC.getResolver('findMany'),
	raCount: reqAuthTC.getResolver('count')
});

module.exports = schemaComposer.buildSchema();