import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArcContext } from "../../Context/ArcTabelContext";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Modal } from 'antd';
import { Field, useFormik, useField } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';


export default function AddRootFolder() {
  const [modal2Open, setModal2Open] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  let { pathArray, setImgTitle } = useContext(ArcContext)
  let [displayedPath, setdisplayedPath] = useState('')
  let [backClick, setBackClick] = useState(false)
  let [errorMsg, setErrorMsg] = useState("");
  let depName = localStorage.getItem("depName");
  const [selectedFile, setSelectedFile] = useState(null);
  let id = useParams()
  const [ws, setWs] = useState(null);
  useEffect(() => {
    const wsImpl = window.WebSocket || window.MozWebSocket;
    const newWs = new wsImpl('ws://localhost:8181/');
    setWs(newWs);

    // Cleanup function
    return () => {
      if (newWs) {
        newWs.close();
      }
    };
  }, []); // Empty dependency array to run only once on component mount
  const scanImage = (values) => {
    localStorage.setItem('imgTtitlee', values.name)
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("1100");
    } else {
      alert('فشل الاتصال');
    }
  };

  useEffect(() => {
    const handleWebSocketMessage = async (event) => {
      if (event.data instanceof Blob) {
        const f = event.data;
        let ip = '192.168.2.21';
        let token = localStorage.getItem("token");
        // upload the image to the server
        const formData = new FormData();
        formData.append("files", f, f.name + ".png");
        formData.append("parentId", id.id);
        localStorage.setItem('imgNum', localStorage.getItem('imgTtitlee'))
        formData.append("name", localStorage.getItem('imgTtitlee'));

        let response = await axios
          .post(`http://${ip}:5678/upload`, formData, {
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
    };

    if (ws) {
      ws.addEventListener('message', handleWebSocketMessage);
    }

    // Cleanup function
    return () => {
      if (ws) {
        ws.removeEventListener('message', handleWebSocketMessage);
      }
    };
  }, [ws]);



  const items = [
    {
      label: (
        <p onClick={() => setModal2Open(true)}>إضافة مجلد <i className="fa-solid fa-folder-plus"></i></p>
      ),
      key: '0',
    },
    {
      label: (
        <p onClick={() => setModal1Open(true)}>إضافة ملف <i className="fa-regular fa-image"></i></p>
      ),
      key: '1',
    },
    {
      label: (
        <p onClick={() => setModal3Open(true)}>سحب الملف</p>
      ),
      key: '2',
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

  let formik1 = useFormik({
    initialValues: {
      file: null
    }, onSubmit: addFolder,
  })

  let formik3 = useFormik({
    initialValues: {
      name: ''
    }, onSubmit: scanImage
  })

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0])
  }

  async function addFolder(values) {
    let depName = localStorage.getItem("depName")
    let token = localStorage.getItem("token");
    let data = {
      name: `${values.name}-${depName}`,
    }
    let ip = '192.168.2.21';

    if (selectedFile) {
      if (id.id) {
        let formData = new FormData();
        formData.append('files', selectedFile); // Assuming `file` is a File object
        formData.append('parentId', id.id);
        formData.append('name', values.name);

        let response = await axios
          .post(`http://${ip}:5678/upload`, formData, {
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
    } else {
      if (id.id) {
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

  }

  async function getChildPath() {
    setBackClick(true)
    let token = localStorage.getItem('token')
    let id = window.location.pathname.split('/').slice(-1)[0]
    let ip = '192.168.2.21';
    let { data } = await axios.get(`http://${ip}:5678/item/${id}/path`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(err => err)
    setdisplayedPath(data.path);
  }

  useEffect(() => {
    let handlePopstate = () => {
      getChildPath()
    }

    // Add event listener for the popstate event
    window.addEventListener('popstate', handlePopstate);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [displayedPath])



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
          {window.location.pathname == '/arcTabel' ? localStorage.setItem('path', '') : <h5 className="d-inline mx-3">{backClick ? displayedPath : localStorage.getItem('path').slice(2, -2)}</h5>}
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
          <Modal
            title=""
            centered
            open={modal1Open}
            onOk={() => setModal1Open(false)}
            onCancel={() => setModal1Open(false)}
            className='direction fontFamily'
          >
            <form className='mt-4' onSubmit={formik1.handleSubmit}>
              <label htmlFor="name">إسم الملف</label>
              <input
                className="form-control my-1"
                type="name"
                id="name"
                name="name"
                value={formik1.values.name}
                onChange={formik1.handleChange}
                onBlur={formik1.handleBlur}
              />
              <input
                className="form-control my-1"
                type="file"
                id="file"
                name="file"
                value={formik1.values.file}
                onChange={handleFileChange}
                onBlur={formik1.handleBlur}
              />

              <div className="ant-modal-footer show mt-4">
                <button type="button" onClick={() => { setModal1Open(false) }} className="ant-btn css-dev-only-do-not-override-1xg9z9n ant-btn-default"><span>إلغاء</span></button>
                <button disabled={!(formik1.isValid && formik1.dirty)}
                  type="submit" onClick={() => { setModal1Open(false) }} className="fontFamily  ant-btn css-dev-only-do-not-override-1xg9z9n ant-btn-primary"><span>إضافه</span></button></div>
            </form>
          </Modal>
          <Modal
            title=""
            centered
            open={modal3Open}
            onOk={() => setModal3Open(false)}
            onCancel={() => setModal3Open(false)}
            className='direction fontFamily'
          >
            <form className='mt-4' onSubmit={formik3.handleSubmit}>
              <label htmlFor="name">إسم الملف</label>
              <input
                className="form-control my-1"
                type="name"
                id="name"
                name="name"
                value={formik3.values.name}
                onChange={formik3.handleChange}
                onBlur={formik3.handleBlur}
              />
              <div className="ant-modal-footer show mt-4">
                <button type="button" onClick={() => { setModal3Open(false) }} className="ant-btn css-dev-only-do-not-override-1xg9z9n ant-btn-default"><span>إلغاء</span></button>
                <button disabled={!(formik3.isValid && formik3.dirty)}
                  type="submit" onClick={() => { setModal3Open(false) }} className="fontFamily  ant-btn css-dev-only-do-not-override-1xg9z9n ant-btn-primary"><span>سحب الملف</span></button></div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  </>
}


