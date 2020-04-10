import React, { useState, useEffect } from 'react'
import * as bs from 'react-bootstrap'
import { useRouteMatch, useHistory } from 'react-router-dom'
import AppContext from './context'
let req = require("request")

function Detail(props) {
    const context = React.useContext(AppContext)
    const match = useRouteMatch("/campaign/:cid")
    const c = context.campaigns.find(c => c.id === match.params.cid)
    let history = useHistory()
    let categories = {
        2: "Accidents & Emergencies",
        3: "Animals & Pets",
        4: "Babies Kids & Family",
        5: "Business & Entrepreneurs",
        6: "Celebrations & Events",
        7: "Community & Neighbors",
        8: "Creative Arts, Music & Film",
        9: "Funerals & Memorials",
        10: "Travel & Adventure",
        11: "Medical Illness & Healing",
        12: "Missions Faith & Church",
        13: "Non-Profits & Charities",
        14: "Weddings & Honeymoons",
        16: "Sports Teams & Clubs",
        17: "Education & Learning",
        20: "Dreams Hopes & Wishes",
        21: "unknown",
    }
    const [fraudResponse, setFraudResponse] = useState()

    function goBack() {
        history.push("/search")
    }

    let amountRaised = c.current_amount / c.goal
    let popularity = c.social_share_total >= 1000 ? "High" : c.social_share_total >= 100 ? "Medium" : "Low"

    let fraudLikelihood = ""
    if (fraudResponse) {
        if (fraudResponse >= .8) {
            fraudLikelihood = "Low"
        }
        else if (fraudResponse >= .2) {
            fraudLikelihood = "Medium"
        }
        else {
            fraudLikelihood = "High"
        }
    }

    let matrix = {
        "amount":{
            "High":3,
            "Medium":2,
            "Low":1,
        },
        "popularity":{
            "High":3,
            "Medium":2,
            "Low":1,
        },
        "fraud":{
            "High":1,
            "Medium":2,
            "Low":3,
        },
    }

    let score = 0
    let total = ""
    if (fraudResponse) {
        if (amountRaised > .9) {
            score = 9
        }
        if (fraudLikelihood === "High") {
            score = 0
        }
        else {
            score = (amountRaised > .67 ? 3 : amountRaised > .33 ? 2 : 1) + matrix.popularity[popularity] + matrix.fraud[fraudLikelihood]
        }
        total = score >=8 ? "High" : score >= 6 ? "Medium" : "Low"
    }

    useEffect(() => {


        //API call for fraud
        let uri = "https://cors-anywhere.herokuapp.com/https://ussouthcentral.services.azureml.net/workspaces/72244208c07047738489909bedc48924/services/577f3d761d2f4244bf204f2ba22a2b4f/execute?api-version=2.0&details=true"
        let apiKey = "gOOmtuZxScIb5H51r4cc1Ct3De6VkOJO2L9x5G0m0zTj5FCxPkoTRIcUJz5KXcViurUGQ+8tRxv2686VDuaNZQ=="

        let data =
        {
            "Inputs": {
                "input1": {
                    "ColumnNames": [
                        'donators',
                        'days_active',
                        'title',
                        'description',
                        'visible_in_search',
                        'status',
                    ],
                    "Values": [
                        [
                            c.donators,
                            c.days_active,
                            c.title,
                            c.description,
                            c.visible_in_search,
                            0,
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
                console.log("Fraud API call results:", body)
                const response = JSON.parse(body).Results.output1.value.Values[0][6]
                setFraudResponse(response)
                


            } else {
                //console.log("The request failed with status code: " + res.statusCode);
            }
        })
    })

    return (
        <bs.Container fluid style={{ backgroundColor: 'white', boxShadow: "inset 0px 5px 5px #555" }}>

            <bs.Row className='mt-5'>
                <bs.Col style={{ textAlign: 'center' }}>
                    <h1>{c.title}</h1>
                    <hr style={{ width: '75%' }} />
                </bs.Col>
            </bs.Row>
            <bs.Row className="mx-5 mt-2">
                <bs.Col md='3'>
                    <img style={{ width: "100%" }} alt={c.title} src={c.campaign_image_url} />
                </bs.Col>
                <bs.Col md='6'>
                    <bs.Row className='px-0' style={{ textAlign: 'center' }}>
                        <bs.Col md='6' className='pl-0'>
                            <h5 className='my-4'><strong>Amount Raised:</strong> {`$${c.current_amount} / $${c.goal}`}</h5>
                            <h5 className='my-4'><strong>Donators:</strong> {c.donators}</h5>
                            <h5 className='my-4'><strong>Days Active:</strong> {c.days_active}</h5>
                            <h5 className='my-4'><strong>Category:</strong> {categories[c.category_id] ? categories[c.category_id] : "Other"}</h5>
                        </bs.Col>
                        <bs.Col md='6' className='pr-0'>
                            <h5 className='my-4'><strong>Status:</strong> {c.status}</h5>
                            <h5 className='my-4'><strong>Deactivated:</strong> {c.deactivated}</h5>
                            <h5 className='my-4'><strong>Is Charity:</strong> {c.is_charity}</h5>
                            <h5 className='my-4'><strong>Has Beneficiary:</strong> {c.has_beneficiary}</h5>
                        </bs.Col>
                    </bs.Row>
                </bs.Col>
                <bs.Col md='3'>
                    <bs.Card className="p-3 shadow bg-white rounded" style={{ textAlign: "center", width: "100%" }}>
                        <h3>Total Quality:&nbsp;
                            <span className={'text-' + color(total, false)}>
                                {!fraudResponse &&
                                    <bs.Spinner
                                        as="span"
                                        animation="border"
                                        role="status"
                                        aria-hidden="true"
                                        className="mr-2 mb-2"
                                        size='sm'
                                    />
                                }
                                {fraudResponse && total}
                            </span>
                        </h3>
                        <hr />
                        <h4>Amount Raised:</h4>
                        <bs.ProgressBar striped variant={amountRaised > .67 ? "success" : amountRaised > .33 ? "warning" : "danger"} style={{ borderBlockWidth: '100%' }} now={c.current_amount / c.goal * 100} ></bs.ProgressBar>
                        <br />
                        <h4>Popularity:</h4>
                        <h5 className={'text-' + color(popularity,false)}>{popularity}</h5>
                        <br />
                        <h4>Fraud Likelihood:</h4>
                        {!fraudResponse &&
                            <bs.Spinner
                                as="span"
                                animation="border"
                                role="status"
                                aria-hidden="true"
                                className="mr-2"
                                style={{ marginLeft: 'calc(50% - 12px)', display: 'block' }}
                            />
                        }
                        <h5 className={'text-' + color(fraudLikelihood, true)}>{fraudLikelihood}</h5>

                    </bs.Card>
                </bs.Col>
            </bs.Row>
            <bs.Row className='mx-5 mt-3'>
                <bs.Col>

                    <h3>Description</h3>
                    <div>{c.description}</div>
                    <bs.Button
                        className="bg-primary my-5"
                        style={{ width: "100px", margin: "auto", display: "block", border: "white 1px solid" }}
                        onClick={
                            e => {
                                goBack()
                            }}
                    >
                        Go Back
                        </bs.Button>
                </bs.Col>
            </bs.Row>
        </bs.Container>
    )
}
export default Detail

function color(rating, reverse) {
    if (rating === "High" && !reverse) return "success"
    else if (rating === "High" && reverse) return "danger"
    else if (rating === "Medium") return "warning"
    else if (rating === "Low" && reverse) return "success"
    else return "danger"
}