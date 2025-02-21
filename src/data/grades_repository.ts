import studentsApi from "./utils/students_axios_template";

export const apiGetGrades = async () => {
  const response = await studentsApi.get(`/grades`, {});
  return response.data;
};

export const apiAddGrade = async (
  student_id: number,
  subject_id: number,
  grade: number,
  date: string
) => {
  const response = await studentsApi.post(`/grades`, {
    student_id: student_id,
    subject_id: subject_id,
    grade: grade,
    date: date,
  });
  return response.data;
};

export const apiGetStudentGrades = async (student_id: number) => {
  const response = await studentsApi.get(`/grades/student/${student_id}`, {});
  return response.data;
};
