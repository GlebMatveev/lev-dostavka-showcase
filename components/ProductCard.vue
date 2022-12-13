<script setup>
// Import
import upperCaseFirstChar from "@/helpers/js/upperCaseFirstChar";

// Props
const props = defineProps({
  product: Object,
});

// Route parameters
// const route = useRoute();

// Image placeholder
const imagePlaceholder = "/img/products/placeholder.jpg";
function replaceImgByDefault(e) {
  e.target.src = imagePlaceholder;
}
</script>

<template>
  <div class="product-card">
    <!-- <NuxtLink :to="route.path + product.slug + '/'" class="product-card__left"></NuxtLink> -->
    <div class="product-card__left">
      <img
        :src="product.image"
        @error="replaceImgByDefault"
        :alt="product.title"
        class="product-card__image"
      />
    </div>

    <!-- <NuxtLink :to="route.path + product.slug + '/'" class="product-card__right"></NuxtLink> -->
    <div class="product-card__right">
      <h2 class="product-card__title">
        {{ upperCaseFirstChar(product.title) }}
      </h2>
      <p class="product-card__description">{{ product.description }}</p>
      <p class="product-card__ingredients">{{ product.ingredients }}</p>

      <div class="product-card__properties">
        <div v-if="product.quantity" class="product-card__property-wrapper">
          <IconCube class="product-card__property-icon" />
          <p class="product-card__property-text">{{ product.quantity }}</p>
          <p class="product-card__property-unit">
            {{ product.quantity_unit }}
          </p>
        </div>
        <div v-if="product.weight" class="product-card__property-wrapper">
          <IconScale class="product-card__property-icon" />
          <p class="product-card__property-text">{{ product.weight }}</p>
          <p class="product-card__property-unit">{{ product.weight_unit }}</p>
        </div>
        <div v-if="product.volume" class="product-card__property-wrapper">
          <IconWaterBottle class="product-card__property-icon" />
          <p class="product-card__property-text">{{ product.volume }}</p>
          <p class="product-card__property-unit">{{ product.volume_unit }}</p>
        </div>
      </div>
      <div class="product-card__prices">
        <div class="product-card__price-wrapper">
          <p class="product-card__price">{{ product.price }}</p>
          <p class="product-card__price-unit">{{ product.price_unit }}</p>
        </div>
        <div class="product-card__old-price-wrapper">
          <p class="product-card__old-price">{{ product.old_price }}</p>
          <p class="product-card__old-price-unit">
            {{ product.old_price_unit }}
          </p>
        </div>
      </div>
      <div class="product-card__buttons">
        <ButtonCartAddRemove :product="product" />
        <!-- <ButtonFavoritesAddRemove class="button-favorites-add-remove" /> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  display: flex;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  background: $color-background;
  box-shadow: $shadow-card;

  &__left {
    display: flex;
    vertical-align: middle;
    padding-right: 10px;
  }
  &__image {
    object-fit: contain;
    width: 150px;
  }

  &__title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  &__ingredients {
    margin-bottom: 10px;
    color: $color-text-gray;
  }

  &__properties {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  &__property-wrapper {
    display: flex;
    align-items: baseline;
    margin-right: 10px;
  }
  &__property-icon {
    height: 15px;
    width: 15px;
  }
  &__property-text {
    margin: 0 5px;
  }

  &__prices {
    display: flex;
    margin-bottom: 20px;
  }
  &__price-wrapper {
    display: flex;
    font-weight: 700;
    font-size: 20px;
  }
  &__price {
    margin-right: 3px;
  }
  &__old-price-wrapper {
    display: flex;
    font-weight: 700;
    font-size: 15px;
    align-items: center;
    margin-left: 10px;
  }
  &__old-price {
    margin-right: 3px;
    text-decoration: line-through;
    color: $color-text-gray;
  }
  &__old-price-unit {
    color: $color-text-gray;
  }

  &__buttons {
    display: flex;
    margin-bottom: 5px;
  }
}

.button-favorites-add-remove {
  margin: 0 20px;
}
</style>
