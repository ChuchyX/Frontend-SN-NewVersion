import { ReturnUser } from './ReturnUser';

export class Post {
  id: number;
  content: string;
  image: any;
  date: Date;
  since: string;
  likes: number;
  comentarios: any[];
  user: ReturnUser;
  showComments = false;
  comment = '';
}
