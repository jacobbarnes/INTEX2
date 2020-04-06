import React from 'react'
import axios from 'axios'
import AppContext from './context'
import App from './App'
import {produce} from 'immer'

export default class AppProvider extends React.Component {
    constructor(props) {
        super(props)
        this.actions = {
            addToCart: this.addToCart,
            removeFromCart: this.removeFromCart,
            removeAll: this.removeAll,
            removeOneFromCart: this.removeOneFromCart,
            getCartTotal: this.getCartTotal,
        }
        this.state = {
            categories: null,
            products: null,
            cart: {12123: 2, 477227: 4},
            cartTotal: 6,
        }
    }

    addToCart = (pid) => {
        this.setState(state => produce(state, draft => {
            const qty = draft.cart[pid]
            draft.cart[pid] = ((!qty) ? 1 : qty + 1)
            draft.cartTotal += 1
        }),
            () => {
                console.log('Added item "' + this.state.products[pid].name + '" to cart.  Total: ' + this.state.cart[pid])
                console.log(this.state.cart)
            }
        )
    }

    removeFromCart = (pid) => {
        this.setState(state => produce(state, draft => {
            draft.cartTotal -= draft.cart[pid]
            delete draft.cart[pid]
        }),
            () => {console.log('Deleted item "' + this.state.products[pid].name + '" from cart.  Total: ' + this.state.cart[pid])}
        )
    }

    removeOneFromCart = (pid) => {
        this.setState(state => produce(state, draft => {
            draft.cartTotal -= 1
            if (draft.cart[pid] === 1){
                delete draft.cart[pid]
            }
            else{
                draft.cart[pid] -= 1
            }
        }),
            () => {console.log('Deleted 1 "' + this.state.products[pid].name + '" from cart.  Total: ' + this.state.cart[pid])}
        )
    }

    removeAll = () => {
        this.setState(
        {
            cart: {},
            cartTotal: 0,
        },
            () => {console.log('Removed all items from cart')}
        )
    }

    getCartTotal = () => {
        let total = 0
        for (const [key, qty] of Object.entries(this.state.cart)) {
            total += this.state.products[key].price * qty
        }
        return total

        // console.log(Object.entries(this.state.cart))
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