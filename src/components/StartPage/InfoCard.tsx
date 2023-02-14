import { link } from "fs";
import { FC } from "react";
import { Link } from "react-router-dom";
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
      <div className="card-body d-flex flex-column">
        {info.text && <p className="card-text">{info.text}</p>}
        {info.text1 && <p className="card-text">{info.text1}</p>}
        {info.text2 && <p className="card-text">{info.text2}</p>}
        {info.text3 && <p className="card-text">{info.text3}</p>}
        {info.link && (
          <a href={info.link} target="_blank" rel="noreferrer">
            Author link &#8658;
          </a>
        )}
        {info.link && (
          <a href={info.link2} target="_blank" rel="noreferrer">
            Git link &#8658;
          </a>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
