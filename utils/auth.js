<<<<<<< HEAD
const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.render("/homepage");
  } else {
    next();
  }
};
=======
const withAuth = (req, res, next)=>{
    if(!req.session.user_id){
        res.render('homepage');
    } else {
        next();
    }
}
>>>>>>> ba405ae8ef1b7499ada520c88b289a359a3fcff1

module.exports = withAuth;
