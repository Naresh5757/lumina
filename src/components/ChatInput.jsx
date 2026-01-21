import React, { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import { useChat } from '../context';

const ChatInput = () => {
    const { sendMessage, isLoading } = useChat();
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const message = input;
        setInput('');

        // Reset height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }

        await sendMessage(message);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [input]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-6 z-20">
            <form
                onSubmit={handleSubmit}
                className="relative flex items-end gap-2 p-2 rounded-2xl glass transition-all focus-within:ring-2 focus-within:ring-indigo-500/50 shadow-lg"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}
            >
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message Lumina..."
                    rows={1}
                    className="w-full bg-transparent border-0 focus:ring-0 resize-none py-3 px-4 max-h-48 text-base overflow-y-auto"
                    style={{ color: 'var(--text-primary)' }}
                    disabled={isLoading}
                />

                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-1 mr-1"
                    style={{
                        background: input.trim() ? 'var(--accent-primary)' : 'var(--bg-glass)',
                        color: input.trim() ? 'white' : 'var(--text-secondary)'
                    }}
                >
                    <FiSend size={20} className={isLoading ? 'animate-pulse' : ''} />
                </button>
            </form>
            <div className="text-center mt-2 text-xs opacity-50" style={{ color: 'var(--text-secondary)' }}>
                Lumina takes your privacy seriously. However, AI can make mistakes.
            </div>
        </div>
    );
};

export default ChatInput;
