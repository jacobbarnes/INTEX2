import React from 'react'
import * as bs from 'react-bootstrap'
import { useRouteMatch, useHistory } from 'react-router-dom'
import AppContext from './context'

function CampaignDetail(props) {
    const context = React.useContext(AppContext)
    const match = useRouteMatch("/campaign/:cid")
    const c = context.campaigns.find(c => c.id === match.params.cid)
    let history = useHistory()
    let categories = {
        2:"Accidents & Emergencies",
        3:"Animals & Pets",
        4:"Babies Kids & Family",
        5:"Business & Entrepreneurs",
        6:"Celebrations & Events",
        7:"Community & Neighbors",
        8:"Creative Arts, Music & Film",
        9:"Funerals & Memorials",
        10:"Travel & Adventure",
        11:"Medical Illness & Healing",
        12:"Missions Faith & Church",
        13:"Non-Profits & Charities",
        14:"Weddings & Honeymoons",
        16:"Sports Teams & Clubs",
        17:"Education & Learning",
        20:"Dreams Hopes & Wishes",
        21:"unknown",
    }

    function goBack() {
        history.push("/search")
    }

    if (c == null) {
        return (
            <div className="ml-4">Campaign {match.params.cid} not found</div>
        )
    }
    else {
        return (
            <bs.Container fluid style={{ backgroundColor: 'white', boxShadow: "inset 0px 5px 5px #555"}}>

                <bs.Row className='mt-5'>
                    <bs.Col style={{textAlign:'center'}}>
                        <h1>{c.title}</h1>
                        <hr style={{width:'75%'}}/>
                    </bs.Col>
                </bs.Row>
                <bs.Row className="mx-5 mt-2">
                    <bs.Col md='3'>
                        <img style={{ width: "100%" }} alt={c.title} src={c.campaign_image_url} />
                    </bs.Col>
                    <bs.Col md='6'>
                        <bs.Row className='px-0' style={{textAlign:'center'}}>
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
                            <h3>Success Score</h3>
                            <h4 style={{ color: "green" }}>10.0</h4>
                        </bs.Card>
                    </bs.Col>
                </bs.Row>
                <bs.Row className='mx-5 mt-3'>
                    <bs.Col>

                        <h3>Description</h3>
                        <div>{c.description}</div>
                        <bs.Button
                            className="bg-warning my-5"
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
}
export default CampaignDetail