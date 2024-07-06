const {prisma} = require("../lib/prisma.js");

const getDegreeRequests = async (req, res) =>{
    try{

    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to get Degree Requests"});
    }
}


const getDegreeRequest = async (req, res) =>{
    const id = req.params.id;
    
    try{
        const registeredStudent = await prisma.registeredStudent.findUnique({
            where:{
                id
            }
        })

        if(!registeredStudent){
            return res.status(401).json({message: "Not Registered!"});
        }

        const request = await prisma.degreeRequest.findUnique({
            where:{
                enrolmentNo: registeredStudent.enrolmentNo
            }
        })
        
        return res.status(200).json({registeredStudent, request});
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to get Migration Requests"});
    }
}


const addDegreeRequest = async (req, res)=>{
    const data = req.body;
    
    try{
        const newRequest = await prisma.degreeRequest.create({
            data:{
                ...data,
                dob: new Date(data.dob),
                resultDate: new Date(data.resultDate)
            }
        })

        res.status(200).json(newRequest);
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to submit the application!"});
    }
}


const getStatus = async (req, res) =>{
    const id = req.userId;
    
    try{
        const regStudent = await prisma.registeredStudent.findUnique({
            where:{
                id
            }
        })

        const application = await prisma.degreeRequest.findUnique({
            where:{
                enrolmentNo: regStudent.enrolmentNo
            }
        })

        res.status(200).json(application.status);
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to get status"});
    }
}


module.exports = {getDegreeRequests, getDegreeRequest, addDegreeRequest, getStatus};