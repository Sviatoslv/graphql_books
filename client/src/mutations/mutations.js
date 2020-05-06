import { gql } from 'apollo-boost';

export const ADD_BOOK = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation($id: ID!) {
    deleteBook(id: $id) {
      name
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!, $id: ID!) {
    updateBook(
      name: $name,
      genre: $genre,
      id: $id,
      authorId: $authorId,
    ) {
      name
    }
  }
`;
