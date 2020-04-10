import React from 'react'
import * as bs from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import AppContext from './context'
import Detail from './Detail'
// let req = require("request")

function CampaignDetail(props) {
    const context = React.useContext(AppContext)
    const match = useRouteMatch("/campaign/:cid")
    const c = context.campaigns.find(c => c.id === match.params.cid)

    if (c == null) {
        return (
            <bs.Container>
                <bs.Row>
                    <bs.Col style={{textAlign:'center'}}>
                        <h3 className="m-5">Campaign {match.params.cid} not found</h3>
                    </bs.Col>
                </bs.Row>
            </bs.Container>
        )
    }
    else {
        return <Detail/>
    }
}
export default CampaignDetail