import React, { useEffect, useState } from "react";
import { Subject } from "../../domain/subject";
import { apiAddSubject, apiGetSubjects } from "../../data/subjects_repository";

const SubjectsPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "" });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await apiGetSubjects();
      console.log(response);
      setSubjects(response.map(Subject.fromJson));
    } catch (error) {
      console.error("Ошибка загрузки предметов:", error);
    }
  };

  const addSubject = async () => {
    if (!newSubject.name) {
      alert("Заполните название");
      return;
    }
    try {
      const response = await apiAddSubject(newSubject.name);
      console.log(response);
      setSubjects([...subjects, Subject.fromJson(response)]);
      setShowDialog(false);
      setNewSubject({ name: "" });
    } catch (error) {
      console.error("Ошибка добавления предмета:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Список студентов</h1>
      <ul className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        {subjects.map((subject) => (
          <li key={subject.id} className="p-2 border-b last:border-none">
            <span>{subject.name}</span>
          </li>
        ))}
      </ul>

      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        onClick={() => setShowDialog(true)}
      >
        Добавить предмет
      </button>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Добавить предмет</h2>
            <input
              type="text"
              placeholder="Название"
              value={newSubject.name}
              onChange={(e) =>
                setNewSubject({ ...newSubject, name: e.target.value })
              }
              className="w-full p-2 border rounded-lg mb-2"
            />

            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={() => setShowDialog(false)}
              >
                Отмена
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                onClick={addSubject}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectsPage;
