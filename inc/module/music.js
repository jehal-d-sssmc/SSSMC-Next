export default class music{
    constructor(is){
       this.is = is;
    }

    togglePlaylist = (e, hide = null) => {
        let music = this.is.state.music;
         music.showlist = hide === null ? !music.showlist : hide;
        this.is.setState({
          music: music
        })
        // console.log(music);
       }
    
       updatePlayer = async () =>{
        const { musicList, index, pause } = this.is.state.music;
        const currentSong = musicList[index];
        const audio = new Audio(currentSong.audio);
        await this.is.playerRef.load();
        let music = this.is.state.music;
       // console.log(music);
        
        if(!pause){
            this.is.playerRef.pause();
        }else{
            this.is.playerRef.play();
        }
        music.pause = pause;
        this.is.setState({
          music: music
        })
      }
    
      playOrPause = () =>{
         
        const { musicList, index, pause } = this.is.state.music;
        const currentSong = musicList[index];
        const audio = new Audio(currentSong.audio);
        let music = this.is.state.music;
        if( !pause ){
            this.is.playerRef.play();
        }else{
            this.is.playerRef.pause();
        }
        music.pause = !pause;
        this.is.setState({
          music: music
        })
      }
    
       togglePlayer = (e) => {
        let music = this.is.state.music;
        
         music.player = e === true ? e : !music.player;
         music.pause = music.player;
         this.is.setState({
          music: music
        }, () => {
          console.log(music);
          if(!music.player){
            this.is.playerRef.pause();
            this.togglePlaylist({}, false);
          }
          this.updatePlayer();
        })
        // console.log(music);
       }

       getMusic = () => {
        return this.is.state.music;
       }
      
       setMusic = (_music, index = 0) => {
        
        if(_music !== undefined && _music.musicList !== undefined){
            if(!Array.isArray(_music.musicList)){
              mstate.musicList = _music.data.map((x)=>{
                  return {
                      name: x.title,
                      author: x.category,
                      img: x.file_identifier_thumb !== undefined ? this.__(x.file_identifier_thumb) : '/default-music.png',
                      audio:this.__(x.file_identifier),
                      duration: x.duration
                  }
              });
            }
            
        }
        _music.index = index;
        _music.player = true;
        _music.pause = false;
        console.log(_music)
        this.is.setState({
          music: _music
        }, () => {
            this.updatePlayer();
        })
        
      }
    
}