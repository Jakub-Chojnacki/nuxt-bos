<template>
  <transition name="modal-animation">
    <div
      ref="modalRef"
      v-show="modalActive"
      class="modal"
      @click="handleClick"
      tabindex="0"
      @keydown.esc="handleClose"
    >
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <div class="modal__header">
            <h2 class="modal__title" v-if="modalTitle">{{ modalTitle }}</h2>
            <Icon
              @click="handleClose"
              name="ic:baseline-close"
              size="24"
              class="modal__close"
            />
          </div>
          <div class="modal__content">
            <slot />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Props {
  modalActive: Boolean;
  modalTitle?: String;
}
const { modalActive, modalTitle } = defineProps<Props>();
const modalRef = ref<HTMLDivElement | null>(null);

const emit = defineEmits(["close"]);

const handleClose = (): void => {
  emit("close");
};

const handleClick = ({ target }: Event) => {
  if ((target as HTMLDivElement).classList.contains("modal")) emit("close");
};

onMounted(() => {
  //tabindex and this focus are required to allow closing the modal on esc
  if (modalRef.value) modalRef.value.focus();
});
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);

  &__header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px solid black;
    padding: 0 0.5em;
  }

  &__close {
    cursor: pointer;
    margin-left: auto;
  }

  &__content {
    padding: 0 0.5em;
  }

  &__title {
    font-weight: bold;
    text-transform: uppercase;
  }

  .modal-inner {
    position: relative;
    max-width: 640px;
    min-height: 100px;
    width: 80%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: $neuBlue;
    border: 3px solid black;
  }
}
</style>
