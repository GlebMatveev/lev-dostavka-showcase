<script setup>
// Import
import orderArray from "@/helpers/js/orderArray";

// Environment Variables
const runtimeConfig = useRuntimeConfig();

// Fetch
const { data: categories } = await useFetch(
  runtimeConfig.public.apiBase + "/categories",
  {
    transform: (array) => {
      return orderArray(array, "sort_weight");
    },
  }
);
const { data: subcategories } = await useAsyncData(
  "subcategory",
  () => $fetch(runtimeConfig.public.apiBase + "/subcategories"),
  {
    transform: (array) => {
      return orderArray(array, "sort_weight");
    },
  }
);
const { data: products } = await useAsyncData(
  "product",
  () => $fetch(runtimeConfig.public.apiBase + "/products"),
  {
    transform: (array) => {
      return orderArray(array, "sort_weight");
    },
  }
);

// States
const useStateCategories = useState("stateCategories", () => categories);
const useStateSubcategories = useState(
  "stateSubcategories",
  () => subcategories
);
const useStateProducts = useState("stateProducts", () => products);
//
const useStateCart = useState("stateCart", () => []);
const useStateCartQuantity = useState("stateCartQuantity", () => 0);
const useStateCartPrice = useState("stateCartPrice", () => 0);
const useStateCartProducts = useState("stateCartProducts", () => []);
const useStateFavorites = useState("stateFavorites", () => []);
</script>

<template>
  <div class="container">
    <AppHeader />

    <NuxtPage />
  </div>
</template>

<style lang="scss">
.container {
  margin: 0 auto;
  max-width: 500px;
}
</style>
