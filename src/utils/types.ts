export type jobType = {
  // ? always received from backend but not used every time in app
  _id?: string;
  createdAt?: string;
  position: string;
  company: string;
  location: string;
  status: string;
  type: string;
};

export type User = {
  name: string;
  email: string;
  location: string;
  lastName: string;
};

export interface UserResponse {
  token?: string;
  user: User;
}
