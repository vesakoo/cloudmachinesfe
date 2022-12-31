import { useState } from "react"
import { useEffect } from "react"
import sequenceService from "../services/Sequence"

const RenderApi =({commands,setCommands})=>{

  const [currApi,setCurrApi] = useState([]);
  useEffect(() =>{
    sequenceService.getApi('abcd')
    .then(responce => 
      setCurrApi(responce.data)
    )
  },[])

  const handleNew=(cmd) =>{
    //const cmd = event.target.value
    console.log('Käsky ',cmd)
    const newCommands = [...commands, cmd]
    setCommands(newCommands)

  }
  
  return (
    <div>
    <h3>Sequence composer</h3>
    <div>Command set for this robot:</div>
    <table>
      <tr><th>Action</th><th>cmd</th><th>descriprion</th></tr>
      {currApi.map((row) => 
        <tr>
          <td><button onClick={()=>handleNew(row.cmd)}>{row.label}</button></td>
          <td>{row.cmd} </td>
          <td>{row.descriprion}</td>
        </tr> 
      )}    
    </table>
    </div>

  )
}
export default RenderApi