import React, { createContext, useContext, useState, useCallback } from "react";
import { sendMessageToGemini } from "../api/gemini";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([
        {
            id: "welcome-msg",
            role: "assistant",
            content: "Hello! I am Lumina, your personal AI mentor and guide. How can I assist you today?",
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = useCallback(async (content) => {
        if (!content.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now().toString(),
            role: "user",
            content,
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            // Get conversation history excluding the just added message for the API call
            // (The API call handles its own history management based on the passed array but we need to format it)
            // Actually standardizing on passing the pure history from state
            // Get conversation history excluding the welcome message and the current user message (which is passed as 'content')
            const historyForApi = messages
                .filter(msg => msg.id !== "welcome-msg")
                .map(msg => ({ role: msg.role, content: msg.content }));

            const responseText = await sendMessageToGemini(historyForApi, content);

            const aiMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: responseText,
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            setError("Failed to get response from Lumina. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [messages]);

    const clearChat = () => {
        setMessages([
            {
                id: "welcome-msg",
                role: "assistant", // consistent role naming
                content: "Hello! I am Lumina, your personal AI mentor and guide. How can I assist you today?",
            },
        ]);
    };

    return (
        <ChatContext.Provider value={{ messages, isLoading, error, sendMessage, clearChat }}>
            {children}
        </ChatContext.Provider>
    );
};
