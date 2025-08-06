'use client';

import React, { useState, useRef } from "react";
import styles from "./InputContainer.module.css";

const InputContainer: React.FC<{
    onSendMessage: (message: string) => void;
}> = ({ onSendMessage }) => {
    const [messageText, setMessageText] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageText(event.target.value);
        autoResize();
    };

    const autoResize = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

    const handleSendMessage = () => {
        if (messageText.trim() === "") return;
        onSendMessage(messageText);
        setMessageText("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    return (
        <div className={styles.inputContainer}>
            <div className={styles.inputTextContainer}>
                <textarea
                    ref={textareaRef}
                    className={styles.input}
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={handleInputChange}
                    onInput={autoResize}
                    rows={1}
                    style={{ resize: "none" }}
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
        </div>
    );
}

export default InputContainer;