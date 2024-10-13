import JWT from "jsonwebtoken";
export const requireSignIn = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("Please login to access");
    }

    // Strip 'Bearer ' from the token
    const token = req.headers.authorization.split(" ")[1];

    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log("Here is the error:");
    console.log(error);
    return res.status(401).send("Invalid or expired token");
  }
};
