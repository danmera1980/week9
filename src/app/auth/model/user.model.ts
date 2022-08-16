export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse{
  data: {
    token: string;
    user: User;
  }
}
