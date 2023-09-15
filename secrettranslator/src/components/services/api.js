import axios from "axios";
const URL = 'http://127.0.0.1:8000';

export const loginApi =async(user)=>{
    return await axios.post(`${URL}/api/user`,user);
}


export const getSession =()=>{
    return axios.get(`${URL}/api/getUser`);
}

export const setSession = (data) =>{
    return axios.post(`${URL}/api/setUser`,data);
} 


export const uploadFile = async(data,config)=>{
    return await axios.post(`${URL}/api/upload`,data,config)
}

export const uploadSpeech = async(data)=>{
    return await axios.post(`${URL}/api/sendAudio`,data);
}
