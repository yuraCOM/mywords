export const START_PAGE_ROUTE = "/";
export const ADD_NEW_WORD_ROUTE = "/add-new-word";
export const AUTHORIZATION_ROUTE = "/auth";
export const REGISTRATION_ROUTE = "/registration";
export const READ_WR_PHR_ROUTE = "/read-words-phrases";
export const CARDS_ROUTE = "/cards";
export const USER_ROUTE = "/user";
export const ANSWER_ROUTE = "/answer";

export const bgColorArr = [
  "bg-primary",
  "bg-secondary",
  "bg-success",
  "bg-info",
  "bg-warning",
  "bg-danger",
  //   "bg-light",
];

//select type
export let sortType = [
  { value: "wordUp", name: "Sort Abc > Z" },
  { value: "wordDown", name: "Sort Zyw > A" },
  { value: "dateDown", name: "Sort date up" },
  { value: "dateUp", name: "Sort date down" },
  { value: "rating", name: "Sort by stars" },
];

//audio
export const answerSound = new Audio(
  require("../../src/assets/sounds/multiashnogo-nagatiya.mp3")
);
export const nextSound = new Audio(require("../../src/assets/sounds/lift.mp3"));
export const verno = new Audio(require("../../src/assets/sounds/verno.mp3"));
export const wrong = new Audio(require("../../src/assets/sounds/wrong.mp3"));

export function stopAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
}
