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
                let regex = /^[0-9]*$/
                if (!regex.test(values.min) && values.min !== "") { errors.min = "Please enter a valid number" }
                if (!regex.test(values.max) && values.max !== "") { errors.max = "Please enter a valid number" }
                return errors
            }}
            onSubmit={async (values, actions) => {
                console.log('submit', values)

                context.filter(values)
            }}
        >{form => (
            <FilterForm form={form} />
        )}</Formik>
    )
}
export default Left


const FilterForm = props => {
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
    const categoryIDs = {
        "Accidents & Emergencies":2,
        "Animals & Pets":3,
        "Babies Kids & Family":4,
        "Business & Entrepreneurs":5,
        "Celebrations & Events":6,
        "Community & Neighbors":7,
        "Creative Arts, Music & Film":8,
        "Funerals & Memorials":9,
        "Travel & Adventure":10,
        "Medical Illness & Healing":11,
        "Missions Faith & Church":12,
        "Non-Profits & Charities":13,
        "Weddings & Honeymoons":14,
        "Sports Teams & Clubs":16,
        "Education & Learning":17,
        "Dreams Hopes & Wishes":20,
        "unknown":21,
    }

    return (
        <Field name={props.name}>
            {({ field, form }) => (
                <label style={{ fontSize: '12px' }} className="mb-0">
                    <input
                        className="mx-2"
                        type="checkbox"
                        {...props}
                        checked={field.value.includes(categoryIDs[props.value])}
                        onChange={() => {
                            console.log(props.value)
                            console.log(categoryIDs[props.value])
                            if (field.value.includes(categoryIDs[props.value])) {
                                const nextValue = field.value.filter(
                                    value => value !== categoryIDs[props.value]
                                );
                                form.setFieldValue(props.name, nextValue);
                                
                            } else {
                                const nextValue = field.value.concat(categoryIDs[props.value]);
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