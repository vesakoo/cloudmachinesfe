import logo from './logo.svg';
import './App.css';
import './components/SequenceFeed'
import RenderApi  from './components/RenderApi';
import SequenceFeed from './components/SequenceFeed';
import YoutubeFeatured from './components/YoutubeFeatured'
import sequenceService from './services/Sequence'
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import RenderDeviceQue from './components/RenderDeviceQue';
import Twitch from './components/Twitch';





const  App=()=> {
  const [commands,setCommands] = useState([]);
  const [device,setDevice] = useState([]);
  const [message,setMessage] = useState("");
  const ws = useRef(null);
  
  useEffect(() =>{
    sequenceService.getDevice('car')
    .then(responce =>{ 
      setDevice(responce.data)
      setMessage(`Now executing project: [${responce.data.currentSequenceName}]`)}
    )
    ws.current = new WebSocket("wss://robo.sukelluspaikka.fi");
    ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      console.log("e", message);
      if(message && message.type === 'projectChanged' ){
        setMessage(`Now executing project: [${message.msg}] (last update on: ${message.time} )`)
        highlightedRefresh();
      }
    };
    
  
  },[])

  const refreshRequest =()=>{
    sequenceService.getDevice('car')
    .then(responce => 
      setDevice(responce.data)
    )
  }
  const highlightedRefresh =()=>{
    sequenceService.getDevice('car')
    .then(responce => 
      setDevice(responce.data)
    )
  }



  return (
    <div className="App">
      <h1>{device.deviceName} RoboCar</h1>
      <div>Robocar device page</div>
      {/*<YoutubeFeatured youtubeCode='7Xv6MsD-VBM' story="Check robot in action"/>*/}
      <Twitch />
      <h1>Create a program for Robocar</h1>
      {message&& <div>{message}</div>}

      <RenderDeviceQue que={device.projectQue} device={device.deviceName}></RenderDeviceQue>
      <RenderApi commands={commands} setCommands = {setCommands}/> 
      <SequenceFeed 
        commands={commands} 
        setCommands = {setCommands}
        refreshRequest={refreshRequest}
      />

    </div>
  );
}

export default App;
