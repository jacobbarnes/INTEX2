import React from 'react'
import { Card, Col, Button, Spinner} from "react-bootstrap"
import {Link} from 'react-router-dom'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field} from 'formik'
import AppContext from './context';
import axios from 'axios';
// import { useHistory } from "react-router-dom";



export default function Login() {
    let context = React.useContext(AppContext)

    return(
        <Col md='4' className="position-absolute "
        style={{
            top: "50%", /* position the top  edge of the element at the middle of the parent */
            left: "50%", /* position the left edge of the element at the middle of the parent */
            transform: "translate(-50%, -50%)"
        }}> 
            <Formik
                initialValues={{
                    email: "y@gmail",
                    password: 'aaa',
                }}
                validateOnChange={false}
                validateOnBlur={true}
                validate={values => {
                    const errors = {}
                    if (!values.email) {
                        errors.name = 'Required';
                    }
                    if (values.email.length < 3 ) {
                        errors.name = 'Please enter your email';
                    }
                    // if (['admin', 'null'].includes(values.name)) {
                    //     errors.name = 'Nice try';
                    // }
                    if (!values.password) {
                        errors.address1 = 'Required';
                    }
                    if (values.password.length > 23 ) {
                        errors.name = 'limit of 23 characters, nice try';
                    }
                    console.log('validating', values)
                    return errors
                }}
                onSubmit={async (values, actions) => {
                    document.getElementById("loading").style.display = "inline-block"
                    document.getElementById("postForm").disabled = true;
                    console.log("made it to the on submit")
                    // console.log('values:', values)
                    // console.log('actions:', actions)
                    var respLogin
                    try {
                        respLogin = await axios.post('https://intextwo.herokuapp.com/api/login/', {
                            "email" : values["email"],
                            "password" : values["password"],}
                        )
                        console.log("Login", respLogin)
                    }catch(err){
                        window.alert(err)
                    }
                    document.getElementById("loading").style.display = "none"
                    document.getElementById("postForm").disabled = false;
                }}
            >{form => ( 
                    <LoginForm form={form}/>
            )}</Formik>
            </Col>
        )
    }

const LoginForm = props => (
    <Form id="LoginForm">
        <div className="container">
            <div className="row">
            <div className="col">
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
                    {/* <div className="input-group mb-3">
                            <span style={{height: "40px"}}className="input-group-text"><i className="fas fa-envelope text-dark"></i></span> */}
                        <Input style={{height: "40px"}} type="text" name="email" className=" input_user"  placeholder="email"/>
                    {/* </div>
                    <br/>
                    <div className="input-group mb-2">
                        <div className="input-group-append">
                            <span  style={{height: "40px"}} className="input-group-text"><i className="fas fa-key text-dark"></i></span>
                        </div> */}
                        <Input  style={{height: "40px"}} type="password" name="password" className="input_pass" placeholder="password"/>
                    {/* </div> */}
                    <Button type="submit" id="postForm" disabled={Formik.isSubmitting} className="btn btn-thirdry btn-block btn-lg p-1 my-3"> <Spinner as="span" animation="border" size="sm" role="status" area-hidden="true" id="loading" style={{display:"none"}}/> Login</Button> 
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
            </div> 
            </div>
        </div>
    </Form>
)
const Input = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
            {props.title &&
                <bs.Form.Label>{props.title}</bs.Form.Label>
            }
            <bs.Form.Control
                type={props.type}
                placeholder={props.placeholder}
                disabled={rProps.form.isSubmitting}
                {...rProps.field}
            />
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)