const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();
const PORT = 3500;
const mongoPath =
  'mongodb+srv://test:Qwerty@cluster0-ffx8k.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => console.log('Mongo Connected'));

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
