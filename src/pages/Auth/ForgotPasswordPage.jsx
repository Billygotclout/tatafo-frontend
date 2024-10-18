import { useFormik } from "formik";
import React from "react";
import { forgotPassword } from "../../services/auth.service";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: async (values) => {
      try {
        const user = await forgotPassword(values.email);
        console.log(user);

        toast.success(user.message);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });
  return (
    <>
      <img src="/assets/logo.png" alt="" className="w-40" />

      <div className="p-3 md:w-1/2 m-auto mt-64">
        <form className="mt-4 space-y-2 " onSubmit={formik.handleSubmit}>
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
            <input
              type="submit"
              value="Reset Password"
              className="pl-2 border py-2 rounded-lg mt-1 max-w-xl bg-[#636AE8FF] text-white font-semibold"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
