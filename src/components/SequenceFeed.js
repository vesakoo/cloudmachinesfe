import { useState } from "react"
import sequenceService from "../services/Sequence"

const SequenceFeed =({commands,setCommands,refreshRequest}) =>{
  const [projectName,setProjectName] = useState("")
  const handleChange =(event)=>{
    console.log('eventti',event)
    const content = event.target.value
  }
  const handleFormSubmit =(event) =>{
    event.preventDefault()
    const toPost = commands.map((row,index) => ({id: index, cmd: row, executed: 0 }))
    sequenceService.addSequence('car',{projectName, que: toPost})
    .then(()=>{
      setCommands([])
      setProjectName("")
      refreshRequest()
    })
  }
  const handleProjectNameInput=(event) =>{
    setProjectName(event.target.value)
  }


  return(
    <div>
      <h3>Your sequence</h3>
      <form onSubmit={handleFormSubmit}>
        
          
        <div>
          set Project name: <br/>
          <input 
          type="text" 
          name="projectName" 
          value={projectName} 
          onChange={handleProjectNameInput}
          required
          minLength={5}
        /></div>
        Seqvence:<br/>
        <textarea 
          rows="10" 
          value={ commands && commands.length>0? commands.join('\n'):'' }
          onChange={handleChange}
          required
          minLength={6}
        >
        </textarea>
        {/*commands.length && commands.map(cmd=> <><input type="text" disabled value={cmd}/><br/></>)*/}
       <button type= "submit" value="submit">Submit</button>
      </form>
    </div>
  )
}
export default SequenceFeed