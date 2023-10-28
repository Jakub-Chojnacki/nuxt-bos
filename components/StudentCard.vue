<template>
  <div class="student-card">
    <div class="student-card__person">
      <Icon name="ic:baseline-person" size="32" />
      <div class="student-card__description">
        <p class="student-card__name">{{ student.name }} {{ student.surname }}</p>
        <p class="student-card__number">nr albumu {{student.student_id }}</p>
      </div>
    </div>
    <div class="student-card__actions">
      <button><Icon name="ic:outline-remove-red-eye" size="24" /></button>
      <button><Icon name="ic:baseline-edit" size="24" /></button>
      <button><Icon name="ic:baseline-delete" size="24" /></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["student"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
@import "@/assets/mixins.scss";

.student-card {
  @include neuBorder();
  width:100%;
  max-width: 320px;
  height: 60px;
  padding: 1em;
  background-color: white;
  border: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap:1em;
  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5em;
    button {
      @include iconButton;
    }
  }

  &__person {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  &__name {
    font-size: 14px;
    font-weight: bold;
  }
  &__number {
    font-size: 12px;
  }
}
</style>
