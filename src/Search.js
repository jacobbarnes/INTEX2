import React from 'react';
import * as bs from 'react-bootstrap'
import AppContext from './context'
import CampaignCard from './CampaignCard'
// import { Link } from 'react-router-dom'

function Search(props) {
    const context = React.useContext(AppContext)


    return (
        <bs.Container>
            <bs.Row>
                {Object.values(context.campaigns).map((object,ind) => (
                    <bs.Col md='4' key={ind}>
                        <CampaignCard campaign={object}/>
                    </bs.Col>
                ))}
            </bs.Row>
        </bs.Container>
    )
}
export default Search