const Book = require("./models/Book");
const Patron = require("./models/Patron");
const Borrow = require("./models/Borrow");
const Author = require("./models/Author");
const Category = require("./models/Category");
const Fine = require("./models/Fine");

module.exports = {
  Query: {
    availableBooks: async () => {
      return Book.find({ available: { $gt: 0 } })
        .populate("author")
        .populate("category");
    },

    patron: async (_, { id }) => {
      return Patron.findById(id);
    },

    overdueBorrows: async () => {
      const today = new Date();
      return Borrow.find({
        due_date: { $lt: today },
        status: "borrowed",
      })
        .populate("book_id")
        .populate("patron_id");
    },
  },

  Patron: {
    borrows: async (parent) => {
      return Borrow.find({ patron_id: parent.id })
        .populate("book_id")
        .populate("patron_id");
    },
  },

  Borrow: {
    book: (parent) => parent.book_id,
    patron: (parent) => parent.patron_id,
    borrowDate: (p) => p.borrow_date,
    dueDate: (p) => p.due_date,
    returnDate: (p) => p.return_date,
  },

  Mutation: {
    createBorrow: async (_, { input }) => {
      const book = await Book.findById(input.bookId);

      if (book.available <= 0) {
        throw new Error("Book not available");
      }

      book.available -= 1;
      await book.save();

      const borrow = await Borrow.create({
        book_id: input.bookId,
        patron_id: input.patronId,
        borrow_date: new Date(),
        due_date: new Date(input.dueDate),
        status: "borrowed",
      });

      return borrow;
    },

    returnBook: async (_, { input }) => {
      const borrow = await Borrow.findById(input.borrowId);
      const book = await Book.findById(borrow.book_id);

      borrow.return_date = new Date();

      const today = new Date();
      if (today > borrow.due_date) {
        borrow.status = "overdue";

        const daysLate =
          Math.ceil((today - borrow.due_date) / (1000 * 60 * 60 * 24));

        await Fine.create({
          patron_id: borrow.patron_id,
          amount: daysLate * 10,
          reason: "Late return",
        });
      } else {
        borrow.status = "returned";
      }

      await borrow.save();

      book.available += 1;
      await book.save();

      return borrow;
    },
  },
};