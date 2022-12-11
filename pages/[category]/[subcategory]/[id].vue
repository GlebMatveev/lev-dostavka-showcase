<script setup>
// Import
import filters from "@/helpers/js/filters";

// Route parameters
const route = useRoute();

// States
const useStateProducts = useState("stateProducts");
const filteredProducts = filters.filterArrayByKey(
  useStateProducts.value,
  "slug",
  route.params.id
);
const useStateCartQuantity = useState("stateCartQuantity");
</script>

<template>
  <div>
    {{ useStateCartQuantity }}
    <p>{{ filteredProducts[0].title }}</p>
  </div>
</template>
