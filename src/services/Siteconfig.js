import axios from "axios"

const baseUrl = 'http://robo.sukelluspaikka.fi' 
//const baseUrl = 'http://localhost:3002'

const getLiveStream=()=>{
  const request = axios.get(`${baseUrl}/api/config/${deviceId}/live`)
  return request.then(response=>response)
}
