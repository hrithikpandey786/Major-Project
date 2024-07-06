import apiRequest from "../lib/apiRequest.js";

export const migrationLoader = async ({request, params}) =>{
    const id = params.id;
    
    try{
        const migrationRequest = await apiRequest.get(`/migration/${id}`);
        
        return migrationRequest;
    } catch(err){
        console.log(err);
        return null;
    }
}

export const degreeLoader = async ({request, params}) =>{
    const id = params.id;
    
    try{
        const degreeRequest = await apiRequest.get(`/degree/${id}`);
        
        return degreeRequest;
    } catch(err){
        console.log(err);
        return null;
    }
}