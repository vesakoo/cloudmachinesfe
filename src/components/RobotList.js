import { useEffect, useState } from "react"
import devicesService from '../services/devices'
import {
  BrowserRouter,
  Routes, Route, Link
} from 'react-router-dom'

const RobotList = ({robots})=>{
  /*const [robots, setRobots] = useState([])

  useEffect(()=>{
    devicesService.getDeviceList()
    .then(responce =>{ 
      setRobots(responce.data)
      console.log('resp',responce)
    })

  },[])*/

 
  return(
    <div>
      
      <header className="App-header">
      <h1>Robot list</h1>
      </header>
      <nav ClassName="Navbar NavbarInverse">
        <div ClassName="ContainerFluid">
          <ul className="nav NavbarNav">
            {robots.length>0 && robots.map(robo => 
              <li  key={robo.deviceId} className="navItem" style={{marginLeft :'30px', marginTop: '30px'}}>
                  <div>
                  <Link to={`/robot/${robo.deviceId}`}>
                     <img src={robo.image}  style={{ width: '150px', }} alt="" /> <br/>
                     {robo.name}
                  </Link>
                  </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
   

  )
}
export default RobotList