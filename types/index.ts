export enum EStudentStatus {
  current = "Student",
  graduate = "Absolwent",
  expelled = "Wykreślony z listy",
  all = "Wszyscy",
}

export interface IStudent {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  student_id: number;
  status: EStudentStatus;
}
