<script setup>
// Props
const props = defineProps({
  show: Boolean,
  content: String,
});
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__body">
            <div v-html="content"></div>
            <button class="modal__default-button" @click="$emit('close')">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.text-center {
  text-align: center;
}
.modal {
  &__text-wrapper {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  &__text {
    margin-bottom: 10px;
    margin-left: 3px;
    margin-right: 3px;
  }

  &__default-button {
    border: none;
    width: 100%;
    padding: 11px 50px;
    margin-top: 10px;
    background-color: $color-primary;
    cursor: pointer;
  }

  &__mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &__container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  &__header h3 {
    margin-top: 0;
    color: #42b983;
  }

  &__body {
    margin: 20px 0;
  }

  &__enter-from {
    opacity: 0;
  }

  &__leave-to {
    opacity: 0;
  }

  &__enter-from &__container,
  &__leave-to &__container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
</style>
