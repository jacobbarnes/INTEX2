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
                                description: '',
                                category_id: "",
                                has_beneficiary: "",
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

                                    {/* Category_id (dropdown), 
                                    goal, title, description(text), 
                                    has_beneficiary (checkbox) */}
                                    <Input title="Title:" name="title" type="text" disabled={props.form.isSubmitting} />
                                    <Input title="Goal:" name="goal" type="text" disabled={props.form.isSubmitting} />
                                    <strong>Description:</strong>
                                    <Field
                                        name="description"
                                        component="textarea"
                                        rows="2"
                                        style={{ width: '100%', borderRadius: '5px', borderColor: 'lightgray' }}
                                    />
                                    <br/><br/>
                                    <Dropdown name='category_id' value="Category:" /><br/><br/>
                                    <strong>Has Beneficiary</strong><br/>
                                    {/* <Checkbox name='has_beneficiary' value="Yes" />
                                    <Checkbox name='has_beneficiary' value="No" /> */}
                                    <Radio name='has_beneficiary' value='Has Beneficiary'></Radio>
                                    

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

// function Checkbox(props) {
//     return (
//         <Field name={props.name}>
//             {({ field, form }) => (
//                 <label className="mb-0">
//                     <input
//                         className="mx-2"
//                         type="checkbox"
//                         {...props}
//                         checked={field.value.includes(props.value)}
//                         onChange={() => {
//                             if (field.value.includes(props.value)) {
//                                 const nextValue = field.value.filter(
//                                     value => value !== props.value
//                                 );
//                                 form.setFieldValue(props.name, nextValue);
//                             } else {
//                                 const nextValue = field.value.concat(props.value);
//                                 form.setFieldValue(props.name, nextValue);
//                             }
//                         }}
//                     />
//                     {props.value}
//                 </label>
//             )}
//         </Field>
//     );
// }

function Radio(props) {
    return (
        <Field name={props.name}>
            {({ field, form }) => (
                <>
                    <label>
                        <input
                            type="radio"
                            name={props.name}
                            value="Yes"
                            checked={field.value === "yes"}
                            onChange={() => form.setFieldValue(props.name, "yes")}
                        /> Yes
                    </label>
                    <label className="pl-3">
                        <input
                            type="radio"
                            name={props.name}
                            value="No"
                            checked={field.value === "no"}
                            onChange={() => form.setFieldValue(props.name, "no")}
                        /> No
                    </label>
                </>
            )}
        </Field>
    );
}

function Dropdown(props) {
    return (
        <Field name={props.name}>
            {({ field, form }) => (
                <label className="mb-0" style={{width:'100%'}}>
                    <strong>{props.value}</strong><br/>
                    <select
                        name={props.name}
                        onChange={form.handleChange}
                        style={{ width:'100%', borderRadius: '5px', borderColor: 'lightgray'}}
                    >
                        <option value="" label={"Select a " + props.value} />
                        <option value="2" label="Accidents & Emergencies" />
                        <option value="3" label="Animals & Pets" />
                        <option value="4" label="Babies, Kids & Family" />
                        <option value="5" label="Business & Entrepreneurs" />
                        <option value="6" label="Celebrations & Events" />
                        <option value="7" label="Community & Neighbors" />
                        <option value="8" label="Creative Arts, Music & Film" />
                        <option value="9" label="Funerals & Memorials" />
                        <option value="10" label="Travel & Adventure" />
                        <option value="11" label="Medical, Illness & Healing" />
                        <option value="12" label="Missions, Faith & Church" />
                        <option value="13" label="Non-Profits & Charities" />
                        <option value="14" label="Weddings & Honeymoons" />
                        <option value="16" label="Sports, Teams & Clubs" />
                        <option value="17" label="Education & Learning" />
                        <option value="20" label="Dreams, Hopes & Wishes" />
                        <option value="0" label="Other" />
                    </select>
                </label>
            )}
        </Field>
    );
}