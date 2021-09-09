import React from "react";

interface Iprops {
  Props?: any;
  authSetter: (isUserAuth: boolean) => void;
}

export const Friendslist: React.FC<Iprops> = () => 
{
  let friends : string[] = [" Tom", "Jerry" , "Aang", "Makima"]
  let friendImage : string[] = ["/Tom_Cat.jpeg", "/Jerry_Mouse.jpg", "/aang.png" , "/makima.jpg"]
  let status : string[] = ["bg-red-500", "bg-green-500" , "bg-green-500" , "bg-yellow-400"]
  let descriptions : string[] = ["Looking for a particular 🐭" ,"Trolling 🐱's for days" , "Learning how to become the avatar 🍃🌊🔥" , "Want to have an elokencious conversation 😈"]
  return (
    <div className="min-h-screen bg-elokint-light-black flex flex-col space-y-4 items-center justify-center">
      <div className= "text-4xl font-elokint  font-bold tracking-wider text-yellow-500">
      Friends List
      </div>
      {/* Friends log section  */}
      <div className ="flex flex-col items-center justify-items space-y-4 bg-white rounded-md p-5">
        {friends.map((friend, i)=> {
          return(
          <div key = {i} className=" flex items-center bg-white rounded w-full h-24 shadow-lg p-5">
            {/* Profile picture */}
            <div className = "flex rounded-full w-20 h-20 bg-white mr-10 shadow-md border-black relative">
              <div className= {`absolute rounded-full ${status[i]}  w-3 h-3 bottom-1 right-2`}></div>
              <img src={friendImage[i]} alt= {friend}  className ="rounded-full w-20 h-20"/>
            </div>
              {/* name */}
            <div className ="font-body text-base space-y-2">
              <div>

              {friend}
              </div>
              <div className = "text-sm text-gray-500">
                {descriptions[i]}
              </div>
            </div>
          </div>
)})}
      </div>
    </div>
  );
};
