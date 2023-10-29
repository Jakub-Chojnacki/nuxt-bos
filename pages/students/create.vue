<template>
  <StudentFormModal @close="handleClose" :modalActive="modalActive" :modalTitle="modalTitle" :formType="formType"/>

</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { EStudentFormTypes } from '~/types';

const modalActive = ref(true);
const modalTitle = "Dodaj studenta"
const formType = EStudentFormTypes.create

const handleClose = async(): Promise<void> => {
  modalActive.value = !modalActive.value;
  await navigateTo('/')
};


</script>
  
<style lang="scss" scoped>
@import "@/assets/_variables.scss";
@import "@/assets/mixins.scss";
</style>
  