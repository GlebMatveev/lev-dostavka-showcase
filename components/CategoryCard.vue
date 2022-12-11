<script setup>
// Import
import upperCaseFirstChar from "@/helpers/js/upperCaseFirstChar";

const props = defineProps({
  category: Object,
});

// Route parameters
const route = useRoute();

const imagePlaceholder = "/img/categories/placeholder.jpg";

function replaceByDefault(e) {
  e.target.src = imagePlaceholder;
}
</script>

<template>
  <NuxtLink class="category-card" :to="route.path + category.slug">
    <img
      :src="category.image"
      @error="replaceByDefault"
      :alt="category.title"
      class="category-card__image"
    />
    <h2 class="category-card__title">
      {{ upperCaseFirstChar(category.title) }}
    </h2>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  background: $color-background;
  box-shadow: $shadow-card;
  flex-basis: 130px;
  flex-grow: 1;

  &__image {
    height: 75px;
    width: 75px;
    margin: 20px 0;
  }

  &__title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 10px;
  }
}

.category-card:nth-child(odd) {
  margin-right: 15px;
}

@media (max-width: 375px) {
  .category-card {
    flex-basis: 155px;
  }
  .category-card:nth-child(odd) {
    margin-right: 0;
  }
}
</style>
