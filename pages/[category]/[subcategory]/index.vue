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
      filteredProducts,
      useStateCart.value
    );
  },
  { deep: true }
);
</script>

<template>
  <section class="products">
    <ProductCard v-for="product in filteredProducts" :product="product" />
  </section>

  <PanelCartTotal :btnroute="{ name: 'cart' }" btntext="Перейти в корзину" />
</template>

<style lang="scss" scoped>
.products {
  padding-left: 15px;
  padding-right: 15px;

  padding-bottom: 150px;
}
</style>
