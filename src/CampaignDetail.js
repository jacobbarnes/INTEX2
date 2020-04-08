import React from 'react'
import * as bs from 'react-bootstrap'
import { useRouteMatch, useHistory } from 'react-router-dom'
import AppContext from './context'

function CampaignDetail(props) {
    const context = React.useContext(AppContext)
    const match = useRouteMatch("/campaign/:cid")
    const c = context.campaigns.find(c => c.id === match.params.cid)
    let history = useHistory()

    function goBack() {
        history.push("/search")
    }

    if (c == null){
        return(
            <div className="ml-4">Campaign {match.params.cid} not found</div>
        )
    }
    else{
        return (
                <bs.Row className="border-primary m-5">
                 <bs.Col xs={4}>
                    <img style={{width:"75%"}} alt={c.title} src={c.campaign_image_url} />
                 </bs.Col>
                 <bs.Col>
                        <h1>{c.title}</h1>
                        <h3>{`$${c.current_amount} / $${c.goal}`}</h3>
                        <div>{c.description}</div>
                        <br/>
                        <bs.Button 
                            className="bg-warning"
                            style={{width:"100px", margin:"auto", display:"block", border: "white 1px solid"}}
                            onClick={
                                e => {
                                    goBack()
                                }}
                        >
                            Go Back
                        </bs.Button>
                 </bs.Col>
                 <bs.Col>
                    <bs.Card className="m-5 p-3 shadow bg-white rounded" style={{position:"absolute",top:"0",left:"0", textAlign:"center", width: "50%"}}>
                        <h3>Success Score</h3>
                        <h4 style={{color:"green"}}>10.0</h4>
                    </bs.Card>
                 </bs.Col>
                </bs.Row>
        )
    }
}
export default CampaignDetail