import jwt from 'jsonwebtoken';
export const userAuth = async(req , res, next)=>{
 // console.log("User Auth Middleware");
  const {token} = req.headers;
  //console.log(req.headers);;
  if(!token){
    return res.json({
      success:false,
      message:"Unauthorised access"
    })
  }
  const decode_token =  jwt.verify(token,process.env.JWT_SECRET);
  //console.log(decode_token);
  if(!decode_token){
    return res.json({
      success:false,
      message:"token is invalid"
    })
  }
  req.body.userId = decode_token.id;
  next();
}