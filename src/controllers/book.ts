import { Request, Response } from "express";
import { BookInput } from "models/book";
import {
  deleteBook,
  getBookById,
  getBooks,
  insertBook,
  updateBook,
} from "../repositories/book";

export const index = async (req: Request, res: Response) => {
  const { limit, offset } = req.params;

  // convert limit and offset to numbers
  let limitNumber = limit ? parseInt(limit as string) : 0;
  let offsetNumber = offset ? parseInt(offset as string) : 0;

  // get all books
  let data = getBooks(limitNumber, offsetNumber);

  res.json({ books: data.books, count: data.count });
};

export const create = async (req: Request, res: Response) => {
  const { title, author } = req.body;

  // validate the incoming data
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!author) {
    return res.status(400).json({ error: "Author is required" });
  }

  let book: BookInput = {
    title,
    author,
  };

  try {
    // create book
    let newBook = insertBook(book);

    // send response
    res.json({ book: newBook });
  } catch (error) {
    // send error response
    res.status(422).json({ error: "Book already exist" });
  }
};

export const show = async (req: Request, res: Response) => {
  // get book id from request params
  const { id } = req.params;

  try {
    // get book from database
    const book = getBookById(id);

    // send response
    res.json({ book });
  } catch (error) {
    // send error response
    res.status(404).json({ error: "Book doesn't exist" });
  }
};

export const update = async (req: Request, res: Response) => {
  // get book id from request params
  const { id } = req.params;
  const { title, author } = req.body;

  try {
    let book = updateBook(id, { title, author });

    // send response
    res.json({ book });
  } catch (error) {
    // send error response
    res.status(404).json({ error: "Book doesn't exist" });
  }
};

export const destroy = async (req: Request, res: Response) => {
  // get book id from request params
  const { id } = req.params;

  try {
    // delete book from database
    let deleted = deleteBook(id);

    // send response
    res.json({ deleted });
  } catch (error) {
    // send error response
    res.status(404).json({ error: "Book doesn't exist" });
  }
};
