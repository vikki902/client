import axios from 'axios';

const usersUrl = 'http://localhost:5000';

export const addUserDetail = async (user) =>{
    try{
        return await axios.post(`${usersUrl}/add`, user);
    }catch(e)
    {
        console.log(e);
    }
}

export const getUserDetails = async () =>{

    try{
        return await axios.get(`${usersUrl}/getdetails`)
    }
    catch(e)
    {
        console.log(e);
    }
}