import React, { useState } from "react";
import styles from "./InputContainer.module.css";

const InputContainer: React.FC<{
    onSendMessage: (message: string) => void;
}> = ({ onSendMessage }) => {
    const [messageText, setMessageText] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageText(event.target.value);
    };

    const handleSendMessage = () => {
        if (messageText.trim() === "") return;
        onSendMessage(messageText);
        setMessageText("");
    };

    return (
        <div className={styles.inputContainer}>
            <input
                type="text"
                className={styles.input}
                placeholder="Type your message..."
                value={messageText}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSendMessage();
                    }
                }}
            />
            <button
                className={styles.button}
                onClick={handleSendMessage}
            >
                Send
            </button>
        </div>
    );
}

export default InputContainer;