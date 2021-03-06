import React, { useState } from "react";
import { toast } from "react-toastify";

interface Iprops {
  Props?: any;
  authSetter: (isUserAuth: boolean) => void;
}

interface User {
  email: string;
  password: string;
}

export const Login: React.FC<Iprops> = ({ authSetter }) => {
  const [inputs, setInputs] = useState<User>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body = { ...inputs };

      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      if (parseResponse.jwtToken) {
        localStorage.setItem("token", parseResponse.jwtToken);
        authSetter(true);
        toast.success("You Have Logged in Successfully");
      } else {
        authSetter(false);
        toast.error(parseResponse);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-gray-700 via-gray-900 to-black relative overflow-hidden">
      <div className= "hidden md:block bg-yellow-500  rounded-md h-20 w-96 transform  translate-y-8 skew-x-12 -rotate-45 absolute right-3 top-3"></div>
      <div className= "hidden md:block bg-yellow-500  rounded-md h-20 w-96 transform  translate-y-8 skew-x-12 -rotate-45 absolute left-3 top-3"></div>
      <div className= "hidden md:block bg-yellow-500  rounded-md h-20 w-96 transform  -translate-y-10 skew-x-12 -rotate-45 absolute left-1 bottom-4"></div>
      <div className= "hidden md:block bg-yellow-500  rounded-md h-20 w-96 transform -translate-y-10 skew-x-12 -rotate-45 absolute right-1 bottom-4"></div>
      <div className="flex m-auto flex-col p-3  md:p-6 bg-transparent sm:rounded-8 z-10 sm:w-400 w-full items-center">
        <div className="space-y-8 bg-gray-800 rounded  p-8 md:p-12 md:w-96">
          <div className="flex gap-2 flex-col items-center text-yellow-500">
            <span className="text-3xl text-primary-100 font-bold">Welcome</span>
            <div className="text-primary-100 flex-wrap text-white">
              Don't have an account?&nbsp;
              <a href="/register" className="text-yellow-500 hover:underline">
                Register
              </a>
              .
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <form
              className=" flex flex-col items-center rounded-xl space-y-8"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col space-y-2 justify-center">
                <label htmlFor="" className="text-yellow-500 text-md">
                  Email
                </label>
                <input
                  className="px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-500 font-body"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  type="text"
                  value={inputs.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col space-y-2 justify-center">
                <label htmlFor="" className="text-yellow-500 text-md">
                  Password
                </label>
                <input
                  className="px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-500 font-body"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                  value={inputs.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <button
                className="bg-yellow-500 text-white font-bold font-body  rounded-md px-4 py-3 uppercase text-sm hover:bg-yellow-600 flex items-center space-x-1 transition duration-300 ease-in-out"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
