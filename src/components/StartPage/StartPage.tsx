import { FC } from "react";
import { startInfoText } from "../../tools/infoText";
import InfoCard from "./InfoCard";

const StartPage: FC = () => {
  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">
        {startInfoText.map((block, index) => (
          <InfoCard key={index + "infoblock"} info={block} />
        ))}
      </div>
    </>
  );
};

export default StartPage;
