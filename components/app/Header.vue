<script setup>
const props = defineProps({
  to: Object,
  //   title: String,
});

// States
const useStatePageName = useState("statePageName");
const useIsBackButton = useState("isBackButton");
const useIsCartButton = useState("isCartButton");
</script>

<template>
  <header class="header">
    <nav class="header__nav">
      <div class="header__button">
        <ButtonBack v-if="useIsBackButton" />
      </div>

      <p class="header__title">{{ useStatePageName }}</p>

      <ButtonCartCounter class="header__cart-counter" v-if="useIsCartButton" />
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  min-height: 30px;

  &__nav {
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;

    padding-left: 15px;
    padding-right: 15px;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  &__title {
    min-height: 30px;
    text-align: center;
    font-weight: 700;
    align-self: center;
    text-transform: uppercase;
  }
  &__cart-counter {
    display: block;
    text-align: right;
  }
}
</style>
