import Promise from 'bluebird';
global.Promise = Promise;

import express from 'express';
import {json, urlencoded} from 'body-parser';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './graphql';

mongoose.Promise = Promise;
const app = express();

app.use(json());
app.use(urlencoded({extended: true}));

// GraphqQL server route
app.use('/graphql', graphqlHTTP(req => ({
  schema,
  pretty: true
})));

/*app.post('/graphql', async (req, res) => {
  const params = req.body;
  console.log(params);
  const response = await graphql(schema, params);
  res.send(response);
});*/

// Connect mongo database
mongoose.createConnection('mongodb://localhost:27017/graphql').on('open', () => {
  console.log('Opened');
});

// start server
const server = app.listen(8080, () => {
  console.log('Listening at port', server.address().port);
});
