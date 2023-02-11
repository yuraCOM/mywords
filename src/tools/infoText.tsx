export type infoBlock = {
  bgColor: string;
  head?: string;
  text: string;
  text1?: string;
  text2?: string;
  text3?: string;
};

export const startInfoText: infoBlock[] = [
  {
    bgColor: "bg-primary",
    head: "Program MyCard.",
    text: "Program for your new words & phrases - save, repeat, learn or checking yourse.",
  },
  {
    bgColor: "bg-success",
    head: "Add Words & Phrases.",
    text: "You can add new words & phrases into your dictionary, and their meaning, description and note.",
  },
  {
    bgColor: "bg-warning",
    head: "Cards Words & Phrases.",
    text: "Cards with your words and phrases help memories their and refresh knowledge.",
  },
  {
    bgColor: "bg-info",
    head: "Words & Phrases Storage.",
    text: "In Storage keep words & phrases - read,  fixed and deleted their.",
  },
  {
    bgColor: "bg-secondary",
    head: "User Info.",
    text: "Info about User - Login, Password and different information.",
  },
  {
    bgColor: "bg-danger",
    head: "Test Login.",
    text: "Try programm with test login: 11111, password: 11111",
  },
];
