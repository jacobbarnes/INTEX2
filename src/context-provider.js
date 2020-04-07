import React from 'react'
// import axios from 'axios'
import AppContext from './context'
import App from './App'
import campaigns from './CAMPAIGNS'

export default class AppProvider extends React.Component {
    constructor(props) {
        super(props)
        this.actions = {
            loadMore: this.loadMore,
            filter: this.filter,
        }
        this.state = {
            campaigns:campaigns,
            numItems:15,
        }
    }

    loadMore = () => {
        this.setState({numItems:this.state.numItems + 15})
    }

    filter = (values) => {
        console.log("from filter", values)
        let filteredCampaigns = campaigns
        console.log(filteredCampaigns)
        
        //filter titles
        if (values.title !== "") {
            let regexConst = new RegExp(`^.*?${values.title}.*?$`,"i")
            filteredCampaigns = filteredCampaigns.filter(campaign => campaign.title.match(regexConst))
        }

        //filter goal
        if (values.min !== ""){
            filteredCampaigns = filteredCampaigns.filter(campaign => parseInt(campaign.goal) >= parseInt(values.min))
        }
        if (values.max !== ""){
            filteredCampaigns = filteredCampaigns.filter(campaign => parseInt(campaign.goal) <= parseInt(values.max))
        }

        console.log(values.categories)
        //filter categories
        if (values.categories.length > 0){
            filteredCampaigns = filteredCampaigns.filter(campaign => values.categories.indexOf(campaign.category) !== -1)
        }

        this.setState({
            campaigns: filteredCampaigns,
            numItems: 15,
        })
    }

    render() {
        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}>
                <App />
            </AppContext.Provider>
        )
    }

    async componentDidMount() {
        // const resp1 = await axios.get('http://localhost:8000/api/category')
        const cats = {}
        for (const c of campaigns) {
            cats[c.id] = c
        }
        


        this.setState({ categories: cats}) 
    }
}