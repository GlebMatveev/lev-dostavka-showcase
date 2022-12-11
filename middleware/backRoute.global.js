export default defineNuxtRouteMiddleware((to, from) => {
  const useStatePageName = useState("statePageName");
  const useIsBackButton = useState("isBackButton");
  const useIsCartButton = useState("isCartButton");

  if (to.name === "index") {
    useStatePageName.value = "Меню";
    useIsBackButton.value = false;
    useIsCartButton.value = true;
    //
  } else if (to.name === "category") {
    useStatePageName.value = "Меню";
    useIsBackButton.value = true;
    useIsCartButton.value = true;
    //
  } else if (to.name === "category-subcategory") {
    useStatePageName.value = "Меню";
    useIsBackButton.value = true;
    useIsCartButton.value = true;
    //
  } else if (to.name === "cart") {
    useStatePageName.value = "Корзина";
    useIsBackButton.value = true;
    useIsCartButton.value = true;
    //
  } else if (to.name === "favorites") {
    useStatePageName.value = "Избранное";
    useIsBackButton.value = true;
    useIsCartButton.value = false;
    //
  } else if (to.name === "order") {
    useStatePageName.value = "Оформление заказа";
    useIsBackButton.value = true;
    useIsCartButton.value = false;
    //
  } else {
    useStatePageName.value = "";
    useIsBackButton.value = true;
    useIsCartButton.value = true;
  }
});
