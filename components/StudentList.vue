<template>
  <div class="student-list">
    <StudentCard
      v-for="student in filteredStudents"
      :key="student.id"
      :student="student"
      @deleteStudent="handleOpenModal"
      @openStudentForm="handleOpenForm"
    />
  </div>
  <DeleteStudentModal
    v-if="deleteModalActive"
    :modalActive="deleteModalActive"
    :toggleModal="toggleModal"
    :handleConfirm="handleDeleteStudent"
    :student="actionStudent"
  />
  <StudentFormModal
    v-if="formModalActive"
    :modalActive="formModalActive"
    :toggleModal="toggleFormModal"
    :modalTitle="formModalTitle"
    :student="actionStudent"
    :formType="openedFormType"
  />
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
 // @ts-ignore
import * as Toast from "vue-toastification/dist/index.mjs" //workaround https://github.com/Maronato/vue-toastification/issues/327
import { studentStatuses } from "~/constants/student";
import type {
  EStudentFormTypes,
  IStudent,
  IStudentFormOpenPayload,
} from "@/types";

interface Props {
  studentsData: IStudent[];
  status: string;
  searchTerm: string;
}

const props = defineProps<Props>();

const { studentsData, status, searchTerm } = toRefs(props);
const { useToast } = Toast;

const toast = useToast();
const studentsDataGlobal = useStudentsData();


const deleteModalActive = ref(false);
const formModalActive = ref(false);
const formModalTitle = ref("");
const actionStudent = ref<IStudent | null>(null);
const actionStudentId = ref<number | null>(null);
const openedFormType = ref<EStudentFormTypes | null>(null);


const toggleModal = (): void => {
  deleteModalActive.value = !deleteModalActive.value;
};

const handleOpenModal = (student: IStudent): void => {
  const foundStudent = studentsDataGlobal.value.find((elem)=> elem.id === student.id)
  if(!foundStudent) return
  actionStudentId.value = foundStudent.id;
  actionStudent.value = foundStudent;
  toggleModal();
};

const handleOpenForm = ({ type, student }: IStudentFormOpenPayload) => {
  const foundStudent = studentsDataGlobal.value.find((elem)=> elem.id === student.id)
  if(!foundStudent) return
  formModalTitle.value = type === "preview" ? "Podgląd" : "Edycja";
  actionStudent.value = foundStudent;
  actionStudentId.value = foundStudent.id;
  formModalActive.value = true;
  openedFormType.value = type;
};

const toggleFormModal = (): void => {
  formModalActive.value = !formModalActive.value;
};

const handleDeleteStudent = (): void => {
  studentsDataGlobal.value = studentsDataGlobal.value.filter(
    (student) => student.id !== actionStudentId.value
  );
  
  actionStudentId.value = null;
  actionStudent.value = null;
  openedFormType.value = null;
  toast.success("Dane o studencie zostały usunięte!");
  toggleModal();
};

const filteredStudents = computed(() => {
  if (status.value === studentStatuses.all) return studentsData.value;
  return studentsData.value.filter(
    (student) =>
      student.status === status.value && student.name.includes(searchTerm.value)
  );
});
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
@import "@/assets/mixins.scss";

.student-list {
  margin-top: 1em;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1em;
}
</style>
