import axios from "axios";

export type User = {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  avatar: string;
  phone: string;
  position: string;
  about: string;
};

const api = axios.create({
  baseURL: "https://68f20893b36f9750deeb2538.mockapi.io/api/v1/users",
});

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const res = await api.get<User[]>("/");
    return res.data;
  },
  getById: async (id: string): Promise<User> => {
    const res = await api.get<User>(`/${id}`);
    return res.data;
  },
};
