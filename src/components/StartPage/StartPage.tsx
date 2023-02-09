import { FC } from "react";
import { useAppSelector } from "../../store/hooks";
import { startInfoText } from "../../tools/infoText";
import WarningDisconect from "../../UI/WarningDisconect";
import InfoCard from "./InfoCard";

const StartPage: FC = () => {
  const userAuth = useAppSelector((state) => state.userAuthorization);
  let dataLocalStore: string | null = localStorage.getItem("MyWords");
  return (
    <>
      {/* {dataLocalStore && !userAuth.isConnect && <WarningDisconect />} */}
      <div className="d-flex flex-wrap justify-content-center">
        {startInfoText.map((block, index) => (
          <InfoCard key={index + "infoblock"} info={block} />
        ))}
      </div>
    </>
  );
};

export default StartPage;
