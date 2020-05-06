import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { BOOKS } from '../queries/queries';
import { DELETE_BOOK } from '../mutations/mutations';
import './bookList.css';
import { BookDetails } from './BookDetails';
import { Loading } from './UI/Loading';
import { AddBook } from './AddBook';

export const BookList = () => {
  const [editedBook, setEditedBook] = React.useState(null)
  const [bookId, setBookId] = React.useState('');
  const { loading, data } = useQuery(BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: BOOKS }],
  });
  const { books = [] } = data || {};

  const handleDeleteBook = (id) => {
    deleteBook({
      variables: { id: id },
    });
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="books-container">
        <ul className="book-list">
          {books.map((book) => (
            <li
              key={book.id}
              className="list-item"
              onClick={() => setBookId(book.id)}
            >
              {book.name}
              <div>
                <button
                  aria-label="edit book"
                  className="button button--secondary button--edit"
                  onClick={() => setEditedBook(book)}
                />
                <button
                  aria-label="delete book"
                  className="button button--secondary button--delete"
                  onClick={() => handleDeleteBook(book.id)}
                />
              </div>
            </li>
          ))}
        </ul>
        <BookDetails bookId={bookId} />
      </div>
      <AddBook editedBook={editedBook} setEditedBook={setEditedBook}/>
    </div>
  );
};
