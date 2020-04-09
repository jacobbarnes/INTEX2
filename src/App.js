import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

//import logo from './logo.svg';
import './App.css';
import * as bs from 'react-bootstrap'
import Header from './header'
import Left from './Left'
import Footer from './Footer'
import Search from './Search'
import CampaignDetail from './CampaignDetail'
import Calculator from './calculator'
import Login from './login'
import Signup from './signup'
import Home from './home'

//import { useRouteMatch } from 'react-router-dom'

//test

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
          <Switch>
            <Route path="/login">
              <Login/>
              <Home/>
            </Route>
            <Route path="/Signup">
                <Signup/>
                <Home/>
            </Route>
            <Route path='/search'>
              <bs.Col md='2' style={{ backgroundColor: '#748591', boxShadow: "inset -2px 5px 5px #555" }}>
                <Left />
              </bs.Col>
              <bs.Col md='10' style={{ backgroundColor: 'white', boxShadow: "inset 0px 5px 5px #555"  }}>
                <Search />
              </bs.Col>
            </Route>
            <Route path='/campaign'>
              <CampaignDetail style={{ backgroundColor: 'white', boxShadow: "inset 0px 5px 5px #555"}}/>
            </Route>
            <Route path='/calculator'>
              <Calculator />
            </Route>
            <Route path='/'>
              <Home/>
            </Route>
          </Switch>
        </bs.Row>
        <bs.Row noGutters className="flex-grow-0 flex-shrink-0">
          <bs.Col className='px-3 py-2' >
            <Footer />
          </bs.Col>
        </bs.Row>
      </bs.Container>
    </Router>
  );
}

export default App;
