const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route.js");
const prisma = require("./lib/prisma.js");


app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(8800, ()=>{
    console.log("Server is listening to the port 8800...");
})







































































// app.post("/api/addDepartment", async (req, res)=>{
//     try{
//         const newDept = await prisma.department.create({
//             data:{
//                 name: req.body.name
//             }
//         })

//         res.status(200).json(newDept);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({message: "Failed to add department"});
//     }
// })


// app.post("/api/addcourse/:id", async (req, res)=>{
//     const id = req.params.id;
//     const name = req.body.name;

//     try{
//         const newData = await prisma.course.create({
//             data:{
//                 deptId: id,
//                 name
//             } 
//         }) 

//         res.status(200).json(newData);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({message: "Failed to add phone number"});
//     }
// })


// app.get("/api/getStudent",async (req, res)=>{
    
    
//         try{
//             const newDepartment = await prisma.enrolledStudent.findMany();
    
//             res.status(200).json(newDepartment);
//         } catch(err){
//             console.log(err);
//             res.status(500).json({message: "Failed to add faculty"})
//         }
//     })


// app.post("/api/addStudent", async (req, res)=>{
//     const {enrolmentNo, name, dob} = req.body
    
//     try{
//         const newStu = await prisma.enrolledStudent.create({
//                         data:{
//                             enrolmentNo, 
//                             name, 
//                             dob: new Date(dob)
//                         }
//                 })

//         res.status(200).json(newStu);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({message: "Failed to add department"});
//     }
// })


// app.put("/api/updateEnrolledStudent/:id", async (req, res)=>{
//     const dob = req.body.dob;
//     const enrolmentNo = req.params.id;
//     // console.log(dob);
    
//     try{
//         const newData = await prisma.enrolledStudent.findUnique({
//             where:{
//                 enrolmentNo: parseInt(enrolmentNo)
//             }
//         })

//         const {email, ...data} = newData.data;
//         // console.log(newData)
//         newData = await prisma.enrolledStudent.update({
//             where:{
//                 enrolmentNo: parseInt(enrolmentNo)
//             },
//             data:{
//                 ...data,
//                 dob: new Date(dob)
//             }
//         })

//         res.status(200).json(newData)
//     } catch(err){
//         console.log(err);
//         res.status(500).json({message: "Failed to update the student data"});
//     }
// })