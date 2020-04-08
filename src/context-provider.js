import React from 'react'
// import axios from 'axios'
import AppContext from './context'
import App from './App'
import campaigns from './campaigns'

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
        const campaignIDs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,20,]
        // console.log("from filter", values)
        let filteredCampaigns = campaigns
        // console.log(filteredCampaigns)
        
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

        // console.log(values.categories)
        //filter categories
        if (values.categories.length > 0){
            if (values.categories.indexOf(21) !== -1){
                
                filteredCampaigns = filteredCampaigns.filter(campaign => {
                    if (values.categories.indexOf(parseInt(campaign.category_id)) !== -1 || campaignIDs.indexOf(parseInt(campaign.category_id)) === -1){
                        return true
                    }
                    else{
                        return false
                    }
                })
            }
            else{
                filteredCampaigns = filteredCampaigns.filter(campaign => values.categories.indexOf(parseInt(campaign.category_id)) !== -1)
            }
            console.log(filteredCampaigns)
        }

        this.setState({
            campaigns: filteredCampaigns,
            numItems: 15,
        })
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('footer');
        if (this.isBottom(wrappedElement)) {
            console.log('footer bottom reached')
            this.loadMore()
        }
    };

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
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
        document.addEventListener('scroll', this.trackScrolling)
        const cats = {}
        for (const c of campaigns) {
            cats[c.id] = c
        }
        


        this.setState({ categories: cats}) 
    }
}