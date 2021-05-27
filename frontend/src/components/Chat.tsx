import React, { useEffect, useState } from 'react';
import io from "socket.io-client";

const socket = io("http://localhost:4000", {transports : ["websocket"]});

const Chat : React.FC = () => {
    const [message, setMessage] = useState("");
    const[chatLog, setChatLog] =  useState<JSX.Element[]>([])
    const [user , setUser] =  useState("kin");
    
    function handleMessage(msg:string){
       const userMessage = React.createElement("p", {className: "bg-yellow-600 rounded-md text-base  text-white p-2"}, `${msg}`);
       setChatLog(chatLog => [...chatLog, userMessage]);

          // handle scrolling to the bottom automatically on message
          let chatWindow = document.querySelector("#chat-window");
          if(chatWindow !== null){
            chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight
          }
    }

    useEffect(() => {
    // catch server message on login
    socket.on("message", message =>{
        handleMessage(message)
    })
    }, [])

    const handleSubmit = (e :React.FormEvent) =>{
        e.preventDefault();
        //send chat message of an user to the server
        socket.emit("chatMessage", message)
        setMessage("");
    }

    return (
        <div className = "min-h-screen bg-white flex flex-col items-center justify-center">
            <div className ="bg-gray-900 w-9/12 flex items-center space-x-4 rounded-t-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 p-1 ml-4 my-2 bg-gray-700 rounded-full"
                  fill = "#f59e0b"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.944 5c-1.138 0-2.376.129-3.394.491-2.283.828-2.792.838-5.103 0-1.015-.362-2.256-.491-3.392-.491-1.971 0-4.17.387-6.055.878v1.789c.847.255 1.068.627 1.203 1.493.381 2.443 1.255 4.84 5.068 4.84 3.037 0 4.051-2.259 4.722-4.345.341-1.06 1.663-1.087 2.009-.015.673 2.089 1.682 4.36 4.725 4.36 3.814 0 4.689-2.397 5.069-4.841.135-.866.356-1.237 1.204-1.492v-1.789c-1.887-.491-4.085-.878-6.056-.878zm-7.682 3.814c-.518 2.174-1.36 4.186-3.991 4.186-3.301 0-3.974-1.903-4.275-4.973-.072-.747.092-1.04.221-1.195.947-1.134 5.952-1.088 7.611-.092.475.285.783.601.434 2.074zm11.74-.787c-.301 3.07-.975 4.973-4.275 4.973-2.629 0-3.472-2.012-3.989-4.186-.351-1.473-.042-1.789.434-2.074 1.665-1 6.667-1.038 7.611.092.129.156.293.449.219 1.195zm-4.838-1.121c1.539-.234 3.318-.03 3.791.537.104.124.234.358.176.956-.031.316-.067.616-.112.9-.41-1.487-1.457-2.283-3.855-2.393zm-14.184 2.393c-.045-.284-.082-.584-.113-.9-.058-.598.073-.832.177-.956.474-.567 2.253-.771 3.792-.537-2.398.11-3.445.906-3.856 2.393zm16.02 7.764c-1.15 2.869-6.031 2.166-7 .369-.97 1.797-5.85 2.5-7-.369.578.506 1.565.669 2.318.559 2.22-.325 2.042-2.423 3.594-2.423.425 0 .81.177 1.088.464.278-.287.662-.464 1.087-.464 1.552 0 1.375 2.099 3.594 2.423.753.11 1.74-.053 2.319-.559z" />
                </svg>
                <h1 className ="text-2xl font-elokint font-bold tracking-widest uppercase text-yellow-500">Elokint Chat</h1>
            </div>
            <div className = "flex flex-row w-9/12 h-96"> 
                <div className = "bg-gray-700 w-3/12 text-white">

                </div>
                
                <div className = "bg-gray-800 flex flex-1 overflow-y-scroll flex-col no-scrollbar" id ="chat-window">
                   {chatLog.map((chatmsg, index) =>{
                      return <div key ={index} className="flex flex-wrap mx-4 my-3 self-end">{chatmsg}</div> 
                   })} 
                </div>

            </div>
            <div className ="bg-gray-900 w-9/12 rounded-b-xl"> 
                <form id = "chat-form" onSubmit= {handleSubmit} className= "flex items-center my-4 mx-4 space-x-2">
                                  
                        <input
                            id = "msg"
                            type="text"
                            placeholder="Enter Message"
                            value = {message}
                            onChange = {(e)=>setMessage(e.currentTarget.value)}
                            className=" w-full  px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-500 font-body"/>
                    
                                  <button className=" bg-yellow-500 text-white font-bold font-body  rounded-md px-4 py-2 uppercase text-sm hover:bg-yellow-600 flex items-center space-x-1 transition duration-300 ease-in-out" type= "submit" >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                   </svg>
                   <h1>Send</h1> 
                  </button>
               
                </form>
            </div>
        </div>
    )
}

export default Chat
