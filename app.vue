<script setup>
// Import
import orderArray from "@/helpers/js/orderArray";
import filters from "@/helpers/js/filters";

// Environment Variables
const runtimeConfig = useRuntimeConfig();

// Modals
const showModal = ref(true);

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
      return filters.filterArrayByKey(
        orderArray(array, "sort_weight"),
        "activity",
        "1"
      );
    },
  }
);
const { data: modalStartApp } = await useFetch(
  runtimeConfig.public.apiBase + "/modals/by-code/" + "start_app"
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

// Functions
function showModalStartApp() {
  if (
    modalStartApp.value[0].activity === "1" &&
    new Date(modalStartApp.value[0].activity_from) < new Date() &&
    new Date(modalStartApp.value[0].activity_to) > new Date()
  ) {
    return true;
  } else {
    return false;
  }
}
</script>

<template>
  <div class="container">
    <AppHeader />

    <NuxtPage />
  </div>

  <ModalOk
    v-if="showModalStartApp()"
    :show="showModal"
    @close="showModal = false"
    :content="modalStartApp[0].content"
  />
</template>

<style lang="scss">
.container {
  margin: 0 auto;
  max-width: 500px;
}
</style>
