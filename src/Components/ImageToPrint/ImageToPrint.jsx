import React from 'react'
import testImg from '../../logo.svg'
import { Helmet } from 'react-helmet'

export default function ImageToPrint() {
    return <>
        <Helmet>
            <title>Print</title>
            <meta name="description" content="Print" />
        </Helmet>
        <div className="container">
            <img src={testImg} />
        </div>
    </>
}
