const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
/*
const protect = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: "401 Unauthorized User"});
    };

    const token = authorization.split(" ")[1];
    console.log("authorization:", authorization);
    try {
        console.log("verify token: ", token)

        const { _id } = jwt.verify(token, process.env.SECRET);
        console.log(_id);

        req.user = await User.findById({ _id }).select("_id");
        console.log("verified");

        next();
    } catch (error) {
        return res.status(401).json({error: "Unable to verify token. Please login again."});
    };   
};
*/
const requireAuth = async (req, res, next) => {
    // verify user is authenticated
    const { authorization } = req.headers;
   
    //console.log(authorization);
    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }
  
    const token = authorization.split(" ")[1];
    // console.log(token);
    try {
      const { _id } = jwt.verify(token, process.env.SECRET);
        // console.log("Auth check ID: ",_id);
      req.user = await User.findOne({ _id }).select("_id");
      // console.log(req.user._id);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Request is not authorized" });
    }
};

module.exports = { requireAuth };