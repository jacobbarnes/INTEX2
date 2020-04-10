import React from 'react'
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SiteIcon from './logo.jpg'
import AppContext from './context';

function Header(props) {
    let context = React.useContext(AppContext)
    return (
        <bs.Navbar bg="light" expand="lg"> {/* style={{background: "#333333"}} */}
            <bs.Navbar.Brand href="/"><strong>GoFundMe Analytics</strong></bs.Navbar.Brand>
            <bs.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <bs.Navbar.Collapse id="basic-navbar-nav">
                <bs.Nav className="mr-auto">
                    <bs.Image src={SiteIcon} style={{height:'3rem', width: '3rem'}} roundedCircle />
                    <Link to='/' className='nav-link mt-2'>Home</Link>
                    {context.currentAdmin && <Link to='/search' className='nav-link mt-2'>Search Campaigns</Link>}
                    {context.currentUser && <Link to='/calculator' className='nav-link mt-2'>Success Calculator</Link>}
                </bs.Nav>
                <bs.Nav>
                    {context.currentUser==false && <Link to={"/Login"} className="navbar btn btn-dark btn-block">Log in</Link>}
                    {context.currentUser && <bs.Button onClick={() => context.logout()} className="navbar btn btn-dark btn-block">Log out</bs.Button> }
                </bs.Nav>
            </bs.Navbar.Collapse>
        </bs.Navbar>
    )
}
export default Header
  
