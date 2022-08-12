module.exports = function check(str, bracketsConfig) {
  let repeated = [];

  let objPairs = bracketsConfig.reduce((acc, arr) => {
    if (arr[0] === arr[1]) {
      repeated.push(arr[0]);
      return acc;
    } else {
      acc[arr[1]] = arr[0];
      return acc;
    }
  }, {});

  let openingBracketsArr = bracketsConfig.reduce((acc, arr) => {
    if (arr[0] === objPairs[arr[1]]) {
      acc.push(arr[0]);
      return acc;
    }
    return acc;
  }, []);

  let brackersStack = [];
  for (let i = 0; i < str.length; i++) {
    console.log(str[i]);

    if (repeated.includes(str[i])) {
      // если одинаковые
      let topElement = brackersStack[brackersStack.length - 1];
      if (topElement === str[i]) {
        brackersStack.pop();
        console.log(`Удалено одинак ${str[i]} из ${brackersStack}`);
      } else {
        brackersStack.push(str[i]);
        console.log(`Добавлено одинак ${str[i]} в ${brackersStack}`);
      }
    } else if (openingBracketsArr.includes(str[i])) {
      // если открывающие
      brackersStack.push(str[i]);
      console.log(`Добавлено открывающ ${str[i]} в ${brackersStack}`);
    } else {
      // если закрывающие
      if (brackersStack.length === 0) {
        console.log(`brackersStack.length === 0`);
        return false;
      } else {
        let topElement = brackersStack[brackersStack.length - 1];
        if (objPairs[str[i]] === topElement) {
          brackersStack.pop();
          console.log(`Удалено закрывающ ${str[i]} из ${brackersStack}`);
        } else {
          console.log(`Закрывающая в начале`);
          return false;
        }
      }
    }
  }
  console.log(brackersStack);

  console.log(brackersStack.length === 0);

  return brackersStack.length === 0;
}
