const jwt = require("jsonwebtoken");
const { User } = require("../Model/User");
const verifyToken = (req, res, next) => {
const token = req.headers.authorization;
// console.log(cookies);

//  let verifyUser;


  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }
  jwt.verify(token, process.env.JWT_SECRETE, async (err, user) => {
    if (err) {
      return res.status(401).json({status:401, message: "Invaild token" });
    }

  
 
    req.id = user.id;
  });
  next();
};
module.exports = verifyToken;
