import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../data/auth_repository";

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // const handleSubmit = async (values: any) => {
  //   try {
  //     if (isLogin) {
  //       const response = await login(values.email, values.password);
  //       localStorage.setItem('authToken', response.token);  // Сохраняем токен
  //       navigate('/home');  // Перенаправляем на главную страницу
  //     } else {
  //       await register(values.name ,values.email, values.password);
  //       alert('Регистрация успешна! Теперь можно войти.');
  //       setIsLogin(true);
  //     }
  //   } catch (error: any) {
  //     alert(error.response?.data?.message || 'Ошибка при авторизации.');
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!formData.email || !formData.password) {
      setMessage("Пожалуйста, заполните все поля");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage("Пароли не совпадают");
      return;
    }

    try {
      if (isLogin) {
        const response = await login(formData.email, formData.password);
        setMessage(`Вход выполнен! Токен: ${response.token}`);
        localStorage.setItem("authToken", response.token); // Сохраняем токен
        navigate("/home"); // Перенаправляем на главную страницу
      } else {
        await register(formData.name, formData.email, formData.password);
        setMessage("Регистрация успешна! Теперь можно войти. ");
        setIsLogin(true);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Произошла ошибка.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Вход" : "Регистрация"}
        </h1>

        {message && (
          <div className="mb-4 p-2 text-center text-red-500 bg-red-100 rounded-lg">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Подтвердите пароль
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
                required={!isLogin}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <p className="mt-4 text-center">
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 ml-1 hover:underline"
          >
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
