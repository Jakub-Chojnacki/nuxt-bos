<template>
  <StudentFormModal
    @close="handleClose"
    :modalActive="modalActive"
    modalTitle="Dodaj studenta"
    :formType="formType"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EStudentFormTypes } from "~/types";

const modalActive = ref(true);
const formType = EStudentFormTypes.create;

const handleClose = async (): Promise<void> => {
  modalActive.value = !modalActive.value;
  await navigateTo("/");
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
@import "@/assets/mixins.scss";
</style>
