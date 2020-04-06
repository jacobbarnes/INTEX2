import React from 'react';
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Center(props) {
    return (
        <bs.Card className="my-4 shadow mb-5 bg-white rounded" style={{ width: '100%'}}>
            <bs.Card.Img variant="top" src={"/media/products/" + props.product.filename + "-1.png"} />
            <bs.Card.Body>
                <bs.Card.Title>{props.product.name}</bs.Card.Title>
                <bs.Card.Text>
                    ${props.product.price}
                </bs.Card.Text>
            </bs.Card.Body>
            <Link to={`/product/${props.product.id}`} className="btn btn-primary" style={{position:"absolute",top:"2px",right:"2px"}}>Details</Link>
        </bs.Card>
    )
}
export default Center