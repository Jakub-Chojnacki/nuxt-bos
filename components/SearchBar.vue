<template>
  <input
    class="search"
    v-model="searchQuery"
    @input="filterData"
    placeholder="Wyszukaj..."
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref("");
const emit = defineEmits();
const filterData = (): void => {
  emit("search", searchQuery.value);
};
</script>

<style lang="scss" scoped>
@import "@/assets/mixins.scss";

.search {
  margin-top: 1em;
  margin-left: 1em;
  @include neuBorder();
  border: 2px solid black;
  border-radius: 10px;
  padding: 0.5em;
}
</style>
