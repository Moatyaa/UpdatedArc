import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { userContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setToken, setFirstName, setRole } = useContext(userContext);
  let [errorMsg, setErrorMsg] = useState("");
  let [loading, isLoading] = useState(false);
  let navigate = useNavigate();

  async function submit(values) {
    let ip = "192.168.2.25";
    isLoading(true);
    let { data } = await axios
      .post(`http://${ip}:5678/login`, values)
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMsg(err.response.data.message);
        isLoading(false);
      });
    console.log(data.message);

    if (data.message == "success") {
      navigate("/arcTabel");
      localStorage.setItem("token", data.token);
      localStorage.setItem("firstName", data.user.firstName);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("depName", data.user.department.name);
      setToken(data.token);
      setFirstName(data.user.firstName);
      setRole(data.user.role);
    }
    isLoading(false);
  }

  let validate = Yup.object({
    userName: Yup.string().required("إسم المستخدم مطلوب"),
    password: Yup.string().required("كلمة المرور مطلوبة"),
  });
  let formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: submit,
  });
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="login" />
      </Helmet>
      <div className="container mt-5 w-25 direction">
        <div className="fs-2 my-3">تسجيل الدخول</div>
        {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="userName">إسم المستخدم</label>
          <input
            className="form-control my-1"
            type="userName"
            id="userName"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.userName && formik.touched.userName ? (
            <div className="alert alert-danger p-2 my-2">
              {formik.errors.userName}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="password">كلمة المرور</label>
          <input
            className="form-control my-1"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger p-2 my-2">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
          {!loading ? (
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="mt-2 btn text-white my-1 bg-main"
            >
              دخول
            </button>
          ) : (
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="mt-2 btn text-white my-1 bg-main"
            >
              <Audio
                height="20"
                width="20"
                color="#fff"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
              />
            </button>
          )}
        </form>
      </div>
    </>
  );
}
