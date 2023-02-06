import { useState } from "react"
//import { v4 as uuidv4 } from 'uuid';
//import Editor from 'react-simple-code-editor';
import sequenceService from "../../services/Sequence"
import CodeEditor from '@uiw/react-textarea-code-editor'

const SequenceFeed =({commands,setCommands,refreshRequest,deviceId}) =>{
  const [projectName,setProjectName] = useState("")
  const handleChange =(event)=>{
    console.log('eventti',event)
    //const content = event.target.value
    const newRows = event.target.value.split("\n")
    setCommands(newRows)
  }
  const handleFormSubmit =(event) =>{
    event.preventDefault()
    const toPost = commands.map((row,index) => ({id: index, cmd: row, executed: 0 }))
    sequenceService.addSequence(deviceId,{projectName, que: toPost})
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
          className="form-control"
        /></div>
        Seqvence: (Please use the composer for input)<br/>
        {/*<textarea 
          rows="10" 
          value={ commands && commands.length>0? commands.join('\n'):'' }
          onChange={handleChange}
          required
          minLength={6}
          className="form-control"
        >
        </textarea>*/}
        {/*commands.length && commands.map(cmd=> <><input type="text" disabled value={cmd}/><br/></>)*/}
        <CodeEditor
        disabled
      value={commands.join("\n")}
      language="js"
      placeholder="Please enter Actions"
      onChange={handleChange}
      padding={15}
      style={{
        minHeight: 254,
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
       <button type= "submit" value="submit">Submit</button>
      
      </form>
    </div>
  )
}
export default SequenceFeed