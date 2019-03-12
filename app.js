const express = require('express');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./schema/schema');

// initialize express to app
const app = express();

// graphql middleware for app
app.use('/graphql', graphqlHttp({schema: graphqlSchema}));

// start application in 7878
app.listen(7878, () => {
	console.log("Listen requests");
});
