const express = require('express');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./schema/schema');
const mongoose = require('mongoose');

// initialize express to app
const app = express();

// connecting to the mongodb database
// mongoose.connect('mongodb://user:password@ds149365.mlab.com:49365/graphqlbookinfo')
mongoose.connection.once('open', () => {
	console.log("Connected to database: ")
})

// graphql middleware for app
app.use('/graphql', graphqlHttp({
	schema: graphqlSchema,
	graphiql: true,
}));

// start application in 7878
app.listen(7878, () => {
	console.log("Listen requests");
});
