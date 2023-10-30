<template>
  <Modal
    @close="toggleModal"
    :modalActive="modalActive"
    :modalTitle="modalTitle"
  >
    <StudentForm :formType="formType" :student="student" :toggleModal="toggleModal"/>
  </Modal>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { EStudentFormTypes, IStudent } from "~/types";

interface Props {
  modalActive: Boolean;
  toggleModal: () => void;
  modalTitle: string;
  formType: EStudentFormTypes;
  student?: IStudent;
}

  defineProps<Props>();
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
@import "@/assets/mixins.scss";
</style>
