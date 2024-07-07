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
    let rejected = "";
    
    if(decodedName==="Dean UG Office"){
      statusFilter = "Pending at Dean UG Office"
    } else if(decodedName==="Registrar Office"){
      statusFilter = "Pending at Registrar Office";
      approved = "Approved";
      rejected = "Rejected";
    } else if(decodedName==="Dean PG Office"){
      statusFilter = "Pending at Dean PG Office"
    } 
    else {
      statusFilter = "Pending at Department";
      departmentFilter = "Department of "
    }

    try{
      const requests = await apiRequest.get("/degree/");
      
      let filtered = requests.data.filter(request=>request.status===statusFilter||request.status===approved || request.status===rejected);
      
      if(departmentFilter){
        filtered = filtered.filter((request)=>departmentFilter+request.department===decodedName)
      }

      
      return filtered;
    } catch(err){
      console.log(err);
      return null;
    }
}


export const fetchStudentDetails = async ({request, params}) =>{
  const enrolmentNo = params.enrolmentNo;
  const type = request.url.split("=")[1];
  let studentDetail;
  // console.log(enrolmentNo);
  try{
    
    if(type==="degree"){
      studentDetail = await apiRequest.get(`/degree/data/${enrolmentNo}`);
    } else {
      studentDetail = await apiRequest.get(`/migration/data/${enrolmentNo}`);
    }

    return studentDetail;
  }catch(err){
    console.log(err);
    return null;
  }
}