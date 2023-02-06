import { useEffect } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

const DeviceInfo =({description}) =>{
  useEffect(()=>{

  },[description])

  if(!description){
    return (<div>Loading...</div>)
  }

  return(
    <div>
      <img src={description.image} style={{ width: '400px', }} alt=""/>
      <ReactMarkdown>{description.description}</ReactMarkdown>
      <h4>Capabilities:</h4>
      <ul>
        {description.capabilities && description.capabilities.map((c,index) =><li key={`${description.deviceId}-${index}`}>{c}</li>)}
      </ul>
      {description.repository && 
        <div>repository:  
          <a 
            href={description.repository}
            target="_blank" rel="noreferrer"
          >
            {description.repository}
          </a>
        </div>}
    </div>
    
  )
  
}
export default DeviceInfo