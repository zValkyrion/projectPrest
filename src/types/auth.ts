export interface User {
  username: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}