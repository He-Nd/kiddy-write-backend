const jwt = require('jsonwebtoken');

const giveToken = (req,res,next) => {
        // Generate a token
        const token = jwt.sign(
          { email: req.user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "1 day",
          }
        );
        res.json({token});
        console.log('token granted: ', token)
}


module.exports = {giveToken}