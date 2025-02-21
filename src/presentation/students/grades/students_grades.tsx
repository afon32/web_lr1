import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetStudentGrades } from "../../../data/grades_repository";
import { Grade } from "../../../domain/grade";

const StudentGradesPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const studentIdNumber = Number(studentId);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGrades();
  }, [studentId]);

  const fetchGrades = async () => {
    try {
      const response = await apiGetStudentGrades(studentIdNumber);
      setGrades(response);
    } catch (error) {
      console.error("Ошибка загрузки оценок:", error);
      setError("Не удалось загрузить оценки");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Загрузка...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

//   return (
//     <div className="center-container min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <table className="bg-white border rounded-lg shadow-lg w-full max-w-md">
//         <thead>
//           <tr>
//             <h1 className="text-2xl font-bold mb-4">Оценки студента</h1>
//           </tr>
//           <tr className="bg-gray-200">
//             <th className="p-2 border">Предмет</th>
//             <th className="p-2 border">|</th>
//             <th className="p-2 border">Оценка</th>
//             <th className="p-2 border">|</th>
//             <th className="p-2 border">Дата</th>
//           </tr>
//         </thead>
//         <tbody>
//           {grades.map((grade) => (
//             <tr key={grade.id} className="text-center">
//               <td className="p-2 border">{grade.subject}</td>
//               <td className="p-2 border">|</td>
//               <td className="p-2 border">{grade.grade}</td>
//               <td className="p-2 border">|</td>
//               <td className="p-2 border">
//                 {new Date(grade.date).toLocaleDateString()}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
return (
    <div className="center-container">
      <div className="grade-card">
        <h1 className="text-3xl font-bold mb-6">Оценки студента</h1>

        <table className="grade-table">
          <thead>
            <tr>
              <th>Предмет</th>
              <th>Оценка</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id}>
                <td>{grade.subject}</td>
                <td>{grade.grade}</td>
                <td>{new Date(grade.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default StudentGradesPage;
