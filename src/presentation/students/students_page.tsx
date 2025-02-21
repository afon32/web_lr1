import React, { useEffect, useState } from "react";
import { Student } from "../../domain/student";
import { apiAddStudent, apiGetStudents } from "../../data/students_repository";
import { useNavigate } from "react-router-dom";

const StudentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", group: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await apiGetStudents();
      console.log(response);
      setStudents(response.map(Student.fromJson));
    } catch (error) {
      console.error("Ошибка загрузки студентов:", error);
    }
  };

  const addStudent = async () => {
    if (!newStudent.name || !newStudent.group) {
      alert("Заполните все поля");
      return;
    }
    try {
      const response = await apiAddStudent(newStudent.name, newStudent.group);
      console.log(response);
      setStudents([...students, Student.fromJson(response)]);
      setShowDialog(false);
      setNewStudent({ name: "", group: "" });
    } catch (error) {
      console.error("Ошибка добавления студента:", error);
    }
  };
  const handleClickOnGrade = (id: number) => {
    navigate(`/student_grade_page/${id}`);
  };

  // return (
  //   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
  //     <h1 className="text-2xl font-bold mb-4">Список студентов</h1>
  //     <ul className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
  //       {students.map((student) => (
  //         <li key={student.id} className="p-2 border-b last:border-none">
  //           <span>
  //             {student.full_name} - {student.group_name}
  //           </span>
  //           <button
  //             className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
  //             onClick={() => {
  //               handleClickOnGrade(student.id);
  //             }}
  //           >
  //             Оценки
  //           </button>
  //           <button
  //             className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
  //             onClick={() => {}}
  //           >
  //             Удалить
  //           </button>
  //         </li>
  //       ))}
  //     </ul>

  //     <button
  //       className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
  //       onClick={() => setShowDialog(true)}
  //     >
  //       Добавить студента
  //     </button>

  //     {showDialog && (
  //       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  //         <div className="bg-white p-6 rounded-lg shadow-lg w-80">
  //           <h2 className="text-lg font-bold mb-4">Добавить студента</h2>
  //           <input
  //             type="text"
  //             placeholder="Имя"
  //             value={newStudent.name}
  //             onChange={(e) =>
  //               setNewStudent({ ...newStudent, name: e.target.value })
  //             }
  //             className="w-full p-2 border rounded-lg mb-2"
  //           />
  //           <input
  //             type="text"
  //             placeholder="Группа"
  //             value={newStudent.group}
  //             onChange={(e) =>
  //               setNewStudent({ ...newStudent, group: e.target.value })
  //             }
  //             className="w-full p-2 border rounded-lg mb-4"
  //           />
  //           <div className="flex justify-between">
  //             <button
  //               className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
  //               onClick={() => setShowDialog(false)}
  //             >
  //               Отмена
  //             </button>
  //             <button
  //               className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
  //               onClick={addStudent}
  //             >
  //               Добавить
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Список студентов</h1>

        <ul className="space-y-4">
          {students.map((student) => (
            <li
              key={student.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <span className="text-lg font-medium">
                {student.full_name} - {student.group_name}
              </span>
              <div className="space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                  onClick={() => handleClickOnGrade(student.id)}
                >
                  Оценки
                </button>
              
              </div>
            </li>
          ))}
        </ul>

        <button
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          onClick={() => setShowDialog(true)}
        >
          Добавить студента
        </button>
      </div>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
            <h2 className="text-xl font-bold mb-6 text-center">Добавить студента</h2>

            <input
              type="text"
              placeholder="Имя"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              className="w-full p-3 border rounded-lg mb-4"
            />

            <input
              type="text"
              placeholder="Группа"
              value={newStudent.group}
              onChange={(e) => setNewStudent({ ...newStudent, group: e.target.value })}
              className="w-full p-3 border rounded-lg mb-6"
            />

            <div className="flex justify-between">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                onClick={() => setShowDialog(false)}
              >
                Отмена
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                onClick={addStudent}
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

export default StudentsPage;
