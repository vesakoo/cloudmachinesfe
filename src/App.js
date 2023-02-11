
import './App.css';

import devicesService from './services/devices'
import RobotPage from './components/SingleDevice/RobotPage'
import RobotList from './components/RobotList';
import { useState,useEffect} from 'react';
import {
  BrowserRouter,
  Routes, Route, Link
} from 'react-router-dom'

import { ThemeContext, themes } from './contexts/ThemeContext';





const  App=()=> {
  //const [theme, setTheme] = useState('light');
  const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode, setDarkMode] = useState(true);
  const [selectedRobotId,setSelectedRobotId] = useState('cda-dca-abc')//useState('abc-cda-dca')
  const [robots, setRobots] = useState([])

  useEffect(()=>{
    devicesService.getDeviceList()
    .then(responce =>{ 
      setRobots(responce.data)
      console.log('resp',responce)
    })

  },[])
  
  

  return (
    <div className="App">
      <header className="App-header">
      {/*<ThemeContext.Consumer>
            {({ changeTheme }) => (
              <button
                color="link"
                onClick={() => {
                  setDarkMode(!darkMode);
                  changeTheme(darkMode ? themes.light : themes.dark);
                }}
              >
                <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
                <span className="d-lg-none d-md-block">Switch mode</span>
              </button>
              )}
          </ThemeContext.Consumer>*/}
          <h1>MyRo</h1>
          <div>Open, online sharing & control -platform for remote Machines</div>
          <div>Core idea: To offer Robots at your service - anyone can reserve a time and take a control -</div>
      </header>
      <BrowserRouter>
        <div className='container'>
        <RobotList  robots ={robots}/>
         {/* <RobotPage
            deviceId={selectedRobotId}
          />
          <RobotPage
            deviceId="abc-cda-dca"
          />*/}
          
        </div>
        <Routes>
          <Route path='/' element={<RobotPage deviceId="abc-cda-dca" />} />
          {
            robots.length>0 && robots.map(robo =>
              <Route 
                path={`/robot/${robo.deviceId}`} 
                element={<RobotPage deviceId={`${robo.deviceId}`}/>}
              />
            )
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
