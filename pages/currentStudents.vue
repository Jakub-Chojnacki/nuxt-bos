<template>
  <div>
    <SearchBar />
    <AddStudentButton />
  </div>
  <StudentList :studentsData="currentStudents" />
</template>

<script lang="ts">
import { computed } from "vue";
import mockData from "@/static/mockData.json";
import { studentStatuses } from "@/constants/student";

export default {
  setup() {
    const currentStudents = computed(() => {
      return mockData.filter(
        (student) => student.status === studentStatuses.current
      );
    });
    return {
      currentStudents,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
@import "@/assets/mixins.scss";
</style>
