import { Model } from './Model';
import { ImageSet } from './ImageSet';

export class Author extends Model {
    email: string;
    joinedDate: string;
    name: string;
    username: string;
    profilePicture: ImageSet;
}
