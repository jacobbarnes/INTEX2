import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

//import logo from './logo.svg';
import './App.css';
import * as bs from 'react-bootstrap'
import Header from './header'
import Left from './Left'
import Right from './Right'
import Footer from './Footer'
import About from './About'
import Help from './help'
import Categories from './Categories'
import ProductDetail from './ProductDetail'
import Cart from './cart'
import Receipt from './Receipt'
import CheckoutController from './checkout-starter'
//import { useRouteMatch } from 'react-router-dom'



function App(props) {
  return (
    <Router>
      <bs.Container fluid className='p-0 min-vh-100 d-flex flex-column'>
        <bs.Row noGutters>
          <bs.Col>
            <Header />
          </bs.Col>
        </bs.Row>
        <bs.Row noGutters className='flex-grow-1'>
          <bs.Col md='2' style={{ backgroundColor: 'lightgray'}}>
            <Left />
          </bs.Col>
          <bs.Col md='8' style={{ backgroundColor: ''}} className='px-2'>
            <Switch>
              <Route path='/about'>
                <About />
              </Route>
              <Route path='/help'>
                <Help />
              </Route>
              <Route path='/category/:catName'>
                <Categories />
              </Route>
              <Route path='/product'>
                <ProductDetail />
              </Route>
              <Route path='/cart'>
                <Cart />
              </Route>
              <Route path='/checkout'>
                <CheckoutController />
              </Route>
              <Route path='/receipt'>
                <Receipt />
              </Route>
              <Route path='/'>
                <Categories />
              </Route>
              
            </Switch>
          </bs.Col>
          <bs.Col md='2' style={{ backgroundColor: 'lightblue'}}>
            <Right />
          </bs.Col>
        </bs.Row>
        <bs.Row noGutters className="flex-grow-0 flex-shrink-0">
          <bs.Col className='px-3 py-2' style={{ backgroundColor: '#CC99CC'}}>
            <Footer />
          </bs.Col>
        </bs.Row>
      </bs.Container>
    </Router>
  );
}

export default App;
