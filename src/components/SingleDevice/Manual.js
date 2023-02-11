import { useState,useEffect } from "react";
import sequenceService from "../../services/Sequence"
import { v4 as uuidv4 } from 'uuid';

/**
 * 
 * For manual (remote ) control of current robot
 *  
 */

const Manual =({commands,setCommands,deviceId,deviceApi})=>{

  const [currApi,setCurrApi] = useState([]);
  useEffect(() =>{
    sequenceService.getApi('abc-cda-dca')
    .then(responce => 
      setCurrApi(responce.data)
    )
  },[deviceId])

  const handleNew =(cmd) =>{
    sequenceService.addRow(cmd,1,1)

  }

  return (
    <div>
    <h3>Manual drive:</h3>
    <div key={uuidv4()}>
      <div key={uuidv4()}>
        {currApi.filter(row=>row.row===1).map((row) => 
          <button key={uuidv4()} onClick={()=>handleNew(row.cmd)}>{row.symbol}</button>
          
        )}
      </div>
      <div key={uuidv4()}>
        {currApi.filter(row=>row.row===2 && row.col).sort((a,b)=>(a.col>b.col)).map((row) => 
          <button key={uuidv4()} onClick={()=>handleNew(row.cmd)}>{row.symbol}</button>
          
        )}
      </div>
      <div key={uuidv4()}>
        {currApi.filter(row=>row.row===3).map((row) => 
          <button key={uuidv4()} onClick={()=>handleNew(row.cmd)}>{row.symbol}</button>
          
        )}
      </div>     
    </div>
    </div>

  )


}
export default Manual