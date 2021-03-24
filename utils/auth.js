const withAuth = (req, res, next)=>{
    if(!req.session.user_id){
        res.render('/login');
    } else {
        next();
    }
}

module.exports = withAuth;