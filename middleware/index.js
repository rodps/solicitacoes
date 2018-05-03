var middleware = {};

middleware.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
},

middleware.isLoggedInAdm = function(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user);
      if(!req.user.adm){
        console.log("não admin");
        res.redirect("/");
    
      }else{
        return next();
      } 
  }
  res.redirect("/login");
};
      

module.exports = middleware;
