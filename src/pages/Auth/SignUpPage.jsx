import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { useFormik } from "formik";
import signUpSchema from "../../helpers/validations/signUpSchema";
import { useAuth } from "../../hooks/useAuth";
import { register } from "../../services/auth.service";
import toast from "react-hot-toast";

const SignUpPage = () => {
  useTitle("Sign up");
  const navigate = useNavigate();
  const formik = useFormik({
    validationSchema: signUpSchema,
    initialValues: {
      username: "",
      firstname: "",
      lastname: "",

      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const response = await register(values);
      if (response) {
        console.log(response);
        navigate("/");
        toast.success(response.message);
      }
    },
  });
  return (
    <div className="">
      <img src="/assets/logo.png" alt="" className="w-40" />

      <div className="mt-20 p-2  sm:pl-10 flex flex-col md:ml-24 xl:ml-96">
        <div className="space-y-2">
          <h2 className="font-semibold text-4xl">Sign up</h2>
          <p>
            Welcome! We&apos;ll get you started with your amebo in a jiffy.😜
          </p>
        </div>
        <form className="mt-4 space-y-2" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="firstname"> Firstname</label>
            <input
              type="text"
              name="firstname"
              onChange={formik.handleChange}
              value={formik.values.firstname}
              placeholder="e.g Oluwademilade"
              className=" pl-2 border py-2 rounded-lg outline-none mt-1 max-w-xl  border-[#BCC1CAFF]"
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div style={{ color: "red" }}>{formik.errors.firstname}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname"> Lastname</label>
            <input
              type="text"
              name="lastname"
              onChange={formik.handleChange}
              value={formik.values.lastname}
              placeholder="e.g Williams"
              className=" pl-2 border py-2 rounded-lg outline-none mt-1 max-w-xl  border-[#BCC1CAFF]"
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div style={{ color: "red" }}>{formik.errors.lastname}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="username"> Username</label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="e.g BigPapaD"
              className=" pl-2 border py-2 rounded-lg outline-none mt-1 max-w-xl  border-[#BCC1CAFF]"
            />
            {formik.touched.username && formik.errors.username ? (
              <div style={{ color: "red" }}>{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email"> Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="e.g demsdems28@gmail.com"
              className=" pl-2 border py-2 rounded-lg outline-none mt-1 max-w-xl  border-[#BCC1CAFF]"
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password"> Password</label>
            <input
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              placeholder="***********"
              className=" pl-2 border py-2 rounded-lg outline-none mt-1 max-w-xl border-[#BCC1CAFF]"
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              type="password"
              placeholder="***********"
              className=" pl-2 border py-2 rounded-lg outline-none mt-1 max-w-xl border-[#BCC1CAFF]"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div style={{ color: "red" }}>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <input
              type="submit"
              value="   Sign Up"
              className="pl-2 border py-2 rounded-lg mt-1 max-w-xl bg-[#636AE8FF] text-white font-semibold"
            />
          </div>
          <div className="flex flex-col pb-5 whitespace-nowrap pl-20 md:pl-44">
            <span>
              Already have an account?{" "}
              <Link to="/" className="text-[#636AE8FF]">
                Log in
              </Link>{" "}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
