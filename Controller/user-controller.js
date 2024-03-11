const { User } = require("../Model/User");

exports.getUser = async (req, res) => {
  const userId = req.id;

  try {
    const vaildUserOne = await User.findOne({_id:userId});
    res.status(201).json({status:201,vaildUserOne})

    
  } catch (error) {
    res.status(401).json({status:401,error})

    
  }

  

};

// commit next
