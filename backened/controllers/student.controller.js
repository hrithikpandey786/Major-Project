const {prisma} = require("../lib/prisma.js");


const getStudent = async (req, res)=>{
    const id = req.params.id;
    
    try{
        const registeredStudent = await prisma.registeredStudent.findUnique({
            where:{
                id
            }
        })
        const enrolmentNo = registeredStudent.enrolmentNo;

        const student = await prisma.student.findUnique({
            where:{
                enrolmentNo
            }
        })

        res.status(200).json({registeredStudent, student});
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to get registered student data"});
    }
}

// const getStudent = async(req, res) =>{
//     const enrolmentNo = req.body;
//     console.log(enrolmentNo);
//     try{
//         const student = await prisma.student.findUnique({
//             where:{
//                 enrolmentNo
//             }
//         })

//         res.status(200).json(student);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({message: "Failed to get student data"});
//     }
// }


const addFaculty = async (req, res) =>{
    const {username, facultyName} = req.body;

    try{
        const faculty = await prisma.faculty.create({
            data:{
                username, facultyName
            }
        });

        res.status(200).json(faculty);
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to add faculty"});
    }
}


const addStudent = async (req, res)=>{
    const data = req.body;
    
    try{
        const newStudent = await prisma.student.create({
            data:{
                ...data,
                dob: new Date(data.dob),
                resultDate: new Date(data.resultDate)
            }
        })

        res.status(200).json(newStudent);
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Degree request failed!"});
    }
}


const getStatus = async (req, res) =>{
    const id = req.userId;
    
    try{
        const registerdStudent = await prisma.registeredStudent.findUnique({
            where:{
                id
            }
        })

        const student = await prisma.student.findUnique({
            where:{
                enrolmentNo: registerdStudent.enrolmentNo
            }
        })

        res.status(200).json(student.status);
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to get status"});
    }
}

module.exports = {getStudent, addStudent, addFaculty, getStatus};