<script setup>
// States
const useStateCartQuantity = useState("stateCartQuantity");
</script>

<template>
  <NuxtLink class="cart" :to="{ name: 'cart' }">
    <IconShoppingCart class="cart__icon" />

    <p v-if="useStateCartQuantity !== 0" class="cart__counter">
      {{ useStateCartQuantity }}
    </p>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.cart {
  display: flex;
  align-items: center;
  position: relative;

  &__icon {
    height: 25px;
    width: 25px;
  }
  &__counter {
    background-color: $color-primary;
    font-family: "Roboto Mono", monospace;
    font-weight: 700;
    border-radius: 45px;
    padding: 2px 8px;
    position: absolute;
    bottom: 17px;
    right: 13px;
  }
}
</style>
