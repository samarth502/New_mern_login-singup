const { User } = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


exports.singupUser =async (req,res)=>{

  const {email , password , confirmPassword} = req.body;

  if(!email || !password || !confirmPassword){
     res.status(422).json({message:"Fill all the details"})



  }

  try {
      const user = await User.findOne({email});

      if(user){
        res.status(422).json({message:"This email is allready Exits"});
      } else if(password !=confirmPassword){
        res.status(422).json({message:"Password and consfirm password are not match"});
      }else{
     const hashPassword = await bcrypt.hash(password , 10);


        const finalUser = new User({
          email,password:hashPassword,confirmPassword
        })
        await finalUser.save();
        // console.log(finalUser);
        res.status(201).json(finalUser);
      }
  } catch (error) {
    console.log("internally error" ,error);
    
  }






}

exports.loginUser = async (req,res)=>{
  const {email , password} = req.body;

  // console.log(email,password)
  try {
     const user = await User.findOne({email});


     if(!user){
      return res.status(404).json({message:"User does not exits"});

     }

     const isPasswordCorrect = await bcrypt.compare(password,user.password);
     if(!isPasswordCorrect){
      return res.status(400).json({message:"Invaild Credential"});

     }

    //  CREATE A TOKEN
const token = jwt.sign({id:user._id},process.env.JWT_SECRETE,{expiresIn:'1d'});
// console.log(token);
res.cookie("userToken", token ,{expires:new Date(Date.now() + 1000 *30 ),httpOnly:true});
// res.status(200).json({message:"Loged in Successfully",token});

const result = {
  user,
  token
}

res.status(201).json({status:201,result});



  } catch (err) {
    console.log("internally error",err)
    
  }
}