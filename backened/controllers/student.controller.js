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

module.exports = {getStudent, addStudent};