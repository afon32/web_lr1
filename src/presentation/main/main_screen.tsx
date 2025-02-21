import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleClickOnStudents = () => {
    navigate("/students");
  };
  const handleClickOnSubjects = () => {
    navigate("/subjects");
  };
  const handleClickOnGrade = () => {
    navigate("/grade_page");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Система контроля успеваемости
        </h1>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-bold"></h1>
            <div className="space-y-2">
              <button
                className="w-40 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                onClick={handleClickOnGrade}
              >
                Поставить оценку
              </button>
              <button
                className="w-40 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                onClick={handleClickOnSubjects}
              >
                Предметы
              </button>
              <button
                className="w-40 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                onClick={handleClickOnStudents}
              >
                Студенты
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default HomePage;
