import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Users() {
    let [dataa, setData] = useState([])
    async function getUsers(values) {
        let token = localStorage.getItem("token");
        let ip = "192.168.2.16";
        let response = await axios
            .get(`http://${ip}:5678/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
        console.log(response.data)
        setData(response.data)
    }
    async function deletUsers(id) {
        let token = localStorage.getItem("token");
        let ip = "192.168.2.25";
        let response = await axios
            .delete(`http://${ip}:5678/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });

        console.log(response)
        window.location.reload()
    }

    useEffect(() => {
        getUsers()
    }, [])

    return <>
        <table className='table fontFamily'>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">إسم المستخدم</th>
                    <th scope="col">الإسم الأول</th>
                    <th scope="col">الإسم الثاني</th>
                    <th scope="col">الفرع</th>
                    <th scope="col">الصلاحيه</th>
                </tr>
            </thead>
            <tbody>
                {dataa ? dataa.map((el, index) => (
                    <tr key={el.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{el.userName}</td>
                        <td>{el.firstName}</td>
                        <td>{el.lastName}</td>
                        <td>{el.department.name}</td>
                        <td>{el.role}</td>
                        <td><i onClick={() => { deletUsers(el.id) }} className="fa-solid fa-trash text-sec cursor-pointer"></i></td>
                    </tr>
                )) : ''}
            </tbody>
        </table>
    </>
}

