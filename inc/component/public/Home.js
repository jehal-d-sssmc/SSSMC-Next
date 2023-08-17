import React from "react";
import SwiperComp from "../Home/SwiperComp";
import Shorts from "../Home/Shorts";
import Watch from "../Home/Watch";
import Listen from "../Home/_Listen";
import Read from "../Home/Read";


export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            featuredItems: [],
            shorts: [],
            listen: [],
            read: []
        }
    }


    async componentDidMount(){
        console.log(this.props);
        let featuredItems = await this.props.app.db('GET', 'find', 'videos', {
            $and: [
                {isFeatureActive: true},
                {category: {$ne: "Shorts"}}
            ]
        }, {
            order: {
                createdAt: -1
            }
        });
        //if(featuredItems.type === success){
            this.setState({
                featuredItems: featuredItems
            })
        //}
        
        this.forceUpdate();
        let shorts = await this.props.app.db('GET', 'find', 'videos', {
            category: "Shorts"
        }, {
            order: {
                createdAt: -1
            }
        });

        this.setState({
            shorts: shorts
        })

        this.forceUpdate();
        let listen = await this.props.app.db('GET', 'find', 'audios', {
           
        },{
            order: {
                createdAt: -1
            }
        });
       // console.log(listen);
        this.setState({
            listen: listen
        })

        let read = await this.props.app.db('GET', 'find', 'articles', {
           
        },{
            order: {
                createdAt: -1
            },
            limit: 15
        });
        console.log(read);
        this.setState({
            read: read,
            loading: false
        });
        this.forceUpdate();
        //console.log(featuredItems);
    }


    shouldComponentUpdate = () => false

    render(){
        return(<main>
            {
                this.state.loading ? 
                <>
                {this.props.loader}
                </>
                :
                <>
                <section id="" className="bg-light">
                    <div className="p-2"></div>
                    <div style={{ margin: '0 15px' }}>
                        <SwiperComp featuredItems={this.state.featuredItems} />
                    </div>
                    </section>
                    <section id="shorts" className=" p-5">
                    <div className="">
                        <h3 className="section-title">Shorts</h3>
                        <div className="p-2"></div>
                        <Shorts shorts={this.state.shorts} />
                    </div>
                    </section>
                    
                <section id="" className="p-5 bg-light">
                    <div >
                        <div className="section-header">
                            <div className="row">
                                <div className="col-9 align-self-center">
                                <h3 className="section-title">Listen</h3>
                                </div>
                                <div className="col-3 align-self-center text-end">
                                <a href="#" className="text-danger">View More</a>
                                </div>
                            </div>
                        </div>
                        <div className="p-2"></div>
                        <ul class="nav nav-tabs custom-tab">
                            <li class="nav-item"><a class="nav-link active"><span>LATEST</span></a></li>
                            <li class="nav-item"><a class="nav-link"><span>POPULAR</span></a></li>
                        </ul>
                        <div className="p-2"></div>
                        <Listen listen={this.state.listen} />
                    </div>
                </section>
                <section id="" className="p-5">
                    <div>
                        <div className="section-header">
                            <div className="row">
                                <div className="col-9 align-self-center">
                                <h3 className="section-title">Read</h3>
                                </div>
                                <div className="col-3 align-self-center text-end">
                                <a href="#" className="text-danger">View More</a>
                                </div>
                            </div>
                        </div>
                        <div className="p-2"></div>
                        <ul class="nav nav-tabs custom-tab">
                            <li class="nav-item"><a class="nav-link active"><span>LATEST</span></a></li>
                            <li class="nav-item"><a class="nav-link"><span>POPULAR</span></a></li>
                        </ul>
                        <div className="p-2"></div>
                        <Read read={this.state.read} />
                    </div>
                </section>
                </>
            }
        </main>)
    }
}