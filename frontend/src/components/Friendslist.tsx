import React from "react";

interface Iprops {
  Props?: any;
  authSetter: (isUserAuth: boolean) => void;
}

const Friendslist: React.FC<Iprops> = () => {
  return <div>This is friends list component</div>;
};

export default Friendslist;
