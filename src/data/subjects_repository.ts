import studentsApi from "./utils/students_axios_template";

export const apiGetSubjects = async () => {
  const response = await studentsApi.get(`/subjects`, {});
  return response.data;
};

export const apiAddSubject = async (name: string) => {
  const response = await studentsApi.post(`/subjects`, {
    name,
  });
  return response.data;
};
