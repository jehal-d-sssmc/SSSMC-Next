export default class voice{

  constructor(is){
    this.is = is;
    this.state = is.state;
  }

  _get = (name = false) => {
    return !name ? this.state : this.state[name];
  }

  _set = (obj, callback) => {
    this.is.setState(obj, callback);
  }

  detectVoiceControl = () =>{
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
   // console.log(SpeechRecognition)
    if(SpeechRecognition) {
      console.log("Your Browser supports speech Recognition");
      this.recognition = new SpeechRecognition();
      console.log((this.recognition instanceof SpeechRecognition), this.recognition);
      this.startlisten(true);
      
      this.is.setState({
        voice: true
      });
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

  startSpeechRecognition = () => {
      document.querySelector('#input-search').focus();
      console.log("Voice activated, SPEAK");
      this._set({
        listenvoice: true
      })
      this.is.forceUpdate()
  }

  endSpeechRecognition = () => {
           
    document.querySelector('#input-search').focus();
    console.log("Speech recognition service disconnected");
    this._set({
      listenvoice: false
    })
    this.is.forceUpdate()
  }

  detectType = (transcript) => {
    if(['any','all','anything'].some(str => transcript.toLowerCase().trim().split(' ').includes(str)) ){
        document.querySelector('#searchOption').click();
      }else if(['video','videos','youtube'].some(str => transcript.toLowerCase().trim().split(' ').includes(str)) ){
        document.querySelector('#searchOption1').click();
      }else if(['audio','audios','discourse'].some(str => transcript.toLowerCase().trim().split(' ').includes(str))){
        document.querySelector('#searchOption2').click();
      }else if(['article','text','articles','book','books'].some(str => transcript.toLowerCase().trim().split(' ').includes(str))){
        document.querySelector('#searchOption3').click();
    }else if(['download','photo','photos'].some(str => transcript.toLowerCase().trim().split(' ').includes(str))){
      document.querySelector('#searchOption4').click();
    }
    return transcript
    
  }

  resultOfSpeechRecognition = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    let res = this.state.result;
    if(transcript.toLowerCase().trim()==="stop listening" || transcript.toLowerCase().trim()==="stop listen") {
      
    this._set({
        searchmode: false
      }, ()=>{
        this.stoplisten()
      });
      this.forceUpdate();
    }else if(transcript.toLowerCase().trim() === "sairam" || transcript.toLowerCase().trim() === "sign ram" || transcript.toLowerCase().trim() === 'sai ram'){
      //this.recognition.start();
      this.is.setState({
        searchmode: true
      }, () => {
        this.startlisten(true);
      });
      this.is.forceUpdate();
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
    this._set({
      result: res
    }, () => {
        if(['find','search','get'].some(str => this.is.state.result.toLowerCase().trim().split(' ').includes(str))){
            document.querySelector('#btnSearch').click();
        }
     // console.log(this.state.result)
    });
    this.is.forceUpdate();
  }

  toggleVC = () => {
    console.log(this.recognition)
    if((this.recognition !== undefined) && typeof(this.recognition) === 'object'){
        this._set({
        listenvoice: !this.state.listenvoice
      }, () => {
        if(this.state.listenvoice){
         this.startlisten(this.state.searchmode);
        }else{
          this.stoplisten();
        }
      });
      this.is.forceUpdate();
    }
  }
}