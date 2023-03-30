import { ReturnUser } from './ReturnUser';

export class Comentario {
  id: number;
  content: string;
  date: Date;
  likes: number;
  user: ReturnUser;
}
