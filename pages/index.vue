<script setup>
// Route parameters
const route = useRoute();

// States
const useStateCategories = useState("stateCategories");
</script>

<template>
  <section class="categories">
    <CategoryCard
      class="categories__card"
      v-for="category in useStateCategories"
      :category="category"
    />
  </section>

  <PanelCartTotal :btnroute="{ name: 'cart' }" btntext="Перейти в корзину" />
</template>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-wrap: wrap;
  padding-left: 15px;
  padding-right: 15px;

  padding-bottom: 150px;
}
</style>
