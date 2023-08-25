import React from "react";

export default class SearchForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          searchText: '',
          voice: null,
          listenvoice: false,
          searchmode: false,
          category: ''
        }
        this.query = this.props.app.helper._query();
    }

 componentDidMount(){
    console.log(this.props.state)
    this.detectVoiceControl();
    this.search = {
      text: this.query.s !== undefined ? this.query.s : '',
      type: this.query.o !== undefined ? this.query.o : ''
    }
    this.props.search(this.search)
}

  startlisten = (resume = false) => {
    try{
      this.recognition.start();
      if(resume){
        this.recognition.continuous = true
      }
      this.recognition.addEventListener("result", this.resultOfSpeechRecognition);

    }catch(ex){
    // this.recognition.stop();
      if(resume){
        this.recognition.continuous = true
      }
    // this.recognition.start();
    /// console.log(ex);
    }
  }

  stoplisten = () => {
    this.recognition.stop();
  }

detectVoiceControl = () =>{
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
 // console.log(SpeechRecognition)
  if(SpeechRecognition) {
    console.log("Your Browser supports speech Recognition");
    this.recognition = new SpeechRecognition();
    console.log((this.recognition instanceof SpeechRecognition), this.recognition);
    this.startlisten();
    
    this.setState({
      voice: true
    }, ()=>{
      this.stoplisten()
    });
    this.forceUpdate();  
    //this.stoplisten();
    //this.recognition.stop();
      // searchFormInput.value = transcript;
      // searchFormInput.focus();
      // setTimeout(() => {
      //   searchForm.submit();
      // }, 500);
    
  }else{
    console.log("Your Browser does not support speech Recognition");
  }
}

startSpeechRecognition = () => {
  document.querySelector('#input-search').focus();
  console.log("Voice activated, SPEAK");
  this.setState({
    listenvoice: true
  })
  this.forceUpdate()
}

endSpeechRecognition = () => {
       
document.querySelector('#input-search').focus();
console.log("Speech recognition service disconnected");
this.setState({
  listenvoice: false
})
this.forceUpdate()
}

detectType = (transcript) => {
  if(['any','all','anything'].some(str => transcript.toLowerCase().trim().split(' ').includes(str)) ){
      document.querySelector(`#${this.props.query !== undefined ? 's_' :''}searchOption, #searchOption`).click();
  }else if(['video','videos','youtube'].some(str => transcript.toLowerCase().trim().split(' ').includes(str)) ){
    document.querySelector(`#${this.props.query !== undefined ? 's_' :''}searchOption1, #searchOption1`).click();
  }else if(['audio','audios','discourse'].some(str => transcript.toLowerCase().trim().split(' ').includes(str))){
    document.querySelector(`#${this.props.query !== undefined ? 's_' :''}searchOption2, #searchOption2`).click();
  }else if(['article','text','articles','book','books'].some(str => transcript.toLowerCase().trim().split(' ').includes(str))){
    document.querySelector(`#${this.props.query !== undefined ? 's_' :''}searchOption3, #searchOption3`).click();
  }else if(['download','photo','photos'].some(str => transcript.toLowerCase().trim().split(' ').includes(str))){
    document.querySelector(`#${this.props.query !== undefined ? 's_' :''}searchOption4, #searchOption4`).click();
  }
return transcript 

}

resultOfSpeechRecognition = (event) => {
const current = event.resultIndex;
const transcript = event.results[current][0].transcript;
let res = this.state.result;
if(transcript.toLowerCase().trim()==="stop listening" || transcript.toLowerCase().trim()==="stop listen") {
  
this.setState({
    listenvoice: false
  }, ()=>{
    this.stoplisten()
  });
  this.forceUpdate();
}else if(['sairam','sai ram','sign ram'].some(str => transcript.toLowerCase().trim().includes(str))){
  //this.recognition.start();Om Shri sign Ram
  this.setState({
    listenvoice: true
  }, () => {
    this.startlisten(true);
  });
  res = transcript.toLowerCase().replace('sign', 'Sai');
  
  this.forceUpdate();
}
else if(!res) {
  res = this.detectType(transcript);
}
else {
  if(transcript.toLowerCase().trim()==="reset") {
    res = "";
  }
  else {
    res = this.detectType(transcript);
  }
}

console.log(transcript);
  this.forceUpdate();
  this.props.search(res, this.props.state.search.type);
  this.setState({
    result: res
  }, () => {
      if(['find','search','get'].some(str => this.state.result.toLowerCase().trim().split(' ').includes(str))){
        const btn = document.querySelector(`#${this.props.query !== undefined ? 's_' :''}btnSearch`);
        if(btn !== null){
          btn.click();
        }
      }
  // console.log(this.state.result)
  });
this.forceUpdate();
}

toggleVC = () => {
console.log(this.recognition)
if((this.recognition !== undefined) && typeof(this.recognition) === 'object'){
    this.setState({
    listenvoice: !this.state.listenvoice
  }, () => {
    if(this.state.listenvoice){
     this.startlisten(this.state.searchmode);
    }else{
      this.stoplisten();
    }
  });
  this.forceUpdate();
}
}

 //shouldComponentUpdate = () => false;

  searchForm = async(e) =>{
    e.preventDefault();
   
    const [s] = e.target.elements;
    console.log(this.props.query, s.value);
    let o;
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) o = e.target.elements[i].value;
    }
    this.props.redirect(`/search?s=${s.value}${o !== '' ? `&o=${o}` : ''}`);
    s.value = s.value.replace(/^find/,'');
    s.value = s.value.replace(/^search/,'');
    s.value = s.value.replace(/^get/,'');
    s.value = s.value.replace(/^show/,'');
    s.value = s.value.replace('audio ','');
    s.value = s.value.replace('video ','');
    s.value = s.value.replace('article ','');
    s.value = s.value.replace('download ','');
    this.search = {
      text: s.value,
      type: o
    };
    this.props.search(this.search);
    if(this.props.searchdata !== undefined){
      
        
      await this.props.searchdata(s.value, o);
      console.log('found')
    }
    this.forceUpdate();
    console.log(s,o)
  }

  render(){
    console.log(this.props.state)
    return (<>
    
    <form id={`${this.props.query !== undefined ? 's_' :''}searchform`} onSubmit={this.searchForm}>
        <div className="searchForm">
        <input type="text" name="s" id="input-search" title="Please type a word to find" required className="form-control" minLength={2} placeholder="Search here..." onChange={(e)=>{
         this.props.search({
            text: e.target.value,
            type: this.props.state.search.type
          });
        this.forceUpdate();
        
        }} value={this.props.state.search.text} />
        <div className="controls">
        {this.state.voice !== null && <button className="btn-voice" id="btnVoice" type="button" onClick={this.toggleVC}><i className={`fa-solid fa-microphone${this.state.listenvoice ? "-slash": ""}`}></i></button>} <button type="submit" id={`${this.props.query !== undefined ? 's_' :''}btnSearch`} className="btn-search"><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
        </div>
        <div className="p-3 text-start">

        
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="searchOption" id={`${this.props.query !== undefined ? 's_' :''}searchOption`} onChange={(e)=>{
          this.props.search({
              type: e.target.value,
              text: this.props.state.search.text
            });
          this.forceUpdate();
        }} value="" checked={this.props.state.search.type === ''} />
        <label className="form-check-label" htmlFor={`${this.props.query !== undefined ? 's_' :''}searchOption`}>All</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="searchOption" id={`${this.props.query !== undefined ? 's_' :''}searchOption1`}  onChange={(e)=>{
         this.props.search( {
            type: e.target.value,
            text: this.props.state.search.text
          } );
          this.forceUpdate();
        }} value="video"  checked={this.props.state.search.type === 'video'} />
        <label className="form-check-label" htmlFor={`${this.props.query !== undefined ? 's_' :''}searchOption1`}>Videos</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="searchOption" id={`${this.props.query !== undefined ? 's_' :''}searchOption2`}  onChange={(e)=>{
          this.props.search( {
              type: e.target.value,
              text: this.props.state.search.text
            } );
          this.forceUpdate();
        }} value="audio" checked={this.props.state.search.type === 'audio'} />
        <label className="form-check-label" htmlFor={`${this.props.query !== undefined ? 's_' :''}searchOption2`}>Audios</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="searchOption" id={`${this.props.query !== undefined ? 's_' :''}searchOption3`}  onChange={(e)=>{
         this.props.search( {
            type: e.target.value,
            text: this.props.state.search.text
          } );
          this.forceUpdate();
        }} value="article" checked={this.props.state.search.type === 'article'} />
        <label className="form-check-label" htmlFor={`${this.props.query !== undefined ? 's_' :''}searchOption3`}>Articles</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="searchOption" id={`${this.props.query !== undefined ? 's_' :''}searchOption4`} onChange={(e)=>{
          this.props.search( {
              type: e.target.value,
              text: this.props.state.search.text
            } );
          this.forceUpdate();
        }} value="download" checked={this.props.state.search.type === 'download'} />
        <label className="form-check-label" htmlFor={`${this.props.query !== undefined ? 's_' :''}searchOption4`}>Downloads</label>
        </div>
        </div>
    </form>
    </>)
  }
    
}