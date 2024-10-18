import { Link } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

const SignUpPage = () => {
  useTitle("Sign up");
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
        <form className="mt-4 space-y-2">
          <div className="flex flex-col">
            <label htmlFor="firstname"> Firstname</label>
            <input
              type="text"
              placeholder="e.g Oluwademilade"
              className=" pl-2 border py-2 rounded-lg outline-none mt-1 max-w-xl  border-[#BCC1CAFF]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname"> Lastname</label>
            <input
              type="text"
              placeholder="e.g Williams"
              className=" pl-2 border py-2 rounded-lg outline-none mt-1 max-w-xl  border-[#BCC1CAFF]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username"> Username</label>
            <input
              type="text"
              placeholder="e.g BigPapaD"
              className=" pl-2 border py-2 rounded-lg outline-none mt-1 max-w-xl  border-[#BCC1CAFF]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email"> Email</label>
            <input
              type="email"
              placeholder="e.g demsdems28@gmail.com"
              className=" pl-2 border py-2 rounded-lg outline-none mt-1 max-w-xl  border-[#BCC1CAFF]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password"> Password</label>
            <input
              type="password"
              placeholder="***********"
              className=" pl-2 border py-2 rounded-lg outline-none mt-1 max-w-xl border-[#BCC1CAFF]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="***********"
              className=" pl-2 border py-2 rounded-lg outline-none mt-1 max-w-xl border-[#BCC1CAFF]"
            />
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
