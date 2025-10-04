export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface Review {
  _id: string;
  user: User;
  book: Book;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Book {
  _id: string;
  title: string;
  author: User;
  image: string;
  rating: number;
  genre: string[];
  description: string;
  reviews: Review[];
}
