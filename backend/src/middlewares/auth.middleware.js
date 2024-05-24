const jwt = require('jsonwebtoken');
const blacklistContext=require("../db/context/blacklist.context")

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).json({ msg: "Please Login First" });
        }
        const isTokenBlacklisted=await blacklistContext.getBlacklistToken(token)
        if(isTokenBlacklisted){
            return res.status(401).json({ msg: "Please Login First" }) 
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        req.userId = decoded.userId
        req.role=decoded.userRole
        next()
    } catch (err) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
};

module.exports = auth;
