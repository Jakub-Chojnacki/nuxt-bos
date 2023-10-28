<template>
  <div>
    <SearchBar @search="handleSearch" />
    <AddStudentButton />
  </div>
  <StudentList :studentsData="filteredData" :status="props.status" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import mockData from "@/static/mockData.json";
import type { IStudent } from "~/types";

interface Props {
  status: string;
}

const props = defineProps<Props>();

const initialStudentData = ref<IStudent[]>(mockData as IStudent[]);
const filteredData = ref<IStudent[]>(mockData as IStudent[]);

const filterText = (text: string, searchQuery: string): boolean => {
  return text.toLowerCase().includes(searchQuery.toLowerCase());
};

const handleSearch = (searchQuery: string): void => {
  filteredData.value = initialStudentData.value.filter(
    ({ name, surname, student_id }) => {
      return (
        filterText(name, searchQuery) ||
        filterText(surname, searchQuery) ||
        filterText(student_id.toString(), searchQuery)
      );
    }
  );
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
@import "@/assets/mixins.scss";
</style>
