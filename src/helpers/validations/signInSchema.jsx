import * as Yup from "yup";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email. Please provide a valid email address.")
    .required("Email field is required "),
  password: Yup.string().required("Password field is required"),
});

export default signInSchema;
