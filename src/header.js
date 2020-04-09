import React from 'react'
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SiteIcon from './logo.jpg'

function Header(props) {
    return (
        <bs.Navbar bg="light" expand="lg"> {/* style={{background: "#333333"}} */}
            <bs.Navbar.Brand href="/"><strong>GoFundMe Analytics</strong></bs.Navbar.Brand>
            <bs.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <bs.Navbar.Collapse id="basic-navbar-nav">
                <bs.Nav className="mr-auto">
                    <bs.Image src={SiteIcon} style={{height:'3rem', width: '3rem'}} roundedCircle />
                    <Link to='/' className='nav-link mt-2'>Home</Link>
                    <Link to='/search' className='nav-link mt-2'>Search Campaigns</Link>
                    <Link to='/calculator' className='nav-link mt-2'>Success Calculator</Link>
                </bs.Nav>
                <bs.Nav>
                    <bs.NavDropdown title="Welcome" id="basic-nav-dropdown" alignRight>
                        <bs.NavDropdown.Item href="#action/3.1">My Account</bs.NavDropdown.Item>
                        <bs.NavDropdown.Item href="#action/3.3">Preferences</bs.NavDropdown.Item>
                        <bs.NavDropdown.Item href="#action/3.2">Logout</bs.NavDropdown.Item>
                    </bs.NavDropdown>
                    <Link to={"/Login"} className="navbar btn btn-dark">Log in</Link>
                </bs.Nav>
            </bs.Navbar.Collapse>
        </bs.Navbar>
    )
}
export default Header
  
