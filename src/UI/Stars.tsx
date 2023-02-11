import React, { FC } from "react";
import { getStarsArr } from "../components/Cards/cardsTools";
import { Word } from "../store/types";
import { randomN } from "../tools/random";

interface StarsProps {
  word: Word;
  // random: () => string;
}
const Stars: FC<StarsProps> = ({ word }) => {
  let stars = getStarsArr(word.rating);
  return (
    <div className="stars">
      {stars.map(function (star) {
        if (star) {
          return (
            <img
              key={randomN()}
              src={require("../assets/starEllow.png")}
              alt="star"
            />
          );
        }
        return (
          <img
            key={randomN()}
            src={require("../assets/starWhite.png")}
            alt="star"
          />
        );
      })}
    </div>
  );
};

export default Stars;
