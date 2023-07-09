const jwt= require('jsonwebtoken')
const verifyIfLoggedIn=async(req,res,next)=>{
    try {
        const token= req.headers.authorization
        if(!token){
            return res.status(401).json({message : "User unauthorized"})
        }
        const decrypted= jwt.verify(token, process.env.JWT_SECRET)
        req.user= decrypted;
        next();
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}

module.exports=verifyIfLoggedIn