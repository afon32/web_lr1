import studentsApi from "./utils/students_axios_template";


export const apiGetStudents = async () => {
  const response = await studentsApi.get(`/students`, {});
  return response.data;
};

export const apiAddStudent = async (full_name: string, group_name: string) => {
  const response = await studentsApi.post(`/students`, {
    full_name,
    group_name,
  });
  return response.data;
};
