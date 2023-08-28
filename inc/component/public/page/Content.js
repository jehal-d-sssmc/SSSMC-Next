import React from "react";
import AboutUs from "./data/AboutUs";
import PrivacyPolicy from "./data/PrivacyPolicy";

export default class Content extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            component: <></>
        }
    }

    componentDidMount(){
        console.log(this.props.router.query);
        this.slug = this.props.router.query !== undefined && this.props.router.query.slug !== undefined ? this.props.router.query.slug.toLowerCase() : "";
        switch(this.slug){
            case 'sri-sathya-sai':
                this.setState({
                    component: <AboutUs />
                });
            break;
            case 'privacy-policy':
                this.setState({
                    component: <PrivacyPolicy />
                });
            break;
            default:
                this.setState({
                    component: <>Page Not Found</>
                });
            break;
        }
    }

    render(){
        return <>
            {this.state.component}
        </>
    }
}