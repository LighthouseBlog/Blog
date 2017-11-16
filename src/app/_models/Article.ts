import { Author } from './Author';
export class Article {
  _id: number;
  title: string;
  description: string;
  datePosted: Date;
  text: string;
  author: Author;
  tags: Array<string>;
  coverPhoto: string;
}
