import { useEffect } from "react"

const YoutubeFeatured =({youtubeCode,story}) =>{
  const EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';

  useEffect(()=>{
    let embed;
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      EMBED_URL
    );
    script.addEventListener('load', () => {
      embed = new window.Twitch.Embed("twitch-embed", {
        width: 854,
        height: 480,
        channel: "vesakankkunen",
        // Only needed if this page is going to be embedded on other websites
        //parent: ["robo.sukelluspaikka.fi"]
      });
    });
        document.body.appendChild(script);
  },[])

  const link = `https://www.youtube.com/embed/${youtubeCode}?rel=0&vq=hd1080`
  return(
    <div>
      <iframe 
        title={"Video"} 
        frameborder={0} 
        height={360} 
        width={640} 
        src={link}
        allowfullscreen
         
        ></iframe>
        <div>{story}</div>
        <hr/>
        <div id="twitch-embed"></div>

    </div>
  )  

}

export default YoutubeFeatured