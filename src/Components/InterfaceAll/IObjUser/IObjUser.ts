export interface ObjUser {
  id: string;
  login: string;
  name: string;
  lastName: string;
  email: string;
  telephone: string;
  timeZone: Date;
  cpf: string;
  dateOfBirth: string;
  passwordHash: string;
  token: string;
  userImage: string | null;
}
