import ratelimit from "../config/upstash.js";

const rateLimiter = async (req,res,next)=>{
    //per user
try {
    const {success,remaining,limit} = await ratelimit.limit("my-rate-limit");
   //console.log({success,remaining,limit});
    
    if(!success){
        return res.status(429).json({
            message:"Too many requests..."
        })
        
    }
    next();
} catch (error) {
    console.log("rate limit error.", error);
    next();
}
}
export default rateLimiter;