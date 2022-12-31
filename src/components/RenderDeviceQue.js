import { useEffect } from "react"

const RenderDeviceQue =({que,device})=>{

  useEffect(()=>{

  },[que,device])

  return(
    <div>
      Projects queueing up for {device}:
      <ol>
        {que && que.map(row =><li>{row.projectName}</li>)}
      </ol>
      
    </div>
  )

}
export default RenderDeviceQue