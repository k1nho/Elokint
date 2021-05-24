import React from 'react';
import { Link } from 'react-router-dom';

const NavBar : React.FC = () => {
    return (
    <div className="bg-black sticky top-0 z-50">
      <div className="flex justify-between md:justify-around mx-auto w-10/12 py-4 text-white items-center">
        <h1 className="text-2xl md:text-4xl font-elokint hover:text-yellow-500 transition duration-200 cursor-pointer focus:text-yellow-500 focus:outline-none tracking-wider">
          <Link to ="/">Elokint</Link>
        </h1>
        <div className="px-4 cursor-pointer md:hidden " >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <div className="text-base space-x-8 font-body md:block hidden py-1">
          <Link to ="/chat">
            <button className="focusText">Chat</button>
          </Link>
          <Link to ="/friends">
          <button className="focusText">Friends</button>
          </Link>
          <Link to ="/login">
            <button className=" font-bold bg-yellow-500 hover:bg-yellow-400 transition duration-200 rounded-md py-2 px-4">Login</button>
          </Link>
          <Link to ="/register">
            <button className="font-bold bg-yellow-500 hover:bg-yellow-400 transition duration-200 rounded-md py-2 px-3">Sign Up</button>
          </Link>
      </div>
        </div>
        </div>
    )
}

export default NavBar
