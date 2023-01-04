<script setup>
// Import
import { vMaska } from "maska";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss";

const altPosition = {
  transform: "translateX(-100%)",
};
// Router parameters
const router = useRouter();

// States
const useStateProducts = useState("stateProducts");
const useStateCart = useState("stateCart");
const useStateCartPrice = useState("stateCartPrice");

// Redirect
onMounted(() => {
  //
  console.log(useStateCartPrice.value);
  if (useStateCartPrice.value === 0) {
    router.push({ name: "index" });
  }
});
// Datetime
const pickerDate = ref(new Date());
const pickerTime = ref({
  hours: new Date().getHours() + 1,
  minutes: Math.round(new Date().getMinutes() / 10) * 10,
});

const minDate = ref(new Date());
const minTime = ref({
  hours: new Date().getHours() + 1,
  minutes: Math.round(new Date().getMinutes() / 10) * 10,
});
const maxTime = { hours: 22, minutes: 0 };

watch(pickerDate, () => {
  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).valueOf();
  const other = new Date(
    pickerDate.value.getFullYear(),
    pickerDate.value.getMonth(),
    pickerDate.value.getDate()
  ).valueOf();

  if (other === today) {
    pickerTime.value = {
      hours: new Date().getHours() + 1,
      minutes: Math.round(new Date().getMinutes() / 10) * 10,
    };
    minTime.value = {
      hours: new Date().getHours() + 1,
      minutes: Math.round(new Date().getMinutes() / 10) * 10,
    };
  } else if (other > today) {
    minTime.value = {
      hours: 10,
      minutes: 0,
    };
  }
});

// whatsAppNumber
const whatsAppNumber = "79033133319";

// personalData
const personalDataDefault = {
  phone: "",
  name: "",
  persons: 0,
  payment: "Выберите способ оплаты",
  delivery: "Выберите способ доставки",
  deliveryCost: 0,
  deliveryReadiness: "Получить заказ по готовности (как можно быстрее)",
  deliveryDate: pickerDate,
  deliveryTime: pickerTime,
  locality: "Выберите населённый пункт",
  address: "",
  gift: "",
};

const personalData = reactive({
  phone: personalDataDefault.phone,
  name: personalDataDefault.name,
  persons: personalDataDefault.persons,
  payment: personalDataDefault.payment,
  delivery: personalDataDefault.delivery,
  deliveryCost: personalDataDefault.deliveryCost,
  deliveryReadiness: personalDataDefault.deliveryReadiness,
  deliveryDate: personalDataDefault.deliveryDate,
  deliveryTime: personalDataDefault.deliveryTime,
  locality: personalDataDefault.locality,
  address: personalDataDefault.address,
  gift: personalDataDefault.gift,
});

let showDeliveryBlock = false;
let showOrderBlock = false;
let showDatetimeBlock = false;

watch(
  personalData,
  () => {
    localStorage.phone = personalData.phone;
    localStorage.name = personalData.name;
    sessionStorage.persons = personalData.persons;
    sessionStorage.payment = personalData.payment;
    sessionStorage.delivery = personalData.delivery;
    sessionStorage.deliveryReadiness = personalData.deliveryReadiness;
    sessionStorage.locality = personalData.locality;
    localStorage.address = personalData.address;
    sessionStorage.gift = personalData.gift;

    if (useStateCartPrice.value > 0) {
      if (personalData.delivery === "Самовывоз") {
        showDatetimeBlock = true;
        showOrderBlock = true;
      } else if (
        personalData.delivery === "Доставка" &&
        personalData.locality !== personalDataDefault.locality &&
        personalData.address !== ""
      ) {
        showDatetimeBlock = true;
        showOrderBlock = true;
      } else {
        showDatetimeBlock = false;
        showOrderBlock = false;
      }

      if (personalData.payment !== personalDataDefault.payment) {
        showDeliveryBlock = true;
      } else {
        showDeliveryBlock = false;
      }
    } else {
      showDatetimeBlock = false;
      showOrderBlock = false;
    }
  },
  { deep: true }
);

onMounted(() => {
  localStorage.phone && localStorage.phone != ""
    ? (personalData.phone = localStorage.phone)
    : (personalData.phone = personalDataDefault.phone);

  localStorage.name && localStorage.name != ""
    ? (personalData.name = localStorage.name)
    : (personalData.name = personalDataDefault.name);

  sessionStorage.persons && sessionStorage.persons != ""
    ? (personalData.persons = sessionStorage.persons)
    : (personalData.persons = personalDataDefault.persons);

  sessionStorage.payment && sessionStorage.payment != ""
    ? (personalData.payment = sessionStorage.payment)
    : (personalData.payment = personalDataDefault.payment);

  sessionStorage.delivery && sessionStorage.delivery != ""
    ? (personalData.delivery = sessionStorage.delivery)
    : (personalData.delivery = personalDataDefault.delivery);

  sessionStorage.deliveryReadiness && sessionStorage.deliveryReadiness != ""
    ? (personalData.deliveryReadiness = sessionStorage.deliveryReadiness)
    : (personalData.deliveryReadiness = personalDataDefault.deliveryReadiness);

  sessionStorage.locality && sessionStorage.locality != ""
    ? (personalData.locality = sessionStorage.locality)
    : (personalData.locality = personalDataDefault.locality);

  localStorage.address && localStorage.address != ""
    ? (personalData.address = localStorage.address)
    : (personalData.address = personalDataDefault.address);

  sessionStorage.gift && sessionStorage.gift != ""
    ? (personalData.gift = sessionStorage.gift)
    : (personalData.gift = personalDataDefault.gift);
});

function orderString() {
  const strLineBreak = "\n";

  // Returned string
  let strOrder = "";

  // Phone number string
  let strPhone = personalData.phone;

  // Name string
  let strName = personalData.name;

  // Products list string
  let strProductList = "";
  if (useStateCartPrice.value > 0) {
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
  }

  // Gift string
  // if the order amount is more than or equal to 1000
  if (
    personalData.gift !== personalDataDefault.gift &&
    useStateCartPrice.value >= 1000 &&
    personalData.delivery === "Самовывоз"
  ) {
    strProductList =
      strProductList + "+ " + personalData.gift + " в подарок" + strLineBreak;
  }

  // Persons string
  let strPersons = "Приборы: " + personalData.persons;

  // Delivery string
  let strDelivery = personalData.delivery;

  // Locality string
  let strLocality = "";
  if (personalData.delivery === "Доставка") {
    strLocality = personalData.locality;
  }

  // Address string
  let strAddress = personalData.address;

  // Order amount string
  let strTotal = "";
  let strTotalComment = "";
  if (useStateCartPrice.value < 1000) {
    if (personalData.delivery === "Доставка") {
      switch (personalData.locality) {
        case "Лаишево":
          strTotal = "Сумма заказа: " + (useStateCartPrice.value + 150) + " ₽";
          strTotalComment = "(включая доставку 150 ₽)";
          break;
        case "База/Старая Пристань":
          strTotal = "Сумма заказа: " + (useStateCartPrice.value + 200) + " ₽";
          strTotalComment = "(включая доставку 200 ₽)";
          break;
        case "Другой":
          strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
          strTotalComment = "(доставка платная - уточняется у оператора)";
          break;
        default:
          strTotal = "";
          strTotalComment = "";
      }
    } else if (personalData.delivery === "Самовывоз") {
      strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
      strTotalComment = "";
    }
  } else if (
    useStateCartPrice.value >= 1000 &&
    useStateCartPrice.value < 1200
  ) {
    if (personalData.delivery === "Доставка") {
      switch (personalData.locality) {
        case "Лаишево":
          strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
          strTotalComment = "(доставка бесплатная)";
          break;
        case "База/Старая Пристань":
          strTotal = "Сумма заказа: " + (useStateCartPrice.value + 200) + " ₽";
          strTotalComment = "(включая доставку 200 ₽)";
          break;
        case "Другой":
          strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
          strTotalComment = "(сумма доставки уточняется у оператора)";
          break;
        default:
          strTotal = "";
          strTotalComment = "";
      }
    } else if (personalData.delivery === "Самовывоз") {
      strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
      strTotalComment = "";
    }
  } else if (useStateCartPrice.value >= 1200) {
    if (personalData.delivery === "Доставка") {
      switch (personalData.locality) {
        case "Лаишево":
          strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
          strTotalComment = "(доставка бесплатная)";
          break;
        case "База/Старая Пристань":
          strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
          strTotalComment = "(доставка бесплатная)";
          break;
        case "Другой":
          strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
          strTotalComment = "(сумма доставки уточняется у оператора)";
          break;
        default:
          strTotal = "";
          strTotalComment = "";
      }
    } else if (personalData.delivery === "Самовывоз") {
      strTotal = "Сумма заказа: " + useStateCartPrice.value + " ₽";
      strTotalComment = "";
    }
  }

  // Payment string
  let strPayment = personalData.payment;

  // Delivery readiness string
  let strDeliveryReadiness = "";
  if (
    personalData.deliveryReadiness === personalDataDefault.deliveryReadiness
  ) {
    strDeliveryReadiness = "(по готовности)";
  } else if (
    personalData.deliveryReadiness === "Выбрать определённое время (предзаказ)"
  ) {
    strDeliveryReadiness =
      "(к " +
      (personalData.deliveryDate.getDate().toString().length > 1
        ? personalData.deliveryDate.getDate()
        : "0" + personalData.deliveryDate.getDate()) +
      "." +
      ((Number(personalData.deliveryDate.getMonth()) + 1).toString().length > 1
        ? Number(personalData.deliveryDate.getMonth()) + 1
        : "0" + (Number(personalData.deliveryDate.getMonth()) + 1)) +
      "." +
      personalData.deliveryDate.getFullYear() +
      " " +
      personalData.deliveryTime.hours +
      ":" +
      (personalData.deliveryTime.minutes === 0
        ? "00"
        : personalData.deliveryTime.minutes) +
      ")";
  }
  //
  //
  //
  if (personalData.phone !== "") {
    strOrder += strPhone + strLineBreak;
  }

  if (personalData.name !== "") {
    strOrder += strName + strLineBreak;
  }

  if (strProductList !== "" && useStateCartPrice.value > 0) {
    strOrder += strLineBreak + strProductList;
  }

  if (personalData.persons !== "") {
    strOrder += strLineBreak + strPersons + strLineBreak;
  }

  if (personalData.delivery !== personalDataDefault.delivery) {
    strOrder += strLineBreak + strDelivery + strLineBreak;
  }

  if (
    personalData.locality !== "" &&
    personalData.locality !== personalDataDefault.locality &&
    personalData.delivery !== "Самовывоз"
  ) {
    strOrder += strLocality + strLineBreak;
  }

  if (
    personalData.address !== "" &&
    personalData.locality !== personalDataDefault.locality &&
    personalData.delivery !== "Самовывоз"
  ) {
    strOrder += strAddress + strLineBreak;
  }

  if (strDeliveryReadiness !== "") {
    strOrder += strDeliveryReadiness + strLineBreak;
  }

  if (strTotal !== "" && strProductList !== "" && useStateCartPrice.value > 0) {
    strOrder += strLineBreak + strTotal + strLineBreak;
  }

  if (
    strTotalComment !== "" &&
    strProductList !== "" &&
    useStateCartPrice.value > 0
  ) {
    strOrder += strTotalComment + strLineBreak;
  }

  if (personalData.payment !== personalDataDefault.payment) {
    strOrder += strLineBreak + strPayment;
  }

  return strOrder;
}
</script>

<template>
  <div class="order">
    <div class="wrapper">
      <!-- Phone -->
      <div class="input">
        <input
          v-maska
          data-maska="+7##########"
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

      <!-- Name -->
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
    </div>

    <!-- Persons -->
    <div class="wrapper">
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
    </div>

    <!-- Payment -->
    <div class="wrapper">
      <div class="input">
        <select
          class="input__field input__select"
          v-model="personalData.payment"
          id="payment"
        >
          <option disabled>{{ personalDataDefault.payment }}</option>
          <option>Перевод на карту</option>
          <option>Наличные</option>
        </select>
        <div class="input__background"></div>
        <label for="payment" class="input__placeholder">Способ оплаты</label>
      </div>
    </div>

    <!-- Delivery -->
    <div v-if="showDeliveryBlock" class="wrapper">
      <!-- Delivery list-->
      <div class="input">
        <select
          class="input__field input__select"
          v-model="personalData.delivery"
          id="delivery"
        >
          <option disabled>{{ personalDataDefault.delivery }}</option>
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

          <!-- Gift -->
          <fieldset class="radiogroup">
            <div class="radiogroup__radio">
              <input
                v-model="personalData.gift"
                class="radiogroup__input"
                type="radio"
                id="gift1"
                name="gift"
                value="холодный ролл с копчёной курицей"
              />
              <label class="radiogroup__label" for="gift1"
                >холодный ролл с копчёной курицей</label
              >
            </div>

            <div class="radiogroup__radio">
              <input
                v-model="personalData.gift"
                class="radiogroup__input"
                type="radio"
                id="gift2"
                name="gift"
                value="холодный ролл с крабом"
              />
              <label class="radiogroup__label" for="gift2"
                >холодный ролл с крабом</label
              >
            </div>
          </fieldset>
        </div>

        <div v-if="useStateCartPrice < 1000" class="delivery__text-wrapper">
          <p class="delivery__text">
            При самовывозе заказа от 1000 рублей действует акция - бесплатный
            ролл на выбор:
          </p>
          <p class="delivery__text">- холодный ролл с копчёной курицей</p>
          <p class="delivery__text">- холодный ролл с крабом</p>
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
            <option disabled>{{ personalDataDefault.locality }}</option>
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
          v-if="personalData.locality !== personalDataDefault.locality"
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
    </div>

    <div v-if="showDatetimeBlock" class="wrapper">
      <fieldset class="radiogroup">
        <div class="radiogroup__radio">
          <input
            v-model="personalData.deliveryReadiness"
            class="radiogroup__input"
            type="radio"
            id="datetime1"
            name="datetime"
            :value="personalDataDefault.deliveryReadiness"
          />
          <label class="radiogroup__label" for="datetime1">{{
            personalDataDefault.deliveryReadiness
          }}</label>
        </div>

        <div class="radiogroup__radio">
          <input
            v-model="personalData.deliveryReadiness"
            class="radiogroup__input"
            type="radio"
            id="datetime2"
            name="datetime"
            value="Выбрать определённое время (предзаказ)"
          />
          <label class="radiogroup__label" for="datetime2"
            >Выбрать определённое время (предзаказ)</label
          >
        </div>
      </fieldset>

      <div
        v-if="
          personalData.deliveryReadiness ===
          'Выбрать определённое время (предзаказ)'
        "
      >
        <div class="delivery__text-wrapper">
          <p class="delivery__text">Режим работы:</p>
          <p class="delivery__text">с 10:00 до 22:00</p>
          <p class="delivery__text text-danger">Внимание!</p>
          <p class="delivery__text text-danger">
            Время указывается приблизительное и уточняется у оператора при
            подтверждении заказа.
          </p>
        </div>
        <div class="datetime-wrapper">
          <Datepicker
            class="datetime-wrapper__datepicker"
            v-model="pickerDate"
            :enable-time-picker="false"
            :min-date="minDate"
            auto-apply
            placeholder="Выберите дату"
            format="dd.MM.yyyy"
            locale="ru"
            teleport-center
          />

          <Datepicker
            class="datetime-wrapper__timepicker"
            v-model="pickerTime"
            time-picker
            :min-time="minTime"
            :max-time="maxTime"
            minutes-increment="10"
            cancel-text="Закрыть"
            select-text="Выбрать"
            teleport-center
            @cleared="console.log('Value cleared')"
          />
        </div>
      </div>
    </div>

    <!--  -->
    <div v-if="showOrderBlock" class="order__list">
      <h2 class="order__list-title">Состав заказа</h2>
      <p class="order__list-content" style="white-space: pre-line">
        {{ orderString() }}
      </p>
    </div>
  </div>

  <a
    v-if="showOrderBlock"
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
.wrapper {
  display: flex;
  padding: 15px;
  flex-direction: column;
  border-radius: 10px;
  background: $color-background;
  box-shadow: $shadow-card;
  margin-bottom: 15px;
}
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
    color: $color-input-text;
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

.datetime-wrapper {
  display: flex;

  &__datepicker {
    margin-right: 10px;
  }
}
</style>
