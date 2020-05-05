const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const books = [
  { name: 'First book', genre: 'SciFi', id: 1, authorId: 1 },
  { name: 'Second book', genre: 'SciFi', id: 2, authorId: 1 },
  { name: 'Third book', genre: 'Fantasy', id: 2, authorId: 2 },
];

const authors = [
  { name: 'Scot', age: 44, id: 1 },
  { name: 'Jack', age: 57, id: 2 },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent) => {
        return authors.find((author) => author.id == parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    id: { type: GraphQLID },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent) => {
        return books.filter((book) => book.authorId == parent.id);
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return books.find((book) => book.id == args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => books,
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return authors.find((author) => author.id == args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => authors,
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
