import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const CurrentSequence =({current,action,projName})=>{
  useState(()=>{
    
  },[current,action])

  //const bStyle={ fontWeight: 'bold' }

  if(!current ){
   return ( <div>No content</div>)
  }

  return(
    <div>
      <h3>Currently executing project {projName}:</h3>
      <ol>
        {current.map(row =><li key={uuidv4()} style={{ fontWeight: action===row.id ? 'bold' : 'normal' }}>{row.cmd}</li>)}
      </ol>
    </div>
  )

}
export default CurrentSequence