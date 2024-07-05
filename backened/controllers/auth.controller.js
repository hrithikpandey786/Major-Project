const {prisma, Prisma} = require("../lib/prisma.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res)=>{
    const {enrolmentNo, dob, name, password} = req.body

    try{

        const student= await prisma.enrolledStudent.findUnique({
            where:{
                enrolmentNo
            }
        })

        if(!student){
            return res.status(401).json({message: `Incorrect Enrolment No. or Enrolment No. not found. In case, Enrolment No. is correct and you are unable to Register you may send email at patovc@mmmut.ac.in !!!`});
        }
        
        if(student.name!==name || student.dob.toISOString().split('T')[0]!==dob){
            return res.status(401).json({message: "Invalid Credentials"})
        }

        const stu = await prisma.registeredStudent.findUnique({
            where:{
                    enrolmentNo: enrolmentNo    
            }
        })

        if(stu){
            return res.status(400).json({message: "Student already registered!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = await prisma.registeredStudent.create({
            data:{
                ...req.body,
                dob: new Date(dob),
                password: hashedPassword
            }
        })

        return res.status(200).json(newStudent);

    } catch(err){

        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code==="P2002" && err.meta){
                if(err.meta.target==='Student_email_key')
                    return res.status(400).json({message: "Email is already registered!"})
                else if(err.meta.target==='Student_phoneNumber_key'){
                    return res.status(400).json({message: "Phone number is already registered"})
                }
            }
        }

        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}



const login = async (req, res)=>{
    const {enrolmentNo, password} = req.body;

    try{
        const registeredStudent = await prisma.registeredStudent.findUnique({
            where:{
                enrolmentNo
            }
        })

        if(!registeredStudent){
            return res.status(401).json({message: "Student not registered"});
        }

        const isPasswordValid = await bcrypt.compare(password, registeredStudent.password);
        
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id: registeredStudent.id, isAdmin: false}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
        const age = 1000*60*60*24*7

        return res.cookie('token', token, {
            httpOnly: true,
            maxAge: age
        }).status(200).json(registeredStudent);
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to login"})
    }
}



const adminLogin = async (req, res)=>{
    const {username, password} = req.body;
    
    try{
        if(password!=="admin"){
            return res.status(401).json({message: "Invalid Credentials!"});
        }

        const faculty = await prisma.faculty.findUnique({
            where:{
                username
            }
        })

        if(!faculty){
            return res.status(401).json({message: "Invalid Credentials!"});
        }

        const token = jwt.sign({
            id: "001",
            name: faculty.facultyName,
            isAdmin: true
        }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});

        const age = 1000*60*60*24*7;

        return res.cookie("token", token, {
            httpOnly: true,
            maxAge: age
        }).status(200).json(faculty);
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to login"});
    }
}

const logout = async (req, res)=>{
    try{
        res.clearCookie('token');
        res.status(200).json({message: "Logout Successful"})
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to logout"})
    }
}

module.exports = {register, login, adminLogin, logout};