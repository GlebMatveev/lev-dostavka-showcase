<script setup>
// Environment Variables
const runtimeConfig = useRuntimeConfig();

// Fetch
// const { data: modalStartApp } = await useFetch(
//   runtimeConfig.public.apiBase + "/modals/by-code/" + "start_app"
// );

// States
const useStateCategories = useState("stateCategories");
// const useModalStartApp = useState("stateModalStartApp", () => {
//   if (
//     modalStartApp.value[0].activity === "1" &&
//     new Date(modalStartApp.value[0].activity_from) < new Date() &&
//     new Date(modalStartApp.value[0].activity_to) > new Date()
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// });

// function updateUseModalStartApp() {
//   if (
//     modalStartApp.value[0].activity === "1" &&
//     new Date(modalStartApp.value[0].activity_from) < new Date() &&
//     new Date(modalStartApp.value[0].activity_to) > new Date()
//   ) {
//     modalStartApp.value[0].activity = "1";
//   } else {
//     modalStartApp.value[0].activity = "0";
//   }
// }

// onMounted(() => {
//   const refresh = () => refreshNuxtData("modalStartApp");

//   updateUseModalStartApp();
// });
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

  <!-- <ModalOk
    :show="modalStartApp[0].activity == '1' ? true : false"
    @close="modalStartApp[0].activity = false"
    :content="modalStartApp[0].content"
  /> -->
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
