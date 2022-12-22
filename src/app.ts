import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema, root } from './controllers/controller';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

export { app };