<script setup>
// Import
import filters from "@/helpers/js/filters";
import cart from "@/helpers/js/cart";

// Props
const props = defineProps({
  btnroute: Object,
  btntext: String,
});

// States
const useStateCart = useState("stateCart");
const useStateCartQuantity = useState("stateCartQuantity");
const useStateCartPrice = useState("stateCartPrice");

// Watchers
watch(
  useStateCart,
  () => {
    useStateCartQuantity.value = cart.calcCartQuantity(useStateCart.value);
    useStateCartPrice.value = cart.calcCartPrice(useStateCart.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="cart__container">
    <div class="cart__wrapper">
      <div class="cart__text">
        <p class="cart__quantity">
          Количество товаров: {{ useStateCartQuantity }}
        </p>
        <p class="cart__price">Сумма: {{ useStateCartPrice }} ₽</p>
      </div>

      <button @click="cart.clearCart(useStateCart)" class="cart__clear-btn">
        <IconTrash class="cart__clear-btn-icon" />
      </button>
    </div>

    <NuxtLink class="cart__order-btn" :to="btnroute">{{ btntext }}</NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  &__container {
    position: fixed;
    bottom: 0;
    width: 100%;
    font-weight: 700;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    max-width: 500px;
    padding: 20px 0;
    background: $color-background;
    box-shadow: $shadow-card;
  }

  &__text {
    margin-left: 15px;
  }
  &__quantity {
    margin-bottom: 10px;
  }
  &__price {
    font-weight: 700;
  }

  &__clear-btn {
    margin-right: 15px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  &__clear-btn-icon {
    height: 25px;
    width: 25px;
    fill: $color-danger;
  }

  &__order-btn {
    display: flex;
    justify-content: center;
    background-color: $color-primary;
    font-weight: 700;
    cursor: pointer;
    max-width: 500px;
    padding: 20px 0;
  }
}
</style>
