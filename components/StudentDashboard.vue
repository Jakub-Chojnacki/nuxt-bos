<template>
  <div>
    <SearchBar @search="handleSearch" />
    <AddStudentButton />
  </div>
  <StudentList
    :studentsData="filteredData"
    :status="props.status"
    :searchTerm="searchTerm"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { IStudent } from "~/types";

interface Props {
  status: string;
}

const props = defineProps<Props>();

const studentsData = useStudentsData();
const filteredData = ref<IStudent[]>(studentsData.value);
const searchTerm = ref<string>("");

const filterText = (text: string, searchQuery: string): boolean => {
  return text.toLowerCase().includes(searchQuery.toLowerCase());
};

const handleSearch = (searchQuery: string): void => {
  searchTerm.value = searchQuery;
};

watchEffect(() => {
  filteredData.value = studentsData.value.filter(
    ({ name, surname, student_id }) => {
      return (
        filterText(name, searchTerm.value) ||
        filterText(surname, searchTerm.value) ||
        filterText(student_id.toString(), searchTerm.value)
      );
    }
  );
});
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
@import "@/assets/mixins.scss";
</style>
