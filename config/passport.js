var bCrypt = require("bcrypt");
var LocalStrategy = require("passport-local").Strategy;

passportStrategies = {};

module.exports = function(user) {
  var User = user;

  passportStrategies.serialize = function(user, done) {
    done(null, user.id);
  };

  passportStrategies.deserialize = function(id, done) {
    User.findById(id).then(function(user) {
      if (user) done(null, user.get());
      else done(user.errors, null);
    });
  };

  passportStrategies.localSignup = new LocalStrategy(
    {
      usernameField: "nome",
      passwordField: "senha",
      emailField: "email",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, name, password, done) {
      var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

      User.findOne({
        where: { nome: name }
      }).then(function(user) {
        if (user) {
          return done(null, false, { message: "Usuário já cadastrado" });
        } else {
          var userPassword = generateHash(password);
          var data = {
            nome: name,
            senha: userPassword
          };
          User.create(data).then(function(newUser, created) {
            if (!newUser) return done(null, false);
            else return done(null, newUser);
          });
        }
      });
    }
  );

  passportStrategies.localSignin = new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "nome",
      passwordField: "senha",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function(req, name, password, done) {
      var isValidPassword = function(userpass, password) {
        return bCrypt.compareSync(password, userpass);
      };

      User.findOne({
        where: {
          nome: name
        }
      })
        .then(function(user) {
          if (!user)
            return done(null, false, { message: "Usuário não cadastrado." });

          if (!isValidPassword(user.senha, password))
            return done(null, false, { message: "Senha incorreta." });

          var userinfo = user.get();
          return done(null, userinfo);
        })
        .catch(function(err) {
          console.log("Error:", err);
          return done(null, false, {
            message: "Algo houve de errado ao tentar entrar."
          });
        });
    }
  );

  return passportStrategies;
};

// module.exports = function(passport, user) {
// 	var User = user;
//     var LocalStrategy = require('passport-local').Strategy;

//     //serialize
//     passport.serializeUser(function(user, done) {
// 	    done(null, user.id);
// 	});

// 	// deserialize user
// 	passport.deserializeUser(function(id, done) {
// 	    User.findById(id).then(function(user) {
// 	        if (user)
// 	            done(null, user.get());
// 	        else
// 	            done(user.errors, null);
// 	    });
// 	});

//     passport.use('local-signup', new LocalStrategy(
// 	    {
// 	        usernameField: 'nome',
// 	        passwordField: 'senha',
// 	        passReqToCallback: true // allows us to pass back the entire request to the callback
// 	    },

// 	    function(req, email, password, done) {
//  			var generateHash = function(password) {
// 			    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
// 			};

// 			User.findOne({
// 			    where: { nome: email }
// 			}).then(function(user) {
// 			    if (user) {
// 			        return done(null, false, { message: 'That email is already taken' });
// 			    } else {
// 			        var userPassword = generateHash(password);
// 			        var data =
// 			        	{
// 			                nome: email,
// 			                senha: userPassword
// 			            };
// 			        User.create(data).then(function(newUser, created) {
// 			            if (!newUser)
// 			                return done(null, false);
// 			            else
// 			                return done(null, newUser);
// 			        });
// 			    }
// 			});
// 		}
// 	));

// 	passport.use('local-signin', new LocalStrategy({
// 	        // by default, local strategy uses username and password, we will override with email
// 	        usernameField: 'nome',
// 	        passwordField: 'senha',
// 	        passReqToCallback: true // allows us to pass back the entire request to the callback
// 	    },

// 	    function(req, email, password, done) {
// 	        var User = user;
// 	        var isValidPassword = function(userpass, password) {
// 	            return bCrypt.compareSync(password, userpass);
// 	        }

// 	        User.findOne({
// 	            where: {
// 	                nome: email
// 	            }
// 	        }).then(function(user) {
// 	            if (!user)
// 	                return done(null, false, { message: 'Email does not exist' });

// 	            if (!isValidPassword(user.senha, password))
// 	                return done(null, false, { message: 'Incorrect password.' });

// 	            var userinfo = user.get();
// 	            return done(null, userinfo);
// 	        }).catch(function(err) {
// 	            console.log("Error:", err);
// 	            return done(null, false, { message: 'Something went wrong with your Signin' });
// 	        });
// 	    }
// 	));
// }
