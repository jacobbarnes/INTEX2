import React from 'react'
import * as bs from 'react-bootstrap'
import { useRouteMatch} from 'react-router-dom'
import ProductCard from './ProductCard'
import AppContext from './context'

function Categories(props) {
    const context = React.useContext(AppContext)
    const match = useRouteMatch('/category/:cid')
    
    if (!context.products || !context.categories) {
        return <div>Loading...</div>
    }
    
    let products = Object.values(context.products)

    if (match) {
        products = products.filter(product => product.category.title === match.params.cid)
    }

    return (
        <bs.Container>
            <bs.Row>
                {products.map((object,ind) => (
                    <bs.Col md='3' key={ind}>
                        <ProductCard product={object}/>
                    </bs.Col>
                ))}
            </bs.Row>
        </bs.Container>
    )
}
export default Categories


  
