const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent) => {
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent) => {
        return Book.find({ authorId: parent.id });
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
        return Book.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => Book.find({}),
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Author.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => Author.find({}),
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        let author = new Author({
          name: args.name,
          age: args.age,
        });

        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });

        return book.save();
      },
    },
    updateBook: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve: (paretn, args) => {
        return Book.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              genre: args.genre,
              authorId: args.authorId,
            },
          },
          {
            new: true,
            useFindAndModify: false,
          }
        );
      },
    },
    deleteBook: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Book.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
