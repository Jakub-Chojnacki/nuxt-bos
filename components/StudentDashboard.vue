<template>
  <div class="dashboard">
    <div class="dashboard__search-container">
      <SearchBar @search="handleSearch" />
      <AddStudentButton />
    </div>
    <StudentList
      :studentsData="filteredData"
      :status="props.status"
      :searchTerm="searchTerm"
    />
  </div>
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

.dashboard {
  padding-bottom: 3em;
  &__search-container {
    display: flex;
    align-items: baseline;
    justify-content: center;

    @media (min-width: $lg) {
      justify-content: flex-start;
      margin-left: 1em;
    }
  }
}
</style>
