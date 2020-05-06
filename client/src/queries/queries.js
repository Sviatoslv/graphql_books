import { gql } from 'apollo-boost';

export const AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const BOOKS = gql`
  {
    books {
      name
      genre
      id
      author{
        name
        id
      }
    }
  }
`;

export const GET_BOOK = gql`
  query ($id: ID!){
    book(id: $id) {
      name
      genre
      id
      author{
        name
        age
        id
        books{
          name
          id
        }
      }
    }
  }
`;
