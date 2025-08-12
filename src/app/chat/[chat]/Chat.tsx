'use client';

import React, { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.css";
import ChatBubble from "@/components/ChatBubble";
import InputContainer from "@/components/InputContainer";
import useWebSocketStore from '@/stores/useWebSocketStore';
import useGroupStore from '@/stores/useGroupStore';

interface ChatProps {
    chat: string;
}

interface Message {
    chat_id: string;
    sender_id: string;
    content: string;
} 

const Chat: React.FC<ChatProps> = ({ chat }) => {
    const { socket } = useWebSocketStore();
    const { groupName } = useGroupStore();
    const wsRef = useRef<WebSocket | null>(null);

    console.log(`WebSocket URL: ${process.env.NEXT_PUBLIC_DEV_SERVER}`);
    console.log("chat ID:", chat);

    const messages = [
        { text: "Hello!", isSender: true },
        { text: "Hi there!", isSender: false },
    ]

    useEffect(() => {
        wsRef.current = socket;
    }, [chat]);

    const handleSendMessage = (messageText: string) => {
        if (messageText.trim() === "") return;

        const message: Message = {
            chat_id: chat,
            sender_id: "client",
            content: messageText,
        };

        wsRef.current?.send(JSON.stringify(message));
    };

    return (
        <>
            <>
                <button className={styles.backButton} onClick={() => window.history.back()}>
                    <img src="/back-arrow.svg" alt="Back" />
                </button>
                <div className={styles.headerContent}>
                    <h2 className={styles.chatTitle}>{groupName}</h2>
                    <div className={styles.chatHeaderLine} />
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