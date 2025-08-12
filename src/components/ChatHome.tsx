'use client';

import React, { useState, useEffect } from "react";
import styles from "./ChatHome.module.css";
import GroupPreview from "./GroupPreview";
import useWebSocketStore from '@/stores/useWebSocketStore';
import words from "~/data/words.json";
import { useLiveQuery } from "dexie-react-hooks";
import { groupsDB } from "~/lib/db";

const ChatHome = () => {
    const [groups, setGroups] = useState<{ uuid: string; name: string, lastMessage: string }[]>([]);
    const { connect } = useWebSocketStore();
    const squads = useLiveQuery(() => groupsDB.groups.toArray());

    const createNewSquad = async () => {
        const randomName = words.adjectives[Math.floor(Math.random() * words.adjectives.length)]
            + " " + words.nouns[Math.floor(Math.random() * words.nouns.length)];

        const newGroup = {
            uuid: crypto.randomUUID(),
            name: randomName,
            lastMessage: "This is a new group",
        };

        const id = await groupsDB.groups.add(newGroup);

        setGroups((prevGroups) => [...prevGroups, newGroup]);
    }

    useEffect(() => {
        connect();
    }, []);

    useEffect(() => {
        console.log(squads);
    }, [groups]);

    return (
        <div className={styles.chatsContainer}>
            <button className={styles.roll} onClick={createNewSquad}>
                <div className={styles.rollButton}>
                    <img src="/dice1.svg" alt="Roll" />
                </div>
                <h2>Roll For a Squad :-)</h2>
            </button>
            {squads && squads.map((squad) => (
                <GroupPreview
                    key={squad.uuid}
                    uuid={squad.uuid}
                    title={squad.name}
                    body={squad.lastMessage}
                />
            ))}
        </div>
    );
};

export default ChatHome;
