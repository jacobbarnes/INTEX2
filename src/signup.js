import React from 'react'
import { Card, Col, Button, Spinner} from "react-bootstrap"
import {Link} from 'react-router-dom'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field} from 'formik'
import AppContext from './context';
import axios from 'axios';
import { useHistory } from "react-router-dom";


export default function Signup() {
    let context = React.useContext(AppContext)
    let history = useHistory();
    return(
        <Col md='4' className="position-absolute "
        style={{
            top: "50%", /* position the top  edge of the element at the middle of the parent */
            left: "50%", /* position the left edge of the element at the middle of the parent */
            transform: "translate(-50%, -50%)"
        }}> 
            <Formik
                initialValues={{
                    email: "byu@gmail.com",
                    password: 'aaa',
                    password_verify: 'aaa'
                }}
                validateOnChange={false}
                validateOnBlur={true}
                validate={values => {
                    const errors = {}
                    if (!values.email) {
                        errors.email = 'Required';
                    }
                    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    if (values.email.length < 3 ) {
                        errors.email = 'Please enter your email';
                    }
                    if (['admin', 'null'].includes(values.email)) {
                        errors.name = 'Nice try';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    if (['admin', 'null'].includes(values.email)) {
                        errors.name = 'Nice try';
                    }
                    if (values.password.length < 8 ) {
                        errors.password = 'minimum of 8 characters';
                    }
                    if (values.password.length > 23 ) {
                        errors.password = 'limit of 23 characters';
                    }
                    if(values.password !== values.password_verify) {
                        errors.password_verify = 'passwords must match';
                    }
                    console.log('validating', values)
                    return errors
                }}
                onSubmit={async (values, actions) => {
                    document.getElementById("loading").style.display = "inline-block"
                    document.getElementById("postForm").disabled = true;
                    console.log("made it to the on submit")
                    var respLogin
                    try {
                        respLogin = await axios.post('https://intextwo.herokuapp.com/api/user/', {
                            "email" : values["email"],
                            "password" : values["password"],}
                        )
                        if (respLogin.data === 200) {
                            context.addUser(200)
                            history.push("/")
                        }
                        else {
                            document.getElementById("invalid").style.display = "inline-block"
                        }
                    }catch(err){
                        window.alert(err)
                    }
                    document.getElementById("loading").style.display = "none"
                    document.getElementById("postForm").disabled = false;
                }}
            >{form => ( 
                    <AccoutForm form={form}/>
            )}</Formik>
            </Col>
        )
    }

const AccoutForm = props => (
    <Form id="AccoutForm">
            <Card className="light-bg p-5" 
                style = {{
                    border: "#336482 solid 3px",
                    width: "100%"
                }}>
            <Link to={"/"}><i className="fas fa-times-circle position-absolute" style={{right:"5px", top: "5px", color: "black"}}></i></Link>
            <Card.Body 
            className="bg-accent text-center">
                <i className="fas fa-user-circle text-primary"
                    style={{
                        fontSize: "5rem",
                        padding: "10px",
                    }}></i>
                <Card.Title className="m2 text-center"><b>Make An Account </b></Card.Title>
                <p id="invalid" style={{display:"none", color: "red"}}>Email is already in use</p>
                <Card.Body>
                        <Input type="email" name="email" className="form-control input_pass"  placeholder="email"/>
                        <Input type="password" name="password" className="form-control input_pass"  placeholder="password"/>
                        <Input type="password" name="password_verify" className="form-control input_pass" placeholder="Confirm password"/>
                <Button type="submit" id="postForm" disabled={Formik.isSubmitting} className="btn btn-thirdry btn-block btn-lg p-1 my-3"> <Spinner as="span" animation="border" size="sm" role="status" area-hidden="true" id="loading" style={{display:"none"}}/>Sign up</Button>
                <hr/>
                </Card.Body>
                <Card.Body>
                    <div className="mt-4">
                        <div className="d-flex justify-content-center links py-2">
                            <b> Already have an account? </b>
                        </div>
                    </div>
                    <Link to={"/Login"} className="btn btn-dark" style={{ width: "40%"}}>Login</Link>
                </Card.Body>
            </Card.Body>
            </Card>
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