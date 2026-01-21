import React, { useEffect, useRef } from 'react';
import { useChat } from '../context';
import Sidebar from './Sidebar';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { FiMenu } from 'react-icons/fi';

const ChatInterface = () => {
    const { messages, isLoading } = useChat();
    const messagesEndRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    return (
        <div className="flex h-screen overflow-hidden bg-[url('/bg-gradient.svg')] bg-cover bg-no-repeat bg-fixed relative">
            {/* Background elements for premium feel */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Application Layout */}
            <div className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <Sidebar />
            </div>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col h-full relative">

                {/* Mobile Header */}
                <header className="md:hidden flex items-center p-4 glass-heavy z-30 sticky top-0">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-lg hover:bg-white/10 transition-colors">
                        <FiMenu size={24} style={{ color: 'var(--text-primary)' }} />
                    </button>
                    <span className="ml-4 font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                        style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Lumina
                    </span>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto w-full scroll-smooth">
                    <div className="min-h-full flex flex-col justify-end pb-4 pt-8 md:pt-12">
                        <div className="flex flex-col gap-4 md:gap-8 px-4 w-full max-w-5xl mx-auto">
                            {messages.map((msg) => (
                                <div key={msg.id} className="animate-fade-in">
                                    <ChatMessage message={msg} />
                                </div>
                            ))}

                            {isLoading && (
                                <div className="animate-fade-in pl-4 md:pl-0 w-full max-w-4xl mx-auto">
                                    <div className="flex items-center gap-3 p-4">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                            }}>
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                        </div>
                                        <span className="text-sm opacity-50" style={{ color: 'var(--text-secondary)' }}>Lumina is thinking...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="flex-shrink-0 w-full glass-heavy z-30">
                    <ChatInput />
                </div>
            </main>
        </div>
    );
};

export default ChatInterface;
