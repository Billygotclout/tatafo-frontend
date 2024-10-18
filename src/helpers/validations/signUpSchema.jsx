import * as Yup from "yup";
const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};
const signUpSchema = Yup.object().shape({
  username: Yup.string().required("Please enter a valid username"),
  firstname: Yup.string().required("Please enter a valid firstname"),
  lastname: Yup.string().required("Please enter a valid lastname"),

  email: Yup.string()
    .email("Invalid email. Please provide a valid email address.")
    .required("Email field is required"),
  password: Yup.string()
    .min(12, "Password is too short, please enter up to 12 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(/[!@#$%^&]/, getCharacterValidationError("symbol"))
    .required("Password field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("This is a required field"),
});

export default signUpSchema;
