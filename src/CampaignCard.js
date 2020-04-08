import React from 'react';
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CampaignCard(props) {
    return (
        <bs.Card className="my-4 shadow mb-5 bg-white rounded p-3" style={{ width: '100%', height: "90%"}}>
            <div style={{
                width: '100%', 
                height: '300px', 
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage:'url(' + props.campaign.campaign_image_url + ')',
                backgroundSize: 'cover',
                
                }}>
                </div>
            {/* <bs.Card.Img variant="top" src={props.campaign.img}/> */}
            <bs.Card.Body className='text-center'>
                <bs.Card.Title>{props.campaign.title}</bs.Card.Title>
                <hr/>
                <bs.Card.Text>
                    <span className='m1'>{`$${props.campaign.current_amount} / $${props.campaign.goal}`}</span>
                </bs.Card.Text>
                <bs.ProgressBar striped style={{borderBlockWidth:'100%'}} now={props.campaign.current_amount / props.campaign.goal * 100} ></bs.ProgressBar>
                <bs.Card.Text>
                    <br/>
                    {props.campaign.description.substring(0,70) + "..."}
                </bs.Card.Text>
            </bs.Card.Body>
            <Link to={`/campaign/${props.campaign.id}`} className="btn btn-primary">Details</Link>
        </bs.Card>
    )
}
export default CampaignCard