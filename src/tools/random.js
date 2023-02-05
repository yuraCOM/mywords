function randomN() {
  // return (Math.random() * 100000000000000000)
  var result = "";
  var words = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  var max_position = words.length - 1;
  for (let i = 0; i < 7; ++i) {
    let position = Math.floor(Math.random() * max_position);
    result = result + words.substring(position, position + 1);
  }
  return result;
}

function str_randLen(long) {
  var result = "";
  // var words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  var words = "0123456789QWERTYUIOPASDFGHJKLZXCVBNM";
  var max_position = words.length - 1;
  for (let i = 0; i < long; ++i) {
    let position = Math.floor(Math.random() * max_position);
    result = result + words.substring(position, position + 1);
  }
  return result;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//перемешать элементы массива js
//Самый оптимальный способ для перемешивания элементов массива - это алгоритм тасования Фишера — Йетса,
export const shuffle = (array) => {
  let m = array.length,
    t,
    i;
  // Пока есть элементы для перемешивания
  while (m) {
    // Взять оставшийся элемент
    i = Math.floor(Math.random() * m--);
    // И поменять его местами с текущим элементом
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

export const getRndBgColor = (bgColorArr) => {
  let rndNum = getRndInteger(0, bgColorArr.length - 1);
  return bgColorArr[rndNum];
};

export { randomN, str_randLen, getRndInteger };
