<script setup>
// Import
import cart from "@/helpers/js/cart";
import filters from "@/helpers/js/filters";

// Props
const props = defineProps({
  product: Object,
});

// States
const useStateProducts = useState("stateProducts");
const useStateCart = useState("stateCart");
const useStateCartProducts = useState("stateCartProducts");

// Watchers
watch(
  useStateCart,
  () => {
    useStateCartProducts.value = filters.filterArrayByArray(
      useStateProducts.value,
      useStateCart.value
    );
  },
  { deep: true }
);
</script>

<template>
  <div class="cart-add-remove">
    <button
      class="cart-add-remove__remove"
      @click="cart.deleteFromCart(useStateCart, product.id)"
    >
      –
    </button>
    <p class="cart-add-remove__quantity">
      {{ cart.getProductQuantity(useStateCart, product.id) }}
    </p>
    <button
      class="cart-add-remove__add"
      @click="cart.addToCart(useStateCart, product.id, product.price)"
    >
      +
    </button>
  </div>
</template>

<style lang="scss" scoped>
.cart-add-remove {
  display: flex;
  align-items: center;
  background-color: $color-primary;
  border-radius: 45px;

  &__remove {
    border: none;
    border-top-left-radius: 45px;
    border-bottom-left-radius: 45px;
    background-color: $color-primary;
    padding: 0 13px 4px 18px;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
  }

  &__quantity {
    min-width: 30px;
    text-align: center;
    background-color: $color-primary;
    padding: 8px 0 7px;
    font-weight: 700;
  }

  &__add {
    border: none;
    border-top-right-radius: 45px;
    border-bottom-right-radius: 45px;
    background-color: $color-primary;
    padding: 0 18px 4px 11px;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
  }
}
</style>
