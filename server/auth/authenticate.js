const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  // if(!token){
  //     return res.status(401).json({message: "No token, authorization denied"});
  // }

  try {
    console.log(authHeader);
    const token = authHeader.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    next();
  } catch (error) {
    console.log("Error during authentication: ", error);
    res.status(500).json({ message: "Token is not valid 🙏" });
  }
};

module.exports = { authenticate };
