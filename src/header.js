import React from 'react'
import * as bs from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import SiteIcon from './logo.jpg'
import AppContext from './context'



function Header(props) {
    const context = React.useContext(AppContext)
    let history = useHistory()

    function goToCart() {
        history.push("/cart")
    }

    return (
        <bs.Navbar bg="light" expand="lg">
            <bs.Navbar.Brand href="#home">Arctic</bs.Navbar.Brand>
            <bs.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <bs.Navbar.Collapse id="basic-navbar-nav">
                <bs.Nav className="mr-auto">
                    <bs.Image src={SiteIcon} style={{height:'3rem', width: '3rem'}} roundedCircle />
                    <Link to='/' className='nav-link'>Home</Link>
                    <Link to='/about' className='nav-link'>About</Link>
                    <Link to='/help' className='nav-link'>Help</Link>
                    
                </bs.Nav>
                <bs.Nav>
                    <i onClick={() => goToCart()} style={{cursor:"pointer"}} className="fas fa-shopping-cart fa-2x pt-1"></i>
                    <h4 onClick={() => goToCart()} style={{cursor:"pointer"}} className="pl-1 pt-2 pr-3"><strong>{context.cartTotal}</strong></h4>
                    <bs.NavDropdown title="Welcome, Jacob" id="basic-nav-dropdown" alignRight>
                        <bs.NavDropdown.Item href="#action/3.1">My Account</bs.NavDropdown.Item>
                        <bs.NavDropdown.Item href="#action/3.3">Preferences</bs.NavDropdown.Item>
                        <bs.NavDropdown.Item href="#action/3.2">Logout</bs.NavDropdown.Item>
                    </bs.NavDropdown>
                </bs.Nav>
            </bs.Navbar.Collapse>
        </bs.Navbar>
    )
}
export default Header
  
