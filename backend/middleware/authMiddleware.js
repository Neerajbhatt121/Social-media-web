import JWT from "jsonwebtoken";
export const requireSignIn = async (req, res, next) => {
  try {
    console.log("start")
    console.log("Authorization Header:", req.headers.authorization); 
    if(!req.headers.authorization) {return res.send("please login to access")}
    console.log(process.env.JWT_SECRET_KEY)
    const token = req.headers.authorization.split(' ')[1]
    const decode = JWT.verify(
      token,
      process.env.JWT_SECRET_KEY
    );
    console.log("nothing");
    req.user = decode;
    next();
  } catch (error) {
    console.log("here is the error")
    console.log(error);
  }
};
