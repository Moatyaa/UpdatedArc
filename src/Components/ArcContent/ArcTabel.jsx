import React, { useContext, useEffect, useState } from 'react'
import { ArcContext } from '../../Context/ArcTabelContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import AddRootFolder from '../Home/AddRootFolder'

export default function ArcTabel() {
    let [ArcData, setArcData] = useState()
    let { setId, setChildPath, setPath } = useContext(ArcContext)
    let [loading, isLoading] = useState(false);
    let [depName, setDepName] = useState('')
    let [errorMsg, setErrorMsg] = useState("");
    let navigate = useNavigate()
    async function getArcPageData() {
        let token = localStorage.getItem("token");
        let ip = "192.168.2.25";
        isLoading(true);
        let { data } = await axios
            .get(`http://${ip}:5678/folder/root`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .catch((err) => {
                setErrorMsg(err.response.data.message);
                isLoading(false);
            });
        setDepName(localStorage.getItem("depName"));
        setArcData(data);
        isLoading(false);
    }

    useEffect(() => {
        getArcPageData()
    }, [])


    async function deleteItem(id, path) {
        let token = localStorage.getItem('token')
        let ip = "192.168.2.25";
        let { data } = await axios.delete(`http://${ip}:5678/item/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        ).catch(err => err)
        console.log(data)
        window.location.reload()
    }
    function clickFolder(id, path) {
        setId(id);
        setPath(path);
    }
    return <>
        <AddRootFolder />
        <div className="container">
            <table className="table table-hover mt-5 direction">

                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">الإسم</th>
                        <th scope="col">الفرع</th>
                        <th scope="col">تاريخ الإنشاء</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className='cursor-pointer'>
                    {ArcData ? ArcData.map((el, index) => (
                        <tr key={el.id} onClick={() => { clickFolder(el.id, el.path) }}>
                            <td className='w-sm'>{el.isFolder ? <i className="fa-solid fa-folder text-sec mr-3"></i> : ''}</td>
                            <td><Link to={`/childFolder/${el.id}`}>{el.name.split('-')[0]}</Link></td>
                            <td>{localStorage.getItem('depName')}</td>
                            <td>{`${new Date(el.createdAt).getDate()}/${new Date(el.createdAt).getMonth() + 1}/${new Date(el.createdAt).getFullYear()}`}</td>
                            <td><i onClick={() => { deleteItem(el.id, el.name) }} className="fa-solid fa-trash text-sec cursor-pointer"></i></td>
                        </tr>

                    )) : null}
                </tbody>
            </table>
        </div>

    </>
}
