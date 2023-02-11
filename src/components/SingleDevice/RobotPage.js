//import './SequenceFeed'
import RenderApi  from './RenderApi';
import SequenceFeed from './SequenceFeed';
import sequenceService from '../../services/Sequence'
import devicesService from '../../services/devices'


import DeviceInfo from './DeviceInfo';
import RenderExecutionQue from './RenderExecutionQue';
import Twitch from './Twitch';
import CurrentSequence from './CurrentSequence';
import Manual from './Manual';


import { useState,useEffect } from 'react';
import { useRef } from 'react';




const RobotPage =({deviceId})=>{

  const [commands,setCommands] = useState([])
  const [executionQue,setExecutionQue] = useState([])
  const [deviceDescription,setDeviceDescription] =useState({})
  const [robotApi,setRobotApi] = useState({})
  const [message,setMessage] = useState("")
  const[executingAction,setExecutingAction] =useState('')
  
  const ws = useRef(null);

  
  useEffect(() =>{
    sequenceService.getExecutionQue(deviceId)
    .then(responce =>{ 
      setExecutionQue(responce.data)
      setMessage(`Now executing project: [${responce.data.currentSequenceName}]`)
    })

    devicesService.getDeviceInfo(deviceId)
    .then(responce =>{
      setDeviceDescription(responce.data)
      console.log('dataa', responce.data)
    })

    sequenceService.getApi(deviceId)
    .then(responce => 
      setRobotApi(responce.data)
    )

    //ws.current = new WebSocket("wss://robo.sukelluspaikka.fi");
    ws.current = new WebSocket(
      process.env.NODE_ENV==='development'
        ?"ws://localhost:8082"
        :"wss://robo.sukelluspaikka.fi/wss"
    );


    ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      console.log("e", message);
      if(message && message.type === 'projectChanged' ){
        setMessage(`Now executing project: [${message.msg}] (last update on: ${message.time} )`)
        highlightedRefresh();
      }
      if(message && message.type ==='action'){
        setExecutingAction(message.msg)
      }
    };
    
  
  },[deviceId])

  const refreshRequest =()=>{
    //sequenceService.getDevice('car')
    sequenceService.getExecutionQue(deviceId)
    .then(responce => 
      setExecutionQue(responce.data)
    )
  }
  
  const highlightedRefresh =()=>{
    //sequenceService.getDevice('abc-cda-dca')
    sequenceService.getExecutionQue(deviceId)
    .then(responce => 
      setExecutionQue(responce.data)
    )
  }

  if (Object.keys(deviceDescription).length ===0) return(<div>Loading...</div>)

  return (
    <div className="Container">
      <br/>
      <header className="App-header">
        <h1>{executionQue.deviceName} RoboCar</h1>
      </header>
      <div>
        <div>Device page: Robocar </div>
        {/*<YoutubeFeatured youtubeCode='7Xv6MsD-VBM' story="Check robot in action"/>*/}
        <DeviceInfo description={deviceDescription} />
        <h3>Device status</h3>
        {message&& <div className='alert-info'>{message}</div>}
     
        <div className='row'>
          <div className='col-sm-4'>
            <CurrentSequence 
              current={executionQue.currentSequence} 
              action={executingAction}
              projName={executionQue.currentSequenceName}
              deviceId={deviceId}
            />
            <RenderExecutionQue 
              que={executionQue.projectQue} 
              device={executionQue.deviceName}
              deviceId={deviceId}
            ></RenderExecutionQue>
          </div>
          <div className='col-sm-8'>
            {process.env.NODE_ENV ==='production'?<Twitch />:null}
          </div> 
        </div>

        <h3>Create a program for Robocar</h3>

        <div className='row'>
          <div className="col-sm-3">
            <SequenceFeed 
              commands={commands} 
              setCommands = {setCommands}
              refreshRequest={refreshRequest}
              deviceId={deviceId}
            />
            {deviceDescription && 
              deviceDescription.supportedModes &&
              deviceDescription.supportedModes.find(val=>val==='manual') &&
            <Manual 
              commands={commands} 
              setCommands = {setCommands}
              deviceId={deviceId}
              deviceApi ={robotApi} 
            />}
          </div>
          <div className="col-sm-8">
            <RenderApi 
              commands={commands} 
              setCommands = {setCommands}
              deviceId={deviceId}
              deviceApi = {robotApi}
            /> 
          </div>
        </div>

      </div>
    </div>
  );

}

export default RobotPage