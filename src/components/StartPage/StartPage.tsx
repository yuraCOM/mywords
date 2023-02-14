import { FC, useEffect, useState } from "react";
import { startInfoText } from "../../tools/infoText";
import MyLoader from "../../UI/MyLoader/MyLoader";
import InfoCard from "./InfoCard";

const StartPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center mt-3">
          <MyLoader />
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {startInfoText.map((block, index) => (
            <InfoCard key={index + "infoblock"} info={block} />
          ))}
        </div>
      )}
    </>
  );
};

export default StartPage;
