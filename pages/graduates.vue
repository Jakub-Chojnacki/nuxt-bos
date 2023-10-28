<template>
  <StudentDashboard :status="status" />
</template>

<script setup lang="ts">
import { studentStatuses } from "~/constants/student";

const status = studentStatuses.graduate;
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
@import "@/assets/mixins.scss";
</style>
