<template>
  <div class="student-list">
    <StudentCard v-for="student in studentsData" :key="student.id" :student="student"/>
  </div>
</template>

<script lang="ts">
export default {
  props: ["studentsData"],
};
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
