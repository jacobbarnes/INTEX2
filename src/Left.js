import React, { useContext} from 'react'
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AppContext from './context'

function Left(props) {
    const context = useContext(AppContext);
    
    if (!context.categories) {
        return <div>Loading...</div>;
    }
    
    const categories = {};

    let total = 0
    for (let p of Object.values(context.products)) {
        categories[p.category.title] = (categories[p.category.title] || 0) +1
        total += 1
    }

    return (
        <bs.Nav className="flex-column">
            <h2 className="mt-4" style={{textAlign: "center"}}>Categories</h2>
            <hr/>
            <Link to='/' className='nav-link'>All Products ({total})</Link>
            <bs.Nav.Item>
                {Object.entries(categories).map(([cat,count],ind) => (
                    <Link 
                        key={ind}
                        to={`/category/${cat}`}
                        className='nav-link'
                    >
                        {cat} ({count})
                    </Link>
                ))}
            </bs.Nav.Item>
        </bs.Nav>
    )
}
export default Left