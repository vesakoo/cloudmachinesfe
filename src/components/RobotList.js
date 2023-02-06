import { useEffect, useState } from "react"
import devicesService from '../services/devices'

const RobotList = ()=>{
  const [robots, setRobots] = useState([])

  useEffect(()=>{
    devicesService.getDeviceList()
    .then(responce =>{ 
      setRobots(responce.data)
      console.log('resp',responce)
    })

  },[])
 
  return(
    <div>
      <header className="App-header">
      <h1>Robot list</h1>
      </header>
      <div>
      <ul className="media-list">
        {robots.length>0 && robots.map(robo => 
          <li className="media" key={robo.deviceId}>
            <div className="media-left">
              <img src={robo.image}  style={{ width: '150px', }} alt=""/>
            </div>
            <div className="media-body">
                <h4 className="media-heading"> {robo.name}</h4>
            </div>
          </li>
        )}
      </ul>
      </div>
    </div>
  )
}
export default RobotList