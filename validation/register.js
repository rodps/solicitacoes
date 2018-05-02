const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 6, max: 30 })) {
    errors.name = "O nome deve ter ao menos 6 caracteres.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "O email é obrigatório.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email inválido.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "A senha é obrigatório.";
  }

  if (Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "A senha deve ter ao menos 6 caracteres.";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "A confirmação da senha é obrigatória.";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "As senhas devem ser iguais. ";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
