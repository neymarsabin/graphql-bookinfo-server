const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Object type definitions of book type
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	}),
});

// root query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLString }},
			resolve(parent, args){
				// code to get data from db/other source
			}
		}
	},
});

// rootQuery = expected query from the frontend
// book(id:'123'){
//   name
//   genre
// }

module.exports = new GraphQLSchema({
	query: RootQuery
});
