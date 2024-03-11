import React, { useEffect } from 'react'
import '../../index.css'
export default function Print() {
    useEffect(() => {
        window.print()
    }, [])
    return <>
        <div className='printHolder text-center'>
            <img className='printedImg' src={localStorage.getItem('imgUrl')} alt="" />
        </div>
    </>
}
