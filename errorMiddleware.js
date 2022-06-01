class AuthError extends Error {
    constructor(message) {
      super(message);
      this.name = "AuthError";
    }
}

const handleAuthError = (error,req,res,next)=> {
    if (error instanceof AuthError) {
        console.error(error);
        res.sendStatus(401);
        return;
      }
      next(error);
};

module.exports = {AuthError,handleAuthError}