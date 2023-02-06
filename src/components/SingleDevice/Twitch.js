const Twitch =(props)=>{
  return(
    <div>
      <iframe
          title="Robot live stream"
          src='https://player.twitch.tv/?channel=vesakankkunen&parent=robo.sukelluspaikka.fi'
          height='480'
          width='854'
          allowfullscreen 
      >
      </iframe>  
    </div>
  )
}
export default Twitch