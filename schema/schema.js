const graphql = require('graphql');
const { GraphQLObjectType,
				GraphQLString,
				GraphQLSchema,
				GraphQLID,
				GraphQLInt,
				GraphQLList,
			} = graphql;
const _ = require('lodash');

// dummy data
var books = [
	{ name: 'Green Book', genre: 'Love story', id: '1', authorId: '1' },
	{ name: 'Harry Potters', genre: 'Fantasy', id: '2', authorId: '2' },
	{ name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '1' },
	{ name: 'perter sandorson', genre: 'Fantasy', id: '4', authorId: '2' },
];

var authors = [
	{ name: 'Neymar Sabin', age: 44, id: '1' },
	{ name: 'Lionel Messi', age: 44, id: '2' },
	{ name: 'Christiano Ronaldo', age: 44, id: '3' },
];


// Object type definitions of book type
// TODO: // Type Relations
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				console.log(parent);
				return _.find(authors, { id: parent.authorId })
			}
		}
	}),
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return _.filter(books, { authorId: parent.id });
			}
		}
	})
})

// root query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args){
				// code to get data from db/other source
				return _.find(books, { id: args.id });
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args){
				// code to get data from db
				return _.find(authors, { id: args.id} );
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
