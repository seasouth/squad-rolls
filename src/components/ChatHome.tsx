'use client';

import React from "react";
import styles from "./ChatHome.module.css";
import GroupPreview from "./GroupPreview";

const ChatHome = () => {
    // const ws = new WebSocket("ws://localhost:8000/ws");

    // const [groups, setGroups] = useState([
    //     { id: 1, name: "Group 1" },
    //     { id: 2, name: "Group 2" },
    // ]);

    const groups = [
        { id: 1, name: "Group 1" },
        { id: 2, name: "Group 2" },
    ]

    // const handleSendMessage = (messageText: string) => {
    //     if (messageText.trim() === "") return;



    //     ws.send(JSON.stringify({ message: messageText, user: "client" }));

    //     // setMessages((prevMessages) => [
    //     //     ...prevMessages,
    //     //     { text: messageText, isSender: true },
    //     // ]);
    // };

    return (
        <div className={styles.chatsContainer}>
            {groups.map((group) => (
                <GroupPreview
                    key={group.id}
                    title={group.name}
                    body="This is a group preview"
                />
            ))}
        </div>
    );
};

export default ChatHome;
