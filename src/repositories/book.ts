import { randomUUID } from "crypto";
import { Book, BookInput, BookUpdateInput } from "../models/book";

const books: Book[] = [];

export const getBooks = (
  limit: number = 0,
  skip: number = 0
): { count: number; books: Book[] } => {
  if (limit === 0) {
    return { count: books.length, books };
  }
  return {
    count: books.length,
    books: books.slice(skip, skip + limit),
  };
};

export const insertBook = (book: BookInput): Book => {
  const newBook: Book = {
    id: randomUUID(),
    title: book.title,
    author: book.author,
  };

  const existingBook = books.find(
    (book) => book.title === newBook.title && book.author === newBook.author
  );

  if (existingBook) {
    throw new Error("Book already exists");
  }

  books.push(newBook);

  return newBook;
};

export const getBookById = (id: string): Book => {
  const book = books.find((book) => book.id === id);

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
};

export const updateBook = (id: string, book: BookUpdateInput): Book => {
  const existingBook = books.find((book) => book.id === id);
  if (!existingBook) {
    throw new Error("Book not found");
  }

  if (book.title) {
    existingBook.title = book.title;
  }

  if (book.author) {
    existingBook.author = book.author;
  }

  return existingBook;
};

export const deleteBook = (id: string): boolean => {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    throw new Error("Book not found");
  }
  books.splice(index, 1);
  return true;
};
