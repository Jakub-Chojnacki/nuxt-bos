import mockData from "@/static/mockData.json";
import type { IStudent } from "@/types";

export const useStudentsData = () =>
  useState<IStudent[]>("studentsData", () => mockData as IStudent[]);
