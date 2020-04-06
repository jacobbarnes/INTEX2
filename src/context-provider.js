import React from 'react'
import axios from 'axios'
import AppContext from './context'
import App from './App'
import CAMPAIGNS from './CAMPAIGNS'

export default class AppProvider extends React.Component {
    constructor(props) {
        super(props)
        this.actions = {}
        this.state = {
            campaigns:CAMPAIGNS
        }
    }

    render() {
        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}>
                <App />
            </AppContext.Provider>
        )
    }

    async componentDidMount() {
        const resp1 = await axios.get('http://localhost:8000/api/category')
        const cats = {}
        const prods = {}

        for (const c of resp1.data) {
            cats[c.id] = c
        }

        const resp2 = await axios.get('http://localhost:8000/api/product')
        for (const p of resp2.data) {
            prods[p.id] = p
        }

        this.setState({ categories: cats, products: prods,}) 
    }
}