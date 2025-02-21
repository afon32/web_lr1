import axios from "axios";

const authApi = axios.create({
  baseURL: "http://195.112.116.178:8170",
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Не авторизован");
      localStorage.removeItem("authToken");

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default authApi;
