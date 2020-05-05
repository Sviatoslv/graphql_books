import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const BOOKS = gql`
  {
    books {
      name
      id
    }
  }
`;

export const BookList = () => {
  const { loading, data } = useQuery(BOOKS);
  const { books = [] } = data || {};

  return loading ? (
    <div>Loading...</div>
  ) : (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  );
};
