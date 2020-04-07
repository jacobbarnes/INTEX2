import React, { useContext } from 'react'
import * as bs from 'react-bootstrap'
import campaigns from './campaigns'
import AppContext from './context'
import { Formik, Form, Field } from 'formik'

function Left(props) {
    const context = useContext(AppContext);

    if (!context.categories) {
        return <div>Loading...</div>;
    }

    return (
        <Formik
            initialValues={{
                title: '',
                categories: [],
                min: "",
                max: "",
            }}
            validateOnChange={false}
            validateOnBlur={true}
            validate={values => {
                const errors = {}
                if (values.name === "") { errors.name = "Name is required" }
                return errors
            }}
            onSubmit={async (values, actions) => {
                console.log('submit', values)

                context.filter(values)
            }}
        >{form => (
            <PaymentForm form={form} />
        )}</Formik>
    )
}
export default Left


const PaymentForm = props => {
    const categories = {};

    // eslint-disable-next-line
    let total = 0
    for (let p of campaigns) {
        categories[p.category] = (categories[p.category] || 0) + 1
        total += 1
    }

    return (
        <Form>
            <bs.Container className="mx-0">
                <bs.Row>
                    <bs.Col>
                        <h2>Filter</h2>
                        <Input title="Title:" name="title" type="text" disabled={props.form.isSubmitting} />

                        <strong>Categories:</strong><br />
                        {Object.entries(categories).map(([cat, count], ind) => (
                            <div key={ind}>
                                <Checkbox name='categories' value={cat} />
                                {/* <span style={{ fontSize: '12px' }}>
                                    &nbsp;({count})
                                </span> */}
                            </div>
                        ))}

                        <br /><strong>Goal Range:</strong><br />
                        <bs.Container>
                            <bs.Row>
                                <bs.Col md='6'>
                                    <Input title="Min:" name="min" type="text" disabled={props.form.isSubmitting} />
                                </bs.Col>
                                <bs.Col md='6'>
                                    <Input title="Max:" name="max" type="text" disabled={props.form.isSubmitting} />
                                </bs.Col>
                            </bs.Row>
                        </bs.Container>

                        <a href="/#" onClick={() => { window.location.reload() }} style={{ textAlign: "center" }}>
                            <div>Clear Filters</div>
                        </a><br />

                        <bs.Button type="submit" className="btn btn-primary mb-3" disabled={props.form.isSubmitting} style={{ margin: 'auto', display: 'block' }}>
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
                        </bs.Button>
                    </bs.Col>
                </bs.Row>
            </bs.Container>
        </Form>
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