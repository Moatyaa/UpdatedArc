import React, { useEffect } from "react";
import cover from "../../Assets/cover.png";
import { useNavigate } from "react-router-dom";

export default function Cover() {
  let navigate = useNavigate()
  return (
    <>
      {
        localStorage.getItem('token') ?
          navigate('/arcTabel')
          :
          <div className="cover img-holder">
            <img className="img" src={cover} alt="cover" />
          </div>
      }

    </>
  );
}
