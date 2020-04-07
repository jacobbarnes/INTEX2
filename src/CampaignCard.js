import React from 'react';
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CampaignCard(props) {
    return (
        <bs.Card className="my-4 shadow mb-5 bg-white rounded" style={{ width: '100%'}}>
            <div style={{
                width: '100%', 
                height: '300px', 
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage:'url(' + props.campaign.campaign_image_url + ')',
                backgroundSize: 'cover',
                
                }}></div>
            {/* <bs.Card.Img variant="top" src={props.campaign.img}/> */}
            <bs.Card.Body>
                <bs.Card.Title>{props.campaign.title}</bs.Card.Title>
                <bs.Card.Text>
                    {`$${props.campaign.current_amount} / $${props.campaign.goal}`}
                    <br/>
                    {props.campaign.description.substring(0,70) + "..."}
                    {/* ${props.product.price} */}
                </bs.Card.Text>
            </bs.Card.Body>
            <Link to={`/campaign/${props.campaign.id}`} className="btn btn-primary">Details</Link>
        </bs.Card>
    )
}
export default CampaignCard