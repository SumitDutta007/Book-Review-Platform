export interface User {
  _id: string;
  username: string;
}

export interface Book {
  _id: string;
  title: string;
  author: User;
  image: string;
  rating: number;
  genre: string[];
  description: string;
  reviews: any[]; // You can define a Review interface later
}
