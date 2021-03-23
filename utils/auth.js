<<<<<<< HEAD
const withAuth = (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
=======
const withAuth = (req, res, next)=>{
    if(!req.session.user_id){
        res.render('/login');
    } else {
        next();
    }
}

module.exports = withAuth;
>>>>>>> aa625310a51c951e24e61b0d261bb5b744a24110
