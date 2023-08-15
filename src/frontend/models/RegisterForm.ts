import { User } from "./User";

export interface RegisterForm extends User {
  password: string;
}
