import apiRequest from "../lib/apiRequest.js";

export const studentLoader = async ({request, params}) =>{
    const id = params.id;
    
    try{
        const studentData = await apiRequest.get(`/student/${id}`);
        
        return studentData;
    } catch(err){
        console.log(err);
        return null;
    }
}