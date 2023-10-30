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

export enum EStudentFormTypes {
  preview = 'preview',
  edit = 'edit',
  create = 'create'
}

export interface IStudentFormOpenPayload {
  type: EStudentFormTypes;
  student:IStudent;
}

export interface ISelectOption  {
  label: string,
  value: string,
}