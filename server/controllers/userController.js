const User = require("../models/user.model");

exports.getUsers = async (req, res) => {
    try {
        const userRole = req.user.userRole;

        let users;

        if(userRole === "student"){
            users = await User.find({role: {$in: ['student', 'tutor']}}, '-password')
        } else if(userRole === "tutor"){
            users = await User.find({role: 'tutor'}, "-password")
        } else {
            return req.status(403).json({message: "Access denied"})
        }

        res.status(200).json(users)
    } catch (error) {
        console.log("Error fetching the users: ", error);
        res.status(500).json({message: "Something went wrong", error});
    }
}