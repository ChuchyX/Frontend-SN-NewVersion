import { ReturnUser } from "./ReturnUser";

export class Post {
  id: number;
  content: string;
  image: any;
  date: Date;
  likes: number;
  comentarios: any[];
  user: ReturnUser;
}
