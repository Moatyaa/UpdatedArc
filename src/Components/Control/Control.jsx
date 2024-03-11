import React from "react";
import { Tabs } from "antd";
import Departments from "../Departments/Departments";
import Users from "../Users/Users";
import Path from "../Path/Path";
import { useNavigate } from "react-router-dom";
export default function Control() {
  let navigate = useNavigate()
  const items = [
    {
      key: "1",
      label: "الأفرع",
      children: <Departments />,
    },
    {
      key: "2",
      label: "المستخدمين",
      children: <Users />,
    },
    {
      key: "3",
      label: "مسار الأرشيف",
      children: <Path />,
    }
  ];
  return (
    <>
      <div className="container mt-5">
        <h6 className="fw-bolder cursor-pointer fit-width" onClick={() => { navigate('/ArcTabel') }}><i className="fa-solid fa-arrow-left"></i> إلي الأرشيف</h6>
        <Tabs className="direction mt-5" defaultActiveKey="1" items={items} />
      </div>
    </>
  );
}
