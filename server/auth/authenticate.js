const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  // if(!token){
  //     return res.status(401).json({message: "No token, authorization denied"});
  // }

  try {
    // console.log(authHeader);
    const token = authHeader.split(" ")[1];
    // console.log(token);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET); // await keyword was missing here
    // console.log(decoded);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // console.log(req.user);
    next();
  } catch (error) {
    console.log("Error during authentication: ", error);
    return res.status(500).json({ message: "Token is not valid 🙏" });
  }
};

module.exports = { authenticate };
