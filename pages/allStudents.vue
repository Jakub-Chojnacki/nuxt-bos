<template>
  <div>
    <SearchBar />
    <AddStudentButton />
  </div>
  <StudentList :studentsData="mockData" />
</template>

<script lang="ts">
import mockData from "@/static/mockData.json";

export default {
  setup() {
    return {
      mockData,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
@import "@/assets/mixins.scss";
</style>
