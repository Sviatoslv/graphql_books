import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AUTHORS, BOOKS } from '../queries/queries';
import { ADD_BOOK, UPDATE_BOOK } from '../mutations/mutations';

export const AddBook = ({ editedBook, setEditedBook }) => {
  const [book, setBook] = React.useState({
    name: '',
    genre: '',
    authorId: '',
  });
  const { loading, data } = useQuery(AUTHORS);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: BOOKS }],
  });
  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: BOOKS }],
  });

  React.useEffect(() => {
    if (editedBook) {
      setBook({
        name: editedBook.name,
        genre: editedBook.genre,
        authorId: editedBook.author.id,
      });
    }
  }, [editedBook]);

  const handleInputs = ({ target: { name, value } }) => {
    setBook((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const bookValues = Object.values(book);
    if (bookValues.some((value) => !value)) {
      return;
    }

    if (editedBook) {
      updateBook({ variables: { ...book, id: editedBook.id } });
    } else {
      addBook({ variables: book });
    }

    setBook({
      name: '',
      genre: '',
      authorId: '',
    });
  };

  const handleCancel = () => {
    setEditedBook(null);

    setBook({
      name: '',
      genre: '',
      authorId: '',
    });
  };

  return (
    <AddBookForm
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputs={handleInputs}
      book={book}
      loading={loading}
      data={data}
    />
  );
};

const AddBookForm = ({
  handleSubmit,
  handleCancel,
  handleInputs,
  book,
  loading,
  data,
}) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Book Name
        <input
          type="text"
          onChange={handleInputs}
          name="name"
          value={book.name}
        />
      </label>

      <label>
        Book Genre
        <input
          type="text"
          onChange={handleInputs}
          name="genre"
          value={book.genre}
        />
      </label>

      <label>
        Author:
        <select onChange={handleInputs} name="authorId" value={book.authorId}>
          <option hidden>Select Author</option>
          {loading ? (
            <option>Loading...</option>
          ) : (
            data.authors?.map((author, index) => {
              return (
                <option value={author.id} key={author.id}>
                  {author.name}
                </option>
              );
            })
          )}
        </select>
      </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};
