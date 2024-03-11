import React, { useContext, useState } from 'react';
import { Button, Modal } from 'antd';
import * as Yup from "yup";
import { useFormik } from 'formik';
import axios from 'axios';
import { ArcContext } from '../../Context/ArcTabelContext';

export default function AddDepModal() {
    const [modal2Open, setModal2Open] = useState(false);
    let [errorMsg, setErrorMsg] = useState("");
    async function submit(values) {
        let token = localStorage.getItem("token");
        let ip = '192.168.2.21';
        let response = await axios
            .post(`http://${ip}:5678/department`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setErrorMsg(err.response.data.message);
            });
        window.location.reload();
    }
    let formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("إسم الفرع مطلوب"),
        }), onSubmit: submit
    })
    return (
        <>
            <Button className='btn addBtn m-0 p-0' type="primary" onClick={() => setModal2Open(true)}>
                إضافة فرع
            </Button>
            <Modal
                title=""
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                className='direction fontFamily'
            >
                <form className='mt-4' onSubmit={formik.handleSubmit}>
                    <label htmlFor="name">إسم الفرع</label>
                    <input
                        className="form-control my-1"
                        placeholder='النظم'
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
                            type="submit" onClick={() => { submit(); setModal2Open(false) }} className="fontFamily  ant-btn css-dev-only-do-not-override-1xg9z9n ant-btn-primary"><span>إضافه</span></button></div>
                </form>
            </Modal>
        </>
    );
}
