import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArcContext } from "../../Context/ArcTabelContext";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Modal } from 'antd';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

export default function AddRootFolder() {
  const [modal2Open, setModal2Open] = useState(false);
  let { pathArray } = useContext(ArcContext)
  let [displayedPath, setdisplayedPath] = useState('')
  let [backClick, setBackClick] = useState(false)
  let [errorMsg, setErrorMsg] = useState("");
  let depName = localStorage.getItem("depName");
  let id = useParams()
  const items = [
    {
      label: (
        <p onClick={() => setModal2Open(true)}>إضافة مجلد <i className="fa-solid fa-folder-plus"></i></p>
      ),
      key: '0',
    }
  ];


  let formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("إسم المجلد مطلوب"),
    }), onSubmit: addFolder
  })

  async function addFolder(values) {
    console.log(values)
    let depName = localStorage.getItem("depName")
    let token = localStorage.getItem("token");
    let data = {
      name: `${values.name}-${depName}`,
    }
    let ip = "192.168.2.25";
    if (id.id) {
      console.log(id.id)
      let response = await axios
        .post(`http://${ip}:5678/folder/child`, {
          name: `${values.name}`,
          parentId: id.id
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setErrorMsg(err.response.data.message);
        });
      window.location.reload()

    } else {
      let response = await axios
        .post(`http://${ip}:5678/folder/root`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setErrorMsg(err.response.data.message);
        });
      window.location.reload()
    }
  }

  async function getChildPath() {
    setBackClick(true)
    let token = localStorage.getItem('token')
    let id = window.location.pathname.split('/').slice(-1)[0]
    let ip = "192.168.2.25";
    let { data } = await axios.get(`http://${ip}:5678/item/${id}/path`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(err => err)
    setdisplayedPath(data.path)
  }

  useEffect(() => {
    let handlePopstate = () => {
      getChildPath()
      // window.location.pathname == '/login' || '/cover' ? window.history.pushState(null, '', '/arcTabel') : ''

    };

    // Add event listener for the popstate event
    window.addEventListener('popstate', handlePopstate);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [])


  return <>
    <Helmet>
      <title>Archive</title>
      <meta name="description" content="login" />
    </Helmet>
    <div className="container mt-5 direction">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Dropdown className="direction"
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <h2 className="cursor-pointer">{`أرشيف فرع ${depName}`}</h2>
                {pathArray ? <i className="fa-solid fa-angle-left"></i> : <DownOutlined />}
              </Space>
            </a>
          </Dropdown>
          {window.location.pathname == '/arcTabel' ? '' : <h5 className="d-inline mx-3">{backClick ? displayedPath : localStorage.getItem('path').slice(2, -2)}</h5>}
        </div>

        <div>
          <button className="btn brdr-light" onClick={() => setModal2Open(true)}>إضافة مجلد   +</button>
          <Modal
            title=""
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
            className='direction fontFamily'
          >
            <form className='mt-4' onSubmit={formik.handleSubmit}>
              <label htmlFor="name">إسم المجلد</label>
              <input
                className="form-control my-1"
                type="name"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="alert alert-danger p-2 my-2">
                  {formik.errors.name}
                </div>
              ) : (
                ""
              )}
              <div className="ant-modal-footer show mt-4">
                <button type="button" onClick={() => { setModal2Open(false) }} className="ant-btn css-dev-only-do-not-override-1xg9z9n ant-btn-default"><span>إلغاء</span></button>
                <button disabled={!(formik.isValid && formik.dirty)}
                  type="submit" onClick={() => { setModal2Open(false) }} className="fontFamily  ant-btn css-dev-only-do-not-override-1xg9z9n ant-btn-primary"><span>إضافه</span></button></div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  </>
}


