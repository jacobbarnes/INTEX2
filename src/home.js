import React from 'react'
import { Col, Row} from "react-bootstrap"
export default function Home() {

    return(
        <div className="text-center" style={{  backgroundColor: 'rgb(250,250,250)', padding: "3%", width: "100%" }}>
            <br/>
            <hr/>
            <h3 className="text-light p-4" style={{backgroundColor: "#31b663"}}><b>Here to help</b></h3>
            <hr/>
            <h6>“If there be any truer measure of a man than by what he does, it must be by what he gives.”  ―Robert South</h6>
            <br/>
            <img src='/GoFundMe-Logo-1.png' alt='logo' className='mainimage'/>
        </div>
    )
}