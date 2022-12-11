<script setup>
// Import
import filters from "@/helpers/js/filters";

// Route parameters
const route = useRoute();

// States
const useStateSubcategories = useState("stateSubcategories");
const filteredSubcategories = filters.filterArrayByKey(
  useStateSubcategories.value,
  "category_slug",
  route.params.category
);
</script>

<template>
  <section class="subcategories">
    <SubcategoryCard
      class="subcategories__card"
      v-for="subcategory in filteredSubcategories"
      :subcategory="subcategory"
    />
  </section>

  <PanelCartTotal :btnroute="{ name: 'cart' }" btntext="Перейти в корзину" />
</template>

<style lang="scss" scoped>
.subcategories {
  display: flex;
  flex-wrap: wrap;
  padding-left: 15px;
  padding-right: 15px;

  padding-bottom: 150px;
}
</style>
