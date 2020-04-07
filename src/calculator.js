import React, { useState } from 'react'
import * as bs from 'react-bootstrap'
import campaigns from './campaigns'
import { Formik, Form, Field} from 'formik'

function Calculator(props) {
    const [submitted, setSubmitted] = useState(false);

    return (
        <bs.Container fluid className='p-0 d-flex flex-column'>
            
                
                        <Formik
                            initialValues={{
                                title: '',
                                goal: '',
                                category_id: '',
                                auto_fb_post_mode: [],
                                is_charity: [],
                            }}
                            validateOnChange={false}
                            validateOnBlur={true}
                            validate={values => {
                                const errors = {}
                                if (values.title === "") { errors.title = "Title is required" }
                                setSubmitted(false)
                                return errors
                            }}
                            onSubmit={async (values, actions) => {
                                console.log('submit', values)
                                setSubmitted(true)
                            }}
                        >{form => (
                            <PaymentForm form={form} submitted={submitted} setSubmitted={setSubmitted}/>
                        )}</Formik>
                    
            



        </bs.Container>
    )
}
export default Calculator


const PaymentForm = props => {
    const categories = {};

    // eslint-disable-next-line
    let total = 0
    for (let p of campaigns) {
        categories[p.category] = (categories[p.category] || 0) + 1
        total += 1
    }

    return (
        <bs.Row noGutters className='py-5' style={{ paddingLeft: '10%', paddingRight: '10%' }}>
            <bs.Col md='4'>
                <bs.Card className="p-5 shadow bg-white rounded">
                    <Form id='calcForm'>
                        <bs.Container className="mx-0">
                            <bs.Row>
                                <bs.Col>
                                    <h2>Success Calculator</h2><hr/>
                                    <Input title="Title:" name="title" type="text" disabled={props.form.isSubmitting} />
                                    <Input title="Goal:" name="goal" type="text" disabled={props.form.isSubmitting} />
                                    <Input title="Category ID:" name="category_id" type="text" disabled={props.form.isSubmitting} />
                                    <Checkbox name='auto_fb_post_mode' value="Auto FaceBook Post" />
                                    <Checkbox name='is_charity' value="Is Charity" />

                                    {/* <bs.Button type="submit" className="btn btn-primary mt-4" disabled={props.form.isSubmitting} style={{ margin: 'auto', display: 'block' }}>
                                        {props.form.isSubmitting &&
                                            <bs.Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className="mr-2"
                                            />
                                        }
                                        Submit
                                    </bs.Button> */}
                                </bs.Col>
                            </bs.Row>
                        </bs.Container>
                    </Form>
                </bs.Card>
            </bs.Col>
            <bs.Col md='4' style={{ textAlign: 'center' }}>
                <i onClick={() => props.form.submitForm()} style={{ cursor: "pointer", marginTop: '150px',}} className="fas fa-arrow-alt-circle-right fa-7x"></i>
            </bs.Col>
            <bs.Col md='4'>
                <bs.Card className="p-5 shadow bg-white rounded" style={{height:'100%'}}>
                    <h2>Results</h2><hr/>
                    {props.submitted === false &&
                        "press the button to submit"
                    }

                    {props.submitted &&
                        <>
                            <h4>Number of Donators:</h4>
                            <h6>42</h6><br/>
                            <h4>Amount per Donation:</h4>
                            <h6>$42</h6>
                        </>
                    }
                </bs.Card>
            </bs.Col>
        </bs.Row>
    )
}


const Input = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
            {props.title &&
                <bs.Form.Label><strong>{props.title}</strong></bs.Form.Label>
            }
            <bs.Form.Control
                type={props.type}
                placeholder={props.placeholder}
                {...rProps.field}
                disabled={props.disabled}
            />
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)

function Checkbox(props) {
    return (
        <Field name={props.name}>
            {({ field, form }) => (
                <label style={{ fontSize: '12px' }} className="mb-0">
                    <input
                        className="mx-2"
                        type="checkbox"
                        {...props}
                        checked={field.value.includes(props.value)}
                        onChange={() => {
                            if (field.value.includes(props.value)) {
                                const nextValue = field.value.filter(
                                    value => value !== props.value
                                );
                                form.setFieldValue(props.name, nextValue);
                            } else {
                                const nextValue = field.value.concat(props.value);
                                form.setFieldValue(props.name, nextValue);
                            }
                        }}
                    />
                    {props.value}
                </label>
            )}
        </Field>
    );
}