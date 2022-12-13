<script setup>
// Import
import { vMaska } from "maska";

// States
const useStateProducts = useState("stateProducts");
const useStateCart = useState("stateCart");
const useStateCartPrice = useState("stateCartPrice");

const personalData = reactive({
  phone: "",
  name: "",
  persons: 0,
  payment: "Выберите способ оплаты",
  delivery: "Выберите способ доставки",
  deliveryCost: 0,
  locality: "Выберите населённый пункт",
  address: "",
  gift: "",
});

const whatsAppNumber = "79033133319";

// Watchers
watch(
  personalData,
  () => {
    localStorage.phone = personalData.phone;
    localStorage.name = personalData.name;
    sessionStorage.persons = personalData.persons;
    sessionStorage.payment = personalData.payment;
    sessionStorage.delivery = personalData.delivery;
    localStorage.locality = personalData.locality;
    localStorage.address = personalData.address;
    sessionStorage.gift = personalData.gift;
  },
  { deep: true }
);

onMounted(() => {
  localStorage.phone && localStorage.phone != ""
    ? (personalData.phone = localStorage.phone)
    : (personalData.phone = "");

  localStorage.name && localStorage.name != ""
    ? (personalData.name = localStorage.name)
    : (personalData.name = "");

  sessionStorage.persons && sessionStorage.persons != ""
    ? (personalData.persons = sessionStorage.persons)
    : (personalData.persons = 0);

  sessionStorage.payment && sessionStorage.payment != ""
    ? (personalData.payment = sessionStorage.payment)
    : (personalData.payment = "Выберите способ оплаты");

  sessionStorage.delivery && sessionStorage.delivery != ""
    ? (personalData.delivery = sessionStorage.delivery)
    : (personalData.delivery = "Выберите способ доставки");

  localStorage.locality && localStorage.locality != ""
    ? (personalData.locality = localStorage.locality)
    : (personalData.locality = "Выберите населённый пункт");

  localStorage.address && localStorage.address != ""
    ? (personalData.address = localStorage.address)
    : (personalData.address = "");

  sessionStorage.gift && sessionStorage.gift != ""
    ? (personalData.gift = sessionStorage.gift)
    : (personalData.gift = "");
});

function orderString() {
  const strLineBreak = "\n";
  let strOrder = "";

  let strPhone = personalData.phone;

  let strName = personalData.name;

  let strProductList = "";
  for (let key in useStateCart.value) {
    const index = useStateProducts.value.findIndex(
      (item) => item.id === useStateCart.value[key].id
    );
    if (index !== -1) {
      strProductList =
        strProductList +
        useStateProducts.value[index].title +
        " - " +
        useStateCart.value[key].quantity +
        strLineBreak;
    }
  }
  if (personalData.gift !== "") {
    strProductList =
      strProductList + "+ " + personalData.gift + " в подарок" + strLineBreak;
  }

  let strPersons = "Приборы: " + personalData.persons;

  let strDelivery = personalData.delivery;

  let strLocality = "";
  if (personalData.delivery === "Доставка") {
    strLocality = personalData.locality;
  }

  let strAddress = personalData.address;

  let strTotal = "";
  let strTotalComment = "";
  if (useStateCartPrice.value < 1000) {
    if (
      personalData.delivery === "Доставка" &&
      personalData.locality === "Лаишево"
    ) {
      let totalSum = useStateCartPrice.value + 150;
      strTotal = "Сумма заказа: " + totalSum + " ₽";
      strTotalComment = "(включая доставку 150 ₽)";
    } else if (
      personalData.delivery === "Доставка" &&
      personalData.locality === "База/Старая Пристань"
    ) {
      let totalSum = useStateCartPrice.value + 200;
      strTotal = "Сумма заказа: " + totalSum + " ₽";
      strTotalComment = "(включая доставку 200 ₽)";
    } else if (
      personalData.delivery === "Доставка" &&
      personalData.locality === "Другой"
    ) {
      strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
      strTotalComment = "(доставка платная - уточняется у оператора)";
    } else if (personalData.delivery === "Самовывоз") {
      strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
    }
  } else if (useStateCartPrice.value >= 1000) {
    if (
      (personalData.delivery === "Доставка" &&
        personalData.locality === "Лаишево") ||
      (personalData.delivery === "Доставка" &&
        personalData.locality === "База/Старая Пристань")
    ) {
      strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
      strTotalComment = "(доставка бесплатная)";
    } else if (
      personalData.delivery === "Доставка" &&
      personalData.locality === "Другой"
    ) {
      strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
      strTotalComment = "(сумма доставки уточняется у оператора)";
    } else if (personalData.delivery === "Самовывоз") {
      strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
    }
  }

  let strPayment = personalData.payment + strLineBreak;
  //
  //
  //

  if (personalData.phone !== "") {
    strOrder = strOrder + strPhone + strLineBreak;
  }

  if (personalData.name !== "") {
    strOrder = strOrder + strName + strLineBreak;
  }

  if (strProductList !== "") {
    strOrder = strOrder + strLineBreak + strProductList;
  }

  strOrder = strOrder + strLineBreak + strPersons + strLineBreak;

  if (personalData.delivery !== "Выберите способ доставки") {
    strOrder = strOrder + strLineBreak + strDelivery + strLineBreak;
  }

  if (
    personalData.locality !== "Выберите населённый пункт" &&
    personalData.delivery != "Самовывоз"
  ) {
    strOrder = strOrder + strLocality + strLineBreak;
  }

  if (personalData.address !== "" && personalData.delivery != "Самовывоз") {
    strOrder = strOrder + strAddress + strLineBreak;
  }

  if (strProductList !== "") {
    strOrder = strOrder + strLineBreak + strTotal + strLineBreak;
  }

  if (strProductList !== "" && personalData.delivery != "Самовывоз") {
    strOrder = strOrder + strTotalComment + strLineBreak;
  }

  if (personalData.payment !== "Выберите способ оплаты") {
    strOrder = strOrder + strLineBreak + strPayment;
  }

  return strOrder;
}
</script>

<template>
  <div class="order">
    <form class="order__form">
      <div class="input">
        <input
          v-maska
          data-maska="+7 ### ###-##-##"
          v-model="personalData.phone"
          id="phone"
          class="input__field"
          type="tel"
          placeholder=" "
          required
        />
        <div class="input__background"></div>
        <label for="phone" class="input__placeholder">Номер телефона</label>
      </div>

      <div class="input">
        <input
          v-model="personalData.name"
          id="name"
          class="input__field"
          type="text"
          placeholder=" "
          required
        />
        <div class="input__background"></div>
        <label for="name" class="input__placeholder">Имя</label>
      </div>

      <div class="input">
        <select
          class="input__field input__select"
          v-model="personalData.persons"
          id="persons"
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <div class="input__background"></div>
        <label for="persons" class="input__placeholder"
          >Количество персон</label
        >
      </div>

      <div class="input">
        <select
          class="input__field input__select"
          v-model="personalData.payment"
          id="payment"
        >
          <option disabled>Выберите способ оплаты</option>
          <option>Перевод на карту</option>
          <option>Наличные</option>
        </select>
        <div class="input__background"></div>
        <label for="payment" class="input__placeholder">Способ оплаты</label>
      </div>

      <div
        v-if="personalData.payment !== 'Выберите способ оплаты'"
        class="input"
      >
        <select
          class="input__field input__select"
          v-model="personalData.delivery"
          id="delivery"
        >
          <option disabled>Выберите способ доставки</option>
          <option>Самовывоз</option>
          <option>Доставка</option>
        </select>
        <div class="input__background"></div>
        <label for="delivery" class="input__placeholder">Способ доставки</label>
      </div>

      <div v-if="personalData.delivery === 'Самовывоз'" class="delivery__hints">
        <div v-if="useStateCartPrice >= 1000" class="delivery__text-wrapper">
          <p class="delivery__text">
            При самовывозе заказа от 1000 рублей действует акция - бесплатный
            ролл на выбор:
          </p>
          <fieldset class="radiogroup">
            <div class="radiogroup__radio">
              <input
                v-model="personalData.gift"
                class="radiogroup__input"
                type="radio"
                id="gift1"
                name="gift"
                value="Холодный ролл с копчёной курицей"
              />
              <label class="radiogroup__label" for="gift1"
                >Холодный ролл с копчёной курицей</label
              >
            </div>

            <div class="radiogroup__radio">
              <input
                v-model="personalData.gift"
                class="radiogroup__input"
                type="radio"
                id="gift2"
                name="gift"
                value="Холодный ролл с крабом"
              />
              <label class="radiogroup__label" for="gift2"
                >Холодный ролл с крабом</label
              >
            </div>
          </fieldset>
        </div>

        <div v-if="useStateCartPrice < 1000" class="delivery__text-wrapper">
          <p class="delivery__text">
            При самовывозе заказа от 1000 рублей действует акция - бесплатный
            ролл на выбор:
          </p>
          <p class="delivery__text">- Холодный ролл с копчёной курицей</p>
          <p class="delivery__text">- Холодный ролл с крабом</p>
          <p class="delivery__text text-danger">
            Пока сумма заказа менее 1000 рублей.
          </p>
          <p class="delivery__text text-danger">
            Вы можете вернуться в меню и добавить товары, чтобы получить
            подарок.
          </p>
        </div>
      </div>

      <div v-if="personalData.delivery === 'Доставка'" class="delivery__hints">
        <div class="input">
          <select
            class="input__field input__select"
            v-model="personalData.locality"
            id="locality"
          >
            <option disabled>Выберите населённый пункт</option>
            <option value="Лаишево">Лаишево</option>
            <option value="База/Старая Пристань">База/Старая Пристань</option>
            <option value="Другой">Другой</option>
          </select>
          <div class="input__background"></div>
          <label for="locality" class="input__placeholder"
            >Населённый пункт</label
          >
        </div>

        <div
          style="margin-top: 30px"
          v-if="personalData.locality !== 'Выберите населённый пункт'"
        >
          <div class="input">
            <input
              v-model="personalData.address"
              id="name"
              class="input__field"
              type="text"
              placeholder=" "
              required
            />
            <div class="input__background"></div>
            <label for="name" class="input__placeholder">Адрес</label>
          </div>

          <div class="delivery__text-wrapper">
            <p class="delivery__text">Условия бесплатной доставки:</p>
            <p class="delivery__text">- от 1000 рублей в пределах Лаишево</p>
            <p class="delivery__text">
              - от 1200 рублей на Базу и Старую Пристань
            </p>
            <p class="delivery__text">
              Остальные варианты уточняются у оператора при подтверждении
              заказа.
            </p>
            <p class="delivery__text text-danger">
              При самовывозе заказа от 1000 рублей действует акция - бесплатный
              ролл на выбор.
            </p>
          </div>
        </div>
      </div>
    </form>

    <div
      v-if="
        personalData.delivery !== 'Выберите способ доставки' &&
        useStateCartPrice > 0
      "
      class="order__list"
    >
      <h2 class="order__list-title">Состав заказа</h2>
      <p class="order__list-content" style="white-space: pre-line">
        {{ orderString() }}
      </p>
    </div>
  </div>

  <a
    v-if="
      personalData.delivery !== 'Выберите способ доставки' &&
      useStateCartPrice > 0
    "
    :href="`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
      orderString()
    )}`"
    class="order__button"
  >
    <IconSocialWhatsApp class="order__button-icon" />
    <p class="order__button-text">Отправить заказ в WhatsApp</p>
  </a>
</template>

<style lang="scss" scoped>
.order {
  padding-left: 15px;
  padding-right: 15px;

  &__form {
    display: flex;
    padding: 15px;
    flex-direction: column;
    border-radius: 10px;
    background: $color-background;
    box-shadow: $shadow-card;
    margin-bottom: 15px;
  }

  &__list {
    display: flex;
    padding: 15px;
    flex-direction: column;
    border-radius: 10px;
    background: $color-background;
    box-shadow: $shadow-card;
    margin-bottom: 15px;
  }
  &__list-title {
    margin-bottom: 10px;
    font-size: 20px;
    text-align: center;
  }
  &__list-content {
    margin-bottom: 10px;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 10px;
    background: $color-input;
  }

  &__button {
    display: flex;
    justify-content: center;
    vertical-align: middle;
    padding: 15px 0;
    background-color: $color-whatsapp;
  }
  &__button-icon {
    height: 25px;
    width: 25px;
    fill: $color-text-light;
    margin-right: 10px;
  }
  &__button-text {
    display: flex;
    align-self: center;
    color: $color-text-light;
  }
}

.input {
  height: 50px;
  position: relative;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;

  &__field {
    background-color: $color-input;
    border-radius: 10px;
    border: 0;
    box-sizing: border-box;
    font-size: 18px;
    height: 100%;
    outline: 0;
    padding: 4px 20px 0;
    width: 100%;
    color: $color-text-gray;
  }

  &__background {
    border-radius: 10px;
    height: 20px;
    left: 20px;
    position: absolute;
    top: -20px;
    transform: translateY(0);
    transition: transform 200ms;
    width: 176px;
  }

  &__field:focus ~ &__background,
  &__field:not(:placeholder-shown) ~ &__background {
    transform: translateY(8px);
  }

  &__placeholder {
    left: 20px;
    line-height: 14px;
    pointer-events: none;
    position: absolute;
    transform-origin: 0 50%;
    transition: transform 200ms, color 200ms;
    top: 20px;
    color: $color-input-text;
  }

  &__field:focus ~ &__placeholder,
  &__field:not(:placeholder-shown) ~ &__placeholder {
    transform: translateY(-40px) translateX(1px) scale(0.75);
  }

  &__field:not(:placeholder-shown) ~ &__placeholder {
    color: $color-input-text;
  }

  &__field:focus ~ &__placeholder {
    color: $color-danger;
  }

  &__select {
    appearance: none;
  }
}

.radiogroup {
  border: none;
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 10px;

  &__legend {
    margin-bottom: 15px;
    font-weight: 700;
  }

  &__radio {
    margin-bottom: 10px;
  }

  &__input {
    margin-bottom: 10px;
  }

  &__label {
    margin-left: 10px;
  }
}

.delivery {
  &__text-wrapper {
    padding: 15px;
    margin-top: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
    background: $color-input;
  }
  &__text {
    margin-bottom: 10px;
  }
}
</style>
