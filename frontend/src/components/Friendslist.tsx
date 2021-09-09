import React from "react";

interface Iprops {
  Props?: any;
  authSetter: (isUserAuth: boolean) => void;
}

export const Friendslist: React.FC<Iprops> = () => 
{
  let friends : String[] = [" Tom", "Jerry" , "Aang", "Makima"]
  return (
    <div className="min-h-screen bg-elokint-light-black flex items-center justify-center">
      <div className ="flex flex-col items-center justify-items space-y-4">
        {friends.map((friend, i)=> {
          return(
          <div key = {i} className=" flex items-center bg-white rounded w-80 h-20">
            {/* Profile picture */}
            <div className = "flex rounded-full w-20 h-20 bg-gray-500">
             Picture 
            </div>
              {/* name */}
            <div className ="flex justify-self-center ">
              {friend}

            </div>
          </div>
)})}
      </div>
    </div>
  );
};
