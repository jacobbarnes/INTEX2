import React, { useState } from 'react'
import * as bs from 'react-bootstrap'
import { useRouteMatch, useHistory } from 'react-router-dom'
import AppContext from './context'

function ProductDetail(props) {
    const context = React.useContext(AppContext)
    const match = useRouteMatch("/product/:pid")
    const [currentPic, setCurrentPic] = useState(1)
    let history = useHistory()

    function goToCart() {
        history.push("/cart")
    }
    
    if (!context.products) {
        return <div>Loading...</div>
    }

    const p = context.products[match.params.pid]

    if (p == null){
        return(
            <div className="ml-4">Product not found</div>
        )
    }
    else{
        return (
            <>
                <div className="float-right">
                    <bs.Row className="pb-1 ml-3">
                        <img style={{height:"300px", widht: "300px"}} alt={p.filename} src={`/media/products/${p.filename}-${currentPic}.png`} />
                    </bs.Row>
                    <bs.Row className="ml-3">
                        <img style={{height:"30px", widht: "30px"}} className="pr-1" alt={p.filename} src={"/media/products/" + p.filename + "-1.png"} 
                            onMouseEnter={() => setCurrentPic(1)}/>
                        <img style={{height:"30px", widht: "30px"}} className="pr-1" alt={p.filename} src={"/media/products/" + p.filename + "-2.png"}
                            onMouseEnter={() => setCurrentPic(2)}/>
                        <img style={{height:"30px", widht: "30px"}} className="pr-1" alt={p.filename} src={"/media/products/" + p.filename + "-3.png"}
                            onMouseEnter={() => setCurrentPic(3)}/>
                        <img style={{height:"30px", widht: "30px"}} className="pr-1" alt={p.filename} src={"/media/products/" + p.filename + "-4.png"}
                            onMouseEnter={() => setCurrentPic(4)}/>
                    </bs.Row>
                </div>
                <h1>{p.name}</h1>
                <h3>${p.price}</h3>
                <div>{p.description}</div>
                <br/>
                <bs.Button className="bg-warning"
                    onClick={
                        e => {
                            context.addToCart(p.id)
                            goToCart()
                        }}
                >
                    Add To Cart
                </bs.Button>
            </>
        )
    }
}
export default ProductDetail