const filterArrayByKey = (array, key, value) => {
  return array.filter((item) => {
    if (item[key] === value) {
      return true;
    } else {
      return false;
    }
  });
};

const filterArrayByArray = (arraySource, arrayFilter) => {
  return arraySource.filter((item) => {
    let isId = false;

    for (let key in arrayFilter) {
      let a = item.id;
      let b = arrayFilter[key].id;

      if (+a == +b) {
        isId = true;
        break;
      } else {
        isId = false;
      }
    }

    if (isId == true) return true;
  });
};

export default { filterArrayByKey, filterArrayByArray };
