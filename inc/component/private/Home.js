import React from "react";
import SwiperComp from "../Home/SwiperComp";
import Shorts from "../Home/Shorts";
import Watch from "../Home/Watch";


export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {}
    }

    async componentDidMount(){
        
    }

    render(){
        return(<main>
            <section id="">
                <div className="p-2"></div>
                <div style={{ margin: '0 15px' }}>
                    <SwiperComp />
                </div>
                </section>
                <section id="">
                <div className="p-3">
                    <h3 className="section-title">Shorts</h3>
                    <div className="p-2"></div>
                    <Shorts />
                </div>
                </section>
                <section id="">
                <div className="p-3">
                    <div className="section-header">
                        <div className="row">
                            <div className="col-9 align-self-center">
                            <h3 className="section-title">Watch</h3>
                            </div>
                            <div className="col-3 align-self-center text-end">
                            <a href="#" className="btn btn-sm btn-danger">View More</a>
                            </div>
                        </div>
                    </div>
                    <div className="p-2"></div>
                    <Watch />
                </div>
            </section>
        </main>)
    }
}