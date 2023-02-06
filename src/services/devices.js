import axios from 'axios'

const getDeviceInfo =(deviceId) =>{
  const request = axios.get(`/api/device/${deviceId}`)
    return request.then(response=>response)
}

const getDeviceList =()=>{
  const request = axios.get(`/api/devices`)
    return request.then(response=>response)
}

export default {
  getDeviceInfo,
  getDeviceList
}