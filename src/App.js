
import './App.css';

import RobotPage from './components/SingleDevice/RobotPage'
import RobotList from './components/RobotList';
import { useState} from 'react';

import { ThemeContext, themes } from './contexts/ThemeContext';





const  App=()=> {
  //const [theme, setTheme] = useState('light');
  const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode, setDarkMode] = useState(true);
  const [selectedRobotId,setSelectedRobotId] = useState('cda-dca-abc')//useState('abc-cda-dca')
  
  

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
          <div>Core idea: To offer Robots at your service - who ever can reserve a time to take a control -</div>
      </header>
      <div className='container'>
      <RobotList />
        <RobotPage
          deviceId={selectedRobotId}
        />
        <RobotPage
          deviceId="abc-cda-dca"
        />
        
      </div>
    </div>
  );
}

export default App;
