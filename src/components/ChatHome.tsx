'use client';

import React, { useState, useEffect } from "react";
import styles from "./ChatHome.module.css";
import GroupPreview from "./GroupPreview";
import { useWebSocketStore } from '@/stores/useWebSocketStore';
import words from "~/data/words.json";

const ChatHome = () => {
    const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);
    const { connect } = useWebSocketStore();
    // const groups = [
    //     { id: 1, name: "Group 1" },
    //     { id: 2, name: "Group 2" },
    // ]



    const createNewSquad = () => {
        const randomName = words.adjectives[Math.floor(Math.random() * words.adjectives.length)]
            + " " + words.nouns[Math.floor(Math.random() * words.nouns.length)];

        const newGroup = {
            id: groups.length + 1,
            name: randomName,
        };

        setGroups((prevGroups) => [...prevGroups, newGroup]);
    }

    useEffect(() => {
        connect();
    }, []);

    return (
        <div className={styles.chatsContainer}>
            <button className={styles.roll} onClick={createNewSquad}>
                <div className={styles.rollButton}>
                    <img src="/dice1.svg" alt="Roll" />
                </div>
                <h3>Roll For a Squad :-)</h3>
            </button>
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
