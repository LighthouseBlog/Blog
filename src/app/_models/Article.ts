import { Author } from './Author';
import { Model } from './Model';
export class Article extends Model {
    title: string;
    description: string;
    datePosted: Date;
    text: string;
    author: Author;
    tags: string[];
    coverPhoto: string;
}
