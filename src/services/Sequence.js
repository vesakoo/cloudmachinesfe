import axios from 'axios'
const baseUrl = 'https://robo.sukelluspaikka.fi' 
//const baseUrl = 'http://localhost:3002'


const getApi = (deviceId)=>{
  const request = axios.get(`${baseUrl}/api/api/${deviceId}`)
    return request.then(response=>response)
}

const addRow = async (row,seqId,deviceID) =>{
  axios.post(`/device/${deviceID}/pushcmd/seqque/${seqId}`, row)
}

const addSequence = async (deviceId, sequenceData) =>{

  axios.post(`${baseUrl}/device/${deviceId}`,sequenceData)

  console.log('data reseived', sequenceData)

}

const getDevice =(deviceId) =>{
  const request = axios.get(`${baseUrl}/api/device/${deviceId}`)
  return request.then(response=>response)
}

export default {getApi,addRow,addSequence,getDevice}