export type Book = {
  id: string;
  title: string;
  author: string;
};

export type BookInput = {
  title: string;
  author: string;
};

export type BookUpdateInput = {
  title?: string;
  author?: string;
};
