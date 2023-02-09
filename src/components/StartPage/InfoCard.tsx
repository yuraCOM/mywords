import { FC } from "react";
import { infoBlock } from "../../tools/infoText";
import "./cardStyle.css";

interface InfoCardProps {
  info: infoBlock;
}

const InfoCard: FC<InfoCardProps> = ({ info }) => {
  return (
    <div
      className={`card text-white bg-primary mb-3 m-3 ${info.bgColor} info-card`}
    >
      <div className="card-header">{info.head}</div>
      <div className="card-body">
        <p className="card-text">{info.text}</p>
        <p className="card-text">{info.text1}</p>
        <p className="card-text">{info.text2}</p>
        <p className="card-text">{info.text3}</p>
      </div>
    </div>
  );
};

export default InfoCard;
