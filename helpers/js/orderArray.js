const orderArray = (array, key, direction = "asc") => {
  if (direction === "asc") {
    return array.sort(
      (first, second) => +first[key] - +second[key]
      //  ? 1 : -1
    );
  } else if (direction === "desc") {
    return array.sort(
      (first, second) => +first[key] + +second[key]
      // ? 1 : -1
    );
  }
};

export default orderArray;
