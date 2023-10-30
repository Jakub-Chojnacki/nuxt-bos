<template>
  <Modal
    @close="toggleModal"
    :modalActive="modalActive"
    modalTitle="Usunięcie danych o studencie"
  >
    <div class="container">
      <div class="delete-text">{{ studentText }}</div>
      <div class="btn-container">
        <button @click="toggleModal" class="btn btn--cancel">Anuluj</button>
        <button @click="handleConfirm" class="btn btn--delete">Usuń</button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { IStudent } from "~/types";

interface Props {
  modalActive: Boolean;
  toggleModal: () => void;
  handleConfirm: () => void;
  student: IStudent;
}
const { modalActive, toggleModal, handleConfirm, student } =
  defineProps<Props>();

const studentText = ref(
  student
    ? `Czy na pewno chcesz usunąć dane o studencie ${student.name} ${student.surname} z numerem indeksu: ${student.student_id}?`
    : "Czy na pewno chcesz usunąć dane o studencie?"
);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/mixins.scss";
.container {
  padding: 1em;
}

.delete-text {
  font-size: 1.25rem;
  padding: 1em 0;
  text-align: center;
}

.btn-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1em;
}

.btn {
  @include neuButton();

  &--delete {
    background-color: $neuRed;
  }
}
</style>
