import jwt from 'jsonwebtoken';

export const verifyToken = async (req , res ,next) => {
    try {
        const token = req.header("Authorization");
        if(!token) {
            return res.this.status(403).send("Access Denied")
        }
        
    } catch (err) {
        
    }
}
