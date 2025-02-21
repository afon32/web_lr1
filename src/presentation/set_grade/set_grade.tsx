import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { apiGetStudents } from "../../data/students_repository";
import { apiGetSubjects } from "../../data/subjects_repository";
import { Subject } from "../../domain/subject";
import { apiAddGrade } from "../../data/grades_repository";

const GradePage: React.FC = () => {
  const [students, setStudents] = useState<{ id: number; full_name: string }[]>(
    []
  );
  const [subjects, setSubjects] = useState<{ id: number; name: string }[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubjects] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const grades = [2, 3, 4, 5];

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await apiGetStudents();
      setStudents(response);
    } catch (error) {
      console.error("Ошибка загрузки студентов:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await apiGetSubjects();
      console.log(response);
      setSubjects(response.map(Subject.fromJson));
    } catch (error) {
      console.error("Ошибка загрузки предметов:", error);
    }
  };

  const handleSubmit = async () => {
    if (
      !selectedStudent ||
      !selectedSubject ||
      !selectedDate ||
      !selectedGrade
    ) {
      alert("Пожалуйста, выберите все поля!");
      return;
    }

    try {
      console.log(selectedStudent);
      console.log(selectedSubject);
      console.log(selectedGrade);
      console.log(selectedDate.toISOString().split("T")[0]);
      await apiAddGrade(
        selectedStudent,
        selectedSubject,
        selectedGrade,
        selectedDate.toISOString().split("T")[0] // Формат YYYY-MM-DD
      );

      alert("Оценка успешно добавлена!");
    } catch (error) {
      console.error("Ошибка при добавлении оценки:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Выставление оценки</h1>

      {/* Выпадающий список студентов */}

      <select
        className="mb-4 p-2 border rounded-lg"
        value={selectedStudent || ""}
        onChange={(e) => setSelectedStudent(Number(e.target.value))}
      >
        <option value="">Студент</option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.full_name}
          </option>
        ))}
      </select>

      {/* Выпадающий список предметов */}
      <select
        className="mb-4 p-2 border rounded-lg"
        value={selectedSubject || ""}
        onChange={(e) => setSelectedSubjects(Number(e.target.value))}
      >
        <option value="">Предмет</option>
        {subjects.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
      </select>

      {/* Календарь выбора даты */}
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => {
          console.log("Выбрана дата:", date);
          setSelectedDate(date);
        }}
        className="mb-4 p-2 border rounded-lg"
        dateFormat="yyyy-MM-dd"
        placeholderText="Выберите дату"
      />

      {/* Выпадающий список с оценками */}
      <select
        className="mb-4 p-2 border rounded-lg"
        value={selectedGrade || ""}
        onChange={(e) => setSelectedGrade(Number(e.target.value))}
      >
        <option value="">Выберите оценку</option>
        {grades.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>

      {/* Кнопка "Оценить" */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Оценить
      </button>
    </div>
  );
};

export default GradePage;
