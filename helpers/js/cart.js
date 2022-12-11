const addToCart = (cartArray, productId, price, quantity = 1) => {
  let isProduct = false;

  for (let key in cartArray) {
    if (cartArray[key].id === productId) {
      cartArray[key].quantity += quantity;

      isProduct = true;
    }

    if (isProduct) break;
  }

  if (!isProduct) {
    cartArray.push({
      id: productId,
      quantity: quantity,
      price: price,
    });
  }

  return cartArray;
};

const deleteFromCart = (cartArray, productId, quantity = 1) => {
  let isProduct = false;

  for (let key in cartArray) {
    if (cartArray[key].id === productId && +cartArray[key].quantity > 0) {
      cartArray[key].quantity -= quantity;

      if (+cartArray[key].quantity <= 0) {
        const index = cartArray.findIndex((item) => item.id === productId);
        if (index !== -1) {
          cartArray.splice(index, 1);
        }
      }

      isProduct = true;
    }

    if (isProduct) break;
  }

  return cartArray;
};

const clearCart = (cartArray) => {
  return cartArray.splice(0, cartArray.length);
};

const calcCartQuantity = (cartArray) => {
  let total = 0;

  for (let key in cartArray) {
    total += +cartArray[key].quantity;
  }

  return total;
};

const calcCartPrice = (cartArray) => {
  let total = 0;

  for (let key in cartArray) {
    total += +cartArray[key].price * +cartArray[key].quantity;
  }

  return total;
};

const getProductQuantity = (cartArray, productId) => {
  let quantity = 0;

  for (let key in cartArray) {
    if (cartArray[key].id === productId) {
      quantity = cartArray[key].quantity;
      break;
    } else {
      quantity = 0;
    }
  }

  return quantity;
};

export default {
  addToCart,
  deleteFromCart,
  clearCart,
  calcCartQuantity,
  calcCartPrice,
  getProductQuantity,
};
