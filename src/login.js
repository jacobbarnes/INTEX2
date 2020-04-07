import React from 'react'
import { Card, Col, Form} from "react-bootstrap"
import {Link} from 'react-router-dom'

export default function Login() {

    return(
        <div>
        <Col md='3' className="position-absolute" 
        style={{
            top: "50%", /* position the top  edge of the element at the middle of the parent */
            left: "50%", /* position the left edge of the element at the middle of the parent */
            transform: "translate(-50%, -50%)"
        }}> 
        <Card className="light-bg p-5" 
                style = {{
                    border: "#336482 solid 3px",
                    width: "100%"
                }}>
        <Link to={"/"}><i className="fas fa-times-circle position-absolute" style={{right:"5px", top: "5px", color: "black"}}></i></Link>
        <Card.Body className="bg-accent text-center">
            <i className="fas fa-user-circle text-primary" style={{ fontSize: "5rem", padding: "10px"}}></i>
            <Card.Title className="m2 text-center"><b>Login</b></Card.Title>
            <Form className="d-flex justify-content-center">
            <Card.Text>
                <div className="input-group mb-3">
                    <div className="input-group-append">
                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                    </div>
                    <input type="text" name="" className="form-control input_user"  placeholder="email"/>
                </div>
                <div className="input-group mb-2">
                    <div className="input-group-append">
                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                    </div>
                    <input type="password" name="" className="form-control input_pass" placeholder="password"/>
                </div>
            <Link to={"/"} className="btn btn-primary mt-2" style={{ width: "100%"}}>Login</Link>
            </Card.Text>
            </Form>
            <hr/>
            <Card.Text>
                <div className="mt-40">
                    <div className="d-flex justify-content-center links py-2">
                        <b>Don't have an account?</b>
                    </div>
                </div>
                <Link to={"/Signup"} className="btn btn-dark" style={{ width: "40%"}}>Sign Up</Link>

            </Card.Text>
        </Card.Body>
        </Card>
        </Col>
        
        </div>
    )
}