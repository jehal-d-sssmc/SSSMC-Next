import React from "react";

export default class SearchForm extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.app.voiceRef.get();
    }

 componentDidMount(){

   // this.props.detectVoiceControl();
    this.forceUpdate();
}


  shouldComponentUpdate = () => false;

  searchForm = async(e) =>{
    e.preventDefault();
    const [s] = e.target.elements;
    let o;
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) o = e.target.elements[i].value;
    }
    this.props.redirect(`/search?s=${s.value}${o !== '' ? `&o=${o}` : ''}`)
    console.log(s,o)
  }

  render(){
    return (<>
    
    <form onSubmit={this.searchForm}>
        <div className="searchForm">
        <input type="text" name="s" id="input-search" title="Please type a word to find" required className="form-control" minLength={2} placeholder="Search here..." onChange={(e)=>{
        this.setState({
            result: e.target.value
        });
        this.forceUpdate();
        
        }} value={this.state.result} />
        <div className="controls">
        {this.state.voice !== null && <button className="btn-voice" id="btnVoice" type="button" onClick={this.toggleVC}><i className={`fa-solid fa-microphone${this.state.listenvoice ? "-slash": ""}`}></i></button>} <button type="submit" id="btnSearch" className="btn-search"><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
        </div>
        <div className="p-3 text-start">

        
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="searchOption" id="searchOption" value="" defaultChecked={true} />
        <label className="form-check-label" htmlFor="searchOption">All</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="searchOption" id="searchOption1" value="video" />
        <label className="form-check-label" htmlFor="searchOption1">Videos</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="searchOption" id="searchOption2" value="audio" />
        <label className="form-check-label" htmlFor="searchOption2">Audios</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="searchOption" id="searchOption3" value="article" />
        <label className="form-check-label" htmlFor="searchOption3">Articles</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="searchOption" id="searchOption4" value="download" />
        <label className="form-check-label" htmlFor="searchOption4">Downloads</label>
        </div>
        </div>
    </form>
    </>)
  }
    
}