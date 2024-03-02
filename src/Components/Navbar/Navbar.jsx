import React, { useContext } from "react";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from "antd";

export default function Navbar() {
  let { token, setToken, role, firstName } = useContext(userContext);
  let navigate = useNavigate();
  const handleMenuClick = (e) => {
    localStorage.removeItem("token");
    setToken(localStorage.getItem("token"));
    navigate("/cover");
  };
  const handleClick = () => {
    if (role == "ادمن") {
      navigate("/control");
    }
  };
  const items = [
    {
      label: role,
      key: "1",
      onClick: handleClick,
    },
    {
      label: "تسجيل الخروج",
      key: "2",
      danger: true,
      onClick: handleMenuClick,
    },
  ];
  const menuProps = {
    items,
  };

  return (
    <>
      <nav className="nav container navbar shadow">
        {token ? (
          <div className="text-sec d-flex w-100 justify-content-between align-items-center">
            <h2 className="fw">منظومة الأرشيف</h2>
            <Space wrap>
              <Dropdown.Button
                menu={menuProps}
                placement="bottom"
                icon={<UserOutlined />}
                className="nav-ant-btn"
              >
                {firstName}
              </Dropdown.Button>
            </Space>
          </div>
        ) : (
          <div className="text-sec d-flex w-100 justify-content-between align-items-center">
            <div>
              <h4 className="fw">
                <a className="text-sec" href="#">
                  إدارة نوادي وفنادق ق.م
                </a>
              </h4>
            </div>
            <div>
              <Link to={"/login"}>
                <button className="btn  fw">تسجيل الدخول</button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
