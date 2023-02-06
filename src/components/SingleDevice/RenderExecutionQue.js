import { useEffect } from "react"
//import { v4 as uuidv4 } from 'uuid';

const RenderDeviceQue =({que,device})=>{

  useEffect(()=>{

  },[que,device])

  return(
    <div>
      <h3>Projects waiting their turn  {device}:</h3>
      <ol>
        {que && que.map(row =><li key={row.projectId}>{row.projectName}</li>)}
      </ol>
      
    </div>
  )

}
export default RenderDeviceQue