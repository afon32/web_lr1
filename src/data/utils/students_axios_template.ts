import axios from "axios";

const studentsApi = axios.create({
  baseURL: "http://195.112.116.178:8182",
  headers: {
    "Content-Type": "application/json",
  },
});

studentsApi.interceptors.request.use(
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

studentsApi.interceptors.response.use(
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

export default studentsApi;
