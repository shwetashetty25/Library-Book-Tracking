const { gql } = require("apollo-server-express");

module.exports = gql`
  type Author {
    id: ID!
    name: String
    biography: String
    birthYear: Int
  }

  type Category {
    id: ID!
    name: String
    description: String
  }

  type Book {
    id: ID!
    isbn: String
    title: String
    author: Author
    publisher: String
    category: Category
    totalCopies: Int
    available: Int
  }

  type Patron {
    id: ID!
    name: String
    email: String
    membershipDate: String
    membershipType: String
    borrows: [Borrow]
  }

  type Borrow {
    id: ID!
    book: Book
    patron: Patron
    borrowDate: String
    dueDate: String
    returnDate: String
    status: String
  }

  type Fine {
    id: ID!
    patron: Patron
    amount: Float
    reason: String
    paidDate: String
  }

  type Query {
    availableBooks: [Book]
    patron(id: ID!): Patron
    overdueBorrows: [Borrow]
  }

  input BorrowInput {
    bookId: ID!
    patronId: ID!
    dueDate: String!
  }

  input ReturnInput {
    borrowId: ID!
  }

  type Mutation {
    createBorrow(input: BorrowInput): Borrow
    returnBook(input: ReturnInput): Borrow
  }
`;