<template>
  <FormKit
    type="form"
    @submit="handleSubmit"
    submit-label="Zapisz"
    :submit-attrs="{
      inputClass: submitButtonClasses,
    }"
  >
    <div class="student-form">
      <FormKit
        type="text"
        label="Imiona"
        name="name"
        id="name"
        :disabled="isPreview"
        :value="student?.name || ''"
      />
      <FormKit
        type="text"
        label="Nazwisko"
        name="surname"
        id="surname"
        :disabled="isPreview"
        :value="student?.surname || ''"
      />
      <FormKit
        type="text"
        label="Numer telefonu"
        name="phone_number"
        id="phone_number"
        :disabled="isPreview"
        :value="student?.phone_number || ''"
      />
      <FormKit
        type="text"
        label="Adres email"
        name="email"
        id="email"
        :disabled="isPreview"
        :value="student?.email || ''"
      />
      <FormKit
        type="text"
        label="Numer indeksu"
        name="student_id"
        id="student_id"
        :disabled="isPreview"
        :value="student?.student_id || ''"
      />
      <FormKit
        type="select"
        label="Status"
        name="status"
        id="status"
        :disabled="isPreview"
        :options="statusSelectOptions"
        :value="student?.status || ''"
      />
    </div>
  </FormKit>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { EStudentFormTypes, type ISelectOption, type IStudent } from "~/types";
import { studentStatuses } from "~/constants/student";
 // @ts-ignore
import * as Toast from "vue-toastification/dist/index.mjs" //workaround https://github.com/Maronato/vue-toastification/issues/327

interface Props {
  formType: EStudentFormTypes;
  toggleModal: () => void;
  student?: IStudent;
}

const { formType, student, toggleModal } = defineProps<Props>();
const { useToast } = Toast;
const toast = useToast();
const studentsData = useStudentsData();

const isPreview = formType === EStudentFormTypes.preview;

const statusSelectOptions: ISelectOption[] = [
  {
    label: studentStatuses.current,
    value: studentStatuses.current,
  },
  {
    label: studentStatuses.expelled,
    value: studentStatuses.expelled,
  },
  {
    label: studentStatuses.graduate,
    value: studentStatuses.graduate,
  },
];

const submitButtonClasses = isPreview
  ? "student-form__button student-form__button--disabled "
  : "student-form__button";

const handleSubmit = async (fields: Omit<IStudent, "id">) => {
  const studentsArray = [...studentsData.value];

  if (formType === EStudentFormTypes.create) {
    const newStudent = { ...fields, id: Math.random() };

    studentsData.value = [...studentsArray, newStudent];
    toast.success("Nowy student został dodany!");
    await navigateTo("/");
  }

  if (formType === EStudentFormTypes.edit) {
    if (!student) return;
    const currentStudentIndex = studentsData.value.findIndex(
      ({ id }) => id === student.id
    );
    const newStudentData = { id: student?.id, ...fields };
    studentsArray[currentStudentIndex] = newStudentData;
    studentsData.value = studentsArray;
    toast.info("Dane studenta zostały zapisane!");
    toggleModal();
  }
};
</script>

<style lang="scss">
@import "@/assets/_variables.scss";
@import "@/assets/mixins.scss";

.student-form {
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 1em;
  gap: 1em;
  padding-top: 3em;

  @media (min-width: $md) {
    grid-template-columns: 1fr 1fr;
    gap: 2em;
  }

  .formkit-input {
    @include neuBorder();
    border: 2px solid black;
    width: 100%;
    margin: 0;
    padding: 0.3em;
    box-sizing: border-box;

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__button {
    @include neuButton();
    background: $neuGreen;
    margin-left: auto;

    &--disabled {
      display: none;
    }
  }
}

.formkit-actions {
  .formkit-wrapper {
    padding: 1em 0;
    display: flex;
  }
}
</style>
