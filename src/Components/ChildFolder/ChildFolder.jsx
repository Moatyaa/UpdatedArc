import React, { useContext, useEffect, useState } from 'react'
import { ArcContext } from '../../Context/ArcTabelContext';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AddRootFolder from '../Home/AddRootFolder';
import { Image, Space } from 'antd';

export default function ChildFolder() {
    let { setPath, setId } = useContext(ArcContext)
    let Pid = useParams()
    let [dataa, setData] = useState([])

    async function getChildFolders() {
        let token = localStorage.getItem('token')
        let ip = '192.168.2.21';
        let { data } = await axios.get(`http://${ip}:5678/folder/child?id=${Pid.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(err => err)
        setData(data)
        if (Pid.id) {
            setId(Pid.id)
        }
    }

    useEffect(() => {
        getChildFolders()
    }, [Pid])

    async function deleteItem(id) {
        let token = localStorage.getItem('token')
        let ip = '192.168.2.21';
        let { data } = await axios.delete(`http://${ip}:5678/item/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        ).catch(err => err)
        window.location.reload()
    }

    function changeId(newId, path) {
        Pid = {
            id: newId
        }
        setPath(path)
        getChildFolders()
        window.location.reload()
    }

    const handlePrint = (path) => {
        localStorage.setItem('imgUrl', `http://192.168.2.21:5678/file/${encodeURIComponent(path)}`)
    };

    return <>
        <div className='container'>
            <AddRootFolder />
            <table className="table direction table-hover mt-5">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">الإسم</th>
                        <th scope="col">الفرع</th>
                        <th scope="col">تاريخ الإنشاء</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {dataa ? dataa.map((el, index) => (
                        <tr key={el.id}>
                            <td className='w-sm'>{el.isFolder ? <i className="fa-solid fa-folder text-sec mr-3"></i> : <Space
                                size={12}>
                                <Image
                                    width={20}
                                    src={`http://192.168.2.21:5678/file/${encodeURIComponent(el.path)}`}
                                    placeholder={
                                        <Image
                                            preview={false}
                                            src={`http://192.168.2.21:5678/file/${encodeURIComponent(el.path)}`}
                                            width={20}
                                        />
                                    }
                                />
                            </Space>}</td>
                            {el.isFolder ? <td onClick={() => { changeId(el.id, el.path) }}><Link className='d-block' to={`/childFolder/${el.id}`}>{el.name}</Link></td> : <td className='cursor-pointer'>{el.name}</td>}
                            <td>{localStorage.getItem('depName')}</td>
                            <td>{`${new Date(el.createdAt).getDate()}/${new Date(el.createdAt).getMonth() + 1}/${new Date(el.createdAt).getFullYear()}`}</td>
                            {el.isFolder ? <td><i onClick={() => { deleteItem(el.id) }} className="fa-solid fa-trash text-sec cursor-pointer"></i></td> : <td><i onClick={() => { deleteItem(el.id) }} className="fa-solid fa-trash text-sec cursor-pointer"></i><Link onClick={() => { handlePrint(el.path) }} target='_blank' to={`/print`} > <i className="fa-solid fa-print"></i></Link></td>}
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div >

    </>
}
