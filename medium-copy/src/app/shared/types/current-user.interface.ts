export interface CurrentUserInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  bio: string | null;
  image: string | null;
  token: string;
  username: string;
  email: string;
}
