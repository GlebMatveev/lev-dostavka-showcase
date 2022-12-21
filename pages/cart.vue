<script setup>
// Import
import filters from "@/helpers/js/filters";
import cart from "@/helpers/js/cart";

// Route parameters
const route = useRoute();

// States
const useStateProducts = useState("stateProducts");
const filteredProducts = filters.filterArrayByKey(
  useStateProducts.value,
  "subcategory_slug",
  route.params.subcategory
);
const useStateCart = useState("stateCart");
const useStateCartQuantity = useState("stateCartQuantity");
const useStateCartPrice = useState("stateCartPrice");
const useStateCartProducts = useState("stateCartProducts");

// Watchers
watch(
  useStateCart,
  () => {
    useStateCartQuantity.value = cart.calcCartQuantity(useStateCart.value);
    useStateCartPrice.value = cart.calcCartPrice(useStateCart.value);
    useStateCartProducts.value = filters.filterArrayByArray(
      useStateProducts.value,
      useStateCart.value
    );
  },
  { deep: true }
);
</script>

<template>
  <div class="cart">
    <ProductCard
      v-for="cartProduct in useStateCartProducts"
      :product="cartProduct"
    />
  </div>

  <PanelCartTotal
    :class="{ disabled: useStateCartQuantity == 0 }"
    :btnroute="{ name: 'order' }"
    btntext="Оформить заказ"
  />
</template>

<style lang="scss" scoped>
.cart {
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 150px;
}
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
