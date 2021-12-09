import React from "react";
import config from "../../config";

const IconImage = ({ imageSrc, classname, handleClick }) => {
  const { PF } = config;

  return (
    <img
      src={`${PF}${imageSrc}`}
      className={classname}
      alt=""
      onClick={handleClick && handleClick}
    />
  );
};

export default IconImage;
