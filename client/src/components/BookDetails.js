import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOK } from '../queries/queries';
import { Loading } from './UI/Loading';
import { Error } from './UI/Error';

export const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  });
if (loading) return <Loading />;
  if (bookId && error) return <Error error={error} />;

  const { name, genre, author } = data ? data.book : {};

  return (
    <div className="book-details">
      <h2>Booke Deteils</h2>
      {data ? (
        <>
          <h3>{name}</h3>
          <p>{genre}</p>
          <h4>{author.name}</h4>
          <p>List of {author.name} books:</p>
          <ul>
            {author.books.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>No selected book</p>
      )}
    </div>
  );
};
