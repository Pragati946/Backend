const express=require("express");
const jwt=require("jsonwebtoken");
const connect = require('../Config/db');
const cors=require("cors");
const userModel = require("./route/user.model");
const argon2 = require("argon2");
const app=express();
app.use(express.json());
app.use(cors());
const PORT  = 8080;
app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.findOne({email});
    if(user){
        const verification = await argon2.verify(user.password, password);
        if(verification){
            const token= await jwt.sign({id:user.id,email},"SECRET1234",{expiresIn:"7 days"});
             return res.status(200).send({message:"Login Successful",token})
        }else{
            return res.status(401).send("Invalid Credentials")
        }
    }else{
        return res.status(404).send("Email Error")
    }
   })
app.post("/signup",async(req,res)=>{
    const { email,password } = req.body;
    const hash = await argon2.hash(password);
    const user = await userModel.create({ email: email, password: hash })
    user.save();
    res.send("Successfully signed up");
})
app.listen((PORT),async()=>{
    await connect()
    console.log(`Listening on http://localhost:${PORT}`);
  });