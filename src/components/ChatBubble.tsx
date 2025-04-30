import React from 'react';
import styles from './ChatBubble.module.css';

interface ChatBubbleProps {
    message: string;
    isSender: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isSender }) => {
    return (
        <div
            className={`${styles.chatBubble} ${
                isSender ? styles.chatBubbleSender : styles.chatBubbleReceiver
            }`}
        >
            <p className={styles.chatMessage}>{message}</p>
        </div>
    );
};

export default ChatBubble;