<script setup>
const buttonState = ref(true);
</script>

<template>
  <button class="favorites-add-remove">
    <IconHeart
      v-if="buttonState"
      @click="buttonState = !buttonState"
      class="favorites-add-remove__add"
    />
    <IconHeartFilled
      v-else
      @click="buttonState = !buttonState"
      class="favorites-add-remove__remove"
    />
  </button>
</template>

<style lang="scss" scoped>
.favorites-add-remove {
  border: none;
  background-color: $color-primary;
  vertical-align: middle;
  padding: 4px 7px 0px 7px;
  border-radius: 45px;

  &__add {
    height: 20px;
    width: 25px;
    fill: $color-text-dark;
  }
  &__remove {
    height: 20px;
    width: 25px;
    fill: $color-text-dark;
  }
}
</style>
