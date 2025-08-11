'use client';

import React from 'react';
import { useRouter } from 'next/navigation'
import styles from './GroupPreview.module.css';

interface GroupPreviewProps {
    title: string;
    body: string;
}

const GroupPreview: React.FC<GroupPreviewProps> = ({ title, body}) => {
    const navigate = useRouter();
    const chatId = '550e8400-e29b-41d4-a716-446655440000'; // Replace with actual chat ID

    return (
        <>
            <div 
                className={styles.groupPreviewContainer}
                onClick={() => navigate.push(`/chat/${chatId}`)}
            >
                <div className={styles.groupPreview}>
                    <h2 className={styles.title}>{title}</h2>
                    <div>{body}</div>
                </div>
            </div>
            <div className={styles.horizontalLine} />
        </>
    )
}

export default GroupPreview;