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
        history.push("/")
    }

    if (c == null){
        return(
            <div className="ml-4">Campaign not found</div>
        )
    }
    else{
        return (
            <bs.Card className="m-5 p-5 shadow bg-white rounded">
                <div className="float-right">
                   <img style={{height:"300px"}} alt={c.title} src={c.campaign_image_url} />
                </div>
                <h1>{c.title}</h1>
                <h3>{`$${c.current_amount} / $${c.goal}`}</h3>
                <div>{c.description}</div>
                <br/>
                <bs.Button 
                    className="bg-warning"
                    style={{width:"100px", margin:"auto", display:"block"}}
                    onClick={
                        e => {
                            goBack()
                        }}
                >
                    Go Back
                </bs.Button>
                <bs.Card className="m-5 p-3 shadow bg-white rounded" style={{position:"absolute",top:"0",right:"0", textAlign:"center"}}>
                    <h3>Success Score</h3>
                    <h4 style={{color:"green"}}>10.0</h4>
                </bs.Card>
            </bs.Card>
        )
    }
}
export default CampaignDetail