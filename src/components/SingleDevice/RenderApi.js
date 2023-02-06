import { useState } from "react"
import { useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import sequenceService from "../../services/Sequence"


/*const RenderApiParam =({param,handleChange,cmd}) =>{
  return(
   <>
    <label for={param.id}>{param.label}: </label><br/>
    {
        param.type==="integer"
          ? <>
            <input 
              id={param.id} 
              name={param.id} 
              type='number' 
              min={param.min} 
              max={param.max}
              onChange={(e)=>handleChange(e,cmd,param.id)}
            /><br/></>
          : <input id={param.id} />
      }
    </>
  )

}*/


/*const RenderApiParams =({row})=>{

  const handleRowParamsChanded=(e)=>{
    //val editme= row.cmd;
    console.log('pinput:',e.target.value)
    row.cmd = row.cmd.replace('{dur}',e.target.value)
  }

  return(
    <div>
    {row.params.map((param) =>(<RenderApiParam param={param} handleChange={handleRowParamsChanded}/>))}
    </div>
  )
}*/




const RenderApi =({commands,setCommands,deviceId})=>{
  const[api,setApi] =useState([])
  //const [currApi,setCurrApi] = useState([]);
  const[changes,setChanges]=useState([])

  useEffect(() =>{
    sequenceService.getApi(deviceId)
    .then(responce =>{
        const initChanges= responce.data.filter(row=>
          row.params && row.params.length>0).map(ro=>{
            const tmp = ro.params
            tmp.forEach(element => {
              element.cmd = ro.cmd
            });
            return tmp
            }
          ).reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
          .map(foo=>({cmd: foo.cmd, id:foo.id, default: foo.default, val: foo.default }))
      console.log('initials',initChanges)
      //console.log('foo',foo)
      setChanges(initChanges)
      setApi(responce.data)}
    )
  },[])

  const handleNew=(cmd) =>{
    //const cmd = event.target.value
    console.log('Käsky ',cmd)
    /*if(cmd.indexOf('{')){
      const paramSpecs= changes.find(row=>row.cmd===cmd)
    }*/
    const params = changes.filter(row => row.cmd===cmd)
    if (params && params.length){
      params.forEach(element =>{
        console.log('store:',element)
        console.log('id',element.id,'value',params.val)
        cmd= cmd.replace(`{${element.id}}`,element.val?element.val:"empty")
      })
    }
    const newCommands = [...commands, cmd]
    setCommands(newCommands)

  }

  const paramChanged=(e,cmd,paramId)=>{

    //const row = changes.filter(r=>r.cmd===cmd && r.id ===paramId)
    //if(row){
      //const prow = row.find(param => param.id === paramId && row.cmd ===cmd)
    //  row.currentValue = e.target.value
    //}
    //console.log('param_changed',row,cmd,paramId,e.target.value)
    //const newCmd =cmd.replace(`{${paramId}}`,e.target.value)
    var latestChanges = [...changes]
    //let ch=latestChanges.find(row =>row.cmd===cmd)
    /*latestChanges=latestChanges.map(row=>{
      if(row.cmd===cmd){
        return ({...row,key:paramId ,val:e.target.value})
      }
      return row
    })*/
    const prow = latestChanges.find(row => row.cmd===cmd && row.id===paramId)
    prow.val = e.target.value
    console.log('changes:',latestChanges)
    setChanges(latestChanges)
  }

  const getParamVal=(cmd,paramId)=>{
    const prow = changes.find(row => row.cmd===cmd && row.id===paramId) 
    return prow && prow.val? prow.val: prow.default?prow.default:0
  }
  
  return (
    <div>
    <h3>Sequence composer</h3>
    <div>Command set for this robot:</div>
    <table className="table-bordered table-condensed">
    <thead><tr><th>Action</th><th>params</th><th>cmd</th><th>description</th></tr></thead>
    <tbody>
      {api.map((row) => 
        <tr key={`${row.cmd}-tr`}>
          <td ><button key={row.cmd} onClick={()=>handleNew(row.cmd)}>{row.label}</button></td>
          <td >{row.params
                ? row.params.map((param) =>
                /*<RenderApiParam param={param} handleChange={paramChanged} cmd={row.cmd} />)*/
                  (
                    param.type==="integer"
                      ? <span key={`${row.cmd}-${param.id}-span`}>
                        <label htmlFor={`{${row.cmd}-${param.id}`}>{param.label}: </label><br/>
                        <input
                          key={`${row.cmd}-${param.id}`} 
                          id={`${row.cmd}-${param.id}`} 
                          name={param.id} 
                          type='number' 
                          min={param.min} 
                          max={param.max}
                          onChange={e=>{paramChanged(e,row.cmd,param.id)}}
                          value={getParamVal(row.cmd,param.id)}
                        /><br/></span>
                      : <span key={`${row.cmd}-${param.id}-span`}>
                          <label htmlFor={`{${row.cmd}-${param.id}`}>{param.label}: </label><br/>
                          <input key={`${row.cmd}-${param.id}`} id={`${row.cmd}-${param.id}`}/>
                        </span>
                  ))
                :null
              }</td>
          <td key={uuidv4()}>{row.cmd}
          {/*changes.filter(r=>r.cmd===row.cmd).forEach(item =>{
              

          })*/}
              {/*row.params && row.params.length >0
                  ?(row.params.forEach(element=>{
                    const foo = row.cmd.split('{')
                    console.log('foo',foo)
                    foo.forEach(ppart =>{
                      if(ppart.includes("}")){
                        console.log('ppart',ppart);
                        const pkey = ppart.substring(0,ppart.indexOf('}'))
                        console.log('pkey:',pkey)
                        return <span>{pkey}</span>
                        ppart=ppart.substring(ppart.indexOf('}'),ppart.lengt)
                      }else{
                        return <>ppart</>
                      }
                      return  <>pkey</>
                    })
                  })
                  )
                  :<>{row.cmd}</>
                */ }

          </td>
          <td key={uuidv4()}>{row.description}</td>
          
        </tr>
       
      )}
      </tbody>    
    </table>
    </div>

  )
}
export default RenderApi