import React from "react";
import env_config from "../../config/index";

const IconImage = ({ imageSrc, classname, handleClick }) => {
  const { PF } = env_config;

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
