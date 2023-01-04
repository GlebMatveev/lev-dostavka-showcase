<script setup>
// States
const useStatePageName = useState("statePageName");
const useIsBackButton = useState("isBackButton");
const useIsCartButton = useState("isCartButton");

const scroll = reactive({
  position: 0,
  direction: "",
  isDown: false,
});

function handleScroll() {
  if (process.client) {
    let currentScrollPosition = window.scrollY;

    if (currentScrollPosition < scroll.position) {
      scroll.isDown = false;
      scroll.direction = "up";
    } else {
      scroll.isDown = true;
      scroll.direction = "down";
    }

    scroll.position = window.scrollY;
  }
}

onMounted(() => {
  if (process.client) {
    window.addEventListener("scroll", handleScroll);
  }
});
</script>

<template>
  <header class="header" :class="{ header__background: scroll.position > 14 }">
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
  position: sticky;
  top: 0;
  margin-top: 15px;
  margin-bottom: 15px;
  z-index: 5;

  &__background {
    background: $color-background;
    box-shadow: $shadow-card;
  }

  &__button {
    min-width: 25px;
  }

  &__nav {
    display: grid;
    grid-template-columns: 1fr 20fr 1fr;

    padding-left: 15px;
    padding-right: 15px;
    padding-top: 18px;
    padding-bottom: 15px;
  }

  &__title {
    min-height: 30px;
    text-align: center;
    font-weight: 700;
    align-self: center;
    text-transform: uppercase;
    padding-top: 3px;
  }
  &__cart-counter {
    display: block;
    text-align: right;
  }
}
</style>
