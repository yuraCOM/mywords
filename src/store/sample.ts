export const sampleWord = {
  wordId: "W-" + Date.now().toString(),
  word: "word",
  type: "wd", // wd - word, phr - phrase
  meanOne: "слово",
  meanTwo: "",
  meanThree: "",
  rating: 0,
  note: "",
};

export const sampleWordStart = {
  wordId: "0",
  word: "0",
  type: "0", // wd - word, phr - phrase
  meanOne: "0",
  meanTwo: "0",
  meanThree: "0",
  rating: 0,
  note: "0",
};

export const userNew = {
  userId: "User-" + Date.now().toString(),
  login: "00000",
  password: "00000",
  words: [sampleWord, sampleWord],
};

export const userNew2 = {
  userId: "User-" + Date.now().toString(),
  login: "11111",
  password: "11111",
  words: [sampleWord, sampleWord],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let x = [
  {
    type: "word",
    meanThree: "1",
    wordId: "Word-1675598090189",
    note: "1",
    rating: 7,
    word: "1",
    meanTwo: "1",
    meanOne: "1",
  },
  {
    meanOne: "2",
    wordId: "Word-1675599522799",
    rating: 7,
    meanTwo: "",
    type: "word",
    meanThree: "",
    word: "2",
    note: "",
  },
  {
    meanTwo: "",
    note: "",
    meanThree: "",
    rating: 7,
    word: "3",
    wordId: "Word-1675599527243",
    type: "word",
    meanOne: "3",
  },
  {
    meanTwo: "",
    meanThree: "",
    type: "word",
    word: "4",
    note: "",
    meanOne: "4",
    rating: 7,
    wordId: "Word-1675599568607",
  },
  {
    meanOne: "Яблоко",
    type: "word",
    meanThree: "",
    meanTwo: "",
    wordId: "Word-1675619737049",
    word: "Apple",
    rating: 5,
    note: "",
  },
  {
    meanOne: "Красный",
    note: "",
    meanTwo: "",
    type: "word",
    meanThree: "",
    rating: 2,
    wordId: "Word-1675608471753",
    word: "Red",
  },
  {
    rating: 2,
    note: "",
    meanThree: "",
    word: "Green",
    type: "word",
    meanTwo: "",
    wordId: "Word-1675608497268",
    meanOne: "Зеленый",
  },
  {
    meanTwo: "",
    type: "word",
    meanThree: "",
    note: "",
    rating: 2,
    word: "Word",
    wordId: "Word-1675608750051",
    meanOne: "Слово",
  },
  {
    wordId: "Word-1675620149779",
    meanTwo: "Необыкновенный",
    word: "Unusual",
    meanThree: "",
    type: "word",
    meanOne: "Необычный",
    rating: 2,
    note: "",
  },
  {
    wordId: "Word-1675617997907",
    note: "",
    word: "5",
    meanThree: "",
    meanTwo: "",
    type: "word",
    rating: 1,
    meanOne: "5",
  },
  {
    meanTwo: "Похоронить",
    meanOne: "Хоронить",
    wordId: "Word-1675619979068",
    note: "put or hide under ground.\nhe buried the box in the back garden",
    rating: 1,
    word: "Bury",
    meanThree: "Закапывать",
    type: "word",
  },
  {
    meanThree: "",
    meanTwo: "",
    word: "I don`t mind",
    type: "phrase",
    rating: 1,
    meanOne: "Я не против",
    wordId: "Word-1675620837137",
    note: "",
  },
  {
    word: "Annoyed",
    meanTwo: "Раздосадованный",
    wordId: "Word-1675621756251",
    meanThree: "",
    rating: 1,
    meanOne: "Раздраженный",
    type: "word",
    note: "",
  },
  {
    word: "Beside",
    note: "",
    meanOne: "Рядом",
    meanThree: "Рядом с",
    type: "word",
    wordId: "Word-1675619853020",
    rating: 0,
    meanTwo: "Возле",
  },
  {
    meanOne: "Плотник",
    meanTwo: "",
    word: "Carpenter",
    wordId: "Word-1675620204106",
    rating: 0,
    meanThree: "",
    type: "word",
    note: "",
  },
  {
    wordId: "Word-1675620272497",
    rating: 0,
    meanThree: "",
    type: "word",
    word: "Canal boat ",
    meanOne: "Баржа",
    note: "a long, narrow boat used on canals.",
    meanTwo: "",
  },
  {
    meanThree: "",
    word: "I can't stand",
    type: "phrase",
    rating: 0,
    note: "",
    wordId: "Word-1675620878720",
    meanOne: "Я терпеть не могу",
    meanTwo: "",
  },
  {
    note: "",
    meanTwo: "Делать отметку",
    rating: 0,
    meanOne: "Галочка",
    word: "Tick",
    wordId: "Word-1675621007289",
    type: "word",
    meanThree: "Отмечать 'птичкой'",
  },
  {
    word: "Mess",
    wordId: "Word-1675621206437",
    rating: 0,
    meanOne: "Беспорядок",
    type: "word",
    note: "",
    meanTwo: "Бардак",
    meanThree: "",
  },
  {
    wordId: "Word-1675621269885",
    rating: 0,
    meanTwo: "Слово во множественном числе",
    meanThree: "Множественный",
    word: "Plural",
    note: "",
    type: "word",
    meanOne: "Множественное число",
  },
  {
    word: "Curtains",
    wordId: "Word-1675621541952",
    meanTwo: "",
    type: "word",
    rating: 0,
    note: "",
    meanThree: "",
    meanOne: "Шторы",
  },
  {
    word: "Originally",
    meanThree: "",
    rating: 0,
    wordId: "Word-1675621686921",
    meanTwo: "Оригинально",
    type: "word",
    meanOne: "Первоначально",
    note: "originally of - изначально из",
  },
  {
    note: "a shy smile - застенчивая улыбка",
    type: "word",
    meanTwo: "Робкий",
    meanThree: "Стеснительный",
    word: "Shy",
    rating: 0,
    meanOne: "Застенчивый",
    wordId: "Word-1675621862521",
  },
  {
    meanTwo: "Напуганный",
    note: "frightened child - испуганный ребенок",
    meanOne: "Испуганный",
    type: "word",
    rating: 0,
    meanThree: "",
    word: "Frightened",
    wordId: "Word-1675621974425",
  },
  {
    meanThree: "Вселенная",
    rating: 0,
    word: "World",
    meanTwo: "Свет окружающий",
    wordId: "Word-1675631309044",
    note: "the whole world hates a Monday",
    type: "word",
    meanOne: "Мир",
  },
  {
    meanOne: "Весь",
    wordId: "Word-1675631441065",
    meanTwo: "Целій",
    word: "Whole",
    rating: 0,
    note: "he spent the whole day walking - он весь день гулял",
    meanThree: "Целое",
    type: "word",
  },
  {
    word: "Wood",
    type: "word",
    wordId: "Word-1675632158209",
    note: "",
    meanTwo: "Дрова",
    meanThree: "Дерево",
    rating: 0,
    meanOne: "Древесина",
  },
  {
    rating: 0,
    meanOne: "Вы бы хотели",
    meanTwo: "Ты хочешь",
    note: "",
    wordId: "Word-1675632246069",
    meanThree: "Ты бы хотел",
    word: "Would you like",
    type: "phrase",
  },
  {
    note: "",
    type: "word",
    rating: 0,
    word: "333",
    meanTwo: "",
    meanThree: "",
    meanOne: "333",
    wordId: "Word-1675636142953",
  },
];
