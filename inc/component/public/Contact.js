import React from "react";


export default class Contact extends React.Component {

    constructor(props){
        super(props);
        this.query = this.props.app.helper._query();
    }

    render(){
        return (<main>
            <div className="p-3"></div>
            <div className="container">
            <section>
            <h2 className="section-title">Contact</h2>
            </section>
            </div>
            <div className="p-3"></div>
        </main>)
    }

}