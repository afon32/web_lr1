import authApi from "./utils/auth_axios_template";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await authApi.post(`/auth/register`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await authApi.post(`/auth/login`, {
    email,
    password,
  });
  return response.data;
};
