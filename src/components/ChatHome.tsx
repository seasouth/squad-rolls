'use client';

import styles from "./ChatHome.module.css";
import ChatBubble from "@/components/ChatBubble";
import InputContainer from "@/components/InputContainer";
import React, { useState } from "react";

const ChatHome = () => {
    const [messages, setMessages] = useState([
        { text: "Hello!", isSender: true },
        { text: "Hi there!", isSender: false },
    ]);
    const handleSendMessage = (messageText: string) => {
        if (messageText.trim() === "") return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: messageText, isSender: true },
        ]);
    };

    return (
        <>
            <div className={styles.chatContainer}>
            {<>
                <ChatBubble message="Hello!" isSender={true} />
                <ChatBubble message="Hi there!" isSender={false} />
                {messages.map((message, index) => (
                    <ChatBubble
                        key={index}
                        message={message.text}
                        isSender={message.isSender}
                    />
                ))}
            </>}
            </div>
            <div className={styles.inputContainer}>
                <InputContainer onSendMessage={handleSendMessage} />
            </div>
        </>
    );
};

export default ChatHome;
