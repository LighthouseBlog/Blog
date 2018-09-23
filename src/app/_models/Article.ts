import { Author } from './Author';
import { Model } from './Model';
import { ImageSet } from './ImageSet';
export class Article extends Model {
    title: string;
    description: string;
    datePosted: Date;
    text: string;
    author: Author;
    tags: string[];
    coverPhoto: ImageSet;
}
