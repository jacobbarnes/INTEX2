import React from 'react';
import * as bs from 'react-bootstrap'
import AppContext from './context'
import CampaignCard from './CampaignCard'
// import { Link } from 'react-router-dom'


function Search(props) {
    const context = React.useContext(AppContext)
    
    if (context.campaigns.length === 0){
        return (
            <div style={{textAlign:"center"}}>
                <div className="mt-5">The search did not return any results</div>
            </div>
        )
    }

    return (
        <>
        <bs.Container>
            <bs.Row>
                {context.campaigns.slice(0,context.numItems).map((object,ind) => (
                    <bs.Col md='4' key={ind}>
                        <CampaignCard campaign={object}/>
                    </bs.Col>
                ))}
            </bs.Row>
        </bs.Container>
        {/* {context.campaigns.length > context.numItems &&
            <bs.Button onClick={context.loadMore} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} className={"mb-5"}>Load More</bs.Button>
        } */}
        </>
    )
}
export default Search