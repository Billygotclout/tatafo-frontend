import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import resetPasswordSchema from "../../helpers/validations/resetPasswordSchema";
import { resetPassword } from "../../services/auth.service";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    setToken(token);
  }, []);

  const formik = useFormik({
    validationSchema: resetPasswordSchema,
    initialValues: { password: "", confirmPassword: "" },
    onSubmit: async (values) => {
      try {
        const reset = await resetPassword({
          token: token,
          password: values.password,
        });

        toast.success(
          "Password successfully changed, please login with your new password"
        );
        navigate("/login");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });
  return (
    <>
      <img src="/assets/logo.png" alt="" className="w-40" />

      <div className="p-3  w-1/2  mx-auto mt-64">
        <form className="mt-4 space-y-2 " onSubmit={formik.handleSubmit}>
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
              value="Reset Password"
              className="pl-2 border py-2 rounded-lg mt-1 max-w-xl bg-[#636AE8FF] text-white font-semibold"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPage;
