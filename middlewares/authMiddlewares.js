
const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    console.log("morogj")
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          success: false,
          message: "unauthorized user",
          
        });
      } else {
        console.log("op")
        console.log( decode._id)
        req.body.userid = decode._id;
        // req.boby.email=decode.email;
        next();
      }
    });
  } catch (error) {
    console.log(error);
  }
};
