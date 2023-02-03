import { useEffect } from 'react';
import { useRef } from 'react';
import { createContext } from 'react';
// import { io } from 'socket.io-client';
import socketIOClient from 'socket.io-client';
const SocketContext = createContext();
const ENDPOINT = window.location.host.indexOf('localhost') >= 0 ? 'http://127.0.0.1:5000' : window.location.host;

function SocketProvider({ children }) {
    const socket = useRef();

    // socket.current = io('ws://localhost:8900/');
    socket.current = socketIOClient(ENDPOINT);
    // useEffect(() => {
    //     socket.current = io('ws://localhost:8900/');
    //     // socket.current.on("getMessage", (data) => {
    //     //   console.log("io arrival message", data);
    //     // //   setArrivalMessage({
    //     // //     sender: data.senderId,
    //     // //     text: data.text,
    //     // //     createdAt: Date.now(),
    //     // //   });
    //     // });
    // }, []);

    return <SocketContext.Provider value={socket.current}>{children}</SocketContext.Provider>;
}

export { SocketContext, SocketProvider };
