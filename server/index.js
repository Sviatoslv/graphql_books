const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');

const app = express();
const PORT = 3500;

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get('/', (req, res) => {
  res.send('Test');
});

app.listen(PORT, (err) =>
  console.log(err ? err : `Server running at http://192.168.0.103:${PORT}/`)
);
