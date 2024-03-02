import React from "react";
import cover from "../../Assets/cover.png";
export default function Cover() {
  return (
    <>
      <div className="cover img-holder">
        <img className="img" src={cover} alt="cover" />
      </div>
    </>
  );
}
