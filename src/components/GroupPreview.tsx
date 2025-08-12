'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import useGroupStore from '@/stores/useGroupStore';
import styles from './GroupPreview.module.css';

interface GroupPreviewProps {
    uuid: string;
    title: string;
    body: string;
}

const GroupPreview: React.FC<GroupPreviewProps> = ({ uuid, title, body}) => {
    const navigate = useRouter();
    const { setGroupName } = useGroupStore();

    const handleClick = () => {
        setGroupName(title);
        navigate.push(`/chat/${uuid}`);
    }

    return (
        <>
            <div 
                className={styles.groupPreviewContainer}
                onClick={handleClick}
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