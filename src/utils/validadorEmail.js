const validator = require("email-validator");

export default function validarEmail(email) {
    return validator.validate(email)
}