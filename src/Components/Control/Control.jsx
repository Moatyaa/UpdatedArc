import React from "react";
import { Tabs } from "antd";
import Departments from "../Departments/Departments";
import Users from "../Users/Users";
import Path from "../Path/Path";
export default function Control() {
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
    },
  ];
  return (
    <>
      <div className="container">
        <Tabs className="direction mt-5" defaultActiveKey="1" items={items} />
      </div>
    </>
  );
}
