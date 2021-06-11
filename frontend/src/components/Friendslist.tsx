import React from "react";

interface Iprops {
  Props?: any;
  authSetter: (isUserAuth: boolean) => void;
}

export const Friendslist: React.FC<Iprops> = () => {
  return (
    <div className="min-h-screen bg-elokint-light-black flex items-center justify-center">
      <div>
        <h1>Friends List</h1>
        <div> Tom</div>
        <div>Jerry</div>
      </div>
    </div>
  );
};
