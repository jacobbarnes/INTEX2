import React, { useState } from 'react'
import * as bs from 'react-bootstrap'
import campaigns from './campaigns'
import { Formik, Form, Field, ErrorMessage} from 'formik'
let req = require("request");

function Calculator(props) {
    const [submitted, setSubmitted] = useState(false);
    const [amountResponse, setAmountResponse] = useState()
    const [donorsResponse, setDonorsResponse] = useState()
    const [calculatingAmount, setCalculatingAmount] = useState(true)
    const [calculatingDonors, setCalculatingDonors] = useState(true)

    return (
        <bs.Container fluid className='p-0 d-flex flex-column' style={{ backgroundColor: 'white', boxShadow: "inset 0px 5px 5px #555"}}>
                        <Formik
                            initialValues={{
                                title: 'dummy title',
                                goal: '100000',
                                description: 'this is a dummy description',
                                category_id: "3",
                                has_beneficiary: "yes",
                                is_charity: "yes",
                            }}
                            validateOnChange={false}
                            validateOnBlur={false}
                            validate={values => {
                                const errors = {}
                                let regex = /^[0-9]*$/

                                if (values.title === "") { errors.title = "Title is required" }
                                if (values.goal === "") { errors.goal = "Goal is required" }
                                if (!regex.test(values.goal) && values.goal !== "") { errors.goal = "Please enter a valid number" }
                                if (values.description === "") { errors.description = "Description is required" }
                                if (values.category_id === "") { errors.category_id = "Category is required" }
                                if (values.has_beneficiary === "") { errors.has_beneficiary = 'Please select "Yes" or "No"'}
                                setSubmitted(false)
                                console.log(errors)
                                return errors
                            }}
                            onSubmit={async (values, actions) => {
                                console.log('submit', values)
                                setCalculatingAmount(true)
                                setCalculatingDonors(true)

                                //API call for total amount
                                let uri = "https://cors-anywhere.herokuapp.com/https://ussouthcentral.services.azureml.net/workspaces/4067c46e530d4828bb0d907ef0ab9825/services/51dd27bdbc5b484a966a6b9689c624f5/execute?api-version=2.0&details=true"
                                let apiKey = "w2Gujfzpgcvj6I14BeuiHt28U6G3H+7LZpwrJrEXtVLA7yjylNs445iUGqg4KT1ziiaEYrSi7aHCkgx1A60gNQ=="

                                let data = 
                                {
                                    "Inputs": {
                                      "input1": {
                                        "ColumnNames": [
                                          "current_amount",
                                          "category_id",
                                          "goal",
                                          "title",
                                          "description",
                                          "has_beneficiary"
                                        ],
                                        "Values": [
                                          [
                                            "",
                                            values.category_id,
                                            values.goal,
                                            values.title,
                                            values.description,
                                            values.has_beneficiary === "yes" ? "TRUE" : "FALSE",
                                          ]
                                        ]
                                      }
                                    },
                                    "GlobalParameters": {}
                                  }

                                let options = {
                                    uri: uri,
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + apiKey,
                                    },
                                    body: JSON.stringify(data)
                                }

                                req(options, (err, res, body) => {
                                    if (!err && res.statusCode === 200) {
                                        console.log("Amount API call results:", body)
                                        setAmountResponse(Math.round(JSON.parse(body).Results.output1.value.Values[0][9]))
                                        
                                    } else {
                                        console.log("The request failed with status code: " + res.statusCode);
                                    }
                                    setCalculatingAmount(false)
                                })

                                //API call for # of donors
                                uri = "https://cors-anywhere.herokuapp.com/https://ussouthcentral.services.azureml.net/workspaces/4067c46e530d4828bb0d907ef0ab9825/services/2d6bf571202848508ddeb9b1671609db/execute?api-version=2.0&details=true"
                                apiKey = "FrfMtmzQsv28g+QvnJLwefQwvyx7B0pBy6j0sSGnAOOsETMZBv0EwF2hxLM/le6iXfDrJvIfZLQwI7WiePPnKw=="

                                data =
                                {
                                    "Inputs": {
                                        "input1": {
                                            "ColumnNames": [
                                                "category_id",
                                                "goal",
                                                "donators",
                                                "title",
                                                "description",
                                                "has_beneficiary",
                                                "is_charity"
                                            ],
                                            "Values": [
                                                [
                                                    values.category_id,
                                                    values.goal,
                                                    "",
                                                    values.title,
                                                    values.description,
                                                    values.has_beneficiary === "yes" ? "1" : "0",
                                                    values.is_charity === "yes" ? "1" : "0",
                                                ]
                                            ]
                                        }
                                    },
                                    "GlobalParameters": {}
                                }

                                options = {
                                    uri: uri,
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + apiKey,
                                    },
                                    body: JSON.stringify(data)
                                }

                                req(options, (err, res, body) => {
                                    if (!err && res.statusCode === 200) {
                                        console.log("Donors API call results:", body)
                                        setDonorsResponse(Math.round(JSON.parse(body).Results.output1.value.Values[0][10]))
                                        
                                    } else {
                                        console.log("The request failed with status code: " + res.statusCode);
                                    }
                                    setCalculatingDonors(false)
                                });

                                setSubmitted(true)
                            }}
                        >{form => (
                            <CalcForm form={form} submitted={submitted} amountResponse={amountResponse} donorsResponse={donorsResponse} calculatingAmount={calculatingAmount} calculatingDonors={calculatingDonors}/>
                        )}</Formik>
        </bs.Container>
    )
}
export default Calculator


const CalcForm = props => {
    const categories = {};

    console.log("From CalcForm",props)
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
                                    <div className="text-danger"><ErrorMessage name="description"/></div>
                                    <br/>
                                    <Dropdown name='category_id' value="Category:" />
                                    <div className="text-danger"><ErrorMessage name="category_id"/></div><br/>
                                    <strong>Does this campaign have a beneficiary?</strong><br/>
                                    {/* <Checkbox name='has_beneficiary' value="Yes" />
                                    <Checkbox name='has_beneficiary' value="No" /> */}
                                    <Radio name='has_beneficiary' value='has_beneficiary'/><br/>
                                    <strong>Is this campaign for a charity?</strong><br/>
                                    <Radio name='is_charity' value='is_charity'/>
                                    <div className="text-danger"><ErrorMessage name="has_beneficiary"/></div>
                                    

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
                <i onClick={() => props.form.submitForm()} style={{ cursor: "pointer", marginTop: '150px',}} className="fas fa-arrow-alt-circle-right fa-7x text-primary"></i>
            </bs.Col>
            <bs.Col md='4'>
                <bs.Card className="p-5 shadow bg-white rounded" style={{ height: '100%' }}>
                    <h2>Prediction</h2><hr />
                    {props.submitted === false &&
                        "Press the arrow button to see a prediction of how successful your campaign will be!"
                    }

                    {props.submitted &&
                        <>
                            <h4>Total Donation Amount:</h4>
                            {props.calculatingAmount &&
                                <bs.Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="mr-2"
                                />
                            }
                            {props.amountResponse && !props.calculatingAmount &&
                                <h6>${props.amountResponse}</h6>
                                // "test"
                            }
                            <br />
                            <h4>Number of Donors:</h4>
                            {props.calculatingDonors &&
                                <bs.Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="mr-2"
                                />
                            }
                            {props.donorsResponse && !props.calculatingDonors &&
                                <h6>{props.donorsResponse}</h6>
                                // "test"
                            }
                            <br />
                            <h4>Amount per Donor:</h4>
                            {(props.calculatingDonors || props.calculatingAmount) &&
                                <bs.Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="mr-2"
                                />
                            }
                            {props.donorsResponse && !props.calculatingDonors && !props.calculatingAmount &&
                                <h6>${(props.amountResponse / props.donorsResponse).toFixed(2)}</h6>
                                // "test"
                            }
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