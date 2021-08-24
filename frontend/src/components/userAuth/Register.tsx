import React, { useState } from "react";
import { toast } from "react-toastify";

interface Iprops {
  Props?: any;
  authSetter: (isUserAuth: boolean) => void;
}

interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export const Register: React.FC<Iprops> = ({ authSetter }) => {
  const [inputs, setInputs] = useState<RegisterUser>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { username, email, password } = { ...inputs };
      const body = { username, email, password };

      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      if (parseResponse.jwtToken) {
        localStorage.setItem("token", parseResponse.jwtToken);
        authSetter(true);
        toast.success("Your Account Has Been Created Successfully");
      } else {
        authSetter(false);
        toast.error(parseResponse);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
     
      <div className="flex m-auto flex-col p-3  md:p-6  bg-gray-900 sm:rounded-8 z-10 sm:w-400 w-full items-center">
        <div className="space-y-8 bg-gray-800 rounded p-12">
          <div className="flex gap-2 flex-col items-center text-yellow-500">
            <span className="text-3xl text-primary-100 font-bold">Welcome</span>
            <div className="text-primary-100 flex-wrap text-white">
              By sign in you accept our&nbsp;
              <a
                href="/privacy-policy.html"
                className="text-yellow-500 hover:underline"
              >
                Privacy Policy
              </a>
              &nbsp;and&nbsp;
              <a href="/terms.html" className="text-yellow-500 hover:underline">
                Terms of Service
              </a>
              .
            </div>
          </div>
          <div className="flex flex-col items-center">
            <form
              className=" flex flex-col items-center rounded-xl space-y-8"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col space-y-2 justify-center">
                <label htmlFor="" className="text-yellow-500 text-md">
                  Username
                </label>
                <input
                  className="px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-500 font-body"
                  id="username"
                  name="username"
                  value={inputs.username}
                  placeholder="Enter Username"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col space-y-2 justify-center">
                <label htmlFor="" className="text-yellow-500 text-md">
                  Email
                </label>
                <input
                  className="px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-500 font-body"
                  id="email"
                  name="email"
                  value={inputs.email}
                  placeholder="Enter Email"
                  type="text"
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
                  value={inputs.password}
                  placeholder="Enter Password"
                  type="password"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <button
                className="bg-yellow-500 text-white font-bold font-body  rounded-md px-4 py-3 uppercase text-sm hover:bg-yellow-600 flex items-center space-x-1 transition duration-300 ease-in-out"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
