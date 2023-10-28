<template>
  <div class="student-list">
    <StudentCard
      v-for="student in filteredStudents"
      :key="student.id"
      :student="student"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { studentStatuses } from "~/constants/student";
import type { IStudent } from "@/types";

interface Props {
  studentsData: IStudent[];
  status: string;
}

const props = defineProps<Props>();

const filteredStudents = computed(() => {
  if (props.status === studentStatuses.all) return props.studentsData;
  return props.studentsData.filter(
    (student) => student.status === props.status
  );
});
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
