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

export const fetchDegreeRequests = async ({request, params}) =>{
    const encodeName = request.url.split("?")[1];
    const decodedName = decodeURIComponent(encodeName).split("=")[1];
     
    let statusFilter = "";
    let approved = "";
    let departmentFilter = "";
    
    if(decodedName==="Dean UG Office"){
      statusFilter = "Pending at Dean UG Office"
    } else if(decodedName==="Registrar Office"){
      statusFilter = "Pending at Registrar Office";
      approved = "Approved";
    } else if(decodedName==="Dean PG Office"){
      statusFilter = "Pending at Dean PG Office"
    } 
    else {
      statusFilter = "Pending at Department";
      departmentFilter = "Department of "
    }

    try{
      const requests = await apiRequest.get("/degree/");
      
      // const filtered = requests.data.filter((request)=> 
      //   {request.status===statusFilter||approved && 
      //     (departmentFilter&&departmentFilter+request.department===currentUser.name)
      //   });
      
      let filtered = requests.data.filter(request=>request.status===statusFilter)
      
      if(departmentFilter){
        filtered = filtered.filter((request)=>departmentFilter+request.department===decodedName)
      }

      
      return filtered;
    } catch(err){
      console.log(err);
      return null;
    }
}