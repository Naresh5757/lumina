import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiUser, FiCpu, FiCopy } from 'react-icons/fi';

const ChatMessage = ({ message }) => {
    const isAi = message.role === 'assistant' || message.role === 'model';

    return (
        <div className={`group flex gap-4 md:gap-6 p-4 md:p-6 w-full max-w-4xl mx-auto rounded-2xl transition-colors ${isAi ? 'bg-white/5' : ''}`}>

            {/* Avatar */}
            <div className="flex-shrink-0 flex flex-col relative items-end">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                    style={{
                        background: isAi ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'var(--bg-secondary)',
                        color: isAi ? 'white' : 'var(--text-secondary)'
                    }}>
                    {isAi ? <FiCpu size={18} /> : <FiUser size={18} />}
                </div>
            </div>

            {/* Content */}
            <div className="relative flex-1 overflow-hidden">
                {/* Name */}
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm" style={{ color: isAi ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {isAi ? 'Lumina' : 'You'}
                    </span>
                    <span className="text-xs opacity-50" style={{ color: 'var(--text-secondary)' }}>
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>

                {/* Message Text / Markdown */}
                <div className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    <ReactMarkdown
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <div className="rounded-md overflow-hidden my-4 border border-white/10 shadow-sm">
                                        <div className="flex items-center justify-between px-4 py-2 bg-black/30 text-xs text-gray-400">
                                            <span>{match[1]}</span>
                                            <button className="hover:text-white transition-colors">
                                                <FiCopy size={14} />
                                            </button>
                                        </div>
                                        <SyntaxHighlighter
                                            style={atomDark}
                                            language={match[1]}
                                            PreTag="div"
                                            customStyle={{ margin: 0, borderRadius: 0, background: 'rgba(0,0,0,0.2)' }}
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code className={`${className} bg-white/10 px-1.5 py-0.5 rounded text-sm`} style={{ color: 'var(--text-code)' }} {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
