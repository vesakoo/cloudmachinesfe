import axios from 'axios'
//const baseUrl = 'https://robo.sukelluspaikka.fi' 
//const baseUrl = 'http://localhost:3002'


const getApi = (deviceId)=>{
  const request = axios.get(`/api/device/${deviceId}/api`)
    return request.then(response=>response)
}

const addRow = async (row,seqId,deviceID) =>{
  axios.post(`/device/${deviceID}/pushcmd/seqque/${seqId}`, {cmd: row})
}

const addSequence = async (deviceId, sequenceData) =>{

  axios.post(`/device/${deviceId}`,sequenceData)

  console.log('data reseived', sequenceData)

}

const getExecutionQue =(deviceId) =>{
  const request = axios.get(`/api/device/${deviceId}/stack`)
  return request.then(response=>response)
}

export default {getApi,addRow,addSequence,getExecutionQue}