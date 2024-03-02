import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { ArcContext } from '../../Context/ArcTabelContext';

export default function Path() {
    let [data, setData] = useState([])
    let { path, setPath } = useContext(ArcContext)
    async function getPath() {
        let token = localStorage.getItem("token");
        let ip = "192.168.2.16";
        let response = await axios
            .get(`http://${ip}:5678/configs`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
        setData(response.data.archive_path)
    }
    useEffect(() => {
        getPath()
    }, [])
    async function submit(values) {
        console.log(values)
        let token = localStorage.getItem("token");
        let ip = "192.168.2.25";
        let response = await axios
            .post(`http://${ip}:5678/configs`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            )
            .catch((err) => {
                console.log(err.response.data.message);
            });
        setData(response.data.archive_path)
        window.location.reload()

    }
    let formik = useFormik({
        initialValues: {
            archive_path: "",
        },
        onSubmit: submit,
    });
    return <>
        <div className='fontFamily'>
            <h6 className='fw d-inline'>المسار :</h6>
            <span className=' mx-2'>{data}</span>
        </div>
        <form className='fontFamily w-50 mt-3' onSubmit={formik.handleSubmit}>
            <label className='fw my-2' htmlFor="archive_path">تعديل المسار</label>
            <input
                className="form-control my-1  brdr"
                type="archive_path"
                id="archive_path"
                name="archive_path"
                value={formik.values.archive_path}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                className="mt-2 btn text-white my-1 bg-main"
            >
                تعديل
            </button>
        </form>

    </>
}
