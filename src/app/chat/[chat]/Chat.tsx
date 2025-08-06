'use client';

import React, { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.css";
import ChatBubble from "@/components/ChatBubble";
import InputContainer from "@/components/InputContainer";

interface ChatProps {
    chat: string;
}

interface Message {
    chat_id: string;
    sender_id: string;
    content: string;
} 

const Chat: React.FC<ChatProps> = ({ chat }) => {
    const wsRef = useRef<WebSocket | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const CONNECTION_TIMEOUT = 5000; // 5 seconds timeout
    // const ws = new WebSocket("ws://localhost:8000/ws");

    console.log(`WebSocket URL: ${process.env.NEXT_PUBLIC_DEV_SERVER}`);
    console.log("chat ID:", chat);

    const messages = [
        { text: "Hello!", isSender: true },
        { text: "Hi there!", isSender: false },
    ]

    useEffect(() => {
        const ws = new WebSocket(`wss://${process.env.NEXT_PUBLIC_DEV_SERVER}/ws`);
        // const ws = new WebSocket("ws://localhost:8000/ws");
        wsRef.current = ws;

        console.log("chat ID:", chat);
        

        ws.onopen = () => {
            console.log("WebSocket connection established");
            console.log(`${chat}`);
        };

        ws.onmessage = (event) => {
            console.log("Received event:", event);
            const data = JSON.parse(event.data);
            console.log(data);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            ws.close();
        };
    }, [chat]);

    const handleSendMessage = (messageText: string) => {
        if (messageText.trim() === "") return;

        const message: Message = {
            chat_id: chat,
            sender_id: "client",
            content: messageText,
        };
        
        const jsonValueForSend = JSON.stringify(message);
        console.log("Sending message:", jsonValueForSend);

        wsRef.current?.send(jsonValueForSend);
    };

    return (
        <>
            <>
                <button className={styles.backButton} onClick={() => window.history.back()}>
                    <img src="/back-arrow.svg" alt="Back" />
                </button>
                <div className={styles.headerContent}>
                    <h2 className={styles.chatTitle}>Chat</h2>
                    <div className={styles.chatHeaderLine} />
                    <h4 className={styles.chatSubtitle}>Group Name</h4>
                </div>
                
            </>
            <div className={styles.chats}>
                <div className={styles.chatContainer}>
                    {<>
                        {messages.map((message, index) => (
                            <ChatBubble
                                key={index}
                                message={message.text}
                                isSender={message.isSender}
                            />
                        ))}
                    </>}
                </div>
                <InputContainer onSendMessage={handleSendMessage} />
            </div>
        </>
    );
}

export default Chat;