import React from 'react'
import * as bs from 'react-bootstrap'


function Footer(props) {
    return (
        <bs.Container id='footer'>
            <bs.Row>
                <bs.Col style={{textAlign: "center"}}>
                    &copy; 2020 Group 2-6
                </bs.Col>
            </bs.Row>
        </bs.Container>
    )
}
export default Footer
  
