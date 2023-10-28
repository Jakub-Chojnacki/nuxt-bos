<template>
  <button class="add-student">
    <Icon name="ic:baseline-plus" size="16" />
  </button>
</template>

<style lang="scss" scoped>
@import "@/assets/mixins.scss";

.add-student {
  @include neuBorder();

  margin-left: 1em;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 10px;
  padding: 0.5em;
}
</style>
