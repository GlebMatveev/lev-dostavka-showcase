<script setup>
import { vMaska } from "maska";
// States
const useStateProducts = useState("stateProducts");
const useStateCart = useState("stateCart");
const useStateCartPrice = useState("stateCartPrice");

const personalData = reactive({
  phone: "",
  name: "",
  persons: 0,
  payment: "",
  delivery: "",
  address: "",
  gift: "",
});

function orderString() {
  const strLineBreak = "\n";
  const strDoubleLineBreak = "\n\n";
  let strOrder = "";

  let strPhone = personalData.phone + strLineBreak;

  let strName = personalData.name + strLineBreak;

  let strProductList = "";
  strProductList = strProductList + strLineBreak;
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
  strProductList = strProductList + strLineBreak;

  let strPersons = "Приборы: " + personalData.persons + strDoubleLineBreak;

  let strDelivery = personalData.delivery + strLineBreak;

  let strAddress = personalData.address + strDoubleLineBreak;

  let strTotal = strLineBreak + useStateCartPrice.value + " ₽" + strLineBreak;

  let strPayment = personalData.payment + strLineBreak;
  //
  //
  //

  if (personalData.phone !== "") {
    strOrder = strOrder + strPhone;
  }

  if (personalData.name !== "") {
    strOrder = strOrder + strName;
  }

  strOrder = strOrder + strProductList;

  strOrder = strOrder + strPersons;

  if (personalData.delivery !== "") {
    strOrder = strOrder + strDelivery;
  }

  if (personalData.address !== "") {
    strOrder = strOrder + strAddress;
  }

  strOrder = strOrder + strTotal;

  if (personalData.payment !== "") {
    strOrder = strOrder + strPayment;
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

      <fieldset class="radiogroup">
        <legend class="radiogroup__legend">Способ оплаты:</legend>

        <div class="radiogroup__radio">
          <input
            v-model="personalData.payment"
            class="radiogroup__input"
            type="radio"
            id="card"
            name="payment"
            value="Перевод на карту"
          />
          <label class="radiogroup__label" for="card">Перевод на карту</label>
        </div>

        <div class="radiogroup__radio">
          <input
            v-model="personalData.payment"
            class="radiogroup__input"
            type="radio"
            id="cash"
            name="payment"
            value="Наличные"
          />
          <label class="radiogroup__label" for="cash">Наличные</label>
        </div>
      </fieldset>

      <fieldset class="radiogroup">
        <legend class="radiogroup__legend">Способ доставки:</legend>

        <div class="radiogroup__radio">
          <input
            v-model="personalData.delivery"
            class="radiogroup__input"
            type="radio"
            id="pickup"
            name="delivery"
            value="Самовывоз"
          />
          <label class="radiogroup__label" for="pickup">Самовывоз</label>
        </div>

        <div class="radiogroup__radio">
          <input
            v-model="personalData.delivery"
            class="radiogroup__input"
            type="radio"
            id="delivery"
            name="delivery"
            value="Доставка"
          />
          <label class="radiogroup__label" for="delivery">Доставка</label>
        </div>
      </fieldset>

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
            Остальные варианты уточняются у оператора при подтверждении заказа.
          </p>
          <p class="delivery__text text-danger">
            При самовывозе заказа от 1000 рублей действует акция - бесплатный
            ролл на выбор.
          </p>
        </div>
      </div>
    </form>

    <div class="order__list">
      <h2 class="order__list-title">Состав заказа</h2>
      <p class="order__list-content" style="white-space: pre-line">
        {{ orderString() }}
      </p>
    </div>
  </div>

  <a
    :href="`https://wa.me/79033133319?text=${encodeURIComponent(
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
  }
  &__list-content {
    font-family: "Roboto Mono", monospace;
  }

  &__button {
    display: flex;
    justify-content: center;
    vertical-align: middle;
    padding: 15px 0;
    // border-radius: 10px;
    background-color: $color-whatsapp;
    // box-shadow: $shadow-card;
    // margin-bottom: 30px;
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
  }

  &__field:focus ~ &__placeholder,
  &__field:not(:placeholder-shown) ~ &__placeholder {
    transform: translateY(-40px) translateX(1px) scale(0.75);
  }

  &__field:not(:placeholder-shown) ~ &__placeholder {
    color: $color-text-gray;
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
    // margin-left: 20px;
    margin-bottom: 15px;
    font-weight: 700;
  }

  &__radio {
    // margin-left: 5px;
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
  &__hints {
    margin-top: 15px;
  }
  &__text-wrapper {
    margin-bottom: 10px;
    // margin-left: 10px;
    // margin-right: 10px;

    padding: 15px;
    margin-bottom: 15px;
    border-radius: 10px;
    background: $color-input;
  }
  &__text {
    // color: $color-text-gray;
    margin-bottom: 10px;
  }
}
</style>
