const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "O email é obrigatório.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email inválido.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "A senha é obrigatório.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
