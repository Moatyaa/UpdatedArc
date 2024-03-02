import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/UserContext";
import AddDepModal from "../Modal/AddDepModal";

export default function Departments() {
  let { token } = useContext(userContext);
  let [data, setData] = useState([]);
  async function deleteDep(id) {
    console.log(id)
    let token = localStorage.getItem("token");
    let ip = "192.168.2.16";
    let response = await axios
      .delete(`http://${ip}:5678/department/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      .catch((err) => {
        console.log(err.response.data.message);
      });

    window.location.reload()
  }
  async function getDepartments() {
    let token = localStorage.getItem("token");
    let ip = "192.168.2.25";
    let response = await axios
      .get(`http://${ip}:5678/department`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
    setData(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <><div className="accordion brdr py-3" id="accordionExample">
      <div>
        <button className="btn addBtn"><AddDepModal /></button>

      </div>
      {data ? data.map((el) => <div key={el.id} className="accordion-item">
        <h2 className="accordion-header" id={el.id}>
          <button
            className="accordion-button collapsed fw"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${el.name}`}
            aria-controls={el.name}
          >
            <div className="w-100 d-flex justify-content-between ">
              <div>{el.name}</div>
              <div onClick={() => { deleteDep(el.id) }}><i className="fa-solid fa-trash"></i></div>
            </div>
          </button>
        </h2>
        <div id={el.name} className="accordion-collapse collapse " aria-labelledby={el.id} data-bs-parent="#accordionExample">
          <div className="accordion-body">
            {el.id}
          </div>
        </div>
      </div>

      )
        : ""} </div>
    </>
  );
}
