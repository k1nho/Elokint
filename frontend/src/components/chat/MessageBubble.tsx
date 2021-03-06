import React from "react";

interface Iprops {
  username: string;
  message: string;
  date: any;
  color: string;
}

export const MessageBubble: React.FC<Iprops> = ({
  username,
  color,
  message,
  date,
}) => {
  return (
    <div className="flex flex-wrap mx-4 my-3 w-64">
      <p
        className={`${color} rounded-l-md rounded-tr-md text-sm  text-white p-2 flex flex-col w-full`}
      >
        <span className="text-md  font-bold">{username}</span>
        <span>{message}</span>
        <span className="text-xs self-end">{date}</span>
      </p>
    </div>
  );
};
