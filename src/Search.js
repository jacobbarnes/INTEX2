import React from 'react';
import * as bs from 'react-bootstrap'
import AppContext from './context'
import CampaignCard from './CampaignCard'
// import { Link } from 'react-router-dom'


function Search(props) {
    const context = React.useContext(AppContext)

    if (!context.campaigns) {
        return (
            <div style={{ textAlign: 'center' }}>
                <bs.Spinner
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                    className="mt-4"
                    style={{ marginLeft: 'calc(50% - 12px)', display: 'block' }}
                />
                <p>Fetching campaigns from the database...</p>
            </div>
        )
    }
    
    if (context.filteredCampaigns && context.filteredCampaigns.length === 0){
        return (
            <div style={{textAlign:"center"}}>
                <div className="mt-5">The search did not return any results</div>
            </div>
        )
    }

    return (
        <>
        <bs.Container id='searchContainer'>
            <bs.Row>
                {context.filteredCampaigns && context.filteredCampaigns.slice(0,context.numItems).map((object,ind) => (
                    <bs.Col md='4' key={ind}>
                        <CampaignCard campaign={object}/>
                    </bs.Col>
                ))}
                {!context.filteredCampaigns && context.campaigns.slice(0,context.numItems).map((object,ind) => (
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