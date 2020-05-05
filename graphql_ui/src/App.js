import React from 'react';
import { BookList } from './components/BooksList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://192.168.0.103:3500/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1 className="App-header">Graphql React List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
};

export default App;
