import { getCurrentUser } from "@/services/auth.service";
import { Loading } from "@nextui-org/react";
import React, { useEffect } from "react";


interface Iprops {
    data?: any;
}

interface IMessage {
    username: string;
    message: string;
    timestamp: string;
}

const Chat = (props: Iprops) => {

    
    const sampleMessages = [
        {
            username: "uname1",
            message: "Hello guys!",
            timestamp: "12:00"
        },
        {
            username: "uname2",
            message: "Hey!",
            timestamp: "12:01"
        },
        {
            username: "uname3",
            message: "How are you guys doing?",
            timestamp: "12:02"
        },
        {
            username: "uname1",
            message: "I'm doing great!",
            timestamp: "12:03"
        },
        {
            username: "uname2",
            message: "Jag är long på Wall St. Warriors 🚀🚀🚀🚀🚀",
            timestamp: "12:04"
        }
    ];


    return (
        <div
        style={{
            display: "flex",
            height:"25rem",
            minHeight:"20rem", minWidth:"35rem",
        }}>
            <div 
                style={{
                backgroundColor: "rgba(255,255,255,0.25)",
                padding: "1rem",
                borderRadius: "1rem",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                width: "100%",
                overflowY: "scroll",
            }}
            >
            {
                getCurrentUser()?.username ? (
                sampleMessages.map((message: IMessage) => {
                    //Should be set using useEffect
                    let isUser = getCurrentUser()?.username === message.username
                    let margin = isUser ? "0 0 0 50%" : "0 50% 0 0"
                    let bgColor = isUser ? "#1982FC" : "#CBD1D7"
                    let color = isUser ? "white" : "black"
                    return (
                        <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "50%",
                            margin: margin,
                            marginTop: "1rem",
                        }}>
                            <p
                            style={{
                                fontSize: "0.75rem",
                                color: "rgba(0,0,0,0.5)",
                            }}>
                                {message.username}
                            </p>
                            <div style={{
                                backgroundColor: bgColor,
                                color: color,
                                borderRadius: "1rem",
                                padding: "1rem",
                                marginBottom: "0.5rem",
                            }}>
                                <p
                                style={{
                                    fontSize: "1rem",
                                    textAlign: "left",
                                    padding: "0.25rem"
                                }}>
                                    {message.message}
                                </p>
                            </div>
                        </div>
                    )
                })) :
                <Loading />
            }


            </div>
        </div>
    )
}

export default Chat;