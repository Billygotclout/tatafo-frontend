import { Link } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { useFormik } from "formik";
import signInSchema from "../../helpers/validations/signInSchema";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  useTitle("Log In");

  const formik = useFormik({
    validationSchema: signInSchema,
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      try {
        const loginUser = await login(values.email, values.password);
        toast.success(loginUser.message);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });
  return (
    <div className="">
      <img src="/assets/logo.png" alt="" className="w-40" />

      <div className="mt-32 p-2  sm:pl-10 flex flex-col  md:ml-24 lg:ml-96">
        <div className="space-y-2">
          <h2 className="font-semibold text-4xl">Log in</h2>
          <p>Welcome back! Please log in to your account.</p>
        </div>
        <form className="mt-4 space-y-2" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email">Enter your email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className=" pl-2 border py-2 rounded-lg mt-1 max-w-xl  border-[#BCC1CAFF]"
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Enter your password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
              className=" pl-2 border py-2 rounded-lg mt-1 max-w-xl border-[#BCC1CAFF]"
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex flex-col whitespace-nowrap pl-[15rem] md:pl-[29rem]">
            <Link className="text-[#636AE8FF] text-sm flex-end">
              Forgot password?
            </Link>
          </div>
          <div className="flex flex-col">
            <input
              type="submit"
              value="Log in"
              className="pl-2 border py-2 rounded-lg mt-1 max-w-xl bg-[#636AE8FF] text-white font-semibold"
            />
          </div>
          <div className="flex flex-col  whitespace-nowrap pl-20 md:pl-44">
            <span>
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-[#636AE8FF]">
                Sign Up
              </Link>{" "}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
