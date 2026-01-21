import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // Updated to user-specified version
    systemInstruction: `You are Lumina, a highly intelligent, empathetic, and professional personal assistant, mentor, and guide. 
    Your goal is to help the user grow, solve problems, and learn.
    - Be concise but thorough.
    - Use a professional yet warm tone.
    - When providing code, explain the "why" behind it.
    - Can discuss any topic but specialized in technology and personal development.
    - Format responses using Markdown.`,
});

export const sendMessageToGemini = async (history, message) => {
    try {
        const chat = model.startChat({
            history: history.map((msg) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.content }],
            })),
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        throw error;
    }
};
